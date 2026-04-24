import { useCallback, useRef, useState } from "react";
import { Upload, FileText, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { extractText, detectKind, MAX_FILE_BYTES, parseResume, type ParsedResume } from "@/lib/resumate/parser";
import { toast } from "@/hooks/use-toast";

interface Props {
  onParsed: (parsed: ParsedResume, file: File) => void;
}

export const UploadBox = ({ onParsed }: Props) => {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    setError(null);

    if (f.size > MAX_FILE_BYTES) {
      setError("File is too large. Max 8 MB.");
      return;
    }
    const kind = detectKind(f);
    if (kind === "unknown") {
      setError("Unsupported file type. Use PDF, DOCX, TXT, or image.");
      return;
    }
    setFile(f);
    setBusy(true);
    setProgress(10);

    const tick = setInterval(() => {
      setProgress((p) => Math.min(p + 8, 85));
    }, 120);

    try {
      const text = await extractText(f);
      clearInterval(tick);
      setProgress(100);
      const parsed = parseResume(text);
      onParsed(parsed, f);
      toast({ title: "Resume parsed", description: `${parsed.wordCount} words analyzed.` });
    } catch (e: unknown) {
      clearInterval(tick);
      setProgress(0);
      setError(e?.message || "Failed to extract text from file.");
    } finally {
      setBusy(false);
    }
  }, [onParsed]);

  const reset = () => {
    setFile(null);
    setProgress(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-8 md:p-12 transition-all duration-300 glass overflow-hidden",
        drag && "shadow-neon scale-[1.01]",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity pointer-events-none",
          drag && "opacity-100"
        )}
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative">
        {!file ? (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow">
              <Upload className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">Drop your resume here</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Supports PDF, DOCX, TXT, and images · Max 8 MB
              </p>
            </div>
            <Button
              onClick={() => inputRef.current?.click()}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-neon"
              size="lg"
            >
              Choose File
            </Button>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.webp,application/pdf,text/plain"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm truncate max-w-[220px] md:max-w-md">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={reset} disabled={busy}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {busy ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Extracting text from your resume…</span>
                </>
              ) : progress === 100 ? (
                <span className="text-success">✓ Ready for analysis</span>
              ) : null}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-lg border border-destructive/40 bg-destructive/10 flex items-start gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};