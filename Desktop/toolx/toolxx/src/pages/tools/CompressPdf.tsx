import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

const tool = getToolById("compress-pdf")!;

const CompressPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") { toast.error("Only PDF files"); return; }
    setFile(f);
    setOriginalSize(f.size);
    setResultUrl(null);
  };

  const compress = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(bytes);
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(srcPdf, srcPdf.getPageIndices());
      pages.forEach((p) => newPdf.addPage(p));
      const compressed = await newPdf.save({ useObjectStreams: true });
      setCompressedSize(compressed.byteLength);
      const blob = new Blob([compressed.buffer as ArrayBuffer], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      toast.success("PDF compressed!");
    } catch {
      toast.error("Failed to compress PDF");
    }
    setProcessing(false);
  };

  const fmt = (b: number) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <div className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => inputRef.current?.click()}>
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">{file ? file.name : "Drop a PDF file here"}</p>
        </div>
        {file && !resultUrl && (
          <Button onClick={compress} disabled={processing} className="w-full gradient-primary text-primary-foreground">
            {processing ? "Compressing..." : "Compress PDF"}
          </Button>
        )}
        {resultUrl && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-lg font-bold">{fmt(originalSize)}</div>
                <div className="text-xs text-muted-foreground">Original</div>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-lg font-bold gradient-text">{fmt(compressedSize)}</div>
                <div className="text-xs text-muted-foreground">
                  Compressed ({Math.max(0, Math.round((1 - compressedSize / originalSize) * 100))}% saved)
                </div>
              </div>
            </div>
            <Button onClick={() => {
              const a = document.createElement("a");
              a.href = resultUrl;
              a.download = `compressed_${file?.name || "document.pdf"}`;
              a.click();
            }} className="w-full" variant="outline">
              <Download className="w-4 h-4 mr-2" /> Download Compressed PDF
            </Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default CompressPdf;
