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
import { AnimateSvg } from "@/components/AnimateSvg";

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
    <div className="relative min-h-[90vh] flex flex-col justify-center px-4 pt-20 overflow-hidden bg-grid">
      <HeroSvgAnimation />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
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
            className="text-5xl md:text-7xl font-bold leading-[1.1] text-accent-dark mb-8 font-syne relative"
          >
            {currentHeading.prefix}{" "}
            <span className="relative inline-block">
              <span className="text-gold">{currentHeading.highlight}</span>
              <AnimateSvg
                width="100%"
                height="100%"
                viewBox="0 0 240 100"
                className="absolute -bottom-1 -left-1 w-[105%] h-12"
                path="M0.00 50.00 C24.01 46.41, 40.79 59.65, 60.79 49.65 C84.34 47.59, 100.79 59.65, 120.00 50.00 C141.72 49.35, 160.00 60.00, 180.00 50.00 C203.51 48.47, 220.00 60.00, 240.00 50.00"
                strokeColor="#C5A059"
                strokeWidth={2.5}
                strokeLinecap="round"
                animationDuration={3.7}
                animationDelay={0.3}
                animationBounce={0.3}
                reverseAnimation={false}
                enableHoverAnimation={true}
                hoverAnimationType="redraw"
              />
            </span>
            <br />
            <span className="relative inline-block mt-2">
              {currentHeading.suffix}
            </span>
          </h1>

          <div className="w-full relative z-20 mt-20">
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[500px] flex items-center justify-end pointer-events-none" // changed justify-center to justify-end
        >
          <div className="relative z-10 w-full h-full flex justify-end items-center translate-x-20">
            {" "}
            {/* Added translate-x-20 to move further right */}
            {/* Reduced scale from 1.35 to 1.1 */}
            <motion.img
              src={
                activeTab === "commercial"
                  ? "/commercial.png"
                  : activeTab === "interior"
                    ? "/interior.png"
                    : "/touse.png"
              }
              alt="Luxury Home"
              className="object-contain w-full h-full scale-110 drop-shadow-2xl"
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
