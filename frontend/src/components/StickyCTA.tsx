"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Instagram, X } from "lucide-react";
import { useState } from "react";

// Simple custom WhatsApp Icon SVG since lucide-react doesn't have a specific WhatsApp one
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function StickyCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64 overflow-hidden relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
            <h4 className="font-syne font-bold text-accent-dark mb-4 text-center">
              Connect with us
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-xl transition-colors font-medium"
              >
                <WhatsAppIcon size={20} />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/rupali_homes"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-pink-50 hover:bg-pink-100 text-pink-600 p-3 rounded-xl transition-colors font-medium"
              >
                <Instagram size={20} />
                Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 bg-accent-dark text-white p-4 rounded-full shadow-2xl border border-gold/20 backdrop-blur-sm group"
      >
        <div className="relative">
          {isOpen ? (
            <X size={24} className="text-gold" />
          ) : (
            <>
              <MessageSquareText size={24} className="text-gold" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-accent-dark animate-pulse"></span>
            </>
          )}
        </div>

        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isHovered && !isOpen ? "auto" : 0,
            opacity: isHovered && !isOpen ? 1 : 0,
            paddingRight: isHovered && !isOpen ? "0.5rem" : 0,
          }}
          className="overflow-hidden whitespace-nowrap font-medium text-sm"
        >
          Consult an Expert
        </motion.span>
      </motion.button>
    </div>
  );
}
