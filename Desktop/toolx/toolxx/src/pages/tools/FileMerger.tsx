import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Download, Upload, X } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const tool = getToolById("file-merger")!;

const FileMerger = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const merge = async () => {
    if (files.length < 2) { toast.error("Add at least 2 files"); return; }
    setMerging(true);
    try {
      const zip = new JSZip();
      files.forEach((f) => zip.file(f.name, f));
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "merged.zip");
      toast.success("Downloaded!");
    } catch {
      toast.error("Merge failed");
    }
    setMerging(false);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => e.target.files && setFiles((p) => [...p, ...Array.from(e.target.files!)])} />
        <div className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => inputRef.current?.click()}>
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Click or drag files to merge</p>
        </div>
        {files.length > 0 && (
          <>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between glass rounded-lg p-3">
                  <span className="text-sm truncate flex-1">{f.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))}><X className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
            <Button onClick={merge} disabled={merging} className="w-full gradient-primary text-primary-foreground">
              <Download className="w-4 h-4 mr-2" /> {merging ? "Merging..." : `Merge ${files.length} files into ZIP`}
            </Button>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default FileMerger;
