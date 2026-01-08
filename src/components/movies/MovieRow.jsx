import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
            rating={movie.rating}
          />
        ))}
      </div>
    </section>
  );
}
