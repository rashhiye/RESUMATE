import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToolsSidebar } from "../components/ToolsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy — ToolX";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "ToolX Privacy Policy - Learn how we protect your data and privacy."
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
        <h1 className="text-4xl font-bold gradient-text mb-4">Privacy Policy</h1>
        <p className="text-gray-400">Last updated: April 2026</p>
      </div>

      <div className="glass rounded-lg p-8 border border-white/10 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Welcome to ToolX. We are committed to protecting your privacy and
            ensuring you have a positive experience on our website. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            ToolX processes all data locally on your device. We do not collect
            or store:
          </p>
          <ul className="space-y-2 text-gray-300 ml-6">
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Personal information (name, email, phone) unless you contact us</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Files or text you upload to our tools</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Content processed through our tools</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Sensitive or confidential information</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            How We Use Information
          </h2>
          <p className="text-gray-300 leading-relaxed">
            All processing on ToolX happens locally in your browser. Data never
            leaves your device when using our tools. We use collected information
            only for improving our services and responding to your inquiries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Cookies & Analytics</h2>
          <p className="text-gray-300 leading-relaxed">
            ToolX may use Google Analytics to understand user behavior and
            improve our website. No personal data is transmitted. Analytics
            cookies help us see how you use the tools and which features are
            most popular. You can disable cookies in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
          <p className="text-gray-300 leading-relaxed">
            We implement strong security measures to protect your data:
          </p>
          <ul className="space-y-2 text-gray-300 ml-6 mt-3">
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>All data processing happens locally on your device</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>No data is transmitted to our servers</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>HTTPS encryption for all website traffic</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>No harmful data collection practices</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Third-Party Services
          </h2>
          <p className="text-gray-300 leading-relaxed">
            ToolX may use third-party services for analytics and performance
            monitoring. These services have their own privacy policies, and we
            encourage you to review them. Our primary commitment is ensuring your
            data remains private and secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
          <p className="text-gray-300 leading-relaxed">
            You have the right to:
          </p>
          <ul className="space-y-2 text-gray-300 ml-6 mt-3">
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Access any information we have about you</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Request deletion of your personal information</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Opt-out of analytics and tracking</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400">•</span>
              <span>Contact us with privacy concerns</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            Changes to This Policy
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We may update this Privacy Policy periodically. Changes will be
            posted on this page with an updated "Last updated" date. Continued
            use of ToolX after changes constitutes acceptance of the updated
            Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have questions about this Privacy Policy or our privacy
            practices, please contact us at:
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
