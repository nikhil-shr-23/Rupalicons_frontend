"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Rupali Homes helped us find our dream 3BHK in just two weeks. Their market knowledge and negotiation skills saved us lakhs!",
    name: "Aditya Khurana",
    role: "Home Buyer, Gurgaon",
    image: "/avatars/avatar1.jpg",
  },
  {
    quote:
      "Selling my property was stress-free with Rupali Homes. They handled everything from valuation to legal paperwork seamlessly.",
    name: "Meera Reddy",
    role: "Property Seller, Delhi",
    image: "/avatars/avatar2.jpg",
  },
  {
    quote:
      "Transparent dealings, verified listings, and genuine advice. They truly put the client first — not just commissions.",
    name: "Rajesh Verma",
    role: "Investor, Noida",
    image: "/avatars/avatar3.jpg",
  },
  {
    quote:
      "As a first-time buyer, I had so many questions. The team patiently guided me through every step, from loan to registration.",
    name: "Sneha Gupta",
    role: "First-Time Buyer, Gurgaon",
    image: "/avatars/avatar4.jpg",
  },
  {
    quote:
      "Found the perfect commercial space for my startup through Rupali Homes. Their portfolio of verified properties is impressive.",
    name: "Vikram Singh",
    role: "Startup Founder, Noida",
    image: "/avatars/avatar5.jpg",
  },
  {
    quote:
      "I've worked with many agents before, but Rupali Homes stands out for their honesty and deep knowledge of the local market.",
    name: "Ananya Das",
    role: "NRI Investor, Bangalore",
    image: "/avatars/avatar6.jpg",
  },
];

const TestimonialCard = ({ data }: { data: (typeof testimonials)[0] }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-6 mx-4">
    <p className="text-gray-600 italic mb-6 leading-relaxed">
      &quot;{data.quote}&quot;
    </p>
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
          What People <span className="text-gold">Say About Us</span>
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
