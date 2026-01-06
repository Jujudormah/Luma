import { useState } from "react";
import TopBar from "./components/layout/TopBar";
import Sidebar from "./components/layout/SideBar";

export default function App() {
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);

  const togglePinned = () => setIsPinnedOpen((p) => !p);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Top bar */}
      <TopBar onMenuClick={togglePinned} isPinnedOpen={isPinnedOpen} />

      {/* Body layout: Sidebar + Content */}
      <div className="flex">
        <Sidebar isPinnedOpen={isPinnedOpen} />

        {/* Your main page content */}
        <main className="p-4 text-white">
          <h1 className="text-2xl font-bold">Home</h1>
          <p className="text-zinc-300 mt-2">Your content goes here.</p>
        </main>
      </div>
    </div>
  );
}
