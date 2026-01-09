import { useState } from "react";
import TopBar from "./components/layout/TopBar.jsx";
import Sidebar from "./components/layout/SideBar.jsx";
import MovieRow from "./components/movies/MovieRow.jsx";
import MovieModal from "./components/movies/MovieModal.jsx";
import { trendingMovies, sciFiMovies } from "./components/movies/movies.js";

export default function App() {
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const togglePinned = () => setIsPinnedOpen((p) => !p);

  return (
    <div className="h-screen bg-zinc-900 text-white flex flex-col">
      {/* Top bar */}
      <TopBar onMenuClick={togglePinned} isPinnedOpen={isPinnedOpen} />

      {/* Body layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isPinnedOpen={isPinnedOpen} />

        {/* Your main page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <MovieRow
            title="Trending Now"
            movies={trendingMovies}
            onSelectMovie={setSelectedMovie}
          />
          <MovieRow
            title="Sci-Fi Picks"
            movies={sciFiMovies}
            onSelectMovie={setSelectedMovie}
          />
        </main>
      </div>
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
