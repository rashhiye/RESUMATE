import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("case-converter")!;

const conversions = [
  { label: "UPPERCASE", fn: (t: string) => t.toUpperCase() },
  { label: "lowercase", fn: (t: string) => t.toLowerCase() },
  { label: "Title Case", fn: (t: string) => t.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
  { label: "Sentence case", fn: (t: string) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() },
  { label: "aLtErNaTiNg", fn: (t: string) => t.split("").map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join("") },
];

const CaseConverter = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const copy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
  };

  return (
    <ToolPageLayout tool={tool}>
      <Textarea
        placeholder="Enter your text here..."
        className="min-h-[150px] bg-muted/50 border-glass-border resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {conversions.map((c) => (
          <Button key={c.label} variant="outline" size="sm" onClick={() => setResult(c.fn(text))} disabled={!text}>
            {c.label}
          </Button>
        ))}
      </div>
      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Result</span>
            <Button variant="ghost" size="sm" onClick={copy}><Copy className="w-4 h-4 mr-1" /> Copy</Button>
          </div>
          <div className="glass rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-all">{result}</div>
        </div>
      )}
    </ToolPageLayout>
  );
};

export default CaseConverter;
