import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Upload, Copy, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("file-share")!;

const FileShare = () => {
  const [file, setFile] = useState<File | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (f.size > 5 * 1024 * 1024) { toast.error("File must be under 5MB"); return; }
    setFile(f);
    setShareUrl("");
  };

  const generate = async () => {
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        const data = JSON.stringify({ name: file.name, type: file.type, data: base64 });
        const encoded = btoa(data);
        // For large files this URL will be very long; real implementation needs Cloud storage
        if (encoded.length > 8000) {
          toast.error("File too large for URL encoding. Connect Lovable Cloud for server-based sharing.");
          return;
        }
        const url = `${window.location.origin}/shared?f=${encoded}`;
        setShareUrl(url);
        toast.success("Share link generated!");
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Failed to generate share link");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Copied!");
  };

  const fmt = (b: number) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <input ref={inputRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <div className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => inputRef.current?.click()}>
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">{file ? `${file.name} (${fmt(file.size)})` : "Drop a file here (max 5MB)"}</p>
        </div>
        <p className="text-xs text-muted-foreground">Small files are encoded in the URL. For larger files, connect Lovable Cloud for server-based sharing with auto-expiry.</p>
        {file && (
          <Button onClick={generate} className="w-full gradient-primary text-primary-foreground">
            <LinkIcon className="w-4 h-4 mr-2" /> Generate Share Link
          </Button>
        )}
        {shareUrl && (
          <div className="flex gap-2">
            <input value={shareUrl} readOnly className="flex-1 bg-muted/50 border border-glass-border rounded-lg px-3 py-2 text-sm font-mono truncate text-foreground" />
            <Button variant="outline" onClick={copy}><Copy className="w-4 h-4" /></Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default FileShare;
