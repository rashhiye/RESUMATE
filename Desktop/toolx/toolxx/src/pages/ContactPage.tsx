import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../components/ui/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToolsSidebar } from "../components/ToolsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Us — ToolX";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Contact ToolX - Get in touch with our team for support and inquiries."
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a message (at least 10 characters)",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast({
        title: "Success",
        description: "Your message has been sent! We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ToolsSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar showSidebarTrigger />
          <main className="flex-1 px-4 md:px-8 pt-24 pb-12 max-w-4xl mx-auto w-full space-y-8">
            <div className="glass rounded-lg p-8 border border-white/10">
              <h1 className="text-4xl font-bold gradient-text mb-4">Contact Us</h1>
              <p className="text-gray-400">
                Have questions or feedback? We'd love to hear from you!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 glass rounded-lg p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[150px]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="glass rounded-lg p-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Email</h2>
            <a
              href="mailto:rashidkp2004@gmail.com"
              className="text-purple-400 hover:text-purple-300 break-all"
            >
              rashidkp2004@gmail.com
            </a>
          </div>

          <div className="glass rounded-lg p-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Response Time</h2>
            <p className="text-gray-300">
              We typically respond to inquiries within 24-48 hours during business days.
            </p>
          </div>

          <div className="glass rounded-lg p-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Support</h2>
            <p className="text-gray-300">
              For general questions about our tools, check our FAQ section on individual tool pages.
            </p>
          </div>
        </div>
      </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
