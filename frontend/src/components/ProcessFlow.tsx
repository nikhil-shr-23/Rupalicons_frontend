"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, PencilRuler, FileCheck, HardHat, Key } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Consultation & Plot Study",
    description:
      "Free site visit, understanding your vision, and preliminary feasibility assessment.",
  },
  {
    icon: PencilRuler,
    title: "Concept Design & Budget",
    description:
      "Architectural concepts, 3D visualization, and detailed cost estimation with fixed pricing.",
  },
  {
    icon: FileCheck,
    title: "Approvals & Documentation",
    description:
      "We handle all municipal approvals, permits, and legal documentation.",
  },
  {
    icon: HardHat,
    title: "Quality Checks",
    description:
      "Milestone-based construction with regular updates and quality inspections.",
  },
  {
    icon: Key,
    title: "Handover & Warranty",
    description:
      "Final inspection, documentation handover, and 10-year structural warranty.",
  },
];

export default function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [svgPath, setSvgPath] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current || stepRefs.current.length === 0) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const centerX = containerRect.width / 2;

      let pathBuilder = `M ${centerX} 0`;

      stepRefs.current.forEach((step, index) => {
        if (!step) return;

        const rect = step.getBoundingClientRect();
        const relativeY = rect.top - containerRect.top + rect.height / 2;

        const prevY =
          index === 0
            ? 0
            : stepRefs.current[index - 1]?.getBoundingClientRect().top! -
              containerRect.top +
              stepRefs.current[index - 1]?.clientHeight! / 2;
        const currentY = relativeY;

        const amplitude = 60;
        const direction = index % 2 === 0 ? 1 : -1;

        // Premium Zig-Zag Curve Logic
        pathBuilder += ` C ${centerX + amplitude * direction} ${prevY + (currentY - prevY) / 4}, ${centerX + amplitude * direction} ${currentY - (currentY - prevY) / 4}, ${centerX} ${currentY}`;
      });

      // Extend to bottom
      const lastStep = stepRefs.current[steps.length - 1];
      if (lastStep) {
        const rect = lastStep.getBoundingClientRect();
        const bottomY = containerRect.height;
        pathBuilder += ` L ${centerX} ${bottomY}`;
      }

      setSvgPath(pathBuilder);
    };

    calculatePath();
    window.addEventListener("resize", calculatePath);
    setTimeout(calculatePath, 500);

    return () => window.removeEventListener("resize", calculatePath);
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-background relative overflow-hidden"
      id="process"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold font-syne text-accent-dark mb-6"
          >
            How We Build Your <span className="text-gold">Dream Home</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            A structured, transparent 5-step process designed to give you
            complete control and peace of mind.
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated SVG Path Layer */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible">
              <path
                d={svgPath}
                stroke="#E5E7EB"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
              />
              <motion.path
                d={svgPath}
                stroke="#ECAE16"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="space-y-24 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`flex flex-col md:flex-row items-start md:items-center relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Side */}
                  <div className="ml-16 md:ml-0 md:w-1/2 md:px-12 mb-4 md:mb-0">
                    <div
                      className={`bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300 ${isEven ? "text-left" : "md:text-right"}`}
                    >
                      <div
                        className={`text-6xl font-black text-gray-100 absolute -top-8 ${isEven ? "right-8" : "md:left-8 right-8"}`}
                      >
                        0{index + 1}
                      </div>
                      <h3 className="text-2xl font-bold font-syne text-accent-dark mb-4 relative z-10">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 relative z-10 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon Node (Ref Target) */}
                  <div
                    className="absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2 flex items-center justify-center"
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-accent-dark rounded-full border-4 border-white shadow-lg flex items-center justify-center z-20 relative"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon size={20} className="text-gold" />
                    </motion.div>
                  </div>

                  {/* Empty Side for Layout Balance */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
