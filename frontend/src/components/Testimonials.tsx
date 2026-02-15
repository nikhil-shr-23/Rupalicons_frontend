"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Rupali Homes transformed our vision into a reality that exceeded our expectations. The attention to detail is unmatched.",
    name: "Aditya Khurana",
    role: "CEO, TechFlow",
    image: "/avatars/avatar1.jpg", // Placeholder or generic
  },
  {
    quote:
      "Living in a home designed by them feels like a perpetual vacation. The blend of aesthetics and functionality is perfect.",
    name: "Meera Reddy",
    role: "Architect",
    image: "/avatars/avatar2.jpg",
  },
  {
    quote:
      "Professional, transparent, and incredibly talented. They delivered exactly what was promised, on time.",
    name: "Rajesh Verma",
    role: "Business Owner",
    image: "/avatars/avatar3.jpg",
  },
  {
    quote:
      "The team's dedication to quality is evident in every corner of our house. Highly recommended for luxury projects.",
    name: "Sneha Gupta",
    role: "Interior Designer",
    image: "/avatars/avatar4.jpg",
  },
  {
    quote:
      "From the initial sketch to the final handover, the journey was seamless. They truly build dream homes.",
    name: "Vikram Singh",
    role: "Doctor",
    image: "/avatars/avatar5.jpg",
  },
  {
    quote:
      "An absolute pleasure to work with. Their modern approach to traditional design is refreshing.",
    name: "Ananya Das",
    role: "Artist",
    image: "/avatars/avatar6.jpg",
  },
];

const TestimonialCard = ({ data }: { data: (typeof testimonials)[0] }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-6 mx-4">
    <p className="text-gray-600 italic mb-6 leading-relaxed">"{data.quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative">
        {/* Placeholder for now if image fails */}
        <div className="absolute inset-0 bg-accent-dark/10 flex items-center justify-center text-accent-dark font-bold">
          {data.name[0]}
        </div>
      </div>
      <div>
        <h4 className="font-bold text-accent-dark font-syne">{data.name}</h4>
        <p className="text-sm text-gold">{data.role}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const col1 = [...testimonials, ...testimonials, ...testimonials]; // Triple for loop goodness
  const col2 = [...testimonials]
    .reverse()
    .concat([...testimonials].reverse())
    .concat([...testimonials].reverse());

  return (
    <section className="py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold font-syne text-accent-dark mb-6"
        >
          What Our <span className="text-gold">Clients Say</span>
        </motion.h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 h-[600px] overflow-hidden">
        {/* Fading Masks */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {/* Column 1 - Moving Up */}
          <div className="relative h-full overflow-hidden">
            <motion.div
              animate={{ y: [0, -1000] }} // Adjust based on content height
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              }}
            >
              {col1.map((item, idx) => (
                <TestimonialCard key={`col1-${idx}`} data={item} />
              ))}
            </motion.div>
          </div>

          {/* Column 2 - Moving Down */}
          <div className="relative h-full overflow-hidden">
            <motion.div
              initial={{ y: -1000 }}
              animate={{ y: 0 }}
              transition={{
                repeat: Infinity,
                duration: 45, // Slightly different speed for organic feel
                ease: "linear",
              }}
            >
              {col2.map((item, idx) => (
                <TestimonialCard key={`col2-${idx}`} data={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
