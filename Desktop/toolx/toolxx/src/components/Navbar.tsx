import { Link } from "react-router-dom";
import { Wrench, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface NavbarProps {
  showSidebarTrigger?: boolean;
}

const Navbar = ({ showSidebarTrigger }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showSidebarTrigger && (
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          )}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center neon-glow">
              <Wrench className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Tool<span className="gradient-text">X</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/tools/word-counter" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Tools
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
