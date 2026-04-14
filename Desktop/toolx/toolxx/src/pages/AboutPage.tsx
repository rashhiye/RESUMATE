import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToolsSidebar } from "../components/ToolsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About ToolX — Free Online Tools";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "About ToolX - A collection of free, fast, and secure online tools for everyone."
      );
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ToolsSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar showSidebarTrigger />
          <main className="flex-1 px-4 md:px-8 pt-24 pb-12 max-w-4xl mx-auto w-full space-y-8">
      <div className="glass rounded-lg p-8 border border-white/10">
        <h1 className="text-4xl font-bold gradient-text mb-4">About ToolX</h1>
        <p className="text-gray-400 text-lg">
          Free, fast, and secure tools for everyone
        </p>
      </div>

      {/* Mission Section */}
      <div className="glass rounded-lg p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          ToolX is dedicated to providing free, high-quality online tools that
          solve everyday problems. Our mission is to make powerful functionality
          accessible to everyone, without requiring software installation,
          registration, or payment. Whether you're a developer, designer,
          student, or content creator, ToolX has tools to help you work more
          efficiently and effectively.
        </p>
      </div>

      {/* Why ToolX Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-lg p-6 border border-white/10">
          <div className="text-4xl mb-4">🆓</div>
          <h3 className="text-xl font-bold text-white mb-3">100% Free</h3>
          <p className="text-gray-300">
            All our tools are completely free. No hidden charges, no premium versions,
            just powerful functionality for everyone.
          </p>
        </div>

        <div className="glass rounded-lg p-6 border border-white/10">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-white mb-3">Fast & Efficient</h3>
          <p className="text-gray-300">
            All processing happens locally on your device. No server uploads, instant
            results, and optimized performance.
          </p>
        </div>

        <div className="glass rounded-lg p-6 border border-white/10">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-white mb-3">Privacy First</h3>
          <p className="text-gray-300">
            Your data never leaves your device. We don't store, track, or sell your
            information. Complete privacy guaranteed.
          </p>
        </div>
      </div>

      {/* Creator Section */}
      <div className="glass rounded-lg p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-4">Creator</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="text-gray-300 leading-relaxed mb-4">
              ToolX was created by <span className="font-semibold text-white">Muhammed Rashid KP</span>,
              a passionate developer dedicated to building useful, free tools for the community.
              With a focus on user experience, performance, and privacy, ToolX provides a collection
              of tools that solve real-world problems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This project is a labor of love, built with modern web technologies to ensure speed,
              reliability, and security. Every tool is carefully crafted to be intuitive and powerful.
            </p>
          </div>
        </div>
      </div>

      {/* Our Tools Section */}
      <div className="glass rounded-lg p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6">Our Tool Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-white mb-3">📄 PDF Tools</h3>
            <p className="text-gray-300 text-sm">
              Merge, split, and compress PDF files. Handle multiple PDFs efficiently without
              any external software.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">🖼️ Image Tools</h3>
            <p className="text-gray-300 text-sm">
              Compress, resize, convert, and manipulate images. Perfect for web optimization
              and design work.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">📦 File Tools</h3>
            <p className="text-gray-300 text-sm">
              Compress files, merge text documents, and organize data. Simplify file management
              tasks instantly.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">🎲 Generators</h3>
            <p className="text-gray-300 text-sm">
              Generate QR codes, passwords, hashes, and Lorem Ipsum text. Perfect for designers
              and developers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">📝 Text Tools</h3>
            <p className="text-gray-300 text-sm">
              Format, convert, and analyze text. Count words, convert cases, encode/decode,
              and more.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">🔧 Utilities</h3>
            <p className="text-gray-300 text-sm">
              Convert units, timestamps, URLs, and more. Essential utilities for daily tasks
              and development.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="glass rounded-lg p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-2xl">✨</span>
            <div>
              <h3 className="font-semibold text-white mb-1">Quality</h3>
              <p className="text-gray-300 text-sm">
                Every tool is built with attention to detail and thoroughly tested
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-semibold text-white mb-1">Accessibility</h3>
              <p className="text-gray-300 text-sm">
                Tools are free and easy to use for everyone, regardless of technical skill
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl">🔐</span>
            <div>
              <h3 className="font-semibold text-white mb-1">Privacy</h3>
              <p className="text-gray-300 text-sm">
                Your data is yours. We never collect, store, or share your information
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-white mb-1">Innovation</h3>
              <p className="text-gray-300 text-sm">
                Continuously improving and adding new tools based on user feedback
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div className="glass rounded-lg p-8 border border-white/10 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
        <p className="text-gray-300 mb-6">
          Have feedback, suggestions, or found a bug? We'd love to hear from you!
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all"
        >
          Contact Us
        </a>
      </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
