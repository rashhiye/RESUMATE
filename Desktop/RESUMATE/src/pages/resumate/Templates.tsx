import { useRef, useState } from "react";
import { Layout } from "@/components/resumate/Layout";
import { ResumePreview, type TemplateId } from "@/components/resumate/ResumePreview";
import { TEMPLATES, DEFAULT_TEMPLATE_ID, TEMPLATE_CATEGORIES } from "@/lib/resumate/templates";
import { downloadResumePdf } from "@/lib/resumate/pdf";
import { Download, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const sampleData = {
  name: "Alex Doe",
  title: "Senior Frontend Engineer",
  email: "alex@example.com",
  phone: "+1 555 0100",
  location: "Remote",
  linkedin: "linkedin.com/in/alexdoe",
  github: "github.com/alexdoe",
  portfolio: "alexdoe.dev",
  summary:
    "Senior frontend engineer specializing in React, TypeScript, and design systems. 6+ years shipping high-impact products.",
  skills: ["React", "TypeScript", "Next.js", "Tailwind", "GraphQL", "Node.js"],
  experience: [
    {
      role: "Senior Frontend Engineer",
      company: "Acme",
      period: "2022 — Now",
      bullets: [
        "Led migration to App Router, +22% SEO traffic.",
        "Built shared design system used by 12 teams.",
      ],
    },
  ],
  education: [{ degree: "B.S. Computer Science", school: "State University", period: "2015 — 2019" }],
};

const Templates = () => {
  const [activeId, setActiveId] = useState<TemplateId>(DEFAULT_TEMPLATE_ID);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (id: TemplateId, name: string) => {
    setActiveId(id);
    setDownloadingId(id);
    // wait a tick so the hidden full-size preview re-renders with this template
    await new Promise((r) => setTimeout(r, 80));
    try {
      if (!hiddenRef.current) throw new Error("preview not ready");
      await downloadResumePdf(hiddenRef.current, `${id}_resume.pdf`);
      toast({ title: `Downloaded · ${name}`, description: "ATS-friendly PDF saved." });
    } catch {
      toast({ title: "Export failed", variant: "destructive" });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            32 ATS-Friendly <span className="text-gradient">Templates</span>
          </h1>
          <p className="text-muted-foreground mt-3">
            Every template scores <strong className="text-foreground">90+ on ATS</strong>. Preview them all at once.
            Click any preview to download instantly — no extra screens.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full glass text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            100% ATS-parseable · Score 95+ guaranteed
          </div>
        </div>

        {TEMPLATE_CATEGORIES.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-primary rounded-full" />
              {cat}
              <span className="text-xs text-muted-foreground font-normal">
                · {TEMPLATES.filter((t) => t.category === cat).length} designs
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {TEMPLATES.filter((t) => t.category === cat).map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleDownload(t.id, t.name)}
                  disabled={downloadingId !== null}
                  aria-label={`Download ${t.name}`}
                  className={cn(
                    "group relative block w-full text-left transition-transform",
                    "hover:-translate-y-1 focus:outline-none",
                    downloadingId !== null && downloadingId !== t.id && "opacity-50",
                  )}
                >
                  {/* Direct, full-bleed preview of the actual template — name is inside the resume itself */}
                  <div
                    className={cn(
                      "relative w-full aspect-[3/4] overflow-hidden bg-white rounded-md",
                      "shadow-[0_4px_24px_-6px_rgba(0,0,0,0.6)] ring-1 ring-white/10",
                      "group-hover:ring-2 group-hover:ring-primary/70 transition-all",
                      activeId === t.id && "ring-2 ring-primary/80",
                    )}
                  >
                    <div
                      className="absolute top-0 left-0 origin-top-left pointer-events-none"
                      style={{ transform: "scale(0.32)", width: 820, height: 1100 }}
                    >
                      <ResumePreview data={sampleData} template={t.id} />
                    </div>

                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-semibold shadow">
                      <ShieldCheck className="h-3 w-3" />
                      ATS 95+
                    </div>

                    {/* Template name printed onto the template itself (bottom corner) */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-medium text-neutral-700 pointer-events-none">
                      <span className="px-1.5 py-0.5 rounded bg-white/85 backdrop-blur-sm shadow-sm">
                        {t.name}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: t.accent }}
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-neon">
                        {downloadingId === t.id ? (
                          <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating…</>
                        ) : (
                          <><Download className="h-3.5 w-3.5" /> Download PDF</>
                        )}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Off-screen full-size preview used for PDF capture from card clicks */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            left: -10000,
            top: 0,
            width: 820,
            pointerEvents: "none",
          }}
        >
          <ResumePreview ref={hiddenRef} data={sampleData} template={activeId} />
        </div>
      </section>
    </Layout>
  );
};

export default Templates;
