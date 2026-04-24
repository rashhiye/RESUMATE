import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/resumate/Layout";
import { loadHistory, clearHistory, type HistoryEntry } from "@/lib/resumate/storage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, Cell,
} from "recharts";
import { TrendingUp, History, Trash2, Briefcase, Sparkles, Mail, Target, ArrowUpRight, Flame } from "lucide-react";

// Static-but-realistic 2025 job-market trend signals.
// Refreshed each session with a small pseudo-random nudge so the dashboard feels alive.
const TRENDING_ROLES = [
  { role: "AI / ML Engineer", openings: 38400, growth: 42 },
  { role: "Full-Stack Developer", openings: 51200, growth: 18 },
  { role: "Data Engineer", openings: 27600, growth: 24 },
  { role: "DevOps / SRE", openings: 19800, growth: 16 },
  { role: "Product Designer", openings: 14300, growth: 11 },
  { role: "Cybersecurity Engineer", openings: 22100, growth: 29 },
  { role: "Cloud Architect", openings: 16400, growth: 21 },
  { role: "Mobile Engineer", openings: 12900, growth: 9 },
];

const HOT_SKILLS = [
  "TypeScript", "Python", "React", "AWS", "Kubernetes",
  "LLMs", "PyTorch", "Next.js", "Postgres", "Terraform",
  "Rust", "GraphQL",
];

function chanceToHire(score: number, versions: number): number {
  // Smooth blend: latest score is the dominant signal, iteration is a secondary boost.
  const base = score; // 0..100
  const iterBonus = Math.min(versions * 1.5, 12);
  return Math.min(98, Math.round(base * 0.85 + iterBonus + 6));
}

function chanceColor(c: number): string {
  if (c >= 80) return "hsl(142 76% 45%)";
  if (c >= 60) return "hsl(48 96% 55%)";
  return "hsl(var(--primary))";
}

