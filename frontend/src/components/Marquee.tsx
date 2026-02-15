"use client";

import { motion } from "framer-motion";

const Marquee = () => {
  const messages = [
    "150+ Premium Homes Built",
    "20+ Years in Gurgaon",
    "98% Client Satisfaction",
    "10 Year Structural Warranty",
    "Turnkey Design & Construction",
    "Premium Plot Development",
  ];

  return (
    <div className="bg-accent-dark py-4 overflow-hidden border-y border-white/10">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          className="flex gap-16 items-center"
        >
          {[...messages, ...messages, ...messages].map((msg, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-gold text-2xl">•</span>
              <span className="text-white/80 font-syne text-lg tracking-wider uppercase">
                {msg}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
