import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const tool = getToolById("word-counter")!;

const WordCounter = () => {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter((p) => p.trim()).length : 0;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <ToolPageLayout tool={tool}>
      <Textarea
        placeholder="Paste or type your text here..."
        className="min-h-[200px] bg-muted/50 border-glass-border resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {[
          { label: "Words", value: words },
          { label: "Characters", value: chars },
          { label: "No Spaces", value: charsNoSpace },
          { label: "Sentences", value: sentences },
          { label: "Paragraphs", value: paragraphs },
          { label: "Read Time", value: `${readTime} min` },
        ].map((s) => (
          <div key={s.label} className="glass rounded-lg p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      {text && (
        <Button variant="outline" className="mt-4" onClick={() => setText("")}>
          Clear
        </Button>
      )}
    </ToolPageLayout>
  );
};

export default WordCounter;
