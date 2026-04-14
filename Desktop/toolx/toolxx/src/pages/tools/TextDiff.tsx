import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Textarea } from "@/components/ui/textarea";

const tool = getToolById("text-diff")!;

const TextDiff = () => {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const linesA = textA.split("\n");
  const linesB = textB.split("\n");
  const maxLines = Math.max(linesA.length, linesB.length);

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Original</label>
            <Textarea placeholder="Paste original text..." className="min-h-[200px] bg-muted/50 border-glass-border resize-none font-mono text-sm" value={textA} onChange={(e) => setTextA(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Modified</label>
            <Textarea placeholder="Paste modified text..." className="min-h-[200px] bg-muted/50 border-glass-border resize-none font-mono text-sm" value={textB} onChange={(e) => setTextB(e.target.value)} />
          </div>
        </div>
        {(textA || textB) && (
          <div className="glass rounded-lg p-4 font-mono text-sm space-y-0.5 max-h-80 overflow-y-auto">
            {Array.from({ length: maxLines }).map((_, i) => {
              const a = linesA[i] ?? "";
              const b = linesB[i] ?? "";
              const same = a === b;
              return (
                <div key={i} className={`px-2 py-0.5 rounded ${same ? "" : a && !b ? "bg-destructive/20 text-destructive" : !a && b ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                  <span className="text-muted-foreground mr-3 select-none">{i + 1}</span>
                  {same ? a : !a ? `+ ${b}` : !b ? `- ${a}` : `~ ${b}`}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default TextDiff;
