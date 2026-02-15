"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 lg:mb-0 relative"
          >
            {/* Abstract Shapes */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Interior"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating Experience Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white p-8 rounded-tr-3xl shadow-xl z-20 max-w-[200px]"
            >
              <p className="text-4xl font-bold font-syne text-accent-dark">
                15+
              </p>
              <p className="text-sm text-gray-500 mt-2 font-medium uppercase tracking-wider">
                Years of Excellence
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Story
            </span>
            <h2 className="text-5xl font-bold text-accent-dark font-syne mb-8 leading-tight">
              Designing Spaces <br /> that{" "}
              <span className="text-gold italic">Inspire</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
              Rupali Homes isn't just about building structures; it's about
              creating spaces where memories are made. We blend modern
              aesthetics with functional design to deliver premium residential
              and commercial projects.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-light">
              Our vision is to transform the skyline with architectural marvels
              that stand the test of time, driven by a passion for quality and
              innovation.
            </p>

            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 text-accent-dark font-bold hover:text-gold transition-colors text-lg border-b-2 border-accent-dark hover:border-gold pb-1"
            >
              Start Your Journey
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
