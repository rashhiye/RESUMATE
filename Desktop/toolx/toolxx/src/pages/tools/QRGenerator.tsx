import { useState, useRef } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

const tool = getToolById("qr-generator")!;

const QRGenerator = () => {
  const [value, setValue] = useState("");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLDivElement>(null);

  const download = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <Input
          placeholder="Enter URL or text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-muted/50 border-glass-border"
        />
        {value && (
          <div className="flex flex-col items-center gap-4">
            <div ref={canvasRef} className="p-4 bg-foreground rounded-xl">
              <QRCodeCanvas value={value} size={size} level="H" />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground">Size:</label>
              {[128, 256, 512].map((s) => (
                <Button key={s} variant={size === s ? "default" : "outline"} size="sm" onClick={() => setSize(s)}>
                  {s}px
                </Button>
              ))}
            </div>
            <Button onClick={download} className="gradient-primary text-primary-foreground">
              <Download className="w-4 h-4 mr-2" /> Download PNG
            </Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default QRGenerator;
