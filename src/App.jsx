import { useState } from "react";
import TopBar from "./components/layout/TopBar";
import Sidebar from "./components/layout/SideBar";
import MovieRow from "./components/movies/MovieRow";
import { movies } from "./components/movies/movies";

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
        <main className="flex-1 p-4">
          <MovieRow title="Trending Now" movies={movies} />
          <MovieRow title="Sci-Fi Picks" movies={movies} />
        </main>
      </div>
    </div>
  );
}
