import { forwardRef } from "react";

export type TemplateLayout = "minimal" | "modern" | "creative" | "corporate";

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
  summary: string;
  skills: string[];
  experience: { role: string; company: string; period: string; bullets: string[] }[];
  education: { degree: string; school: string; period: string }[];
  projects?: { name: string; description: string }[];
}

// Back-compat: keep TemplateId alias mapping to layouts
export type TemplateId = string;

import { getTemplateById, type TemplateConfig } from "@/lib/resumate/templates";

interface Props {
  data: ResumeData;
  template: TemplateId;
}

export const ResumePreview = forwardRef<HTMLDivElement, Props>(({ data, template }, ref) => {
  const cfg = getTemplateById(template);
  if (cfg.layout === "modern") return <ModernTpl ref={ref} data={data} cfg={cfg} />;
  if (cfg.layout === "creative") return <CreativeTpl ref={ref} data={data} cfg={cfg} />;
  if (cfg.layout === "corporate") return <CorporateTpl ref={ref} data={data} cfg={cfg} />;
  return <MinimalTpl ref={ref} data={data} cfg={cfg} />;
});
ResumePreview.displayName = "ResumePreview";

const contactLine = (data: ResumeData, sep = " · ") =>
  [data.email, data.phone, data.location, data.linkedin, data.github, data.portfolio]
    .filter(Boolean)
    .join(sep);

