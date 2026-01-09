import { useEffect, useState } from "react";
import TopBar from "./components/layout/TopBar.jsx";
import Sidebar from "./components/layout/SideBar.jsx";
import MovieRow from "./components/movies/MovieRow.jsx";
import MovieModal from "./components/movies/MovieModal.jsx";
import { tmdbFetch, tmdbImage, getMovieDetails } from "./library/tmdb.js";

// import { trendingMovies, sciFiMovies } from "./components/movies/movies.js";

export default function App() {
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const togglePinned = () => setIsPinnedOpen((p) => !p);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleSelectMovie(movie) {
    // show modal instantly with what we already have
    setSelectedMovie(movie);

    try {
      const details = await getMovieDetails(movie.id);

      // merge details into your existing movie shape
      setSelectedMovie((prev) => {
        if (!prev || String(prev.id) !== String(movie.id)) return prev;

        return {
          ...prev,
          runtime: details.runtime
            ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
            : null,
          genres: Array.isArray(details.genres)
            ? details.genres.map((g) => g.name)
            : [],
          // sometimes details has better images too:
          backdrop: tmdbImage(details.backdrop_path, "w1280") || prev.backdrop,
          poster: tmdbImage(details.poster_path, "w500") || prev.poster,
        };
      });
    } catch (err) {
      console.error(err);
      // optional: keep modal open even if details fail
    }
  }

  function adaptMovie(m) {
    return {
      id: String(m.id),
      title: m.title,
      poster: tmdbImage(m.poster_path, "w500"),
      backdrop: tmdbImage(m.backdrop_path, "w1280"),
      rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : null,
      year: m.release_date ? m.release_date.slice(0, 4) : null,
      description: m.overview,
    };
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const trending = await tmdbFetch("/trending/movie/week");
        const scifi = await tmdbFetch("/discover/movie", {
          with_genres: 878,
          sort_by: "popularity.desc",
        });

        if (cancelled) return;

        setTrendingMovies(trending.results.map(adaptMovie));
        setSciFiMovies(scifi.results.map(adaptMovie));
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="h-screen bg-zinc-900 text-white flex flex-col">
      {/* Top bar */}
      <TopBar onMenuClick={togglePinned} isPinnedOpen={isPinnedOpen} />

      {/* Body layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isPinnedOpen={isPinnedOpen} />

        {/* Your main page content */}
        <main className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-zinc-400">Loading movies…</div>
          ) : (
            <>
              <MovieRow
                title="Trending Now"
                movies={trendingMovies}
                onSelectMovie={handleSelectMovie}
              />
              <MovieRow
                title="Sci-Fi Picks"
                movies={sciFiMovies}
                onSelectMovie={handleSelectMovie}
              />
            </>
          )}
        </main>
      </div>
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
