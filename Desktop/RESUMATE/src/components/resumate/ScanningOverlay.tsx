import { Sparkles } from "lucide-react";

export const ScanningOverlay = () => (
  <div className="relative rounded-2xl glass overflow-hidden p-12 min-h-[300px] flex flex-col items-center justify-center">
    <div
      className="absolute inset-x-0 h-24 pointer-events-none"
      style={{
        background: "linear-gradient(180deg, transparent, hsl(var(--primary) / 0.35), transparent)",
        animation: "scan-line 2s linear infinite",
      }}
    />
    <Sparkles className="h-10 w-10 text-primary animate-pulse" />
    <p className="mt-4 font-display text-lg font-semibold">Scanning Resume…</p>
    <p className="text-sm text-muted-foreground mt-1">Running ATS simulation and recruiter heuristics</p>
  </div>
);