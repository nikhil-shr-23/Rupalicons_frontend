"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, Instagram, Facebook } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm py-4`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="relative h-12 w-48 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt="Rupali Homes"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <div className={`hidden md:flex items-center gap-8 text-gray-800`}>
          <Link
            href="/"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Home
          </Link>

          <Link
            href="/buy"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Buy
          </Link>
          <Link
            href="/rent"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Rent
          </Link>

          <Link
            href="/blogs"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Blogs
          </Link>
          <Link
            href="/sell"
            className="px-6 py-2 bg-gold/10 text-gold border border-gold font-bold text-sm uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-300 rounded-full ml-2"
          >
            Sell Property
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-2 bg-accent-dark text-white font-bold text-sm uppercase tracking-widest hover:bg-gold transition-all duration-300 rounded-full"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden text-accent-dark`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-accent-dark z-40 flex flex-col items-center justify-center space-y-8"
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Home
            </Link>

            <Link
              href="/buy"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Buy
            </Link>
            <Link
              href="/rent"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Rent
            </Link>

            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Blogs
            </Link>
            <Link
              href="/sell"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-gold font-syne font-bold border border-gold px-8 py-3 rounded-full"
            >
              Sell Property
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Contact
            </Link>

            <div className="flex gap-6 mt-8">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="p-3 bg-white/10 rounded-full hover:bg-gold transition-colors"
              >
                <Instagram className="text-white" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="p-3 bg-white/10 rounded-full hover:bg-gold transition-colors"
              >
                <Facebook className="text-white" />
              </Link>
              <a
                href="tel:+919876543210"
                className="p-3 bg-white/10 rounded-full hover:bg-gold transition-colors"
              >
                <Phone className="text-white" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
