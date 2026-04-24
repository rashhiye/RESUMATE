import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/resumate/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResumePreview, type ResumeData, type TemplateId } from "@/components/resumate/ResumePreview";
import { TEMPLATES, DEFAULT_TEMPLATE_ID, TEMPLATE_CATEGORIES } from "@/lib/resumate/templates";
import { downloadResumePdf } from "@/lib/resumate/pdf";
import { Download, Sparkles, Wand2, Check, Github, Linkedin, Globe, Twitter } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const sample: ResumeData = {
  name: "Alex Doe",
  title: "Senior Frontend Engineer",
  email: "alex@example.com",
  phone: "+1 555 0100",
  location: "Remote · USA",
  linkedin: "linkedin.com/in/alexdoe",
  github: "github.com/alexdoe",
  portfolio: "alexdoe.dev",
  summary:
    "Frontend engineer with 6+ years building performant, accessible React apps used by millions. Passionate about design systems, TypeScript, and shipping fast.",
  skills: ["React", "TypeScript", "Next.js", "Tailwind", "Node.js", "GraphQL", "Jest", "AWS"],
  experience: [
    {
      role: "Senior Frontend Engineer",
      company: "Acme Corp",
      period: "2022 — Present",
      bullets: [
        "Led migration to Next.js App Router, cutting LCP by 38% and lifting SEO traffic 22%.",
        "Built design system used across 12 product teams, reducing UI bug rate by 40%.",
      ],
    },
    {
      role: "Frontend Engineer",
      company: "Globex",
      period: "2019 — 2022",
      bullets: [
        "Shipped 30+ features across web and mobile, serving 2M+ MAU.",
        "Improved checkout conversion by 15% via A/B-tested redesign.",
      ],
    },
  ],
  education: [{ degree: "B.S. Computer Science", school: "State University", period: "2015 — 2019" }],
  projects: [{ name: "OpenChart", description: "Open-source charting library, 2k★ on GitHub." }],
};

