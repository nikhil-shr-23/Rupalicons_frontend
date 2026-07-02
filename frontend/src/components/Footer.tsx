import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FDF6F0] text-gray-700 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block relative h-16 w-64">
              <Image
                src="/logo_rupali.png"
                alt="Rupali Homes"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              India&apos;s premier luxury real estate platform. We specialize in
              connecting discerning buyers with the finest residential and
              commercial properties across top metropolitan cities.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://www.instagram.com/rupali_homes/"
                className="text-[#E1306C] hover:opacity-80 transition-opacity"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/rupali_homes/"
                className="text-[#1877F2] hover:opacity-80 transition-opacity"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Column 2: Popular Localities */}
          <div>
            <h4 className="text-lg font-bold font-syne text-accent-dark mb-6">
              Top Localities
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link
                  href="/buy?location=Southern%20Peripheral"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60"></span>
                  Properties in Southern Peripheral
                </Link>
              </li>
              <li>
                <Link
                  href="/buy?location=Dwarka%20Expressway"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60"></span>
                  Properties in Dwarka Expressway
                </Link>
              </li>
              <li>
                <Link
                  href="/buy?location=Golf%20Course%20Road"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60"></span>
                  Properties in Golf Course Road
                </Link>
              </li>
              <li>
                <Link
                  href="/buy?location=New%20Gurgaon"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60"></span>
                  Properties in New Gurgaon
                </Link>
              </li>
              <li>
                <Link
                  href="/buy?location=Sohna%20Road"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60"></span>
                  Properties in Sohna Road
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Types */}
          <div>
            <h4 className="text-lg font-bold font-syne text-accent-dark mb-6">
              Explore
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <Link
                  href="/buy?type=Apartment"
                  className="hover:text-gold transition-colors"
                >
                  Residential Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="/buy?type=Villa"
                  className="hover:text-gold transition-colors"
                >
                  Independent Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/buy?type=Builder%20Floor"
                  className="hover:text-gold transition-colors"
                >
                  Premium Builder Floors
                </Link>
              </li>
              <li>
                <Link
                  href="/buy?type=Plot"
                  className="hover:text-gold transition-colors"
                >
                  Plots & Land
                </Link>
              </li>
              <li>
                <Link
                  href="/buy?type=Commercial"
                  className="hover:text-gold transition-colors"
                >
                  Commercial Spaces
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-syne text-accent-dark mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm text-gray-500 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Level 4, DLF Cyber City,
                  <br />
                  Gurugram, Haryana 122002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold shrink-0" />
                <span>contact@rupalihomes.com</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500">
              <Link href="/about-us" className="hover:text-gold transition-colors">
                About Us
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="#contact"
                className="hover:text-gold transition-colors"
              >
                Contact
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/privacy-policy"
                className="hover:text-gold transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Rupali Homes. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Crafted with <Heart size={14} className="text-gold" /> for real
            estate excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
