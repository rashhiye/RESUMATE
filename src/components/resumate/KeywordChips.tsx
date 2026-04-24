import { Check, X } from "lucide-react";

export const KeywordChips = ({
  matched,
  missing,
}: {
  matched: string[];
  missing: string[];
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-display font-semibold text-sm mb-3 flex items-center gap-2">
          <Check className="h-4 w-4 text-success" />
          Matched Keywords ({matched.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {matched.length === 0 && (
            <p className="text-xs text-muted-foreground">No matches found.</p>
          )}
          {matched.slice(0, 20).map((k) => (
            <span
              key={k}
              className="px-2.5 py-1 text-xs rounded-full bg-success/15 text-success border border-success/30"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold text-sm mb-3 flex items-center gap-2">
          <X className="h-4 w-4 text-destructive" />
          Missing / Suggested ({missing.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {missing.length === 0 && (
            <p className="text-xs text-muted-foreground">Nothing critical missing.</p>
          )}
          {missing.map((k) => (
            <span
              key={k}
              className="px-2.5 py-1 text-xs rounded-full bg-destructive/10 text-destructive border border-destructive/30"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};