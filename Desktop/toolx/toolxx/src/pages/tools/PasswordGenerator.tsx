import { useState, useCallback } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("password-generator")!;

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { toast.error("Select at least one character type"); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (v) => chars[v % chars.length]).join(""));
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Copied!");
  };

  const strength = () => {
    let s = 0;
    if (uppercase) s += 26;
    if (lowercase) s += 26;
    if (numbers) s += 10;
    if (symbols) s += 26;
    const entropy = length * Math.log2(s || 1);
    if (entropy < 40) return { label: "Weak", color: "bg-red-500" };
    if (entropy < 60) return { label: "Fair", color: "bg-yellow-500" };
    if (entropy < 80) return { label: "Strong", color: "bg-green-500" };
    return { label: "Very Strong", color: "bg-emerald-400" };
  };

  const st = strength();

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Length: {length}</label>
          <Slider value={[length]} onValueChange={([v]) => setLength(v)} min={4} max={64} step={1} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Uppercase (A-Z)", checked: uppercase, set: setUppercase },
            { label: "Lowercase (a-z)", checked: lowercase, set: setLowercase },
            { label: "Numbers (0-9)", checked: numbers, set: setNumbers },
            { label: "Symbols (!@#)", checked: symbols, set: setSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 glass rounded-lg p-3 cursor-pointer">
              <input type="checkbox" checked={opt.checked} onChange={(e) => opt.set(e.target.checked)} className="accent-primary" />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
        <Button onClick={generate} className="w-full gradient-primary text-primary-foreground">
          <RefreshCw className="w-4 h-4 mr-2" /> Generate Password
        </Button>
        {password && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input value={password} readOnly className="font-mono bg-muted/50 border-glass-border" />
              <Button variant="outline" onClick={copy}><Copy className="w-4 h-4" /></Button>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${st.color}`} />
              <span className="text-sm text-muted-foreground">{st.label}</span>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PasswordGenerator;
