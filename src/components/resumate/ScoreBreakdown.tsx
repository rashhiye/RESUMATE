import { useEffect, useState } from "react";
import type { CategoryScore } from "@/lib/resumate/scoring";
import { cn } from "@/lib/utils";

const colorFor = (score: number) =>
  score >= 75 ? "bg-success" : score >= 50 ? "bg-warning" : "bg-destructive";

export const ScoreBreakdown = ({ categories }: { categories: CategoryScore[] }) => {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-4">
      {categories.map((c, i) => (
        <div key={c.key} style={{ animationDelay: `${i * 80}ms` }} className="animate-fade-in-up opacity-0">
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <span className="font-medium text-sm">{c.label}</span>
              <span className="text-xs text-muted-foreground ml-2">({c.weight}%)</span>
            </div>
            <span className="font-display text-sm font-semibold">{c.score}</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-1000 ease-out", colorFor(c.score))}
              style={{ width: shown ? `${c.score}%` : "0%" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">{c.feedback}</p>
        </div>
      ))}
    </div>
  );
};