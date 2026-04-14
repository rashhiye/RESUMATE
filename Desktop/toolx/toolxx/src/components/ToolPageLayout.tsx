import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRelatedTools, type Tool } from "@/lib/tools";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToolsSidebar } from "./ToolsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ToolPageLayoutProps {
  tool: Tool;
  children: ReactNode;
}

const ToolPageLayout = ({ tool, children }: ToolPageLayoutProps) => {
  useEffect(() => {
    document.title = `Free ${tool.name} Tool — ToolX`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `${tool.name} - Free, fast, and easy-to-use online tool. ${tool.description?.substring(0, 100) || ""}`
      );
    }
  }, [tool]);

  const related = getRelatedTools(tool.id);
  const Icon = tool.icon;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ToolsSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar showSidebarTrigger />
          <main className="flex-1 px-4 md:px-8 pt-24 pb-12 max-w-4xl mx-auto w-full space-y-8">
            {/* Header */}
            <div className="glass rounded-xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center neon-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{tool.name}</h1>
                  <p className="text-gray-400 text-sm">Free online tool for everyone</p>
                </div>
              </div>
            </div>

            {/* Tool Interface */}
            <div className="glass rounded-xl p-6 md:p-8 border border-white/10">{children}</div>

            {/* Description Section */}
            {tool.description && (
              <article className="glass rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-gradient">
                  About {tool.name}
                </h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {tool.description}
                </p>
              </article>
            )}

            {/* How to Use Section */}
            {tool.howToUse && tool.howToUse.length > 0 && (
              <section className="glass rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-gradient">
                  How to Use
                </h2>
                <ol className="space-y-3">
                  {tool.howToUse.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-300 leading-relaxed pt-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Benefits Section */}
            {tool.benefits && tool.benefits.length > 0 && (
              <section className="glass rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-gradient">
                  Key Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tool.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                      </div>
                      <p className="text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Use Cases Section */}
            {tool.useCases && tool.useCases.length > 0 && (
              <section className="glass rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-gradient">
                  Common Use Cases
                </h2>
                <ul className="space-y-3">
                  {tool.useCases.map((useCase, index) => (
                    <li key={index} className="flex gap-3 text-gray-300">
                      <span className="text-purple-400 font-bold mr-2">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQ Section */}
            {tool.faqItems && tool.faqItems.length > 0 && (
              <section className="glass rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-gradient">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {tool.faqItems.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-white/10 mb-2"
                    >
                      <AccordionTrigger className="text-gray-200 hover:text-white">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {/* Related Tools Section */}
            {related.length > 0 && (
              <section className="glass rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-gradient">
                  Related Tools
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {related.map((t) => {
                    const RIcon = t.icon;
                    return (
                      <Link
                        key={t.id}
                        to={t.path}
                        className="p-4 rounded-lg border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.03] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            <RIcon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                              {t.name}
                            </h3>
                            <p className="text-xs text-gray-500">View tool →</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ToolPageLayout;
