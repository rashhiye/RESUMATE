import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("lorem-generator")!;

const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function generateLorem(count: number, unit: "words" | "sentences" | "paragraphs") {
  const getWords = (n: number) => Array.from({ length: n }, (_, i) => words[i % words.length]).join(" ");
  const getSentence = () => { const w = getWords(8 + Math.floor(Math.random() * 10)); return w.charAt(0).toUpperCase() + w.slice(1) + "."; };
  const getParagraph = () => Array.from({ length: 4 + Math.floor(Math.random() * 4) }, getSentence).join(" ");

  if (unit === "words") return getWords(count);
  if (unit === "sentences") return Array.from({ length: count }, getSentence).join(" ");
  return Array.from({ length: count }, getParagraph).join("\n\n");
}

const LoremGenerator = () => {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<"words" | "sentences" | "paragraphs">("paragraphs");
  const [result, setResult] = useState("");

  const generate = () => setResult(generateLorem(count, unit));
  const copy = () => { navigator.clipboard.writeText(result); toast.success("Copied!"); };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm mb-1 block">Count</label>
            <Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(+e.target.value)} className="bg-muted/50 border-glass-border" />
          </div>
          <div className="flex gap-2">
            {(["words", "sentences", "paragraphs"] as const).map((u) => (
              <Button key={u} variant={unit === u ? "default" : "outline"} size="sm" onClick={() => setUnit(u)} className="capitalize">{u}</Button>
            ))}
          </div>
        </div>
        <Button onClick={generate} className="w-full gradient-primary text-primary-foreground">Generate</Button>
        {result && (
          <div className="space-y-3">
            <div className="flex justify-end"><Button variant="ghost" size="sm" onClick={copy}><Copy className="w-4 h-4 mr-1" /> Copy</Button></div>
            <div className="glass rounded-lg p-4 text-sm text-muted-foreground whitespace-pre-wrap max-h-80 overflow-y-auto">{result}</div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default LoremGenerator;
