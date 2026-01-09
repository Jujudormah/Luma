// src/lib/tmdb.js
const TMDB_BASE = "https://api.themoviedb.org/3";
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

export async function tmdbFetch(path, params = {}) {
  if (!READ_TOKEN) {
    throw new Error("Missing VITE_TMDB_READ_TOKEN.");
  }

  const url = new URL(TMDB_BASE + path);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${READ_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`TMDB ${res.status} ${res.statusText}: ${text}`);
  }

  return res.json();
}

export function tmdbImage(path, size = "w500") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function getMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`);
}
