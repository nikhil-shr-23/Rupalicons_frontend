"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center px-4 pt-20 overflow-hidden bg-grid">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold"></div>
            <span className="text-sm font-semibold tracking-widest uppercase text-gold">
              Premium Living
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] text-accent-dark mb-8 font-syne">
            Inspired,
            <br />
            Creative,
            <br />
            Functional
          </h1>

          <p className="text-xl text-gray-600 max-w-md mb-10 font-light leading-relaxed">
            People living in a home is a far greater need in design. We bring
            interiors to life, understanding the person behind the space.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="flex items-center gap-3 px-8 py-4 bg-accent-dark text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-accent-dark">
                <ArrowUpRight size={18} />
              </div>
              Explore Projects
            </motion.a>

            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                >
                  {/* Placeholder for avatars */}
                  <div className="w-full h-full bg-slate-300"></div>
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gold flex items-center justify-center text-xs font-bold text-accent-dark">
                +
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] flex items-center justify-center"
        >
          {/* Main Hero Video */}
          <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <video
              src="/video-house.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
          </div>

          {/* Floating Elements (Menu items on the right side from reference) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 z-20">
            <motion.button
              whileHover={{ x: -10 }}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-accent-dark transition-colors"
            >
              <ArrowDown size={20} />
            </motion.button>

            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="w-12 h-12 bg-white rounded-full shadow-md overflow-hidden p-1 cursor-pointer hover:ring-2 hover:ring-gold"
              >
                <div
                  className={`w-full h-full rounded-full ${i === 1 ? "bg-orange-100" : i === 2 ? "bg-gray-100" : "bg-purple-100"}`}
                ></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
