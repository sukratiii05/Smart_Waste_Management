import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/upload", label: "Upload" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label="EcoTrack home"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-xl gradient-eco shadow-glow">
            <Leaf className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.4} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Eco<span className="text-primary">Track</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1 shadow-soft">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: true }}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground data-[status=active]:shadow-soft"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
            </span>
            Live
          </span>
        </div>
      </nav>
    </header>
  );
}
