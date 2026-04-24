import { Layout } from "@/components/resumate/Layout";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

const posts = [
  { slug: "ats-resume-guide-2026", title: "The Complete ATS Resume Guide for 2026", excerpt: "How modern ATS systems read resumes, and what makes them say yes.", read: "8 min", date: "Apr 15, 2026" },
  { slug: "10-ats-killers", title: "10 ATS Resume Killers (And How to Fix Them)", excerpt: "Tables, headers, fancy fonts — what actually breaks parsers.", read: "6 min", date: "Apr 02, 2026" },
  { slug: "keywords-without-stuffing", title: "Keyword Optimization Without the Stuffing", excerpt: "How to weave job description language into your bullets naturally.", read: "5 min", date: "Mar 22, 2026" },
  { slug: "metrics-that-matter", title: "Metrics That Matter on a Resume", excerpt: "The 4 categories of numbers that move recruiters.", read: "4 min", date: "Mar 10, 2026" },
  { slug: "ai-job-trends-2026", title: "Hiring Trends Reshaping Tech in 2026", excerpt: "What our 30k-resume dataset says about what's hot.", read: "7 min", date: "Feb 28, 2026" },
  { slug: "junior-resume", title: "Building a Resume With Zero Experience", excerpt: "Projects, open source, and storytelling that lands interviews.", read: "6 min", date: "Feb 14, 2026" },
];

const Blog = () => (
  <Layout>
    <section className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          ResuMate <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-muted-foreground mt-3">
          ATS guides, resume tips, and job market trends — all in one place.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p) => (
          <article key={p.slug} className="glass rounded-2xl p-6 glow-hover flex flex-col">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.read}</span>
            </div>
            <h2 className="font-display text-lg font-semibold mt-3 leading-snug">{p.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 flex-1">{p.excerpt}</p>
            <Link to="#" className="text-sm text-primary mt-4 inline-flex items-center gap-1 hover:underline">
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </section>
  </Layout>
);

export default Blog;