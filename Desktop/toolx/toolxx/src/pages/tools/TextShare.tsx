import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("text-share")!;

const TextShare = () => {
  const [text, setText] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  const generate = () => {
    if (!text.trim()) { toast.error("Enter some text first"); return; }
    const encoded = btoa(unescape(encodeURIComponent(text)));
    const url = `${window.location.origin}/shared?t=${encoded}`;
    setShareUrl(url);
    toast.success("Share link generated!");
  };

  const copy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <Textarea
          placeholder="Enter the text you want to share..."
          className="min-h-[200px] bg-muted/50 border-glass-border resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">Text is encoded in the URL — no server storage needed. Works best for shorter texts.</p>
        <Button onClick={generate} disabled={!text.trim()} className="w-full gradient-primary text-primary-foreground">
          <LinkIcon className="w-4 h-4 mr-2" /> Generate Share Link
        </Button>
        {shareUrl && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input value={shareUrl} readOnly className="flex-1 bg-muted/50 border border-glass-border rounded-lg px-3 py-2 text-sm font-mono truncate text-foreground" />
              <Button variant="outline" onClick={copy}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default TextShare;
