"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-100/10">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-gold rounded-b-full flex items-center justify-center">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
            </div>
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold font-syne tracking-tight"
            >
              RUPALI
              <span className="block text-xs font-outfit font-normal text-gray-500 uppercase tracking-widest">
                Homes
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <div className="flex space-x-8 text-sm font-medium tracking-wide">
              {["Home", "About Us", "Services", "Portfolio"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="relative group overflow-hidden"
                >
                  <span className="block group-hover:-translate-y-full transition-transform duration-300">
                    {item}
                  </span>
                  <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-gold">
                    {item}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="#contact"
              className="flex items-center gap-2 px-6 py-2 bg-accent-dark text-white rounded-full text-sm font-medium hover:bg-gold transition-colors duration-300"
            >
              Contact Us
              <div className="bg-gold w-6 h-6 rounded-full flex items-center justify-center text-accent-dark">
                <ArrowUpRight size={14} />
              </div>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-accent-dark focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-background border-b border-gray-100 shadow-xl"
        >
          <div className="flex flex-col p-6 space-y-4">
            {["Home", "About Us", "Services", "Portfolio", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-lg font-syne font-medium hover:text-gold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
