export default function MovieCard({ title, poster, rating }) {
  return (
    <div className="w-40 flex-shrink-0 cursor-pointer group">
      <img
        src={poster}
        alt={title}
        className="rounded-lg transition-transform duration-300 group-hover:scale-105"
      />

      <div className="mt-2 text-sm">
        <p className="font-semibold truncate">{title}</p>
        <p className="text-zinc-400">⭐ {rating}</p>
      </div>
    </div>
  );
}
