import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const SharedPage = () => {
  const [params] = useSearchParams();
  const textData = params.get("t");
  const fileData = params.get("f");

  let decodedText = "";
  let fileInfo: { name: string; type: string; data: string } | null = null;

  try {
    if (textData) {
      decodedText = decodeURIComponent(escape(atob(textData)));
    }
    if (fileData) {
      fileInfo = JSON.parse(atob(fileData));
    }
  } catch {
    // ignore
  }

  const copyText = () => {
    navigator.clipboard.writeText(decodedText);
    toast.success("Copied!");
  };

  const downloadFile = () => {
    if (!fileInfo) return;
    const byteChars = atob(fileInfo.data);
    const byteArray = new Uint8Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) byteArray[i] = byteChars.charCodeAt(i);
    const blob = new Blob([byteArray.buffer as ArrayBuffer], { type: fileInfo.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileInfo.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-8 max-w-2xl">
        {decodedText ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Shared Text</h1>
            <div className="glass rounded-xl p-6 whitespace-pre-wrap break-words">{decodedText}</div>
            <Button onClick={copyText} variant="outline"><Copy className="w-4 h-4 mr-2" /> Copy Text</Button>
          </div>
        ) : fileInfo ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Shared File</h1>
            <div className="glass rounded-xl p-6 text-center">
              <p className="font-semibold mb-2">{fileInfo.name}</p>
              <p className="text-sm text-muted-foreground mb-4">{fileInfo.type}</p>
              <Button onClick={downloadFile} className="gradient-primary text-primary-foreground">
                <Download className="w-4 h-4 mr-2" /> Download File
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-2">Invalid or Expired Link</h1>
            <p className="text-muted-foreground mb-6">This shared content is no longer available.</p>
            <Link to="/"><Button variant="outline">Go Home</Button></Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SharedPage;
