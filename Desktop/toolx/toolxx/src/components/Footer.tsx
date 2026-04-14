import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-white mb-4">ToolX</h3>
            <p className="text-gray-400 text-sm">
              Free online tools for everyone. Fast, secure, and privacy-focused.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools/base64" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:rashidkp2004@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm break-all"
                >
                  rashidkp2004@gmail.com
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Send Message
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} ToolX by{" "}
              <span className="font-semibold text-white">Muhammed Rashid KP</span>.
              All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-xs">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-xs">
                Terms
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-xs">
                Contact
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-xs">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
