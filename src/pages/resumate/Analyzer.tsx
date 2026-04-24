import { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/resumate/Layout";
import { UploadBox } from "@/components/resumate/UploadBox";
import { AtsScoreRing } from "@/components/resumate/AtsScoreRing";
import { ScoreBreakdown } from "@/components/resumate/ScoreBreakdown";
import { KeywordChips } from "@/components/resumate/KeywordChips";
import { ScanningOverlay } from "@/components/resumate/ScanningOverlay";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { analyzeResume, autoFixText, jobMatchProbability, type AtsAnalysis } from "@/lib/resumate/scoring";
import type { ParsedResume } from "@/lib/resumate/parser";
import { saveHistory } from "@/lib/resumate/storage";
import { Award, Wand2, Target, AlertTriangle, FileText, Flame, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Analyzer = () => {
  const [parsed, setParsed] = useState<ParsedResume | null>(null);
  const [filename, setFilename] = useState("");
  const [jd, setJd] = useState("");
  const [analysis, setAnalysis] = useState<AtsAnalysis | null>(null);
  const [scanning, setScanning] = useState(false);
  const [fixedText, setFixedText] = useState<string | null>(null);
  const [roast, setRoast] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analysis && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);

  const handleParsed = (p: ParsedResume, file: File) => {
    setParsed(p);
    setFilename(file.name);
    runAnalysis(p, jd);
  };

  const runAnalysis = (p: ParsedResume, j: string) => {
    setScanning(true);
    setAnalysis(null);
    setTimeout(() => {
      const a = analyzeResume(p, j);
      setAnalysis(a);
      setScanning(false);
      saveHistory({
        id: crypto.randomUUID(),
        date: Date.now(),
        filename: filename || "resume",
        score: a.total,
        band: a.band,
        categories: a.categories.map((c) => ({ label: c.label, score: c.score })),
      });
    }, 1400);
  };

  const probability = useMemo(
    () => (analysis ? jobMatchProbability(analysis.total) : 0),
    [analysis]
  );

  const onFixAll = () => {
    if (!parsed) return;
    const out = autoFixText(parsed.rawText);
    setFixedText(out);
    toast({ title: "Auto-fix applied", description: "Weak verbs replaced and metrics added." });
  };

  const onRoast = () => {
    if (!analysis || !parsed) return;
    const lines: string[] = [];
    // Score-band openers
    const openers = {
      low: [
        "Brutal honesty: this resume reads like a Wikipedia stub.",
        "ATS scanned this and filed a missing-persons report.",
        "If recruiters had a 'skip' button, your resume invented it.",
        "This isn't a resume, it's a cry for help in 11pt Calibri.",
      ],
      mid: [
        "Mid. ATS sees you, but the recruiter is yawning.",
        "Not bad, not good — the Toyota Camry of resumes.",
        "Solid effort, but it whispers when it should shout.",
        "Recruiters might read past line 3. Might.",
      ],
      high: [
        "Solid! But there's still a sneaky 15-point lift hiding in here.",
        "Strong resume — now stop hiding behind buzzwords and brag harder.",
        "Pretty good. With one more pass you'll be insufferable at parties.",
      ],
    };
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    if (analysis.total < 50) lines.push(pick(openers.low));
    else if (analysis.total < 70) lines.push(pick(openers.mid));
    else lines.push(pick(openers.high));

    const roasts: string[] = [];
    if (analysis.issues.find((i) => i.type === "no-metric"))
      roasts.push("No numbers? Did you actually do anything, or did things just… happen around you?");
    if (analysis.issues.find((i) => i.type === "weak-verb"))
      roasts.push("'Worked on' is doing heavy lifting here. Retire it.");
    if (parsed.skills.length < 6) roasts.push("Your skills section could fit on a sticky note.");
    if (parsed.skills.length > 25) roasts.push("Listing 25+ skills isn't a flex, it's a confession.");
    if (!parsed.email) roasts.push("No email? Bold strategy — telepathy as a primary contact channel.");
    if (!parsed.phone) roasts.push("No phone number. Recruiters love a good scavenger hunt.");
    if (parsed.experience.length === 0) roasts.push("No experience listed. Are we hiring you or adopting you?");
    if (parsed.experience.length > 0 && parsed.rawText.length < 800)
      roasts.push("Your entire career fits in a tweet. Impressive… in the wrong way.");
    if (parsed.rawText.length > 6000)
      roasts.push("This is a resume, not a Russian novel. Cut it in half.");
    if (/responsible for/i.test(parsed.rawText))
      roasts.push("'Responsible for' is corporate code for 'I showed up sometimes.'");
    if (/team player/i.test(parsed.rawText))
      roasts.push("'Team player'? Cool, so is everyone in a group chat. Be specific.");
    if (/hardworking|hard-working/i.test(parsed.rawText))
      roasts.push("'Hardworking' — the participation trophy of resume adjectives.");
    if (/passionate/i.test(parsed.rawText))
      roasts.push("'Passionate about X' — recruiters translate this as 'I watched one YouTube video.'");
    if (/synergy|leverage|stakeholder/i.test(parsed.rawText))
      roasts.push("Buzzword bingo detected. Synergy + leverage + stakeholder = instant nap.");
    if (analysis.missingKeywords.length > 5)
      roasts.push(`Missing ${analysis.missingKeywords.length} keywords from the JD. The ATS isn't psychic, friend.`);

    // Pick up to 3 contextual roasts
    const shuffled = roasts.sort(() => Math.random() - 0.5).slice(0, 3);
    lines.push(...shuffled);
    if (lines.length === 1) lines.push("Honestly? Hard to roast — this is annoyingly clean.");
    setRoast(lines.join(" "));
  };

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            ATS <span className="text-gradient">Resume Analyzer</span>
          </h1>
          <p className="text-muted-foreground mt-3">
            Upload your resume and a job description (optional) to get a recruiter-grade score.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          <div className="lg:col-span-3">
            <UploadBox onParsed={handleParsed} />
          </div>
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <label className="font-display font-semibold flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Job Description (optional)
            </label>
            <p className="text-xs text-muted-foreground mt-1 mb-3">
              Paste it for sharper keyword matching.
            </p>
            <Textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the JD here…"
              rows={8}
              className="bg-background/50 resize-none"
            />
            <Button
              onClick={() => parsed && runAnalysis(parsed, jd)}
              disabled={!parsed || scanning}
              className="w-full mt-3 bg-gradient-primary text-primary-foreground"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Re-analyze
            </Button>
          </div>
        </div>

        <div ref={resultRef} className="mt-12">
          {scanning && <ScanningOverlay />}
          {analysis && !scanning && (
            <div className="space-y-6 animate-fade-in">
              {/* Top row */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center">
                  <AtsScoreRing score={analysis.total} />
                  <BadgePill band={analysis.band} />
                </div>
                <div className="lg:col-span-2 glass rounded-2xl p-6">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> Score Breakdown
                  </h3>
                  <ScoreBreakdown categories={analysis.categories} />
                </div>
              </div>

              {/* Job match */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated shortlisting probability</p>
                      <p className="font-display text-2xl font-bold text-gradient">{probability}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Based on keyword match, content quality, and ATS-friendliness vs the JD you provided.
                  </p>
                </div>
                <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-primary transition-all duration-1000" style={{ width: `${probability}%` }} />
                </div>
              </div>

              {/* Keywords */}
              <div className="glass rounded-2xl p-6">
                <KeywordChips matched={analysis.matchedKeywords} missing={analysis.missingKeywords} />
              </div>

              {/* Issues + suggestions */}
              <Tabs defaultValue="issues" className="glass rounded-2xl p-6">
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="issues">Issues ({analysis.issues.length})</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                  <TabsTrigger value="autofix">Auto-Fix</TabsTrigger>
                  <TabsTrigger value="roast">Roast Me 🔥</TabsTrigger>
                </TabsList>
                <TabsContent value="issues" className="mt-4 space-y-3">
                  {analysis.issues.length === 0 && (
                    <p className="text-sm text-muted-foreground">No major issues. Nice work.</p>
                  )}
                  {analysis.issues.map((issue, i) => (
                    <div key={i} className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{issue.text}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{issue.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="suggestions" className="mt-4 space-y-2">
                  {analysis.suggestions.map((s, i) => (
                    <div key={i} className="p-3 rounded-lg bg-secondary/50 text-sm flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="autofix" className="mt-4 space-y-3">
                  <Button onClick={onFixAll} className="bg-gradient-primary text-primary-foreground">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Fix All Issues
                  </Button>
                  {fixedText && parsed && (
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2">BEFORE</h4>
                        <div className="text-xs p-3 rounded-lg bg-secondary/50 max-h-72 overflow-auto whitespace-pre-wrap">
                          {parsed.rawText}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-primary mb-2">AFTER</h4>
                        <div className="text-xs p-3 rounded-lg bg-primary/5 border border-primary/30 max-h-72 overflow-auto whitespace-pre-wrap">
                          {fixedText}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="roast" className="mt-4">
                  <Button onClick={onRoast} variant="outline" className="border-primary/40">
                    <Flame className="h-4 w-4 mr-2 text-primary" />
                    Roast My Resume
                  </Button>
                  {roast && (
                    <p className="mt-4 p-4 rounded-lg bg-secondary/50 text-sm leading-relaxed">{roast}</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const BadgePill = ({ band }: { band: string }) => {
  const styles: Record<string, string> = {
    Weak: "bg-destructive/15 text-destructive border-destructive/30",
    Average: "bg-warning/15 text-warning border-warning/30",
    Strong: "bg-success/15 text-success border-success/30",
    Elite: "bg-gradient-primary text-primary-foreground border-transparent",
  };
  return (
    <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[band]}`}>
      <Award className="h-3 w-3" />
      {band} Resume
    </div>
  );
};

export default Analyzer;