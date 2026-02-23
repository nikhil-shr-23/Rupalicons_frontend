"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Users,
  Key,
  Building2,
  TrendingUp,
} from "lucide-react";

const Marquee = () => {
  const items = [
    { text: "500+ Verified Listings", Icon: ShieldCheck },
    { text: "15+ Years of Expertise", Icon: Award },
    { text: "1200+ Happy Clients", Icon: Users },
    { text: "Buy • Sell • Rent", Icon: Key },
    { text: "Premium Properties Across India", Icon: Building2 },
    { text: "Expert Property Advisory", Icon: TrendingUp },
  ];

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
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-16">
                  <span className="text-white/90 font-syne text-2xl tracking-wider uppercase font-light">
                    {item.text}
                  </span>

                  <item.Icon className="text-gold w-6 h-6 shrink-0" />
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
