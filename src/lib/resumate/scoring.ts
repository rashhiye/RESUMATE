import type { ParsedResume } from "./parser";

export interface CategoryScore {
  key: string;
  label: string;
  score: number; // 0-100
  weight: number; // percentage weight
  feedback: string;
}

export interface AtsAnalysis {
  total: number;
  band: "Weak" | "Average" | "Strong" | "Elite";
  categories: CategoryScore[];
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  issues: ResumeIssue[];
}

export interface ResumeIssue {
  type: "weak-verb" | "passive" | "no-metric" | "repetitive" | "grammar";
  text: string;
  suggestion: string;
}

const COMMON_KEYWORDS = [
  "developed","designed","implemented","built","optimized","led","managed","launched",
  "improved","increased","reduced","architected","collaborated","delivered","automated",
  "scaled","mentored","analyzed","engineered","deployed",
];

const WEAK_VERBS = ["worked on", "responsible for", "helped", "did", "made", "handled", "involved in"];
const PASSIVE_HINTS = [/\bwas\s+\w+ed\b/i, /\bwere\s+\w+ed\b/i, /\bbeen\s+\w+ed\b/i];

export function analyzeResume(parsed: ParsedResume, jobDescription = ""): AtsAnalysis {
  const text = parsed.rawText;
  const lower = text.toLowerCase();

  // Keyword analysis
  const targetKeywords = jobDescription
    ? extractKeywords(jobDescription)
    : COMMON_KEYWORDS;
  const matched = targetKeywords.filter((k) => lower.includes(k.toLowerCase()));
  const missing = targetKeywords.filter((k) => !lower.includes(k.toLowerCase())).slice(0, 12);
  const keywordScore = clamp((matched.length / Math.max(targetKeywords.length, 1)) * 100);

  // Skills
  const skillScore = clamp((parsed.skills.length / 12) * 100);

  // Experience quality
  const hasNumbers = /\d{1,3}%|\d+\+|\$\d+|\d+ users|\d+ projects|\d+x/i.test(text);
  const verbHits = COMMON_KEYWORDS.filter((v) => lower.includes(v)).length;
  const expScore = clamp((verbHits / 8) * 70 + (hasNumbers ? 30 : 0));

  // Formatting (heuristic: line balance, length, sections)
  const sectionsHit = ["experience", "education", "skills"].filter((s) => lower.includes(s)).length;
  const lengthOk = parsed.wordCount > 200 && parsed.wordCount < 1200;
  const formatScore = clamp(sectionsHit * 25 + (lengthOk ? 25 : 0));

  // Readability (avg sentence length proxy)
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgLen = parsed.wordCount / Math.max(sentences.length, 1);
  const readScore = clamp(100 - Math.abs(avgLen - 15) * 4);

  // Section completeness
  const completeness = clamp(
    (parsed.email ? 20 : 0) +
      (parsed.phone ? 15 : 0) +
      (parsed.name ? 15 : 0) +
      (parsed.skills.length >= 5 ? 20 : parsed.skills.length * 4) +
      (parsed.experience.length > 0 ? 15 : 0) +
      (parsed.education.length > 0 ? 15 : 0)
  );

  const categories: CategoryScore[] = [
    { key: "keywords", label: "Keyword Match", score: keywordScore, weight: 30, feedback: keywordFeedback(keywordScore) },
    { key: "skills", label: "Skills Relevance", score: skillScore, weight: 20, feedback: skillFeedback(skillScore) },
    { key: "experience", label: "Experience Quality", score: expScore, weight: 15, feedback: expFeedback(expScore, hasNumbers) },
    { key: "format", label: "Formatting", score: formatScore, weight: 15, feedback: formatFeedback(formatScore) },
    { key: "readability", label: "Readability", score: readScore, weight: 10, feedback: readFeedback(readScore) },
    { key: "completeness", label: "Section Completeness", score: completeness, weight: 10, feedback: completeFeedback(parsed) },
  ];

  const total = Math.round(
    categories.reduce((acc, c) => acc + (c.score * c.weight) / 100, 0)
  );

  const band: AtsAnalysis["band"] =
    total >= 85 ? "Elite" : total >= 70 ? "Strong" : total >= 50 ? "Average" : "Weak";

  // Issues
  const issues: ResumeIssue[] = [];
  for (const w of WEAK_VERBS) {
    if (lower.includes(w)) {
      issues.push({
        type: "weak-verb",
        text: w,
        suggestion: `Replace "${w}" with a strong action verb (e.g. "led", "engineered", "delivered").`,
      });
    }
  }
  for (const re of PASSIVE_HINTS) {
    const m = text.match(re);
    if (m) {
      issues.push({
        type: "passive",
        text: m[0],
        suggestion: `Rewrite "${m[0]}" in active voice.`,
      });
      break;
    }
  }
  if (!hasNumbers) {
    issues.push({
      type: "no-metric",
      text: "No measurable results detected",
      suggestion: "Add metrics — %, $, user counts, or time saved.",
    });
  }

  const suggestions: string[] = [];
  if (keywordScore < 70) suggestions.push("Add more role-specific keywords from the job description.");
  if (skillScore < 60) suggestions.push("List at least 8–12 relevant technical and soft skills.");
  if (!hasNumbers) suggestions.push("Quantify achievements with numbers and percentages.");
  if (formatScore < 75) suggestions.push("Use clear section headers: Experience, Education, Skills, Projects.");
  if (parsed.missingSections.length) suggestions.push(`Add missing: ${parsed.missingSections.join(", ")}.`);

  return { total, band, categories, matchedKeywords: matched, missingKeywords: missing, suggestions, issues };
}

