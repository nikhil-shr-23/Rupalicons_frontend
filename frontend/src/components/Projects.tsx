"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchProperties } from "../lib/api";
import { Property } from "../types";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";

export default function Projects() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await fetchProperties();
        if (data && data.content) {
          setProperties(data.content);
        }
      } catch (error) {
        console.error("Failed to load properties", error);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  if (loading) {
    return (
      <section
        id="projects"
        className="py-24 bg-accent-dark flex justify-center items-center min-h-[500px]"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-32 bg-accent-dark text-white overflow-hidden relative"
    >
      {/* Background Grid Pattern for Dark Section */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[50px_50px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold font-syne leading-tight">
              Professional Realty <br />
              <span className="text-gold">Made Simple</span>
            </h2>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center">
                <Eye size={20} className="text-gray-400" />
              </div>
              <span className="text-sm font-medium tracking-wide uppercase">
                Accentuate Vision
              </span>
            </div>
          </div>

          <div className="lg:pl-12">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Rupali Homes connects you with premium properties that blend
              luxury, comfort, and timeless elegance.
              <span className="text-gold font-semibold">
                {" "}
                Our expert consultants curate bespoke property solutions
                tailored to your style.
              </span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white text-accent-dark px-6 py-3 rounded-full font-bold"
            >
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                <ArrowUpRight size={16} />
              </div>
              More About
            </motion.button>
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
              >
                {property.imageUrl ? (
                  <Image
                    src={property.imageUrl}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-gold text-xs font-bold uppercase tracking-widest mb-2 block">
                    {property.type}
                  </span>
                  <h3 className="text-2xl font-bold font-syne mb-2">
                    {property.title}
                  </h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {property.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No properties to display.</p>
          )}
        </div>
      </div>
    </section>
  );
}
