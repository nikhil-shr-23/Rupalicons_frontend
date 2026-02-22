"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Marquee = () => {
  const messages = [
    "500+ Verified Listings",
    "15+ Years of Expertise",
    "1200+ Happy Clients",
    "Buy • Sell • Rent",
    "Premium Properties Across India",
    "Expert Property Advisory",
  ];

  const images = ["/formarquee1.jpeg", "/formarquee2.jpg", "/formarquee3.jpg"];

  return (
    <div className="bg-accent-dark py-2 overflow-hidden border-y border-white/10 mt-32">
      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 150,
            ease: "linear",
          }}
          className="flex gap-16 items-center"
        >
          {/* Duplicate content enough times to ensure smooth loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center">
              {messages.map((msg, idx) => (
                <div key={idx} className="flex items-center gap-16">
                  <span className="text-white/90 font-syne text-2xl tracking-wider uppercase font-light">
                    {msg}
                  </span>

                  {/* Image Pill */}
                  <div className="relative w-48 h-16 rounded-full overflow-hidden border border-white/20 shrink-0">
                    <Image
                      src={images[idx % images.length]}
                      alt="Property Detail"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
