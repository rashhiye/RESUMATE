import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const tool = getToolById("timestamp-converter")!;

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 19));

  const fromTs = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) return;
    const d = ts.toString().length > 10 ? new Date(ts) : new Date(ts * 1000);
    setDateStr(d.toISOString().slice(0, 19));
  };

  const fromDate = () => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return;
    setTimestamp(Math.floor(d.getTime() / 1000).toString());
  };

  const now = () => {
    const n = new Date();
    setTimestamp(Math.floor(n.getTime() / 1000).toString());
    setDateStr(n.toISOString().slice(0, 19));
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <Button onClick={now} variant="outline" size="sm">Set Current Time</Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Unix Timestamp</label>
            <Input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="bg-muted/50 border-glass-border font-mono" />
            <Button onClick={fromTs} className="w-full gradient-primary text-primary-foreground">→ Convert to Date</Button>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium">Date & Time</label>
            <Input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="bg-muted/50 border-glass-border" />
            <Button onClick={fromDate} className="w-full" variant="outline">→ Convert to Timestamp</Button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TimestampConverter;
