import { Link } from "react-router-dom";
import { categories, allTools } from "@/lib/tools";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe, Lock, Star, CheckCircle } from "lucide-react";

const stats = [
  { value: `${allTools.length}+`, label: "Free Tools" },
  { value: "100%", label: "Free to Use" },
  { value: "∞", label: "No Usage Limits" },
];

const features = [
  { icon: Zap, title: "Lightning Fast", description: "All tools run directly in your browser. No uploads to external servers, no waiting." },
  { icon: Shield, title: "100% Private & Secure", description: "Your files never leave your device. Everything is processed locally with zero data collection." },
  { icon: Globe, title: "Works Everywhere", description: "No installation needed. Works on any device with a modern browser — desktop, tablet, or mobile." },
  { icon: Lock, title: "No Sign-Up Required", description: "Jump straight into using any tool. No accounts, no emails, no nonsense." },
  { icon: Star, title: "Professional Quality", description: "Enterprise-grade tools built for professionals, designers, developers, and creators." },
  { icon: CheckCircle, title: "Always Up-to-Date", description: "We continuously add new tools and improve existing ones. Your feedback shapes what comes next." },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col items-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-purple/8 blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-blue/8 blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-neon-cyan/5 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-sm text-muted-foreground">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>100% Free • No Sign-Up • No Limits</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
            Tool<span className="gradient-text">X</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-4 max-w-2xl mx-auto">
            All Your Tools. One Place.
          </p>
          <p className="text-base md:text-lg text-muted-foreground/70 mb-10 max-w-xl mx-auto leading-relaxed">
            The ultimate free toolkit for creators, developers & professionals. 
            PDF editing, image processing, text utilities, secure sharing — all running 
            privately in your browser.
          </p>
          <Link to="/tools/word-counter">
            <Button size="lg" className="gradient-primary text-primary-foreground px-8 py-6 text-lg neon-glow hover:scale-105 transition-transform">
              Try Tools Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-glass-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose Tool<span className="gradient-text">X</span>?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Built with privacy, speed, and simplicity at its core.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-xl p-6 hover:bg-glass-hover transition-all duration-300">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4 neon-glow">
                  <f.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-20 border-t border-glass-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore All Tools</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{allTools.length} powerful tools organized into {categories.length} categories — and growing.</p>
          </div>
          <div className="grid gap-12">
            {categories.map((cat, ci) => {
              const CatIcon = cat.icon;
              return (
                <div key={cat.id} className="animate-fade-in" style={{ animationDelay: `${ci * 80}ms` }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                      <CatIcon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{cat.name}</h3>
                      <p className="text-sm text-muted-foreground">{cat.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {cat.tools.map((tool) => {
                      const ToolIcon = tool.icon;
                      return (
                        <Link key={tool.id} to={tool.path} className="tool-card group flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                            <ToolIcon className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold mb-0.5 truncate">{tool.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
