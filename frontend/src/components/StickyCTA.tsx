"use client";

import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";

export default function StickyCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 bg-accent-dark text-white p-4 rounded-full shadow-2xl border border-gold/20 backdrop-blur-sm group"
      >
        <div className="relative">
          <MessageSquareText size={24} className="text-gold" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-accent-dark animate-pulse"></span>
        </div>

        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
            paddingRight: isHovered ? "0.5rem" : 0,
          }}
          className="overflow-hidden whitespace-nowrap font-medium text-sm"
        >
          Consult an Expert
        </motion.span>
      </motion.button>
    </div>
  );
}
