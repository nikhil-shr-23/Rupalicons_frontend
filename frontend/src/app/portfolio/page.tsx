"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchProjects } from "@/lib/api";
import { Property } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const [projects, setProjects] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        if (data && data.content) {
          setProjects(data.content);
        }
      } catch (error) {
        console.error("Failed to load portfolio projects", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Portfolio Hero */}
      <section className="pt-40 pb-20 px-6 bg-accent-dark text-white text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold font-syne mb-6"
        >
          Our <span className="text-gold">Portfolio</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Explore a curated collection of our finest residential and commercial
          projects across Gurgaon.
        </motion.p>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full flex-grow">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.propertiesId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100"
              >
                <div className="relative h-80 overflow-hidden">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.projectName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent-dark">
                    {project.projectType}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold font-syne text-accent-dark mb-2 group-hover:text-gold transition-colors">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-500 mb-6 flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-gold"></span>
                    {project.location}
                  </p>

                  <button className="w-full py-3 bg-gray-50 hover:bg-accent-dark hover:text-white rounded-lg transition-colors font-bold text-accent-dark flex items-center justify-center gap-2 group-hover:shadow-md">
                    View Details
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            No projects found in the portfolio.
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