const Builder = () => {
  const [data, setData] = useState<ResumeData>(sample);
  const [template, setTemplate] = useState<TemplateId>(DEFAULT_TEMPLATE_ID);
  const [generating, setGenerating] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  // AI form state
  const [aiForm, setAiForm] = useState({
    name: "",
    role: "",
    yearsExp: "",
    skills: "",
    education: "",
    experience: "",
    achievements: "",
    projects: "",
  });

  // Prefill from Dashboard CTAs (e.g. /builder?role=AI%20Engineer&skills=...)
  useEffect(() => {
    const role = searchParams.get("role");
    const skills = searchParams.get("skills");
    if (role || skills) {
      setAiForm((f) => ({
        ...f,
        role: role ?? f.role,
        skills: skills ?? f.skills,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    try {
      await downloadResumePdf(previewRef.current, `${data.name.replace(/\s+/g, "_") || "resume"}.pdf`);
      toast({ title: "Downloaded", description: "Your ATS-ready PDF is saved." });
    } catch (e) {
      toast({ title: "Export failed", description: "Try again or switch template.", variant: "destructive" });
    }
  };

  const generateFromDetails = () => {
    const { name, role, yearsExp, skills, education, experience, achievements, projects } = aiForm;
    if (!name.trim() || !role.trim() || !skills.trim()) {
      toast({
        title: "Fill key details",
        description: "Name, target role, and skills are required.",
        variant: "destructive",
      });
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);
      const years = yearsExp.trim() === "" ? -1 : Math.max(0, parseInt(yearsExp) || 0);
      const generated = buildRealisticResume({
        name: name.trim(),
        role: role.trim(),
        years,
        skills: skillList,
        education,
        experience,
        achievements,
        projects,
        prev: data,
      });
      setData(generated);
      setGenerating(false);
      setShowGallery(true);
      toast({
        title: "Resume generated",
        description: "Pick any of the 32 templates below and download.",
      });
      setTimeout(() => {
        document.getElementById("template-gallery")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 1000);
  };

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            AI <span className="text-gradient">Resume Builder</span>
          </h1>
          <p className="text-muted-foreground mt-3">
            Fill the form, pick from 32 ATS-friendly templates, download as PDF.
          </p>
        </div>

        <div className="grid xl:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-5">
            <div className="glass rounded-2xl p-6">
              <Tabs defaultValue="basics">
                <TabsList className="bg-secondary/50 flex-wrap h-auto">
                  <TabsTrigger value="basics">Basics</TabsTrigger>
                  <TabsTrigger value="socials">Socials</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="ai">AI Generate</TabsTrigger>
                </TabsList>

                <TabsContent value="basics" className="mt-5 grid sm:grid-cols-2 gap-3">
                  <Field label="Name" value={data.name} onChange={(v) => update("name", v)} />
                  <Field label="Title" value={data.title} onChange={(v) => update("title", v)} />
                  <Field label="Email" value={data.email} onChange={(v) => update("email", v)} />
                  <Field label="Phone" value={data.phone} onChange={(v) => update("phone", v)} />
                  <Field label="Location" value={data.location ?? ""} onChange={(v) => update("location", v)} />
                  <div className="sm:col-span-2">
                    <Label className="mb-1.5 block">Summary</Label>
                    <Textarea rows={3} value={data.summary} onChange={(e) => update("summary", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="mb-1.5 block">Skills (comma separated)</Label>
                    <Input
                      value={data.skills.join(", ")}
                      onChange={(e) => update("skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="socials" className="mt-5 space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Add the social links you want shown on your resume. All ATS-safe.
                  </p>
                  <SocialField
                    icon={<Linkedin className="h-4 w-4" />}
                    label="LinkedIn"
                    placeholder="linkedin.com/in/yourname"
                    value={data.linkedin ?? ""}
                    onChange={(v) => update("linkedin", v)}
                  />
                  <SocialField
                    icon={<Github className="h-4 w-4" />}
                    label="GitHub"
                    placeholder="github.com/yourname"
                    value={data.github ?? ""}
                    onChange={(v) => update("github", v)}
                  />
                  <SocialField
                    icon={<Globe className="h-4 w-4" />}
                    label="Portfolio / Website"
                    placeholder="yourname.dev"
                    value={data.portfolio ?? ""}
                    onChange={(v) => update("portfolio", v)}
                  />
                  <SocialField
                    icon={<Twitter className="h-4 w-4" />}
                    label="Twitter / X"
                    placeholder="@yourhandle"
                    value={data.twitter ?? ""}
                    onChange={(v) => update("twitter", v)}
                  />
                </TabsContent>

                <TabsContent value="experience" className="mt-5 space-y-4">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="p-4 rounded-lg bg-secondary/40 space-y-2">
                      <div className="grid sm:grid-cols-3 gap-2">
                        <Input placeholder="Role" value={exp.role}
                          onChange={(e) => mutateExp(setData, i, "role", e.target.value)} />
                        <Input placeholder="Company" value={exp.company}
                          onChange={(e) => mutateExp(setData, i, "company", e.target.value)} />
                        <Input placeholder="Period" value={exp.period}
                          onChange={(e) => mutateExp(setData, i, "period", e.target.value)} />
                      </div>
                      <Textarea
                        rows={3}
                        placeholder="Bullets, one per line"
                        value={exp.bullets.join("\n")}
                        onChange={(e) =>
                          mutateExp(setData, i, "bullets", e.target.value.split("\n").filter(Boolean))
                        }
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        experience: [...d.experience, { role: "", company: "", period: "", bullets: [] }],
                      }))
                    }
                  >
                    + Add experience
                  </Button>
                </TabsContent>

                <TabsContent value="education" className="mt-5 space-y-3">
                  {data.education.map((ed, i) => (
                    <div key={i} className="grid sm:grid-cols-3 gap-2">
                      <Input placeholder="Degree" value={ed.degree}
                        onChange={(e) => mutateEdu(setData, i, "degree", e.target.value)} />
                      <Input placeholder="School" value={ed.school}
                        onChange={(e) => mutateEdu(setData, i, "school", e.target.value)} />
                      <Input placeholder="Period" value={ed.period}
                        onChange={(e) => mutateEdu(setData, i, "period", e.target.value)} />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        education: [...d.education, { degree: "", school: "", period: "" }],
                      }))
                    }
                  >
                    + Add education
                  </Button>
                </TabsContent>

                <TabsContent value="ai" className="mt-5 space-y-3">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/30 text-xs">
                    <p className="font-semibold mb-1 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      Give us your details — we'll build the full resume
                    </p>
                    <p className="text-muted-foreground">
                      Fill in what you have. We'll structure it, write strong bullets, and show all 32 templates so you can pick & download.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="mb-1.5 block">Full Name *</Label>
                      <Input value={aiForm.name} onChange={(e) => setAiForm({ ...aiForm, name: e.target.value })} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Target Role *</Label>
                      <Input value={aiForm.role} onChange={(e) => setAiForm({ ...aiForm, role: e.target.value })} placeholder="Senior Product Designer" />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Years of Experience</Label>
                    <Input
                      value={aiForm.yearsExp}
                      onChange={(e) => setAiForm({ ...aiForm, yearsExp: e.target.value })}
                      placeholder="0 if you're a fresher"
                    />
                    </div>
                    <div>
                      <Label className="mb-1.5 block">Skills (comma separated) *</Label>
                      <Input value={aiForm.skills} onChange={(e) => setAiForm({ ...aiForm, skills: e.target.value })} placeholder="Figma, Design Systems, UX Research" />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Education</Label>
                    <Textarea
                      rows={2}
                      value={aiForm.education}
                      onChange={(e) => setAiForm({ ...aiForm, education: e.target.value })}
                      placeholder={"B.S. Design | NYU | 2018 — 2022\nM.A. HCI | CMU | 2022 — 2024"}
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Experience</Label>
                    <Textarea
                      rows={5}
                      value={aiForm.experience}
                      onChange={(e) => setAiForm({ ...aiForm, experience: e.target.value })}
                      placeholder={"Leave empty if you have no experience.\n\nExample:\nSenior Designer @ Acme | 2022 — Present\n- Led redesign of checkout, boosting conversion 18%\n- Built design system used by 8 teams"}
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Projects (recommended for freshers)</Label>
                    <Textarea
                      rows={4}
                      value={aiForm.projects}
                      onChange={(e) => setAiForm({ ...aiForm, projects: e.target.value })}
                      placeholder={"Portfolio Website | personal site built with React + Tailwind\nWeather App | live weather dashboard using OpenWeather API\nResuMate Clone | college project, ATS-style resume scanner"}
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Key Achievements (optional)</Label>
                    <Textarea
                      rows={3}
                      value={aiForm.achievements}
                      onChange={(e) => setAiForm({ ...aiForm, achievements: e.target.value })}
                      placeholder={"Reduced page load time by 40%\nLed team of 6 engineers"}
                    />
                  </div>
                  <Button onClick={generateFromDetails} disabled={generating} className="w-full bg-gradient-primary text-primary-foreground shadow-neon">
                    <Wand2 className="h-4 w-4 mr-2" />
                    {generating ? "Generating Resume…" : "Generate Resume & Show All Templates"}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>

            <div className="glass rounded-2xl p-5 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  Template: <strong>{TEMPLATES.find((t) => t.id === template)?.name ?? template}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" onClick={() => setShowGallery((v) => !v)}>
                  {showGallery ? "Hide" : "Browse"} 32 templates
                </Button>
                <Button onClick={handleDownload} className="bg-gradient-primary text-primary-foreground shadow-neon">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="glass rounded-2xl p-5 overflow-auto max-h-[1200px]">
            <p className="text-xs text-muted-foreground mb-3">
              Live preview · {TEMPLATES.find((t) => t.id === template)?.name ?? template}
            </p>
            <div className="flex justify-center">
              <ResumePreview ref={previewRef} data={data} template={template} />
            </div>
          </div>
        </div>

        {/* Template gallery */}
        {showGallery && (
          <div id="template-gallery" className="mt-12 animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Choose your <span className="text-gradient">template</span>
              </h2>
              <p className="text-muted-foreground mt-2">
                32 ATS-friendly designs · click any to apply, then download.
              </p>
            </div>
            {TEMPLATE_CATEGORIES.map((cat) => (
              <div key={cat} className="mb-10">
                <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-primary rounded-full" />
                  {cat}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {TEMPLATES.filter((t) => t.category === cat).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTemplate(t.id);
                        toast({ title: "Template applied", description: t.name });
                        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={cn(
                        "text-left glass rounded-xl p-4 transition-all glow-hover relative",
                        template === t.id && "shadow-neon ring-1 ring-primary/60",
                      )}
                    >
                      <div
                        className="w-full h-24 rounded-md mb-3 flex items-center justify-center text-[10px] font-mono"
                        style={{ background: t.accent + "22", color: t.accent, border: `1px solid ${t.accent}55` }}
                      >
                        {t.layout.toUpperCase()} · {t.category.toUpperCase()}
                      </div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{t.name}</h4>
                        {template === t.id && (
                          <span className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center">
              <Button onClick={handleDownload} size="lg" className="bg-gradient-primary text-primary-foreground shadow-neon">
                <Download className="h-4 w-4 mr-2" />
                Download Selected Template (PDF)
              </Button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <Label className="mb-1.5 block">{label}</Label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const SocialField = ({
  icon, label, placeholder, value, onChange,
}: {
  icon: React.ReactNode; label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) => (
  <div>
    <Label className="mb-1.5 flex items-center gap-1.5 text-sm">
      <span className="text-primary">{icon}</span>
      {label}
    </Label>
    <Input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

function mutateExp(setData: React.Dispatch<React.SetStateAction<ResumeData>>, i: number, key: string, value: unknown) {
  setData((d: ResumeData) => ({
    ...d,
    experience: d.experience.map((e, idx) => (idx === i ? { ...e, [key]: value } : e)),
  }));
}
function mutateEdu(setData: React.Dispatch<React.SetStateAction<ResumeData>>, i: number, key: string, value: unknown) {
  setData((d: ResumeData) => ({
    ...d,
    education: d.education.map((e, idx) => (idx === i ? { ...e, [key]: value } : e)),
  }));
}

export default Builder;

// ---------------- Realistic resume generator ----------------
// Heuristic, role-aware bullets so generated resumes feel hand-written, not boilerplate.

const ROLE_LIBRARY: Array<{ match: RegExp; verbs: string[]; metrics: string[]; objects: string[] }> = [
  {
    match: /(front[-\s]?end|react|ui|web)/i,
    verbs: ["Architected", "Shipped", "Refactored", "Optimized", "Led migration of"],
    metrics: ["reducing bundle size by 38%", "lifting Lighthouse from 64 → 96", "cutting LCP by 1.8s", "increasing conversion by 17%"],
    objects: ["component library", "design system", "checkout flow", "marketing site", "auth experience", "dashboard"],
  },
  {
    match: /(back[-\s]?end|node|api|java|python|go|rust|server)/i,
    verbs: ["Designed", "Implemented", "Scaled", "Hardened", "Migrated"],
    metrics: ["serving 12k req/s at p99 < 80ms", "reducing infra cost by 31%", "cutting incident MTTR by 45%", "supporting 4× user growth"],
    objects: ["payments service", "ingestion pipeline", "auth platform", "search index", "billing API", "background-job system"],
  },
  {
    match: /(data|ml|ai|analyt|scien)/i,
    verbs: ["Built", "Deployed", "Productionized", "Owned", "Trained"],
    metrics: ["raising model F1 from 0.71 → 0.86", "saving the team 18 hrs/week", "lifting retention 9pp", "reducing churn by 12%"],
    objects: ["recommendation model", "forecasting pipeline", "feature store", "experimentation framework", "LLM eval harness"],
  },
  {
    match: /(design|ux|ui\/ux|product designer)/i,
    verbs: ["Led", "Redesigned", "Researched", "Prototyped", "Drove"],
    metrics: ["lifting activation by 23%", "shortening time-to-value by 41%", "raising NPS from 28 → 47", "reducing support tickets 35%"],
    objects: ["onboarding flow", "pricing page", "mobile checkout", "design system", "search UX"],
  },
  {
    match: /(product manager|pm|product owner)/i,
    verbs: ["Owned", "Launched", "Defined", "Aligned", "Drove"],
    metrics: ["growing MAU 2.4×", "exceeding OKRs by 28%", "unblocking $1.2M ARR", "shipping 14 launches in 2 quarters"],
    objects: ["growth roadmap", "pricing experiment", "B2B onboarding", "API platform", "self-serve funnel"],
  },
  {
    match: /(devops|sre|infra|cloud|platform)/i,
    verbs: ["Automated", "Standardized", "Migrated", "Hardened", "Built"],
    metrics: ["cutting deploy time from 22m → 90s", "reducing on-call pages 60%", "saving $48k/yr in cloud spend", "achieving 99.99% uptime"],
    objects: ["CI/CD pipeline", "Kubernetes platform", "observability stack", "Terraform modules", "secrets management"],
  },
  {
    match: /(market|growth|seo|content)/i,
    verbs: ["Launched", "Scaled", "A/B-tested", "Owned", "Grew"],
    metrics: ["growing organic traffic 3.1×", "lifting CTR by 42%", "driving $640k pipeline", "improving email open-rate 18 → 31%"],
    objects: ["lifecycle program", "SEO content engine", "paid acquisition", "webinar series", "brand campaign"],
  },
];

const DEFAULT_LIB = ROLE_LIBRARY[0];

const pickLib = (role: string) => ROLE_LIBRARY.find((r) => r.match.test(role)) ?? DEFAULT_LIB;

const pick = <T,>(arr: T[], i: number) => arr[i % arr.length];

function craftBullets(role: string, skills: string[], achievements: string[], count = 3): string[] {
  const lib = pickLib(role);
  const skill = skills[0] || "modern tooling";
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(`${pick(lib.verbs, i)} ${pick(lib.objects, i)} using ${skills[i % Math.max(skills.length, 1)] || skill}, ${pick(lib.metrics, i)}.`);
  }
  // If user supplied real achievements, prepend them so they take priority
  return [...achievements.slice(0, 2), ...out].slice(0, Math.max(count, achievements.length));
}

function craftSummary(role: string, years: number, skills: string[]): string {
  const lib = pickLib(role);
  const top = skills.slice(0, 4).join(", ") || "modern tooling";
  // Fresher / entry-level — no fabricated years
  if (years <= 0) {
    const obj1 = pick(lib.objects, 0);
    const obj2 = pick(lib.objects, 1);
    return `Aspiring ${role} with hands-on project experience building ${obj1}s and ${obj2}s. Comfortable with ${top}. Fast learner who ships clean, well-tested code and is eager to contribute to a real-world team and grow into a senior ${role.toLowerCase()}.`;
  }
  // Mid / senior
  const verb = pick(lib.verbs, 0).toLowerCase();
  const obj1 = pick(lib.objects, 0);
  const obj2 = pick(lib.objects, 1);
  const metric = pick(lib.metrics, 0);
  return `${role} with ${years}+ years ${verb} ${obj1}s and ${obj2}s in production. Day-to-day stack: ${top}. Recent impact includes ${metric} and partnering tightly with design, product, and infra to ship measurable outcomes.`;
}

function buildRealisticResume(input: {
  name: string;
  role: string;
  years: number;
  skills: string[];
  education: string;
  experience: string;
  achievements: string;
  projects: string;
  prev: ResumeData;
}): ResumeData {
  const { name, role, years, skills, education, experience, achievements, projects, prev } = input;

  const achievementLines = achievements.split(/\n+/).map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);

  const expBlocks = experience.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const isFresher = years <= 0 && expBlocks.length === 0;
  const builtExperience: ResumeData["experience"] = expBlocks.length
    ? expBlocks.map((block) => {
        const [first, ...rest] = block.split("\n");
        const [roleCo, period] = first.split("|").map((s) => s?.trim() ?? "");
        const [r, c] = roleCo.split("@").map((s) => s?.trim() ?? "");
        const userBullets = rest.map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
        return {
          role: r || role,
          company: c || "Company",
          period: period || "Present",
          bullets: userBullets.length ? userBullets : craftBullets(r || role, skills, achievementLines, 3),
        };
      })
    : isFresher
    ? [] // No experience for freshers — do NOT fabricate jobs
    : (() => {
        // No experience supplied — synthesize a believable career arc from years
        const now = new Date().getFullYear();
        const splits = years >= 6 ? [Math.floor(years / 2), years - Math.floor(years / 2)] : [years];
        const titles = years >= 6 ? [`Senior ${role}`, role] : [role];
        let cursor = now;
        return splits.map((span, idx) => {
          const end = cursor;
          const start = cursor - span;
          cursor = start;
          return {
            role: titles[idx] || role,
            company: idx === 0 ? "Recent Company" : "Previous Company",
            period: idx === 0 ? `${start} — Present` : `${start} — ${end}`,
            bullets: craftBullets(titles[idx] || role, skills, idx === 0 ? achievementLines : [], 3),
          };
        });
      })();

  const eduBlocks = education.split(/\n+/).map((b) => b.trim()).filter(Boolean);
  const builtEducation: ResumeData["education"] = eduBlocks.length
    ? eduBlocks.map((line) => {
        const [degree, school, period] = line.split("|").map((s) => s?.trim() ?? "");
        return { degree: degree || "Degree", school: school || "University", period: period || "" };
      })
    : [{ degree: "Bachelor's Degree", school: "University", period: "" }];

  // Projects — user-provided take priority. For freshers we add 2 starter projects
  // tied to their target role/skills so the resume isn't empty.
  const projectLines = projects.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const userProjects: ResumeData["projects"] = projectLines.map((line) => {
    const [name, ...descParts] = line.split("|");
    return { name: (name ?? "").trim() || "Project", description: descParts.join("|").trim() };
  });
  const lib = pickLib(role);
  const fallbackProjects: ResumeData["projects"] = isFresher
    ? [
        { name: `${pick(lib.objects, 0)} (personal project)`, description: `Built a ${pick(lib.objects, 0)} using ${skills[0] || "core tools"} — ${pick(lib.metrics, 0)}.` },
        { name: `${pick(lib.objects, 1)} (college project)`, description: `Designed and shipped a ${pick(lib.objects, 1)} with ${skills[1] || skills[0] || "modern tooling"}.` },
      ]
    : [];
  const builtProjects = userProjects.length ? userProjects : (isFresher ? fallbackProjects : prev.projects);

  return {
    name,
    title: role,
    email: prev.email || "you@email.com",
    phone: prev.phone || "",
    location: prev.location || "",
    linkedin: prev.linkedin || "",
    github: prev.github || "",
    portfolio: prev.portfolio || "",
    twitter: prev.twitter || "",
    summary: craftSummary(role, years, skills),
    skills,
    experience: builtExperience,
    education: builtEducation,
    projects: builtProjects,
  };
}
