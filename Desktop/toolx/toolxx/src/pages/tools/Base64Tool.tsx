import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("base64")!;

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => { try { setOutput(btoa(unescape(encodeURIComponent(input)))); } catch { toast.error("Encoding failed"); } };
  const decode = () => { try { setOutput(decodeURIComponent(escape(atob(input)))); } catch { toast.error("Invalid Base64 string"); } };
  const copy = () => { navigator.clipboard.writeText(output); toast.success("Copied!"); };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <Textarea placeholder="Enter text or Base64 string..." className="min-h-[150px] bg-muted/50 border-glass-border resize-none" value={input} onChange={(e) => setInput(e.target.value)} />
        <div className="flex gap-3">
          <Button onClick={encode} disabled={!input} className="flex-1 gradient-primary text-primary-foreground">Encode</Button>
          <Button onClick={decode} disabled={!input} variant="outline" className="flex-1">Decode</Button>
        </div>
        {output && (
          <div className="space-y-2">
            <div className="flex justify-end"><Button variant="ghost" size="sm" onClick={copy}><Copy className="w-4 h-4 mr-1" /> Copy</Button></div>
            <div className="glass rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-all max-h-60 overflow-y-auto">{output}</div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default Base64Tool;
