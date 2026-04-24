import { useMemo, useState } from "react";
import { Layout } from "@/components/resumate/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, Copy, Send, Sparkles, FileText, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FormState {
  yourName: string;
  yourRole: string;
  yourSkills: string;
  yearsExp: string;
  achievement: string;
  recruiterName: string;
  recruiterEmail: string;
  company: string;
  jobTitle: string;
  jobDescription: string;
  tone: "Confident" | "Friendly" | "Formal" | "Enthusiastic";
}

const initial: FormState = {
  yourName: "",
  yourRole: "",
  yourSkills: "",
  yearsExp: "",
  achievement: "",
  recruiterName: "",
  recruiterEmail: "",
  company: "",
  jobTitle: "",
  jobDescription: "",
  tone: "Confident",
};

const greetings: Record<FormState["tone"], string> = {
  Confident: "Hi",
  Friendly: "Hey",
  Formal: "Dear",
  Enthusiastic: "Hi",
};

const closers: Record<FormState["tone"], string> = {
  Confident: "Looking forward to the conversation,",
  Friendly: "Thanks so much,",
  Formal: "Sincerely,",
  Enthusiastic: "Excited to chat,",
};

function topKeywords(jd: string, limit = 6): string[] {
  const stop = new Set(["the","and","for","with","you","your","our","are","will","that","this","have","from","into","using","work","team"]);
  const counts = new Map<string, number>();
  jd.toLowerCase().split(/[^a-z+#.0-9-]+/).forEach((w) => {
    if (w.length < 4 || stop.has(w)) return;
    counts.set(w, (counts.get(w) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([w]) => w);
}

function buildEmail(f: FormState): { subject: string; body: string } {
  const skills = f.yourSkills.split(",").map((s) => s.trim()).filter(Boolean);
  const jdKeywords = topKeywords(f.jobDescription);
  const overlap = skills.filter((s) => jdKeywords.includes(s.toLowerCase()));
  const matchPhrase = overlap.length
    ? overlap.slice(0, 3).join(", ")
    : skills.slice(0, 3).join(", ");
  const years = f.yearsExp ? `${f.yearsExp}+ years` : "several years";
  const achievementLine = f.achievement
    ? `Most recently, I ${f.achievement.replace(/^I\s+/i, "").replace(/\.$/, "")}.`
    : "";
  const greet = `${greetings[f.tone]} ${f.recruiterName || "there"},`;
  const close = `${closers[f.tone]}\n${f.yourName || "Your Name"}`;

  const subject = f.jobTitle && f.company
    ? `Application: ${f.jobTitle} — ${f.yourName || "Candidate"}`
    : `${f.yourRole || "Engineer"} interested in ${f.company || "your team"}`;

  const body = [
    greet,
    "",
    `I came across the ${f.jobTitle || "open role"} at ${f.company || "your company"} and wanted to reach out directly. I'm a ${f.yourRole || "developer"} with ${years} of experience, and the role looks like a strong fit for what I do best — ${matchPhrase || "shipping high-impact product work"}.`,
    "",
    achievementLine,
    achievementLine ? "" : null,
    `What stood out to me about this role: it focuses on ${jdKeywords.slice(0, 3).join(", ") || "the kind of problems I love solving"}. I've worked on similar challenges and would be excited to bring that experience to ${f.company || "your team"}.`,
    "",
    `My resume is attached. Happy to send code samples, references, or jump on a quick call whenever works for you.`,
    "",
    close,
  ].filter((l) => l !== null).join("\n");

  return { subject, body };
}

function buildCoverLetter(f: FormState): string {
  const skills = f.yourSkills.split(",").map((s) => s.trim()).filter(Boolean);
  const jdKeywords = topKeywords(f.jobDescription);
  const overlap = skills.filter((s) => jdKeywords.includes(s.toLowerCase()));
  const years = f.yearsExp ? `${f.yearsExp}+ years` : "several years";
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return [
    `${f.yourName || "Your Name"}`,
    `${today}`,
    "",
    `${f.recruiterName ? `${f.recruiterName}, ` : ""}Hiring Team`,
    `${f.company || "Company Name"}`,
    "",
    `Dear ${f.recruiterName || "Hiring Manager"},`,
    "",
    `I'm writing to apply for the ${f.jobTitle || "open role"} at ${f.company || "your company"}. As a ${f.yourRole || "professional"} with ${years} of hands-on experience in ${skills.slice(0, 4).join(", ") || "the field"}, I'm confident I can contribute meaningfully from day one.`,
    "",
    `In my recent work I have ${f.achievement || `delivered measurable results — including faster shipping cycles, cleaner architecture, and stronger collaboration across teams`}. I see this role at ${f.company || "your company"} as a natural next step because it focuses on ${jdKeywords.slice(0, 3).join(", ") || "the problems I most enjoy solving"}.`,
    "",
    `Three reasons I'd be a strong fit:`,
    `1. Direct experience with ${overlap.slice(0, 3).join(", ") || skills.slice(0, 3).join(", ") || "the core stack"}.`,
    `2. A track record of shipping product changes that move metrics — not just features.`,
    `3. Strong written and async communication — I'm comfortable owning scope end-to-end.`,
    "",
    `I'd welcome the chance to discuss how my background lines up with what you're building. Thank you for your time and consideration.`,
    "",
    `Sincerely,`,
    `${f.yourName || "Your Name"}`,
  ].join("\n");
}

const EmailWriter = () => {
  const [form, setForm] = useState<FormState>(initial);
  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const email = useMemo(() => buildEmail(form), [form]);
  const coverLetter = useMemo(() => buildCoverLetter(form), [form]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: `${label} copied to clipboard.` });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const sendEmail = () => {
    const to = encodeURIComponent(form.recruiterEmail || "");
    const subject = encodeURIComponent(email.subject);
    const body = encodeURIComponent(email.body);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const downloadCoverLetter = () => {
    const blob = new Blob([coverLetter], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(form.yourName || "cover_letter").replace(/\s+/g, "_")}_cover_letter.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            AI <span className="text-gradient">Email & Cover Letter</span>
          </h1>
          <p className="text-muted-foreground mt-3">
            Draft a recruiter email and a tailored cover letter from your details + the job description.
            Send it straight from your inbox.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h2 className="font-display font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Your details
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Your name" value={form.yourName} onChange={(v) => update("yourName", v)} />
              <Field label="Your current role" value={form.yourRole} onChange={(v) => update("yourRole", v)} placeholder="Frontend Engineer" />
              <Field label="Years of experience" value={form.yearsExp} onChange={(v) => update("yearsExp", v)} placeholder="5" />
              <Field label="Top skills (comma)" value={form.yourSkills} onChange={(v) => update("yourSkills", v)} placeholder="React, TypeScript, Node" />
            </div>
            <div>
              <Label className="mb-1.5 block">One recent achievement</Label>
              <Textarea
                rows={2}
                placeholder="Led migration to Next.js, cutting LCP by 38%."
                value={form.achievement}
                onChange={(e) => update("achievement", e.target.value)}
              />
            </div>

            <div className="border-t border-border/50 pt-4">
              <h2 className="font-display font-semibold flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-primary" /> The job
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Recruiter name" value={form.recruiterName} onChange={(v) => update("recruiterName", v)} placeholder="Sarah" />
                <Field label="Recruiter email" value={form.recruiterEmail} onChange={(v) => update("recruiterEmail", v)} placeholder="sarah@company.com" />
                <Field label="Company" value={form.company} onChange={(v) => update("company", v)} placeholder="Acme" />
                <Field label="Job title" value={form.jobTitle} onChange={(v) => update("jobTitle", v)} placeholder="Senior Frontend Engineer" />
              </div>
              <div className="mt-3">
                <Label className="mb-1.5 block">Job description (paste it)</Label>
                <Textarea
                  rows={5}
                  placeholder="Paste the JD here — we'll auto-match keywords from your skills."
                  value={form.jobDescription}
                  onChange={(e) => update("jobDescription", e.target.value)}
                />
              </div>
              <div className="mt-3">
                <Label className="mb-1.5 block">Tone</Label>
                <div className="flex flex-wrap gap-2">
                  {(["Confident", "Friendly", "Formal", "Enthusiastic"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update("tone", t)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        form.tone === t
                          ? "bg-gradient-primary text-primary-foreground border-transparent shadow-neon"
                          : "border-border/60 hover:border-primary/60 text-muted-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-6">
            <Tabs defaultValue="email">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="email"><Mail className="h-3.5 w-3.5 mr-1.5" />Email</TabsTrigger>
                <TabsTrigger value="cover"><FileText className="h-3.5 w-3.5 mr-1.5" />Cover Letter</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-4">
                <div className="glass rounded-2xl p-5 space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Subject</Label>
                    <Input readOnly value={email.subject} className="mt-1 bg-background/40" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Body</Label>
                    <Textarea readOnly rows={16} value={email.body} className="mt-1 font-mono text-xs bg-background/40" />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      onClick={sendEmail}
                      disabled={!form.recruiterEmail}
                      className="bg-gradient-primary text-primary-foreground shadow-neon"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send via mail app
                    </Button>
                    <Button variant="outline" onClick={() => copy(`Subject: ${email.subject}\n\n${email.body}`, "Email")}>
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                  </div>
                  {!form.recruiterEmail && (
                    <p className="text-[11px] text-muted-foreground">Add a recruiter email to enable “Send”.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="cover" className="mt-4">
                <div className="glass rounded-2xl p-5 space-y-3">
                  <Textarea readOnly rows={22} value={coverLetter} className="font-mono text-xs bg-background/40" />
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button onClick={downloadCoverLetter} className="bg-gradient-primary text-primary-foreground shadow-neon">
                      <Wand2 className="h-4 w-4 mr-2" /> Download .txt
                    </Button>
                    <Button variant="outline" onClick={() => copy(coverLetter, "Cover letter")}>
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Field = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <Label className="mb-1.5 block">{label}</Label>
    <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default EmailWriter;