// Force light styling on PDF templates so html2canvas exports clean
const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; cfg: TemplateConfig }>(
  ({ children, cfg }, ref) => (
    <div
      ref={ref}
      style={{
        background: cfg.bg ?? "#ffffff",
        color: cfg.text ?? "#111111",
        width: "100%",
        maxWidth: 820,
        minHeight: 1100,
        padding: 48,
        fontFamily: cfg.font ?? "Inter, system-ui, sans-serif",
        fontSize: 13,
        lineHeight: 1.5,
        "--accent": cfg.accent,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
);
Page.displayName = "Page";

const MinimalTpl = forwardRef<HTMLDivElement, { data: ResumeData; cfg: TemplateConfig }>(({ data, cfg }, ref) => (
  <Page ref={ref} cfg={cfg}>
    <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{data.name || "Your Name"}</h1>
    <p style={{ color: "#555", marginTop: 4 }}>{data.title}</p>
    <p style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
      {contactLine(data)}
    </p>
    <Section title="Summary">{data.summary}</Section>
    <Section title="Skills">{data.skills.join(" · ")}</Section>
    <Section title="Experience">
      {data.experience.map((e, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{e.role} · {e.company}</strong>
            <span style={{ color: "#666" }}>{e.period}</span>
          </div>
          <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
            {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
        </div>
      ))}
    </Section>
    <Section title="Education">
      {data.education.map((e, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
          <span><strong>{e.degree}</strong> — {e.school}</span>
          <span style={{ color: "#666" }}>{e.period}</span>
        </div>
      ))}
    </Section>
    {data.projects && data.projects.length > 0 && (
      <Section title="Projects">
        {data.projects.map((p, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <strong>{p.name}</strong> — {p.description}
          </div>
        ))}
      </Section>
    )}
  </Page>
));
MinimalTpl.displayName = "MinimalTpl";

const ModernTpl = forwardRef<HTMLDivElement, { data: ResumeData; cfg: TemplateConfig }>(({ data, cfg }, ref) => (
  <Page ref={ref} cfg={cfg}>
    <div style={{ borderLeft: "4px solid var(--accent)", paddingLeft: 16 }}>
      <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, color: "#0a0a0a" }}>{data.name || "Your Name"}</h1>
      <p style={{ color: "var(--accent)", fontWeight: 600, margin: "2px 0 0 0" }}>{data.title}</p>
      <p style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
        {contactLine(data)}
      </p>
    </div>
    <Section title="Profile" accent>{data.summary}</Section>
    <Section title="Tech Stack" accent>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {data.skills.map((s) => (
          <span key={s} style={{ background: "#f4f4f5", padding: "3px 9px", borderRadius: 999, fontSize: 11 }}>{s}</span>
        ))}
      </div>
    </Section>
    <Section title="Experience" accent>
      {data.experience.map((e, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{e.role}</strong>
            <span style={{ color: "#666" }}>{e.period}</span>
          </div>
          <p style={{ margin: 0, color: "var(--accent)", fontSize: 12 }}>{e.company}</p>
          <ul style={{ margin: "4px 0 0 18px" }}>
            {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
        </div>
      ))}
    </Section>
    <Section title="Education" accent>
      {data.education.map((e, i) => (
        <div key={i}><strong>{e.degree}</strong>, {e.school} <span style={{ color: "#666" }}>· {e.period}</span></div>
      ))}
    </Section>
  </Page>
));
ModernTpl.displayName = "ModernTpl";

const CreativeTpl = forwardRef<HTMLDivElement, { data: ResumeData; cfg: TemplateConfig }>(({ data, cfg }, ref) => (
  <Page ref={ref} cfg={cfg}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
      <aside style={{ background: cfg.sidebarBg ?? "#0a0a0a", color: cfg.sidebarText ?? "#fff", padding: 20, borderRadius: 8, marginLeft: -24 }}>
        <h1 style={{ fontSize: 22, margin: 0 }}>{data.name || "Your Name"}</h1>
        <p style={{ color: "var(--accent)", fontSize: 12, marginTop: 4 }}>{data.title}</p>
        <hr style={{ borderColor: "#333", margin: "12px 0" }} />
        <div style={{ fontSize: 11, lineHeight: 1.7 }}>
          <div>{data.email}</div>
          <div>{data.phone}</div>
          <div>{data.location}</div>
          {data.linkedin && <div>{data.linkedin}</div>}
          {data.github && <div>{data.github}</div>}
          {data.portfolio && <div>{data.portfolio}</div>}
        </div>
        <h3 style={{ fontSize: 12, color: "var(--accent)", marginTop: 18 }}>SKILLS</h3>
        <div style={{ fontSize: 11 }}>{data.skills.join(", ")}</div>
        <h3 style={{ fontSize: 12, color: "var(--accent)", marginTop: 18 }}>EDUCATION</h3>
        {data.education.map((e, i) => (
          <div key={i} style={{ fontSize: 11, marginBottom: 6 }}>
            <strong>{e.degree}</strong><div>{e.school} · {e.period}</div>
          </div>
        ))}
      </aside>
      <div>
        <Section title="About">{data.summary}</Section>
        <Section title="Experience">
          {data.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong>{e.role}</strong> at <span style={{ color: "var(--accent)" }}>{e.company}</span>
              <div style={{ color: "#666", fontSize: 11 }}>{e.period}</div>
              <ul style={{ margin: "4px 0 0 18px" }}>
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      </div>
    </div>
  </Page>
));
CreativeTpl.displayName = "CreativeTpl";

const CorporateTpl = forwardRef<HTMLDivElement, { data: ResumeData; cfg: TemplateConfig }>(({ data, cfg }, ref) => (
  <Page ref={ref} cfg={cfg}>
    <div style={{ textAlign: "center", borderBottom: "2px solid var(--accent)", paddingBottom: 12 }}>
      <h1 style={{ fontSize: 28, margin: 0, letterSpacing: 1 }}>{data.name || "Your Name"}</h1>
      <p style={{ color: "#444", margin: "4px 0" }}>{data.title}</p>
      <p style={{ color: "#666", fontSize: 12 }}>
        {contactLine(data, " | ")}
      </p>
    </div>
    <Section title="Professional Summary">{data.summary}</Section>
    <Section title="Core Competencies">{data.skills.join(" • ")}</Section>
    <Section title="Professional Experience">
      {data.experience.map((e, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <strong>{e.company}</strong> — {e.role} <span style={{ float: "right", color: "#666" }}>{e.period}</span>
          <ul style={{ margin: "4px 0 0 18px" }}>
            {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
        </div>
      ))}
    </Section>
    <Section title="Education">
      {data.education.map((e, i) => (
        <div key={i}><strong>{e.degree}</strong>, {e.school} · {e.period}</div>
      ))}
    </Section>
  </Page>
));
CorporateTpl.displayName = "CorporateTpl";

const Section = ({ title, children, accent }: { title: string; children: React.ReactNode; accent?: boolean }) => (
  <section style={{ marginTop: 18 }}>
    <h2
      style={{
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        color: accent ? "var(--accent)" : "#0a0a0a",
        borderBottom: "1px solid #e4e4e7",
        paddingBottom: 4,
        marginBottom: 8,
      }}
    >
      {title}
    </h2>
    <div>{children}</div>
  </section>
);