"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchProperties } from "@/lib/api";
import { Property, PropertyType } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import BounceCards from "@/components/BouncyCards";
import SearchFilterBar from "@/components/SearchFilterBar";

interface FilterState {
  location: string;
  minPrice: string;
  maxPrice: string;
  propertyType?: string;
  bedrooms?: string;
  priceRange?: string;
}

export default function RentPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const applyFilters = useCallback(async () => {
    setLoading(true);

    let minPrice: number | undefined = filters.minPrice
      ? Number(filters.minPrice)
      : undefined;
    let maxPrice: number | undefined = filters.maxPrice
      ? Number(filters.maxPrice)
      : undefined;

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
        type: PropertyType.RENT,
        location: filters.location || undefined,
        minPrice: minPrice,
        maxPrice: maxPrice,
        bedrooms: filters.bedrooms ? Number(filters.bedrooms) : undefined,
      });
      if (data && data.content) {
        setProperties(data.content);
      }
    } catch (error) {
      console.error("Failed to load properties for rent", error);
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

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-accent-dark text-white text-center relative overflow-hidden">
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-syne mb-6"
          >
            Properties for <span className="text-gold">Rent</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Find your perfect rental home from our premium listings.
          </motion.p>

          <div className="flex justify-center mb-10">
            <BounceCards
              className="custom-bounceCards"
              images={[
                "https://picsum.photos/400/400?grayscale",
                "https://picsum.photos/500/500?grayscale",
                "https://picsum.photos/600/600?grayscale",
                "https://picsum.photos/700/700?grayscale",
                "https://picsum.photos/300/300?grayscale",
              ]}
              containerWidth={500}
              containerHeight={250}
              animationDelay={0.4}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={[
                "rotate(5deg) translate(-150px)",
                "rotate(0deg) translate(-70px)",
                "rotate(-5deg)",
                "rotate(5deg) translate(70px)",
                "rotate(-5deg) translate(150px)",
              ]}
              enableHover={true}
            />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pt-8 px-6 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto">
          <SearchFilterBar
            onSearch={(newFilters) => {
              setFilters((prev) => ({ ...prev, ...newFilters }));
            }}
          />
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
                <Link href={`/rent/${property.id}`} className="block h-full">
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
                      FOR RENT
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold font-syne text-accent-dark group-hover:text-gold transition-colors">
                        {property.title}
                      </h3>
                      {property.rentAmount && (
                        <span className="text-lg font-bold text-gold whitespace-nowrap">
                          ₹{property.rentAmount.toLocaleString()}/mo
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

      <Footer />
    </main>
  );
}
