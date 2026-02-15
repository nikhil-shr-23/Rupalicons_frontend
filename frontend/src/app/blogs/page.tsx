"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";

const blogs = [
  {
    id: 1,
    title: "The Future of Luxury Living in Gurgaon",
    excerpt:
      "Explore how modern architecture is reshaping the skyline of Gurgaon, blending sustainable living with ultra-premium amenities.",
    date: "Feb 15, 2026",
    author: "Rupali Homes Team",
    image: "/formarquee1.jpeg",
    category: "Real Estate",
  },
  {
    id: 2,
    title: "Sustainable Architecture: A Modern Necessity",
    excerpt:
      "Why eco-friendly homes are not just a trend but a lifestyle choice for the future-conscious homeowner.",
    date: "Feb 10, 2026",
    author: "John Doe",
    image: "/formarquee2.jpg",
    category: "Architecture",
  },
  {
    id: 3,
    title: "Interior Design Trends for 2026",
    excerpt:
      "From maximalist textures to serene minimalism, discover the top interior design trends taking over luxury homes this year.",
    date: "Jan 28, 2026",
    author: "Jane Smith",
    image: "/formarquee3.jpg",
    category: "Interior Design",
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section for Blogs */}
      <section className="pt-48 pb-20 px-6 bg-accent-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-syne mb-6"
          >
            Our <span className="text-gold">Journal</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-outfit">
            Insights, trends, and stories from the world of luxury real estate
            and design.
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent-dark">
                  {blog.category}
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} /> {blog.author}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-syne text-accent-dark mb-4 group-hover:text-gold transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                <button className="flex items-center gap-2 text-accent-dark font-bold group/btn hover:text-gold transition-colors">
                  Read Article{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
