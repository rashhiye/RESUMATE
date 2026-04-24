import type { TemplateLayout } from "@/components/resumate/ResumePreview";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: "Minimal" | "Modern" | "Creative" | "Corporate";
  layout: TemplateLayout;
  accent: string;
  bg?: string;
  text?: string;
  font?: string;
  sidebarBg?: string;
  sidebarText?: string;
}

const FONTS = {
  inter: "Inter, system-ui, sans-serif",
  grotesk: "'Space Grotesk', Inter, system-ui, sans-serif",
  serif: "'Times New Roman', Georgia, serif",
  mono: "'JetBrains Mono', Menlo, monospace",
};

/**
 * 32 ATS-friendly templates built on 4 base layouts × accent / typography variations.
 * All templates use single-column or simple two-column structures, standard fonts,
 * standard section headings (Summary, Experience, Education, Skills) — safe for ATS.
 */
export const TEMPLATES: TemplateConfig[] = [
  // --- Minimal family (8) ---
  { id: "minimal-classic",   name: "Minimal Classic",   description: "Clean black & white, ultra-scannable.",        category: "Minimal", layout: "minimal",   accent: "#111111", font: FONTS.inter },
  { id: "minimal-rose",      name: "Minimal Rose",      description: "Soft neon-rose accents on a clean canvas.",    category: "Minimal", layout: "minimal",   accent: "#ff007f", font: FONTS.inter },
  { id: "minimal-azure",     name: "Minimal Azure",     description: "Calm blue accents — recruiter-safe.",          category: "Minimal", layout: "minimal",   accent: "#0ea5e9", font: FONTS.inter },
  { id: "minimal-emerald",   name: "Minimal Emerald",   description: "Emerald green — fresh & professional.",        category: "Minimal", layout: "minimal",   accent: "#059669", font: FONTS.inter },
  { id: "minimal-graphite",  name: "Minimal Graphite",  description: "Soft graphite tones for understated impact.",  category: "Minimal", layout: "minimal",   accent: "#374151", font: FONTS.grotesk },
  { id: "minimal-amber",     name: "Minimal Amber",     description: "Warm amber details, classic body text.",       category: "Minimal", layout: "minimal",   accent: "#d97706", font: FONTS.inter },
  { id: "minimal-serif",     name: "Minimal Serif",     description: "Times-based serif, executive feel.",           category: "Minimal", layout: "minimal",   accent: "#111111", font: FONTS.serif },
  { id: "minimal-mono",      name: "Minimal Mono",      description: "Monospaced, perfect for engineers.",           category: "Minimal", layout: "minimal",   accent: "#16a34a", font: FONTS.mono },

  // --- Modern family (8) ---
  { id: "modern-rose",       name: "Modern Rose",       description: "Accent bar in neon rose — bold & current.",    category: "Modern",  layout: "modern",    accent: "#ff007f", font: FONTS.grotesk },
  { id: "modern-indigo",     name: "Modern Indigo",     description: "Indigo accent bar, ideal for PMs.",            category: "Modern",  layout: "modern",    accent: "#4f46e5", font: FONTS.grotesk },
  { id: "modern-teal",       name: "Modern Teal",       description: "Teal accent — designers & developers.",        category: "Modern",  layout: "modern",    accent: "#0d9488", font: FONTS.grotesk },
  { id: "modern-crimson",    name: "Modern Crimson",    description: "High-contrast crimson — stand out fast.",      category: "Modern",  layout: "modern",    accent: "#dc2626", font: FONTS.inter },
  { id: "modern-violet",     name: "Modern Violet",     description: "Violet — creative tech roles.",                category: "Modern",  layout: "modern",    accent: "#7c3aed", font: FONTS.grotesk },
  { id: "modern-slate",      name: "Modern Slate",      description: "Slate-blue, conservative & polished.",         category: "Modern",  layout: "modern",    accent: "#334155", font: FONTS.inter },
  { id: "modern-orange",     name: "Modern Orange",     description: "Vibrant orange accent for marketing pros.",    category: "Modern",  layout: "modern",    accent: "#ea580c", font: FONTS.grotesk },
  { id: "modern-cyan",       name: "Modern Cyan",       description: "Cool cyan — data & analytics roles.",          category: "Modern",  layout: "modern",    accent: "#0891b2", font: FONTS.mono },

  // --- Creative family (8) — two-column with sidebar ---
  { id: "creative-noir",     name: "Creative Noir",     description: "Bold dark sidebar with rose accents.",         category: "Creative", layout: "creative", accent: "#ff007f", sidebarBg: "#0a0a0a", sidebarText: "#ffffff", font: FONTS.grotesk },
  { id: "creative-midnight", name: "Creative Midnight", description: "Midnight-blue sidebar, gold details.",         category: "Creative", layout: "creative", accent: "#fbbf24", sidebarBg: "#0f172a", sidebarText: "#e2e8f0", font: FONTS.grotesk },
  { id: "creative-forest",   name: "Creative Forest",   description: "Deep forest green sidebar — calm & strong.",   category: "Creative", layout: "creative", accent: "#a7f3d0", sidebarBg: "#064e3b", sidebarText: "#ecfdf5", font: FONTS.inter },
  { id: "creative-plum",     name: "Creative Plum",     description: "Plum sidebar with cream accents.",             category: "Creative", layout: "creative", accent: "#fde68a", sidebarBg: "#581c87", sidebarText: "#faf5ff", font: FONTS.grotesk },
  { id: "creative-burgundy", name: "Creative Burgundy", description: "Burgundy sidebar — refined & confident.",      category: "Creative", layout: "creative", accent: "#fecaca", sidebarBg: "#7f1d1d", sidebarText: "#fef2f2", font: FONTS.serif },
  { id: "creative-ocean",    name: "Creative Ocean",    description: "Ocean blue sidebar with cyan accents.",        category: "Creative", layout: "creative", accent: "#67e8f9", sidebarBg: "#0c4a6e", sidebarText: "#f0f9ff", font: FONTS.inter },
  { id: "creative-mocha",    name: "Creative Mocha",    description: "Warm mocha sidebar — designers love it.",      category: "Creative", layout: "creative", accent: "#fed7aa", sidebarBg: "#451a03", sidebarText: "#fff7ed", font: FONTS.grotesk },
  { id: "creative-charcoal", name: "Creative Charcoal", description: "Charcoal sidebar with electric lime.",         category: "Creative", layout: "creative", accent: "#a3e635", sidebarBg: "#1f2937", sidebarText: "#f9fafb", font: FONTS.mono },

  // --- Corporate family (8) ---
  { id: "corporate-navy",    name: "Corporate Navy",    description: "Centered classic with navy accents.",          category: "Corporate", layout: "corporate", accent: "#1e3a8a", font: FONTS.serif },
  { id: "corporate-burgundy",name: "Corporate Burgundy",description: "Centered classic with burgundy accents.",      category: "Corporate", layout: "corporate", accent: "#9f1239", font: FONTS.serif },
  { id: "corporate-forest",  name: "Corporate Forest",  description: "Forest green — finance & consulting.",         category: "Corporate", layout: "corporate", accent: "#166534", font: FONTS.serif },
  { id: "corporate-charcoal",name: "Corporate Charcoal",description: "Charcoal accents — timeless executive look.",  category: "Corporate", layout: "corporate", accent: "#1f2937", font: FONTS.serif },
  { id: "corporate-bronze",  name: "Corporate Bronze",  description: "Bronze accents — luxury & legal.",             category: "Corporate", layout: "corporate", accent: "#92400e", font: FONTS.serif },
  { id: "corporate-steel",   name: "Corporate Steel",   description: "Steel-blue, modern grotesk type.",             category: "Corporate", layout: "corporate", accent: "#475569", font: FONTS.grotesk },
  { id: "corporate-rose",    name: "Corporate Rose",    description: "Centered classic with neon-rose accent.",      category: "Corporate", layout: "corporate", accent: "#ff007f", font: FONTS.inter },
  { id: "corporate-teal",    name: "Corporate Teal",    description: "Teal accents — healthcare & ops.",             category: "Corporate", layout: "corporate", accent: "#0f766e", font: FONTS.serif },
];

export const DEFAULT_TEMPLATE_ID = "modern-rose";

export const getTemplateById = (id: string): TemplateConfig =>
  TEMPLATES.find((t) => t.id === id) ??
  // Legacy fallback for old short ids
  ({ id: "modern-rose", name: "Modern Rose", description: "", category: "Modern", layout: (["minimal","modern","creative","corporate"] as const).includes(id as TemplateLayout) ? (id as TemplateLayout) : "modern", accent: "#ff007f", font: FONTS.grotesk });

export const TEMPLATE_CATEGORIES = ["Minimal", "Modern", "Creative", "Corporate"] as const;