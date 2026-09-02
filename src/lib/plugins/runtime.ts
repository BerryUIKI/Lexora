import type { PluginManifest } from "../../types/plugin";
import { readPluginSource } from "../tauri/commands";
import { currentDocument, updateDocumentContent } from "../../store/editor";

export interface PluginCommand {
  id: string;
  title: string;
  shortcut?: string;
  run: () => void;
}

export interface LexoraPluginContext {
  commands: {
    registerCommand: (command: PluginCommand) => () => void;
  };
  editor: {
    getContent: () => string;
    insertText: (text: string) => void;
    setContent: (content: string) => void;
  };
  storage: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
  };
}

export interface LexoraPluginModule {
  onload?: (ctx: LexoraPluginContext) => void | Promise<void>;
  onunload?: () => void | Promise<void>;
}

class PluginRuntimeManager {
  private activeModules = new Map<string, LexoraPluginModule>();
  private disposables = new Map<string, Array<() => void>>();
  private registeredCommands = new Map<string, PluginCommand>();

  public getRegisteredCommands(): PluginCommand[] {
    return Array.from(this.registeredCommands.values());
  }

  public createContext(pluginId: string): LexoraPluginContext {
    return {
      commands: {
        registerCommand: (cmd: PluginCommand) => {
          const namespacedId = `${pluginId}:${cmd.id}`;
          this.registeredCommands.set(namespacedId, cmd);

          const dispose = () => {
            this.registeredCommands.delete(namespacedId);
          };

          const list = this.disposables.get(pluginId) || [];
          list.push(dispose);
          this.disposables.set(pluginId, list);

          return dispose;
        },
      },
      editor: {
        getContent: () => currentDocument().content,
        insertText: (text: string) => {
          const doc = currentDocument();
          updateDocumentContent(`${doc.content}${text}`);
        },
        setContent: (content: string) => {
          updateDocumentContent(content);
        },
      },
      storage: {
        getItem: (key: string) => {
          try {
            return localStorage.getItem(`lexora_plugin_${pluginId}_${key}`);
          } catch {
            return null;
          }
        },
        setItem: (key: string, value: string) => {
          try {
            localStorage.setItem(`lexora_plugin_${pluginId}_${key}`, value);
          } catch (err) {
            console.warn(`[Plugin ${pluginId}] Storage write failed:`, err);
          }
        },
      },
    };
  }

  public async loadPlugin(manifest: PluginManifest): Promise<boolean> {
    try {
      if (this.activeModules.has(manifest.id)) {
        await this.unloadPlugin(manifest.id);
      }

      let source = "";
      try {
        source = await readPluginSource(manifest.id);
      } catch {
        // Fallback for mock/built-in plugins in development/test
        source = `export default { onload(ctx) {}, onunload() {} };`;
      }

      const mod: LexoraPluginModule = this.evaluatePluginSource(source);
      this.activeModules.set(manifest.id, mod);
      this.disposables.set(manifest.id, []);

      const ctx = this.createContext(manifest.id);
      if (mod.onload) {
        await Promise.resolve(mod.onload(ctx));
      }

      return true;
    } catch (err) {
      console.error(`[PluginManager] Failed to load plugin ${manifest.id}:`, err);
      return false;
    }
  }

  public async unloadPlugin(pluginId: string): Promise<void> {
    const mod = this.activeModules.get(pluginId);
    if (mod?.onunload) {
      try {
        await Promise.resolve(mod.onunload());
      } catch (err) {
        console.warn(`[PluginManager] Error during ${pluginId} onunload:`, err);
      }
    }

    const cleanups = this.disposables.get(pluginId) || [];
    for (const dispose of cleanups) {
      try {
        dispose();
      } catch (e) {
        console.warn(e);
      }
    }

    this.disposables.delete(pluginId);
    this.activeModules.delete(pluginId);
  }

  private evaluatePluginSource(source: string): LexoraPluginModule {
    try {
      // Strip 'export default' or 'module.exports' for safe functional wrap
      const cleanSource = source
        .replace(/^\s*export\s+default\s+/m, "return ")
        .replace(/^\s*module\.exports\s*=\s*/m, "return ");

      const factory = new Function(cleanSource);
      const result = factory();
      return result || {};
    } catch (err) {
      console.warn("Plugin evaluation failed:", err);
      return {};
    }
  }
}

export const pluginRuntime = new PluginRuntimeManager();
