import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

const tool = getToolById("split-pdf")!;

const SplitPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (f: File) => {
    if (f.type !== "application/pdf") { toast.error("Only PDF files"); return; }
    setFile(f);
    const bytes = await f.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const count = pdf.getPageCount();
    setPageCount(count);
    setFrom(1);
    setTo(count);
  };

  const split = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(bytes);
      const newPdf = await PDFDocument.create();
      const indices = [];
      for (let i = from - 1; i < to && i < srcPdf.getPageCount(); i++) indices.push(i);
      const pages = await newPdf.copyPages(srcPdf, indices);
      pages.forEach((p) => newPdf.addPage(p));
      const newBytes = await newPdf.save();
      const blob = new Blob([newBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `split_pages_${from}-${to}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF split successfully!");
    } catch {
      toast.error("Failed to split PDF");
    }
    setProcessing(false);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <div className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => inputRef.current?.click()}>
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">{file ? file.name : "Drop a PDF file here or click to browse"}</p>
        </div>
        {file && pageCount > 0 && (
          <>
            <p className="text-sm text-muted-foreground">Total pages: <span className="font-semibold text-foreground">{pageCount}</span></p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">From page</label>
                <Input type="number" min={1} max={pageCount} value={from} onChange={(e) => setFrom(+e.target.value)} className="bg-muted/50 border-glass-border" />
              </div>
              <div>
                <label className="text-sm mb-1 block">To page</label>
                <Input type="number" min={from} max={pageCount} value={to} onChange={(e) => setTo(+e.target.value)} className="bg-muted/50 border-glass-border" />
              </div>
            </div>
            <Button onClick={split} disabled={processing} className="w-full gradient-primary text-primary-foreground">
              <Download className="w-4 h-4 mr-2" /> {processing ? "Splitting..." : `Extract Pages ${from}–${to}`}
            </Button>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default SplitPdf;
