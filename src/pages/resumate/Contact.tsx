import { useState } from "react";
import { Layout } from "@/components/resumate/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Github, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Tell us a bit more").max(1500),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast({ title: "Check your form", description: r.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message sent", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Get in <span className="text-gradient">touch</span>
            </h1>
            <p className="text-muted-foreground mt-3">
              Questions, feedback, or feature requests — we read everything.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="glass rounded-xl p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">hello@resumate.app</p>
              </div>
            </div>
            <a
              href="https://github.com/rashhiye"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-5 flex items-center gap-3 glow-hover"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Github className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">GitHub</p>
                <p className="text-sm font-medium">github.com/rashhiye</p>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/rashhiye/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-5 flex items-center gap-3 glow-hover"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Linkedin className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">LinkedIn</p>
                <p className="text-sm font-medium">linkedin.com/in/rashhiye</p>
              </div>
            </a>
            <div className="glass rounded-xl p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Response time</p>
                <p className="text-sm font-medium">{"< 24 hours"}</p>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="glass rounded-2xl p-6 space-y-4">
            <div>
              <Label className="mb-1.5 block">Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
            </div>
            <div>
              <Label className="mb-1.5 block">Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
            </div>
            <div>
              <Label className="mb-1.5 block">Message</Label>
              <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1500} />
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-gradient-primary text-primary-foreground shadow-neon">
              {submitting ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;