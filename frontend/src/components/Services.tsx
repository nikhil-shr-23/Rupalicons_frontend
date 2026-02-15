"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Services() {
  const services = [
    {
      title: "Legal & Documentation Support",
      description:
        "Professional assistance with contracts, paperwork, and compliance.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Signing papers
    },
    {
      title: "Property Buying",
      description:
        "Expert guidance to find your dream home in prime locations.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Handing keys
    },
    {
      title: "Property Selling",
      description:
        "Strategic marketing to sell your property at the best value.",
      image:
        "https://images.unsplash.com/photo-1593696140826-c58b5e6368d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // For Sale sign (concept)
    },
  ];

  return (
    <section id="services" className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold font-syne text-accent-dark leading-tight max-w-xl"
          >
            Your Journey to the{" "}
            <span className="text-gold">Perfect Property</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-lg"
          >
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We offer a full range of real estate services designed to meet
              your needs—from property buying and selling to expert
              consultation.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              We focus on transparency, efficiency, and results, providing
              tailored solutions that help you make confident property
              decisions.
            </p>
            <button className="bg-accent-dark text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-black transition-colors group">
              Learn More
              <div className="bg-white text-accent-dark rounded-full p-1 group-hover:scale-110 transition-transform">
                <ArrowUpRight size={16} />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-[#FDF6F0] rounded-4xl p-4 pb-0 overflow-hidden relative group hover:shadow-2xl transition-all duration-300"
            >
              {/* Card Header */}
              <div className="p-4 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold font-syne text-accent-dark mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <div className="h-px w-12 bg-gray-300 mb-3"></div>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <div className="w-10 h-10 bg-accent-dark rounded-full flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </div>

              {/* Card Image */}
              <div className="relative h-64 w-full rounded-t-4xl overflow-hidden mt-4">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
