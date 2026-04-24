import { Layout } from "@/components/resumate/Layout";
import { FileText } from "lucide-react";

const Terms = () => (
  <Layout>
    <section className="container py-12 md:py-16 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
          <FileText className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold m-0">Terms & Conditions</h1>
      </div>
      <p className="text-muted-foreground">Last updated: April 23, 2026</p>
      <div className="glass rounded-2xl p-6 mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          By using ResuMate you agree to use the service for personal, non-commercial resume
          improvement. You retain full ownership of any content you upload.
        </p>
        <p>
          ResuMate provides tools and suggestions but cannot guarantee employment outcomes. Scores
          are heuristic estimates and may differ from real ATS systems.
        </p>
        <p>
          You agree not to upload content that violates any law, contains malware, or infringes any
          third-party rights.
        </p>
        <p>
          We may update these terms; continued use indicates acceptance of the updated terms.
        </p>
      </div>
    </section>
  </Layout>
);

export default Terms;