import { useState } from "react";

import { Home, Star, Tv, Film, CreditCard, Compass, Plus } from "lucide-react";

const items = [
  { icon: Home, label: "Home" },
  { icon: Star, label: "Watchlist" },
  { icon: Tv, label: "Live TV" },
  { icon: Film, label: "Movies & Shows" },
  { icon: CreditCard, label: "Rentals" },
  { icon: Compass, label: "Discover" },
  { icon: Plus, label: "Your Media" },
];

export default function Sidebar({ isPinnedOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = isPinnedOpen || isHovered;

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={[
        "h-[calc(100vh-16px)] ml-2 mt-2", // matches your top padding vibe
        "rounded-md border border-zinc-800/80 bg-zinc-950/70 backdrop-blur",
        "transition-all duration-200 ease-out",
        isExpanded ? "w-56" : "w-16",
      ].join(" ")}>
      <nav className="p-2">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.label}>
              <button
                className={[
                  "w-full flex items-center gap-3",
                  "rounded-lg px-3 py-2",
                  "hover:bg-white/10 text-zinc-200",
                ].join(" ")}
                title={item.label}>
                {/* Icon */}
                <span className="w-6 flex items-center justify-center">
                  <item.icon size={20} strokeWidth={1.8} />
                </span>

                {/* Label (only show when expanded) */}
                <span
                  className={[
                    "whitespace-nowrap overflow-hidden transition-all duration-200",
                    isExpanded ? "opacity-100" : "opacity-0 w-0",
                  ].join(" ")}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
