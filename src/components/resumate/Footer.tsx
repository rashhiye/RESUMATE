import { Link } from "react-router-dom";
import { Sparkles, Mail, Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold">
              Resu<span className="text-gradient">Mate</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">
            AI-powered ATS resume checker and builder. Beat the bots, get hired.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href="mailto:hello@resumate.app" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/analyzer" className="hover:text-primary">Analyzer</Link></li>
            <li><Link to="/builder" className="hover:text-primary">Builder</Link></li>
            <li><Link to="/templates" className="hover:text-primary">Templates</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><a href="/sitemap.xml" className="hover:text-primary">Sitemap</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ResuMate. We respect your data privacy.</p>
          <p>Built with care · ATS-friendly by design</p>
        </div>
      </div>
    </footer>
  );
};