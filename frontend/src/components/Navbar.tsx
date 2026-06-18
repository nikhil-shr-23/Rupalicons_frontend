"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Instagram, Facebook, Heart } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { fetchLikedPropertyIds } from "@/lib/api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const cachedCount = localStorage.getItem("likedPropertiesCount");
    if (cachedCount) {
      setLikedCount(parseInt(cachedCount, 10));
    }

    fetchLikedPropertyIds().then((ids) => {
      setLikedCount(ids.length);
      localStorage.setItem("likedPropertiesCount", ids.length.toString());
    });

    // Listen for custom event when a property is liked/unliked
    const handler = () => {
      fetchLikedPropertyIds().then((ids) => {
        setLikedCount(ids.length);
        localStorage.setItem("likedPropertiesCount", ids.length.toString());
      });
    };
    window.addEventListener("likedPropertiesChanged", handler);
    return () => window.removeEventListener("likedPropertiesChanged", handler);
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
      className={`fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm py-4`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="relative h-16 w-64 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo_rupali.png"
            alt="Rupali Homes"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <div className={`hidden md:flex items-center gap-8 text-gray-800`}>
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
            href="/sell"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Sell
          </Link>

          <Link
            href="/blogs"
            className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium"
          >
            Blogs
          </Link>

          {/* Heart icon for liked properties */}
          <Link
            href="/liked"
            className="relative p-2 rounded-full hover:bg-red-50 transition-colors group"
          >
            <Heart
              size={22}
              className="text-gray-500 group-hover:text-red-500 transition-colors"
            />
            {likedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {likedCount}
              </span>
            )}
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
              href="/sell"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Sell
            </Link>
            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold"
            >
              Blogs
            </Link>

            <Link
              href="/liked"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white font-syne hover:text-gold flex items-center gap-3"
            >
              <Heart size={24} className="text-red-400" />
              Liked {likedCount > 0 && `(${likedCount})`}
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
