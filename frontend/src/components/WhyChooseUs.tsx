"use client";

import { motion } from "framer-motion";
import { Home, Clock, CheckCircle, Shield } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Home,
      value: "500+",
      label: "Properties Listed",
      delay: 0.1,
    },
    {
      icon: Clock,
      value: "15+",
      label: "Years of Expertise",
      delay: 0.2,
    },
    {
      icon: CheckCircle,
      value: "1200+",
      label: "Happy Clients",
      delay: 0.3,
    },
    {
      icon: Shield,
      value: "100%",
      label: "Verified Listings",
      delay: 0.4,
    },
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-syne text-accent-dark mb-6"
          >
            Why Choose <span className="text-gold">Rupali Homes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            Your trusted partner in real estate — connecting buyers, sellers,
            and renters with the right property at the right price.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border border-gray-100"
            >
              <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6 text-gold-hover">
                <feature.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl font-bold font-syne text-accent-dark mb-3">
                {feature.value}
              </h3>
              <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">
                {feature.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
