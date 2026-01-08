import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies, onSelectMovie }) {
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Row wrapper to enable edge fades */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-zinc-900 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-zinc-900 to-transparent" />

        {/* Scroll Container */}
        <div
          onWheel={handleWheel}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pr-12"
          style={{ overscrollBehaviorX: "contain" }}>
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start">
              <MovieCard
                title={movie.title}
                poster={movie.poster}
                rating={movie.rating}
                onSelect={() => onSelectMovie(movie)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
