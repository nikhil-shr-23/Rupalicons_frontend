"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Instagram, Facebook } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
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

        {/* Desktop Navigation */}
        <div
          className={`hidden md:flex items-center gap-8 ${scrolled ? "text-gray-800" : "text-white/90"}`}
        >
          <Link
            href="/"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Home
          </Link>
          <a
            href="/#about"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            About
          </a>
          <a
            href="/#projects"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Projects
          </a>
          <a
            href="/#services"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Services
          </a>
          <Link
            href="/portfolio"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Portfolio
          </Link>
          <Link
            href="/blogs"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Blogs
          </Link>
          <a
            href="/#contact"
            className="px-6 py-2 bg-white text-accent-dark font-bold text-sm uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-300 rounded-full"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${scrolled ? "text-accent-dark" : "text-white"}`}
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
            <a
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              About
            </a>
            <a
              href="/#projects"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Projects
            </a>
            <a
              href="/#services"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Services
            </a>
            <Link
              href="/portfolio"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Portfolio
            </Link>
            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Blogs
            </Link>
            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Contact
            </a>

            <div className="flex gap-6 mt-8">
              <a
                href="#"
                className="p-3 bg-white/10 rounded-full hover:bg-gold transition-colors"
              >
                <Instagram className="text-white" />
              </a>
              <a
                href="#"
                className="p-3 bg-white/10 rounded-full hover:bg-gold transition-colors"
              >
                <Facebook className="text-white" />
              </a>
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
