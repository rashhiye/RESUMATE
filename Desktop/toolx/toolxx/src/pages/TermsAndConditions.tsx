import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToolsSidebar } from "../components/ToolsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions — ToolX";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "ToolX Terms and Conditions - Read our usage terms and limitations."
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
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Terms and Conditions
        </h1>
        <p className="text-gray-400">Last updated: April 2026</p>
      </div>

      <div className="glass rounded-lg p-8 border border-white/10 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Welcome to ToolX. These Terms and Conditions ("Terms") govern your
            use, access, and interaction with our website and services. By
            accessing ToolX, you agree to be bound by these Terms. If you do not
            agree with any part of these Terms, please do not use ToolX.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
          <p className="text-gray-300 leading-relaxed">
            Permission is granted to temporarily download one copy of the
            materials (information or software) on ToolX for personal,
            non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title. Under this license, you may not:
          </p>
          <ul className="space-y-2 text-gray-300 ml-6 mt-3">
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Modify or copy the materials</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Use materials for commercial purposes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Attempt to reverse engineer or decompile software</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Remove any copyright or proprietary notations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Transfer materials to another person or institution</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
          <p className="text-gray-300 leading-relaxed">
            The materials on ToolX are provided on an 'as is' basis. ToolX makes
            no representations or warranties of any kind, express or implied,
            regarding materials and services, including but not limited to
            warranties of merchantability, fitness for a particular purpose, or
            non-infringement of intellectual property rights. Further, ToolX does
            not warrant that the functionality or materials will be uninterrupted
            or error-free, or that defects will be corrected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-300 leading-relaxed">
            In no event shall ToolX or its suppliers be liable for damages
            (including, without limitation, damages for loss of data or profit,
            or due to business interruption) arising out of the use or inability
            to use the materials on ToolX, even if ToolX has been notified of
            the possibility of such damages. Because some jurisdictions do not
            allow limitations on implied warranties, these limitations may not
            apply to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Accuracy of Materials</h2>
          <p className="text-gray-300 leading-relaxed">
            The materials appearing on ToolX could include technical, typographical,
            or photographic errors. ToolX does not warrant that any of the
            materials on its website are accurate, complete, or current. ToolX may
            make changes to the materials contained on its website at any time
            without notice. However, ToolX does not commit to updating the
            materials.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Tool Limitations</h2>
          <p className="text-gray-300 leading-relaxed">
            ToolX provides tools for general-purpose use. Each tool has specific
            limitations:
          </p>
          <ul className="space-y-2 text-gray-300 ml-6 mt-3">
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>File size limits apply to avoid server overload</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Results are provided without guarantee of accuracy</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>We are not responsible for data loss or corruption</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Some tools may not support all file formats</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Prohibited Conduct
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            You agree not to use ToolX for:
          </p>
          <ul className="space-y-2 text-gray-300 ml-6">
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Illegal or harmful activities</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Distributing malware or harmful content</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Violating intellectual property rights</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Unauthorized access or security attacks</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Spamming or harassment</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Modifications to Terms
          </h2>
          <p className="text-gray-300 leading-relaxed">
            ToolX may revise these Terms at any time without notice. By using
            this website, you agree to be bound by the then current version of
            these Terms of Use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
          <p className="text-gray-300 leading-relaxed">
            These Terms and Conditions are governed by and construed in
            accordance with the laws applicable in the jurisdiction where ToolX
            operates, and you irrevocably submit to the exclusive jurisdiction of
            the courts in that location.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
          <p className="text-gray-300 leading-relaxed">
            For issues regarding these Terms and Conditions, please contact us at:
          </p>
          <p className="text-gray-300 mt-3">
            Email:{" "}
            <a
              href="mailto:rashidkp2004@gmail.com"
              className="text-purple-400 hover:text-purple-300"
            >
              rashidkp2004@gmail.com
            </a>
          </p>
        </section>
      </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
