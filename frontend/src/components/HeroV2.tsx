"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import HeroSvgAnimation from "@/components/HeroSvgAnimation";
import HeroSearch from "@/components/HeroSearch";

export default function HeroV2() {
  const [activeTab, setActiveTab] = useState("buy");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const yText = useTransform(scrollY, [0, 500], [0, -50]);

  // Magnetic Text / Image Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / 80; // Slowed down significantly (was 25)
      const y = (clientY - innerHeight / 2) / 80;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const headings = {
    buy: { prefix: "Find Your", highlight: "Dream", suffix: "Property Today" },
    rent: { prefix: "Rent Your", highlight: "Perfect", suffix: "Space" },
    projects: { prefix: "Discover", highlight: "New", suffix: "Projects" },
    plot: { prefix: "Land Your", highlight: "Prime", suffix: "Plot Today" },
    commercial: {
      prefix: "Secure",
      highlight: "Premium",
      suffix: "Workspaces",
    },
  };

  const currentHeading =
    headings[activeTab as keyof typeof headings] || headings.buy;

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      // Optional: Split text or just animate the container.
      // We will do a simple smooth container pop-up with GSAP
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    }
  }, [activeTab]);

  return (
    <div className="relative min-h-[80vh] flex flex-col justify-center px-4 pt-16 overflow-hidden bg-grid">
      <HeroSvgAnimation />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold"></div>
            <span className="text-sm font-semibold tracking-widest uppercase text-gold">
              Premium Real Estate
            </span>
          </div>

          <h1
            ref={headingRef}
            className="text-4xl md:text-[3.1rem] lg:text-[3.4rem] font-semibold leading-[1.08] text-accent-dark mb-5 font-syne tracking-tight"
          >
            {currentHeading.prefix}{" "}
            <span className="relative inline-block text-gold">
              {currentHeading.highlight}
            </span>
            <br />
            <span className="relative inline-block mt-2">
              {currentHeading.suffix}
            </span>
          </h1>

          <div className="w-full relative z-20 mt-10">
            <HeroSearch onTabChange={setActiveTab} />
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          style={{
            y,
            x: springX, // Apply magnetic effect
            translateY: springY,
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[440px] md:h-[500px] flex items-center justify-end pointer-events-none"
        >
          <div className="relative z-10 w-[96%] h-full flex justify-end items-center translate-x-6">
            <motion.img
              src={
                activeTab === "commercial"
                  ? "/commercial.png"
                  : activeTab === "rent"
                    ? "/3dinteriorr.png"
                    : activeTab === "projects"
                      ? "/tousenew.png"
                      : activeTab === "plot"
                        ? "/tenniscourt.png"
                        : "/touse.png"
              }
              alt="Luxury Home"
              className="object-contain w-full h-full scale-100 drop-shadow-2xl"
              style={{
                x: springX,
                y: springY,
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
