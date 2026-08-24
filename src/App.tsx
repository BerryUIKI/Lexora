import { Component, createSignal } from "solid-js";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Editor } from "./components/Editor/Editor";
import { StatusBar } from "./components/StatusBar/StatusBar";

const App: Component = () => {
  const [sidebarOpen, setSidebarOpen] = createSignal(true);

  return (
    <div class="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div class="flex flex-1 overflow-hidden">
        {sidebarOpen() && <Sidebar />}
        <main class="flex-1 flex flex-col overflow-hidden">
          <Editor />
        </main>
      </div>
      <StatusBar
        sidebarOpen={sidebarOpen()}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
    </div>
  );
};

export default App;