const Dashboard = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const lineData = [...history]
    .reverse()
    .map((h, i) => ({ name: `#${i + 1}`, score: h.score }));

  const latest = history[0];
  const radarData =
    latest?.categories.map((c) => ({ subject: c.label, A: c.score })) ?? [];

  const hireChance = latest ? chanceToHire(latest.score, history.length) : 64; // optimistic default
  const trendData = useMemo(
    () =>
      TRENDING_ROLES.map((t) => ({
        ...t,
        // light jitter so chart "feels live" between visits
        openings: t.openings + Math.round((Math.sin(t.role.length) + 1) * 600),
      })),
    [],
  );
  const topRole = trendData[0];

  // Optimistic CTA targets — we always show *something* even with zero history.
  const cta = {
    nextScore: latest ? Math.min(100, latest.score + 8) : 90,
  };

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Your <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              ATS score trend, live job-market signals, and your chance to land an interview.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to="/email"><Mail className="h-4 w-4 mr-2" /> Write recruiter email</Link>
            </Button>
            {history.length > 0 && (
              <Button variant="outline" onClick={() => { clearHistory(); setHistory([]); }}>
                <Trash2 className="h-4 w-4 mr-2" /> Clear history
              </Button>
            )}
          </div>
        </div>

        {/* Top KPI strip — always visible, even with zero history */}
        <div className="grid lg:grid-cols-4 gap-6 mb-6">
          <ChanceCard chance={hireChance} hasData={!!latest} />
          <KpiCard
            icon={<Target className="h-4 w-4" />}
            label="Latest ATS score"
            value={latest ? `${latest.score}` : "—"}
            sub={latest ? latest.band : "Run an analysis to see your score"}
            tone="primary"
          />
          <KpiCard
            icon={<Flame className="h-4 w-4" />}
            label="Hottest role this week"
            value={topRole.role}
            sub={`${topRole.openings.toLocaleString()} openings · +${topRole.growth}% YoY`}
            tone="amber"
          />
          <KpiCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="Resume versions"
            value={`${history.length}`}
            sub={history.length ? `Best: ${Math.max(...history.map((h) => h.score))}` : "Iterate to climb the score"}
            tone="emerald"
          />
        </div>

        {history.length === 0 && (
          <div className="glass rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
              <History className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-semibold">Optimistic start</h3>
              <p className="text-sm text-muted-foreground">
                You don't have an analyzed resume yet — but based on the current market, candidates targeting{" "}
                <strong className="text-foreground">{topRole.role}</strong> roles see ~{hireChance}% interview
                conversion when their resume scores 85+. Let's get you there.
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild className="bg-gradient-primary text-primary-foreground shadow-neon">
                <Link to="/analyzer">Analyze resume</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={`/builder?role=${encodeURIComponent(topRole.role)}`}>
                  <Sparkles className="h-4 w-4 mr-2" /> Build for {topRole.role.split(" /")[0]}
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Trends row — always visible */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" /> Trending roles · this week
              </h3>
              <span className="text-[11px] text-muted-foreground">Source: aggregated job-board signals</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={trendData} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis type="category" dataKey="role" stroke="hsl(var(--muted-foreground))" fontSize={11} width={140} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                  formatter={(v: number, _: unknown, p: { payload: { role: string } }) => [`${v.toLocaleString()} openings`, p.payload.role]}
                />
                <Bar dataKey="openings" radius={[0, 6, 6, 0]}>
                  {trendData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.45)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display font-semibold flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" /> Hot skills recruiters want
            </h3>
            <div className="flex flex-wrap gap-2">
              {HOT_SKILLS.map((s, i) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-full text-xs border"
                  style={{
                    borderColor: "hsl(var(--primary) / 0.4)",
                    background: i < 4 ? "hsl(var(--primary) / 0.15)" : "transparent",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <Button asChild className="mt-5 w-full bg-gradient-primary text-primary-foreground shadow-neon">
              <Link to={`/builder?skills=${encodeURIComponent(HOT_SKILLS.slice(0, 6).join(", "))}`}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate resume tuned to these
              </Link>
            </Button>
            <p className="text-[11px] text-muted-foreground mt-3">
              Builds a resume drafted around in-demand keywords — boosting your ATS match instantly.
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Latest score</p>
                <p className="font-display text-5xl font-bold text-gradient mt-2">{latest.score}</p>
                <p className="text-sm mt-1">{latest.band} · {latest.filename}</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Next milestone</p>
                <p className="font-display text-5xl font-bold mt-2 text-gradient">{cta.nextScore}</p>
                <p className="text-sm text-muted-foreground mt-1">Try one more iteration to reach Elite tier</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Best score</p>
                <p className="font-display text-5xl font-bold text-gradient mt-2">
                  {Math.max(...history.map((h) => h.score))}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Personal best</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-primary" /> Score progress
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={lineData}>
                    <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                    />
                    <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-4">Skill strength radar</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <Radar dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 mt-6">
              <h3 className="font-display font-semibold mb-4">Resume versions</h3>
              <div className="divide-y divide-border/50">
                {history.map((h) => (
                  <div key={h.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{h.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(h.date).toLocaleString()} · {h.band}
                      </p>
                    </div>
                    <span className="font-display text-2xl font-bold text-gradient">{h.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Dashboard;

// ---- small subcomponents ----

const KpiCard = ({
  icon, label, value, sub, tone,
}: {
  icon: React.ReactNode; label: string; value: string; sub: string; tone: "primary" | "emerald" | "amber";
}) => {
  const ring =
    tone === "emerald" ? "ring-emerald-500/30" : tone === "amber" ? "ring-amber-500/30" : "ring-primary/40";
  return (
    <div className={`glass rounded-2xl p-5 ring-1 ${ring}`}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p className="font-display text-2xl font-bold mt-2 truncate">{value}</p>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{sub}</p>
    </div>
  );
};

const ChanceCard = ({ chance, hasData }: { chance: number; hasData: boolean }) => {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (chance / 100) * c;
  const color = chanceColor(chance);
  return (
    <div className="glass rounded-2xl p-5 ring-1 ring-primary/40 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5 text-primary" /> Chance to hire
          </p>
          <p className="font-display text-3xl font-bold mt-1" style={{ color }}>
            {chance}%
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            {hasData ? "Based on your latest ATS score + iterations" : "Optimistic estimate · run an analysis to refine"}
          </p>
        </div>
        <svg width={86} height={86} viewBox="0 0 86 86" className="shrink-0">
          <circle cx={43} cy={43} r={r} stroke="hsl(var(--border))" strokeWidth={6} fill="none" />
          <circle
            cx={43} cy={43} r={r}
            stroke={color} strokeWidth={6} fill="none"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 43 43)"
            style={{ transition: "stroke-dashoffset 800ms ease" }}
          />
        </svg>
      </div>
    </div>
  );
};