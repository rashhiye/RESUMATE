import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Upload, Download, X } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

const tool = getToolById("merge-pdf")!;

const MergePdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList) => {
    const pdfs = Array.from(newFiles).filter((f) => f.type === "application/pdf");
    if (pdfs.length !== newFiles.length) toast.error("Only PDF files are accepted");
    setFiles((prev) => [...prev, ...pdfs]);
  };

  const merge = async () => {
    if (files.length < 2) { toast.error("Add at least 2 PDFs"); return; }
    setProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDFs merged successfully!");
    } catch {
      toast.error("Failed to merge PDFs");
    }
    setProcessing(false);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <input ref={inputRef} type="file" accept=".pdf" multiple className="hidden" onChange={(e) => e.target.files && addFiles(e.target.files)} />
        <div
          className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); e.dataTransfer.files && addFiles(e.dataTransfer.files); }}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Drop PDF files here or click to browse</p>
        </div>
        {files.length > 0 && (
          <>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between glass rounded-lg p-3">
                  <span className="text-sm truncate flex-1">{f.name}</span>
                  <span className="text-xs text-muted-foreground mx-2">{(f.size / 1024).toFixed(1)} KB</span>
                  <Button variant="ghost" size="sm" onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))}><X className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
            <Button onClick={merge} disabled={processing} className="w-full gradient-primary text-primary-foreground">
              <Download className="w-4 h-4 mr-2" /> {processing ? "Merging..." : `Merge ${files.length} PDFs`}
            </Button>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default MergePdf;
