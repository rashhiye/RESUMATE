import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// PDF Tools
const MergePdf = lazy(() => import("./pages/tools/MergePdf"));
const SplitPdf = lazy(() => import("./pages/tools/SplitPdf"));
const CompressPdf = lazy(() => import("./pages/tools/CompressPdf"));

// Image Tools
const ImageCompressor = lazy(() => import("./pages/tools/ImageCompressor"));
const ImageResizer = lazy(() => import("./pages/tools/ImageResizer"));
const FormatConverter = lazy(() => import("./pages/tools/FormatConverter"));
const ColorPicker = lazy(() => import("./pages/tools/ColorPicker"));

// File Tools
const FileCompressor = lazy(() => import("./pages/tools/FileCompressor"));
const FileMerger = lazy(() => import("./pages/tools/FileMerger"));

// Generator Tools
const QRGenerator = lazy(() => import("./pages/tools/QRGenerator"));
const PasswordGenerator = lazy(() => import("./pages/tools/PasswordGenerator"));
const HashGenerator = lazy(() => import("./pages/tools/HashGenerator"));
const LoremGenerator = lazy(() => import("./pages/tools/LoremGenerator"));

// Text Tools
const WordCounter = lazy(() => import("./pages/tools/WordCounter"));
const CaseConverter = lazy(() => import("./pages/tools/CaseConverter"));
const Base64Tool = lazy(() => import("./pages/tools/Base64Tool"));
const JsonFormatter = lazy(() => import("./pages/tools/JsonFormatter"));
const TextDiff = lazy(() => import("./pages/tools/TextDiff"));
const FontChanger = lazy(() => import("./pages/tools/FontChanger"));

// Share Tools
const TextShare = lazy(() => import("./pages/tools/TextShare"));

// Legal Pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

// Utility Tools
const TimestampConverter = lazy(() => import("./pages/tools/TimestampConverter"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const UrlEncoder = lazy(() => import("./pages/tools/UrlEncoder"));

// Pages
const SharedPage = lazy(() => import("./pages/SharedPage"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* PDF */}
            <Route path="/tools/merge-pdf" element={<MergePdf />} />
            <Route path="/tools/split-pdf" element={<SplitPdf />} />
            <Route path="/tools/compress-pdf" element={<CompressPdf />} />
            {/* Image */}
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/image-resizer" element={<ImageResizer />} />
            <Route path="/tools/format-converter" element={<FormatConverter />} />
            <Route path="/tools/color-picker" element={<ColorPicker />} />
            {/* File */}
            <Route path="/tools/file-compressor" element={<FileCompressor />} />
            <Route path="/tools/file-merger" element={<FileMerger />} />
            {/* Generator */}
            <Route path="/tools/qr-generator" element={<QRGenerator />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/tools/hash-generator" element={<HashGenerator />} />
            <Route path="/tools/lorem-generator" element={<LoremGenerator />} />
            {/* Text */}
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/case-converter" element={<CaseConverter />} />
            <Route path="/tools/base64" element={<Base64Tool />} />
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/text-diff" element={<TextDiff />} />
            <Route path="/tools/font-changer" element={<FontChanger />} />
            {/* Share */}
            <Route path="/tools/text-share" element={<TextShare />} />
            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Utility */}
            <Route path="/tools/timestamp-converter" element={<TimestampConverter />} />
            <Route path="/tools/unit-converter" element={<UnitConverter />} />
            <Route path="/tools/url-encoder" element={<UrlEncoder />} />
            {/* Shared content page */}
            <Route path="/shared" element={<SharedPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
