import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("image-compressor")!;

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [quality, setQuality] = useState(70);
  const [maxWidth, setMaxWidth] = useState(0);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fmt = (bytes: number) =>
    bytes < 1024 ? `${bytes} B` : bytes < 1048576 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1048576).toFixed(2)} MB`;

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) { toast.error("Please select an image"); return; }
    setFile(f);
    setOriginalSize(f.size);
    const url = URL.createObjectURL(f);
    setPreview(url);
    setResult(null);
    const img = new Image();
    img.onload = () => {
      setOrigW(img.width);
      setOrigH(img.height);
      setMaxWidth(img.width);
    };
    img.src = url;
  };

  const compress = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const scale = maxWidth / img.width;
      const w = maxWidth;
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            setResult(URL.createObjectURL(blob));
            toast.success("Compressed!");
          }
        },
        "image/jpeg",
        quality / 100
      );
    };
    img.src = preview;
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `compressed_${file?.name || "image.jpg"}`;
    a.click();
  };

  const savedPercent = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

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
                <p className="text-xs text-muted-foreground">{origW} × {origH} px • {fmt(originalSize)}</p>
              </div>
            </div>

            {/* Quality Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Quality</label>
                <span className="text-sm font-mono font-bold gradient-text">{quality}%</span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={([v]) => setQuality(v)}
                min={10}
                max={100}
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Smallest file</span>
                <span>Best quality</span>
              </div>
            </div>

            {/* Max Width Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Max Width</label>
                <span className="text-sm font-mono font-bold gradient-text">{maxWidth}px</span>
              </div>
              <Slider
                value={[maxWidth]}
                onValueChange={([v]) => setMaxWidth(v)}
                min={100}
                max={origW}
                step={10}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100px</span>
                <span>{origW}px (original)</span>
              </div>
            </div>

            {/* Estimated output dimensions */}
            <div className="glass rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Output dimensions: <span className="font-semibold text-foreground">{maxWidth} × {Math.round((maxWidth / origW) * origH)}px</span></p>
            </div>

            <Button onClick={compress} className="w-full gradient-primary text-primary-foreground text-base py-5">
              Compress Image
            </Button>
          </>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-lg font-bold">{fmt(originalSize)}</div>
                <div className="text-xs text-muted-foreground">Original</div>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-lg font-bold gradient-text">{fmt(compressedSize)}</div>
                <div className="text-xs text-muted-foreground">Compressed</div>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <div className={`text-lg font-bold ${savedPercent > 0 ? "text-green-400" : "text-yellow-400"}`}>{savedPercent}%</div>
                <div className="text-xs text-muted-foreground">Saved</div>
              </div>
            </div>

            {/* Visual size bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Original</span>
                <span>Compressed</span>
              </div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full gradient-primary transition-all duration-500"
                  style={{ width: `${Math.max(5, (compressedSize / originalSize) * 100)}%` }}
                />
              </div>
            </div>

            <Button onClick={download} className="w-full text-base py-5" variant="outline">
              <Download className="w-4 h-4 mr-2" /> Download Compressed Image
            </Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageCompressor;
