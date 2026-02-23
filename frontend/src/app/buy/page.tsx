"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fetchProperties,
  likeProperty,
  unlikeProperty,
  fetchLikedPropertyIds,
} from "@/lib/api";
import { Property, PropertyType } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedPropertyCard from "@/components/FeaturedPropertyCard";
import SearchFilterBar from "@/components/SearchFilterBar";
import StickyCTA from "@/components/StickyCTA";
import { ArrowUpRight, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface FilterState {
  location: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  bedrooms: string;
  priceRange?: string;
}

export default function BuyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    bedrooms: "",
  });

  useEffect(() => {
    fetchLikedPropertyIds().then((ids) => setLikedIds(new Set(ids)));
  }, []);

  const applyFilters = useCallback(async () => {
    setLoading(true);
    let minPrice: number | undefined = filters.minPrice
      ? Number(filters.minPrice)
      : undefined;
    let maxPrice: number | undefined = filters.maxPrice
      ? Number(filters.maxPrice)
      : undefined;

    // Parse priceRange from SearchFilterBar if present and min/max are not manually set (priority logic or override?)
    // Actually SearchFilterBar sets `priceRange` string. existing inputs set min/max.
    // Let's parse priceRange if available. Format "$2,000-$13,000" or simple numbers.
    if (filters.priceRange) {
      const matches = filters.priceRange.match(/(\d[\d,]*)/g);
      if (matches && matches.length >= 1) {
        minPrice = Number(matches[0].replace(/,/g, ""));
      }
      if (matches && matches.length >= 2) {
        maxPrice = Number(matches[1].replace(/,/g, ""));
      }
    }

    try {
      const data = await fetchProperties(0, 100, {
        type: PropertyType.SALE,
        location: filters.location || undefined,
        minPrice: minPrice,
        maxPrice: maxPrice,
        bedrooms: filters.bedrooms ? Number(filters.bedrooms) : undefined,
      });
      if (data && data.content) {
        setProperties(data.content);
      }
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Featured & Search Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Featured Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            {/* If properties are loaded, show the first one as featured, otherwise show a placeholder/skeleton */}
            {properties.length > 0 && (
              <FeaturedPropertyCard property={properties[0]} />
            )}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SearchFilterBar
              onSearch={(newFilters) => {
                setFilters((prev) => ({ ...prev, ...newFilters }));
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full grow">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100 transition-all hover:-translate-y-1 block"
              >
                <Link href={`/buy/${property.id}`} className="block h-full">
                  <div className="relative h-80 overflow-hidden">
                    {property.imageUrl ? (
                      <Image
                        src={property.imageUrl}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent-dark">
                      FOR SALE
                    </div>
                    {/* Reaction Icon */}
                    <div
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!property.id) return;
                        const isLiked = likedIds.has(property.id);

                        if (!isLiked) {
                          // Like
                          const newLiked = new Set(likedIds);
                          newLiked.add(property.id);
                          setLikedIds(newLiked);
                          const newProps = [...properties];
                          newProps[index] = {
                            ...newProps[index],
                            reactionsCount:
                              (newProps[index].reactionsCount || 0) + 1,
                          };
                          setProperties(newProps);

                          // Confetti
                          const duration = 2 * 1000;
                          const end = Date.now() + duration;
                          const frame = () => {
                            confetti({
                              particleCount: 3,
                              angle: 60,
                              spread: 55,
                              origin: { x: 0 },
                              colors: ["#ff0000", "#ff69b4", "#ff1493"],
                            });
                            confetti({
                              particleCount: 3,
                              angle: 120,
                              spread: 55,
                              origin: { x: 1 },
                              colors: ["#ff0000", "#ff69b4", "#ff1493"],
                            });
                            if (Date.now() < end) requestAnimationFrame(frame);
                          };
                          frame();

                          await likeProperty(property.id);
                          window.dispatchEvent(
                            new Event("likedPropertiesChanged"),
                          );
                        } else {
                          // Unlike
                          const newLiked = new Set(likedIds);
                          newLiked.delete(property.id);
                          setLikedIds(newLiked);
                          const newProps = [...properties];
                          newProps[index] = {
                            ...newProps[index],
                            reactionsCount: Math.max(
                              0,
                              (newProps[index].reactionsCount || 0) - 1,
                            ),
                          };
                          setProperties(newProps);

                          await unlikeProperty(property.id);
                          window.dispatchEvent(
                            new Event("likedPropertiesChanged"),
                          );
                        }
                      }}
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-white text-gray-400 hover:text-red-500 transition-colors z-10 flex items-center gap-1.5 shadow-sm"
                    >
                      <Heart
                        size={18}
                        className={
                          property.id && likedIds.has(property.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }
                      />
                      <span
                        className={`text-xs font-bold ${property.id && likedIds.has(property.id) ? "text-red-500" : "text-gray-600"}`}
                      >
                        {property.reactionsCount || 0}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold font-syne text-accent-dark group-hover:text-gold transition-colors">
                        {property.title}
                      </h3>
                      {property.price && (
                        <span className="text-lg font-bold text-gold whitespace-nowrap">
                          ₹{property.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-500 mb-6 flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-gold"></span>
                      {property.location}
                    </p>

                    <p className="text-gray-600 line-clamp-2 mb-6 text-sm">
                      {property.description}
                    </p>

                    <div className="w-full py-3 bg-gray-50 group-hover:bg-accent-dark group-hover:text-white rounded-lg transition-colors font-bold text-accent-dark flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md">
                      View Details
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            No properties found matching your criteria.
          </div>
        )}
      </section>

      <StickyCTA />
      <Footer />
    </main>
  );
}
