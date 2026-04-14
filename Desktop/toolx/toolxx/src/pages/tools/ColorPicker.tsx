import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("color-picker")!;

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const ColorPicker = () => {
  const [color, setColor] = useState("#7c3aed");
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const values = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  const copy = (v: string) => { navigator.clipboard.writeText(v); toast.success("Copied!"); };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-20 h-20 rounded-lg cursor-pointer border-0 bg-transparent" />
          <div className="flex-1">
            <label className="text-sm mb-1 block">HEX Value</label>
            <Input value={color} onChange={(e) => setColor(e.target.value)} className="bg-muted/50 border-glass-border font-mono" />
          </div>
        </div>
        <div className="w-full h-24 rounded-xl" style={{ backgroundColor: color }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {values.map((v) => (
            <div key={v.label} className="glass rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">{v.label}</div>
                <div className="font-mono text-sm">{v.value}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => copy(v.value)}><Copy className="w-3 h-3" /></Button>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default ColorPicker;
