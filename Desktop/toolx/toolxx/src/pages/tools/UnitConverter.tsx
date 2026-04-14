import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Input } from "@/components/ui/input";

const tool = getToolById("unit-converter")!;

const conversions = {
  Length: [
    { name: "Meters", factor: 1 },
    { name: "Kilometers", factor: 0.001 },
    { name: "Miles", factor: 0.000621371 },
    { name: "Feet", factor: 3.28084 },
    { name: "Inches", factor: 39.3701 },
    { name: "Centimeters", factor: 100 },
  ],
  Weight: [
    { name: "Grams", factor: 1 },
    { name: "Kilograms", factor: 0.001 },
    { name: "Pounds", factor: 0.00220462 },
    { name: "Ounces", factor: 0.035274 },
  ],
  Temperature: [],
  Data: [
    { name: "Bytes", factor: 1 },
    { name: "KB", factor: 1 / 1024 },
    { name: "MB", factor: 1 / 1048576 },
    { name: "GB", factor: 1 / 1073741824 },
    { name: "TB", factor: 1 / 1099511627776 },
  ],
};

const categories = Object.keys(conversions) as (keyof typeof conversions)[];

const UnitConverter = () => {
  const [cat, setCat] = useState<keyof typeof conversions>("Length");
  const [value, setValue] = useState("1");

  const num = parseFloat(value) || 0;
  const units = conversions[cat];

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${cat === c ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
        <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value..." className="bg-muted/50 border-glass-border font-mono text-lg" />
        {cat === "Temperature" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Celsius</div>
              <div className="font-mono font-bold">{num.toFixed(2)} °C</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Fahrenheit</div>
              <div className="font-mono font-bold">{(num * 9/5 + 32).toFixed(2)} °F</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Kelvin</div>
              <div className="font-mono font-bold">{(num + 273.15).toFixed(2)} K</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {units.map((u) => (
              <div key={u.name} className="glass rounded-lg p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">{u.name}</div>
                <div className="font-mono font-bold text-sm">{(num * u.factor).toLocaleString(undefined, { maximumFractionDigits: 6 })}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default UnitConverter;
