"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Services() {
  const services = [
    {
      title: "Real Estate Services",
      description:
        "Expert guidance for buying, selling, and renting properties in prime locations.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Investment Consultancy",
      description:
        "Strategic advice to maximize returns on your real estate investments.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Legal & Documentation",
      description:
        "Professional assistance with contracts, registry, and compliance paperwork.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
              We offer a complete suite of services—from finding your perfect
              property to securing the best deal and handling all legal
              formalities.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Whether you are buying, selling, or renovating, we provide
              tailored solutions to make your vision a reality.
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
              className="bg-[#FDF6F0] rounded-4xl p-4 pb-0 overflow-hidden relative group hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Card Header */}
              <div className="p-4 mb-4 flex justify-between items-start flex-grow">
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
              <div className="relative h-64 w-full rounded-t-4xl overflow-hidden mt-auto">
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
