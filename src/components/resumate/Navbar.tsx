import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Sparkles, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/analyzer", label: "Analyzer" },
  { to: "/builder", label: "Builder" },
  { to: "/templates", label: "Templates" },
  { to: "/email", label: "Email" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/blog", label: "Blog" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.remove("light");
    else root.classList.add("light");
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <Sparkles className="relative h-6 w-6 text-primary" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Resu<span className="text-gradient">Mate</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <RouterNavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm rounded-md transition-colors relative",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-gradient-primary rounded-full" />
                  )}
                </>
              )}
            </RouterNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            asChild
            className="hidden md:inline-flex bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-neon"
          >
            <Link to="/analyzer">Analyze Free</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95">
          <nav className="container flex flex-col py-3 gap-1">
            {links.map((l) => (
              <RouterNavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm",
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
                  )
                }
              >
                {l.label}
              </RouterNavLink>
            ))}
            <Button asChild className="mt-2 bg-gradient-primary text-primary-foreground">
              <Link to="/analyzer">Analyze Free</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};