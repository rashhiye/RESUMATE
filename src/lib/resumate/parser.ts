// Resume parsing utilities — extracts text from PDF, DOCX, TXT, and (basic) images
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// Use CDN worker for pdfjs (avoids worker config issues in Vite)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export type FileKind = "pdf" | "docx" | "txt" | "image" | "unknown";

export const detectKind = (file: File): FileKind => {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") return "pdf";
  if (name.endsWith(".docx") || file.type.includes("officedocument")) return "docx";
  if (name.endsWith(".txt") || file.type === "text/plain") return "txt";
  if (file.type.startsWith("image/") || /\.(png|jpg|jpeg|webp)$/.test(name)) return "image";
  return "unknown";
};

export const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB

export async function extractText(file: File): Promise<string> {
  const kind = detectKind(file);
  if (kind === "txt") return await file.text();
  if (kind === "pdf") return await extractPdf(file);
  if (kind === "docx") return await extractDocx(file);
  if (kind === "image") {
    // Lightweight simulation — real OCR (Tesseract.js) would be heavy.
    // We acknowledge the file but ask user for text. Caller handles fallback.
    throw new Error(
      "Image OCR is not available in this build. Please upload PDF, DOCX, or TXT for full extraction."
    );
  }
  throw new Error("Unsupported file type");
}

async function extractPdf(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let out = "";
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const strings = content.items.map((it: { str: string }) => it.str).filter(Boolean);
    out += strings.join(" ") + "\n\n";
  }
  return out.trim();
}

async function extractDocx(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buf });
  return result.value.trim();
}

// ---------- Structured parsing ----------

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string[];
  education: string[];
  projects: string[];
  rawText: string;
  missingSections: string[];
  wordCount: number;
}

const SKILL_DICT = [
  "JavaScript","TypeScript","React","Next.js","Node.js","Python","Java","C++","C#","Go",
  "Rust","Ruby","PHP","Swift","Kotlin","SQL","PostgreSQL","MySQL","MongoDB","Redis",
  "AWS","GCP","Azure","Docker","Kubernetes","Terraform","Git","CI/CD","REST","GraphQL",
  "HTML","CSS","Tailwind","Sass","Vue","Angular","Svelte","Express","Django","Flask",
  "FastAPI","Spring","Laravel","TensorFlow","PyTorch","Pandas","NumPy","Scikit-learn",
  "Machine Learning","Deep Learning","NLP","Computer Vision","Data Analysis","Excel",
  "Power BI","Tableau","Figma","Photoshop","Illustrator","Agile","Scrum","Jira",
  "Linux","Bash","Microservices","System Design","Testing","Jest","Cypress","Selenium",
];

export function parseResume(text: string): ParsedResume {
  const cleaned = text.replace(/\r/g, "").trim();
  const emailMatch = cleaned.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = cleaned.match(/(\+?\d[\d\s().-]{7,}\d)/);
  const lines = cleaned.split("\n").map((l) => l.trim()).filter(Boolean);
  const name = guessName(lines);

  const lower = cleaned.toLowerCase();
  const skills = SKILL_DICT.filter((s) => {
    const re = new RegExp(`\\b${s.replace(/[+.]/g, "\\$&")}\\b`, "i");
    return re.test(cleaned);
  });

  const experience = sliceSection(cleaned, ["experience", "work history", "employment"]);
  const education = sliceSection(cleaned, ["education", "academic"]);
  const projects = sliceSection(cleaned, ["projects", "personal projects"]);

  const missingSections: string[] = [];
  if (!emailMatch) missingSections.push("Email");
  if (!phoneMatch) missingSections.push("Phone");
  if (skills.length < 5) missingSections.push("Skills (need more)");
  if (experience.length === 0) missingSections.push("Experience");
  if (education.length === 0) missingSections.push("Education");

  return {
    name,
    email: emailMatch?.[0] ?? "",
    phone: phoneMatch?.[0]?.trim() ?? "",
    skills,
    experience,
    education,
    projects,
    rawText: cleaned,
    missingSections,
    wordCount: cleaned.split(/\s+/).filter(Boolean).length,
  };
}

function guessName(lines: string[]): string {
  for (const line of lines.slice(0, 5)) {
    if (/@|\d{3}/.test(line)) continue;
    const words = line.split(/\s+/);
    if (words.length >= 2 && words.length <= 5 && /^[A-Za-z][A-Za-z .'-]+$/.test(line)) {
      return line;
    }
  }
  return "";
}

function sliceSection(text: string, headers: string[]): string[] {
  const lower = text.toLowerCase();
  for (const h of headers) {
    const idx = lower.indexOf(h);
    if (idx === -1) continue;
    const after = text.slice(idx + h.length, idx + h.length + 1500);
    return after
      .split(/\n+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 5)
      .slice(0, 8);
  }
  return [];
}