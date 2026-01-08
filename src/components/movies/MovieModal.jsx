export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const {
    title,
    rating,
    description,
    backdrop,
    poster,
    year,
    runtime,
    genres = [],
  } = movie;

  const bg = backdrop || poster;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Background image (cannot steal clicks) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src={bg} alt={title} className="h-full w-full object-cover" />

        {/* Cineby/Netflix style gradients */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Top-left back button */}
      <button
        onClick={onClose}
        className="absolute left-6 top-6 z-20 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70"
        aria-label="Go back">
        ←
      </button>

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        <div className="flex h-full items-end md:items-center">
          <div className="w-full max-w-2xl px-6 pb-10 md:pb-0 md:px-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
              {year && <span>{year}</span>}
              {runtime && <span>• {runtime}</span>}
              {rating != null && (
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {rating}
                </span>
              )}
            </div>

            {genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {genres.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-100">
                    {g}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-5 text-sm md:text-base leading-relaxed text-zinc-100/90">
              {description ?? "No description yet."}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button className="rounded-lg bg-white px-5 py-2 font-semibold text-zinc-900 hover:bg-zinc-200">
                ▶ Play
              </button>
              <button className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/15">
                + Watchlist
              </button>
              <button className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/15">
                Similars
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
