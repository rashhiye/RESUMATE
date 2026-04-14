import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Download, Upload, ImageIcon, Link2, Link2Off } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("image-resizer")!;

const presets = [
  { label: "HD", w: 1280, h: 720 },
  { label: "Full HD", w: 1920, h: 1080 },
  { label: "2K", w: 2560, h: 1440 },
  { label: "4K", w: 3840, h: 2160 },
  { label: "Instagram", w: 1080, h: 1080 },
  { label: "Twitter", w: 1200, h: 675 },
  { label: "Thumbnail", w: 150, h: 150 },
  { label: "Icon", w: 64, h: 64 },
];

const ImageResizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [keepAspect, setKeepAspect] = useState(true);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) { toast.error("Select an image"); return; }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    const img = new Image();
    img.onload = () => { setOrigW(img.width); setOrigH(img.height); setWidth(img.width); setHeight(img.height); };
    img.src = url;
    setResult(null);
  };

  const updateWidth = (w: number) => {
    setWidth(w);
    if (keepAspect && origW) setHeight(Math.round((w / origW) * origH));
  };

  const updateHeight = (h: number) => {
    setHeight(h);
    if (keepAspect && origH) setWidth(Math.round((h / origH) * origW));
  };

  const applyPreset = (pw: number, ph: number) => {
    setWidth(pw);
    setHeight(ph);
    setKeepAspect(false);
  };

  const scalePercent = origW > 0 ? Math.round((width / origW) * 100) : 100;

  const resize = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      setResult(canvas.toDataURL("image/png"));
      toast.success("Resized!");
    };
    img.src = preview;
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <div
          className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Click or drag an image</p>
        </div>

        {preview && file && (
          <>
            {/* File info */}
            <div className="glass rounded-lg p-4 flex items-center gap-4">
              <ImageIcon className="w-8 h-8 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">Original: {origW} × {origH}px</p>
              </div>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Presets</label>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <Button
                    key={p.label}
                    variant={width === p.w && height === p.h ? "default" : "outline"}
                    size="sm"
                    onClick={() => applyPreset(p.w, p.h)}
                    className="text-xs"
                  >
                    {p.label} ({p.w}×{p.h})
                  </Button>
                ))}
              </div>
            </div>

            {/* Aspect ratio toggle */}
            <button
              onClick={() => setKeepAspect(!keepAspect)}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-all ${keepAspect ? "glass text-primary" : "glass text-muted-foreground"}`}
            >
              {keepAspect ? <Link2 className="w-4 h-4" /> : <Link2Off className="w-4 h-4" />}
              {keepAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
            </button>

            {/* Width controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Width</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => updateWidth(+e.target.value)}
                    className="w-24 h-8 text-sm bg-muted/50 border-glass-border font-mono text-right"
                  />
                  <span className="text-xs text-muted-foreground">px</span>
                </div>
              </div>
              <Slider
                value={[width]}
                onValueChange={([v]) => updateWidth(v)}
                min={1}
                max={Math.max(origW * 2, 4000)}
                step={1}
              />
            </div>

            {/* Height controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Height</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => updateHeight(+e.target.value)}
                    className="w-24 h-8 text-sm bg-muted/50 border-glass-border font-mono text-right"
                  />
                  <span className="text-xs text-muted-foreground">px</span>
                </div>
              </div>
              <Slider
                value={[height]}
                onValueChange={([v]) => updateHeight(v)}
                min={1}
                max={Math.max(origH * 2, 4000)}
                step={1}
              />
            </div>

            {/* Scale info */}
            <div className="glass rounded-lg p-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Scale</span>
              <span className={`text-sm font-mono font-bold ${scalePercent > 100 ? "text-yellow-400" : scalePercent < 50 ? "text-green-400" : "gradient-text"}`}>
                {scalePercent}%
              </span>
            </div>

            {/* Output preview */}
            <div className="glass rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">
                Output: <span className="font-semibold text-foreground">{width} × {height}px</span>
                {scalePercent > 100 && <span className="text-yellow-400 ml-2">(upscaling — may lose quality)</span>}
              </p>
            </div>

            <Button onClick={resize} className="w-full gradient-primary text-primary-foreground text-base py-5">
              Resize Image
            </Button>
          </>
        )}

        {result && (
          <Button onClick={() => {
            const a = document.createElement("a");
            a.href = result;
            a.download = `resized_${file?.name || "image.png"}`;
            a.click();
          }} className="w-full text-base py-5" variant="outline">
            <Download className="w-4 h-4 mr-2" /> Download Resized Image
          </Button>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageResizer;