export function jobMatchProbability(score: number): number {
  // Map ATS score → shortlisting probability with a soft curve
  return Math.round(Math.min(95, Math.max(8, score * 0.9 + 5)));
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function extractKeywords(jd: string): string[] {
  const stop = new Set([
    "the","and","for","with","you","our","are","will","have","this","that","from","into",
    "your","any","all","but","not","can","has","they","their","who","what","when","where",
    "to","of","in","on","at","a","an","is","be","or","as","by","we","it","us",
  ]);
  const counts = new Map<string, number>();
  for (const w of jd.toLowerCase().match(/[a-z][a-z+#.]{2,}/g) ?? []) {
    if (stop.has(w)) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25).map((e) => e[0]);
}

const keywordFeedback = (s: number) =>
  s >= 75 ? "Strong keyword coverage." : s >= 50 ? "Decent — add a few more." : "Low keyword density. Add role-specific terms.";
const skillFeedback = (s: number) =>
  s >= 75 ? "Comprehensive skill set." : s >= 50 ? "Good but could be broader." : "Add more technical skills.";
const expFeedback = (s: number, m: boolean) =>
  m && s >= 70 ? "Quantified, action-driven experience." : "Add measurable achievements and strong verbs.";
const formatFeedback = (s: number) =>
  s >= 75 ? "Clean ATS-friendly structure." : "Use clear sections and consistent formatting.";
const readFeedback = (s: number) =>
  s >= 70 ? "Reads smoothly." : "Sentences may be too long or too short.";
const completeFeedback = (p: ParsedResume) =>
  p.missingSections.length ? `Missing: ${p.missingSections.join(", ")}` : "All key sections present.";

// ---------- Auto-fix ----------

const VERB_REPLACEMENTS: Record<string, string> = {
  "worked on": "engineered",
  "responsible for": "led",
  "helped": "drove",
  "did": "executed",
  "made": "built",
  "handled": "managed",
  "involved in": "delivered",
};

export function autoFixText(text: string): string {
  let out = text;
  for (const [from, to] of Object.entries(VERB_REPLACEMENTS)) {
    const re = new RegExp(`\\b${from}\\b`, "gi");
    out = out.replace(re, to);
  }
  // Add a sample metric hint where bullet starts with a verb
  out = out.replace(/(^|\n)([A-Z][a-z]+ed) ([^\n]+?)(?=\n|$)/g, (m, pre, verb, rest) => {
    if (/\d/.test(rest)) return m;
    return `${pre}${verb} ${rest}, improving outcomes by ~25%`;
  });
  return out;
}