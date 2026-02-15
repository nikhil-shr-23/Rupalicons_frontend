import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-navy-900 border-t border-gold-400/20 text-gray-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-gold font-serif mb-4">
              RUPALI HOMES
            </h3>
            <p className="mb-4 text-sm leading-relaxed">
              Building dreams into reality. We specialize in premium residential
              and commercial properties that redefine luxury living.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#projects"
                  className="hover:text-gold transition-colors"
                >
                  Our Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-gold transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gold" />
                <span>123 Real Estate Ave, Business District</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold" />
                <span>info@rupalihomes.com</span>
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Rupali Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
