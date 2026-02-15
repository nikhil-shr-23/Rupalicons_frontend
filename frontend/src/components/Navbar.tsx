"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-navy-900/90 backdrop-blur-sm border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gold font-serif tracking-wider"
            >
              RUPALI HOMES
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-gold transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-gray-300 hover:text-gold transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                href="#projects"
                className="text-gray-300 hover:text-gold transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="text-gray-300 hover:text-gold transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gold hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-900 border-b border-gold-400/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-gray-300 hover:text-gold block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-gold block px-3 py-2 rounded-md text-base font-medium"
            >
              About Us
            </Link>
            <Link
              href="#projects"
              className="text-gray-300 hover:text-gold block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-gold block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
