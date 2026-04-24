import { Link } from "react-router-dom";
import { Layout } from "@/components/resumate/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Sparkles, Target, FileSearch, Wand2, ShieldCheck,
  Zap, BarChart3, Trophy, Quote, Check
} from "lucide-react";

const features = [
  { icon: FileSearch, title: "ATS Score Analyzer", desc: "Upload PDF, DOCX, TXT or images and get an instant recruiter-grade score." },
  { icon: Wand2, title: "AI Auto-Fix", desc: "Detects weak verbs, passive voice, and missing metrics — and rewrites them." },
  { icon: Sparkles, title: "AI Resume Builder", desc: "Generate ATS-optimized resumes from your details or a job description." },
  { icon: Target, title: "Job Match Probability", desc: "See your true shortlisting chance against any job description." },
  { icon: BarChart3, title: "Progress Dashboard", desc: "Track every version and watch your score climb over time." },
  { icon: ShieldCheck, title: "Privacy First", desc: "Your file never leaves the browser unless you ask. Auto-delete on demand." },
];

const stats = [
  { v: "94%", l: "Avg. score lift" },
  { v: "12s", l: "Time to result" },
  { v: "30k+", l: "Resumes scored" },
  { v: "4.9★", l: "User rating" },
];

const testimonials = [
  { name: "Aryan Mehta", role: "SWE @ Series B startup", quote: "Went from 47 to 88. Got 3 interviews in a week." },
  { name: "Sara Kim", role: "Data Analyst", quote: "The auto-fix rewrote my bullets with metrics. Game changer." },
  { name: "Daniel R.", role: "PM, fintech", quote: "Best ATS tool I've tried. Feels like having a recruiter on call." },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-6 animate-fade-in">
            <Sparkles className="h-3 w-3 text-primary" />
            AI-powered ATS simulation · 100% private
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.05]">
            Beat the bots.{" "}
            <span className="text-gradient">Get the interview.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            ResuMate scans your resume like a real recruiter — scoring, fixing, and rebuilding it
            into an ATS-optimized weapon in under a minute.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-neon group">
              <Link to="/analyzer">
                Analyze My Resume
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/60">
              <Link to="/builder">Build New Resume</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.l} className="glass rounded-xl p-4">
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Everything you need to get <span className="text-gradient">shortlisted</span>
          </h2>
          <p className="text-muted-foreground mt-3">
            From parsing to scoring to rewriting — one tight workflow.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-xl p-6 glow-hover group">
              <div className="w-11 h-11 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              From upload to <span className="text-gradient">offer-ready</span> in 4 steps
            </h2>
            <ol className="mt-6 space-y-4">
              {["Upload your resume in any format",
                "Get an animated ATS score with breakdown",
                "Apply AI auto-fixes and add metrics",
                "Download an ATS-friendly PDF"].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-display font-bold">
                    {i + 1}
                  </div>
                  <div className="pt-1.5">{s}</div>
                </li>
              ))}
            </ol>
          </div>
          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">resume-final.pdf</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success border border-success/30">+41 pts</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="-rotate-90">
                    <circle cx="50" cy="50" r="42" stroke="hsl(var(--secondary))" strokeWidth="8" fill="none" />
                    <circle cx="50" cy="50" r="42" stroke="url(#hg)" strokeWidth="8" fill="none"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42 * (1 - 0.88)}
                      strokeLinecap="round" />
                    <defs>
                      <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-gradient">88</div>
                </div>
                <div className="space-y-2 flex-1">
                  {[["Keywords", 92], ["Skills", 88], ["Experience", 85], ["Format", 90]].map(([l, v]) => (
                    <div key={l as string}>
                      <div className="flex justify-between text-xs"><span>{l}</span><span>{v}</span></div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-gradient-primary" style={{ width: `${v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 p-3 rounded-lg bg-secondary/50 text-xs flex items-start gap-2">
                <Trophy className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <span>Strength badge: <strong className="text-gradient">Strong</strong> · Shortlisting probability: 84%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center">
          Loved by jobseekers worldwide
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-xl p-6">
              <Quote className="h-5 w-5 text-primary opacity-60" />
              <p className="text-sm mt-3 leading-relaxed">"{t.quote}"</p>
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="relative rounded-3xl glass p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-60" />
          <div className="relative">
            <Zap className="h-10 w-10 text-primary mx-auto" />
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
              Stop guessing. <span className="text-gradient">Start landing.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Run your resume through ResuMate's ATS engine. Free. No signup required.
            </p>
            <Button asChild size="lg" className="mt-8 bg-gradient-primary text-primary-foreground shadow-neon">
              <Link to="/analyzer">
                Get My Score <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <div className="mt-6 flex justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-success" /> No credit card</span>
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-success" /> Private by default</span>
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-success" /> Instant results</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
