// Ensure robust in-memory localStorage for Node 22+ / jsdom test environments
if (typeof globalThis !== "undefined") {
  const store = new Map<string, string>();
  const mockStorage: Storage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, String(value)),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size;
    },
  };

  try {
    Object.defineProperty(globalThis, "localStorage", {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
  } catch {}

  if (typeof window !== "undefined") {
    try {
      Object.defineProperty(window, "localStorage", {
        value: mockStorage,
        writable: true,
        configurable: true,
      });
    } catch {}
  }
}
