"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Map_pin, PencilRuler, FileCheck, HardHat, Key } from "lucide-react";

const steps = [
  {
    icon: Map_pin,
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
          {/* Central Line Container */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 block">
            {/* Background Line */}
            <div className="w-full h-full bg-gray-200 rounded-full"></div>

            {/* Animated Fill Line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gold rounded-full origin-top"
              style={{ height: "100%", scaleY: pathLength }}
            />
          </div>

          <div className="space-y-24">
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
                      className={`bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative ${isEven ? "text-left" : "md:text-right"}`}
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

                  {/* Center Icon Node */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-10 h-10 bg-accent-dark rounded-full border-4 border-white shadow-lg flex items-center justify-center z-20 relative">
                      <step.icon size={18} className="text-gold" />
                      {/* Pulse Effect */}
                      <div className="absolute inset-0 bg-gold rounded-full opacity-20 animate-ping"></div>
                    </div>
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
