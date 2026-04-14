import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Download, Upload, X } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const tool = getToolById("file-compressor")!;

const FileCompressor = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [compressing, setCompressing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  };

  const remove = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const compress = async () => {
    if (!files.length) return;
    setCompressing(true);
    try {
      const zip = new JSZip();
      for (const f of files) {
        zip.file(f.name, f);
      }
      const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } });
      saveAs(blob, "compressed.zip");
      toast.success("Downloaded!");
    } catch {
      toast.error("Compression failed");
    }
    setCompressing(false);
  };

  const fmt = (b: number) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => e.target.files && addFiles(e.target.files)} />
        <div className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => inputRef.current?.click()}>
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Click or drag files</p>
        </div>
        {files.length > 0 && (
          <>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between glass rounded-lg p-3">
                  <span className="text-sm truncate flex-1">{f.name}</span>
                  <span className="text-xs text-muted-foreground mx-2">{fmt(f.size)}</span>
                  <Button variant="ghost" size="sm" onClick={() => remove(i)}><X className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
            <Button onClick={compress} disabled={compressing} className="w-full gradient-primary text-primary-foreground">
              <Download className="w-4 h-4 mr-2" /> {compressing ? "Compressing..." : `Compress ${files.length} file(s) to ZIP`}
            </Button>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default FileCompressor;
