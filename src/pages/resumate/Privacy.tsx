import { Layout } from "@/components/resumate/Layout";
import { ShieldCheck } from "lucide-react";

const Privacy = () => (
  <Layout>
    <section className="container py-12 md:py-16 max-w-3xl mx-auto prose-invert">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold m-0">Privacy Policy</h1>
      </div>
      <p className="text-muted-foreground">Last updated: April 23, 2026</p>

      <div className="glass rounded-2xl p-6 mt-6 space-y-5 text-sm leading-relaxed">
        <p>
          We respect your data privacy. ResuMate is designed so that your resume can be analyzed
          entirely in your browser whenever possible.
        </p>
        <Section title="What we collect">
          We do not require an account to use the analyzer. Optional analytics cover anonymous page
          views and feature usage only.
        </Section>
        <Section title="What we don't do">
          We never sell your data, and we don't share your resume content with third parties for
          advertising.
        </Section>
        <Section title="Storage">
          Files you upload are processed locally when possible. If a feature requires server
          processing, files are stored only as long as needed and deleted automatically.
        </Section>
        <Section title="Your rights">
          You can request data deletion at any time by emailing privacy@resumate.app. Local history
          can be cleared from the dashboard.
        </Section>
      </div>
    </section>
  </Layout>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="font-display font-semibold mb-1">{title}</h3>
    <p className="text-muted-foreground">{children}</p>
  </div>
);

export default Privacy;