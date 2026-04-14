import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("url-encoder")!;

const UrlEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => setOutput(encodeURIComponent(input));
  const decode = () => { try { setOutput(decodeURIComponent(input)); } catch { toast.error("Invalid encoded string"); } };
  const copy = () => { navigator.clipboard.writeText(output); toast.success("Copied!"); };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <Textarea placeholder="Enter text or encoded URL..." className="min-h-[120px] bg-muted/50 border-glass-border resize-none font-mono text-sm" value={input} onChange={(e) => setInput(e.target.value)} />
        <div className="flex gap-3">
          <Button onClick={encode} disabled={!input} className="flex-1 gradient-primary text-primary-foreground">Encode</Button>
          <Button onClick={decode} disabled={!input} variant="outline" className="flex-1">Decode</Button>
        </div>
        {output && (
          <div className="space-y-2">
            <div className="flex justify-end"><Button variant="ghost" size="sm" onClick={copy}><Copy className="w-4 h-4 mr-1" /> Copy</Button></div>
            <div className="glass rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-all">{output}</div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default UrlEncoder;
