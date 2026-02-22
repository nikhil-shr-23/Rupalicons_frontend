"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useEffect } from "react";
import HeroSvgAnimation from "@/components/HeroSvgAnimation";
import HeroSearch from "@/components/HeroSearch";
import { AnimateSvg } from "@/components/AnimateSvg";

export default function HeroV2() {
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

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-accent-dark mb-8 font-syne relative">
            Find Your{" "}
            <span className="relative inline-block">
              <span className="text-gold">Dream</span>
              <AnimateSvg
                width="110%"
                height="30"
                viewBox="0 0 230 45"
                className="absolute -bottom-3 -left-[5%]"
                path="M222.462 12.8345C177.074 10.0328 132.077 4.80881 86.6062 3.64623C60.4691 2.97796 -17.6945 1.02174 8.17755 4.79475C50.7028 10.9964 94.6534 10.7971 137.47 14.9675C154.059 16.5834 170.516 18.7493 187.021 21.0384C193.373 21.9193 198.334 23.4078 188.17 22.8432C142.806 20.323 97.6784 14.7225 52.3141 12.0141C47.4732 11.7251 33.1304 11.5843 37.7934 12.9165C54.8856 17.8 73.2224 19.7239 90.7081 22.433C111.764 25.6952 133.161 27.7326 154.042 32.0315C161.542 33.5757 171.588 34.0575 178.571 37.1999C190.929 42.7607 151.511 39.3406 137.962 39.0868C115.414 38.6643 92.8916 37.3627 70.3626 36.4616"
                strokeColor="#C5A059"
                strokeWidth={2}
                animationDuration={2}
                animationDelay={0.6}
                enableHoverAnimation={true}
                hoverAnimationType="redraw"
              />
            </span>
            <br />
            <span className="relative inline-block">Property Today</span>
          </h1>

          <div className="w-full relative z-20 mt-20">
            <HeroSearch />
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
              src="/touse.png"
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
