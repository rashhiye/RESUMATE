import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("format-converter")!;

const formats = ["image/jpeg", "image/png", "image/webp"] as const;
const labels: Record<string, string> = { "image/jpeg": "JPG", "image/png": "PNG", "image/webp": "WEBP" };

const FormatConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [format, setFormat] = useState<string>("image/png");
  const [result, setResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) { toast.error("Select an image"); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const convert = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      setResult(canvas.toDataURL(format, 0.92));
      toast.success(`Converted to ${labels[format]}!`);
    };
    img.src = preview;
  };

  const ext = labels[format]?.toLowerCase() || "png";

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <div className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => inputRef.current?.click()}>
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Click or drag an image</p>
        </div>

        {preview && (
          <>
            <div className="flex gap-2">
              {formats.map((f) => (
                <Button key={f} variant={format === f ? "default" : "outline"} size="sm" onClick={() => setFormat(f)}>
                  {labels[f]}
                </Button>
              ))}
            </div>
            <Button onClick={convert} className="w-full gradient-primary text-primary-foreground">Convert</Button>
          </>
        )}

        {result && (
          <Button onClick={() => {
            const a = document.createElement("a");
            a.href = result;
            a.download = `converted.${ext}`;
            a.click();
          }} className="w-full" variant="outline">
            <Download className="w-4 h-4 mr-2" /> Download {labels[format]}
          </Button>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default FormatConverter;
