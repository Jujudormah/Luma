export default function TopBar() {
  return (
    <div className="pt-2 px-2">
      <header
        className="h-13 w-full px-4 flex items-center justify-between gap-4
                         rounded-md bg-red-300/70 backdrop-blur border border-zinc-800/80
                         shadow-lg">
        {/* LEFT GROUP: menu + logo + search */}
        <div className="flex items-center gap-4">
          <button className="p-3 rounded-lg">☰</button>

          <span className="text-lg font-semibold">Luma</span>

          <div className="ml-2 w-90">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full px-4 py-2 rounded-full bg-zinc-800 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="ml-auto">
          <button className="text-sm font-medium hover:text-white">
            Sign In
          </button>
        </div>
      </header>
    </div>
  );
}
