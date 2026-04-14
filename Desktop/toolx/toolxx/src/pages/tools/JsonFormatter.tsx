import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("json-formatter")!;

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const copy = () => { navigator.clipboard.writeText(output); toast.success("Copied!"); };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <Textarea placeholder='{"key": "value"}' className="min-h-[180px] bg-muted/50 border-glass-border resize-none font-mono text-sm" value={input} onChange={(e) => setInput(e.target.value)} />
        <div className="flex gap-3">
          <Button onClick={format} disabled={!input} className="flex-1 gradient-primary text-primary-foreground">Format</Button>
          <Button onClick={minify} disabled={!input} variant="outline" className="flex-1">Minify</Button>
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        {output && (
          <div className="space-y-2">
            <div className="flex justify-end"><Button variant="ghost" size="sm" onClick={copy}><Copy className="w-4 h-4 mr-1" /> Copy</Button></div>
            <div className="glass rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-all max-h-80 overflow-y-auto">{output}</div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default JsonFormatter;
