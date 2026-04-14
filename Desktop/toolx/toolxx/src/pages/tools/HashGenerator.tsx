import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("hash-generator")!;

async function computeHash(text: string, algo: string) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const HashGenerator = () => {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generate = async () => {
    if (!text) { toast.error("Enter some text"); return; }
    const [sha1, sha256, sha512] = await Promise.all([
      computeHash(text, "SHA-1"),
      computeHash(text, "SHA-256"),
      computeHash(text, "SHA-512"),
    ]);
    setHashes({ "SHA-1": sha1, "SHA-256": sha256, "SHA-512": sha512 });
  };

  const copy = (v: string) => { navigator.clipboard.writeText(v); toast.success("Copied!"); };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <Textarea placeholder="Enter text to hash..." className="min-h-[120px] bg-muted/50 border-glass-border resize-none" value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={generate} disabled={!text} className="w-full gradient-primary text-primary-foreground">Generate Hashes</Button>
        {Object.keys(hashes).length > 0 && (
          <div className="space-y-3">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-primary">{algo}</span>
                  <Button variant="ghost" size="sm" onClick={() => copy(hash)}><Copy className="w-3 h-3" /></Button>
                </div>
                <p className="font-mono text-xs break-all text-muted-foreground">{hash}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default HashGenerator;
