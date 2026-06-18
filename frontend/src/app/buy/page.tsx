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

import SearchFilterBar from "@/components/SearchFilterBar";
import StickyCTA from "@/components/StickyCTA";
import { ArrowUpRight, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import SwipeablePropertyCard from "@/components/SwipeablePropertyCard";

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

  // Swipe State Tracking
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchLikedPropertyIds().then((ids) => setLikedIds(new Set(ids)));
    
    // Parse URL parameters for initial filters (e.g. from Hero search or Footer links)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLocation = params.get("location") || params.get("city");
      if (urlLocation) {
        setFilters((prev) => ({ ...prev, location: urlLocation }));
      }
    }
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
        let filtered = data.content;
        
        // Client-side filtering to fix backend search limitations
        if (filters.location) {
          const locStr = filters.location.toLowerCase();
          filtered = filtered.filter(p => 
            (p.location?.toLowerCase().includes(locStr)) || 
            (p.city?.toLowerCase().includes(locStr)) ||
            (p.microMarket?.toLowerCase().includes(locStr)) ||
            (p.locality?.toLowerCase().includes(locStr))
          );
        }
        
        if (filters.propertyType && filters.propertyType !== "Any Type") {
          const ptLower = filters.propertyType.toLowerCase();
          filtered = filtered.filter(p => 
            p.propertyCategory?.toLowerCase().includes(ptLower) ||
            p.title?.toLowerCase().includes(ptLower) ||
            p.description?.toLowerCase().includes(ptLower)
          );
        }

        if (filters.bedrooms && filters.bedrooms !== "Any") {
          const minBeds = Number(filters.bedrooms);
          filtered = filtered.filter(p => p.bedrooms && p.bedrooms >= minBeds);
        }
        
        if (minPrice !== undefined) {
          filtered = filtered.filter(p => p.price && p.price >= minPrice);
        }
        if (maxPrice !== undefined) {
          filtered = filtered.filter(p => p.price && p.price <= maxPrice);
        }

        setProperties(filtered);
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

  // Handle Swipe Actions
  const handleSwipeLeft = useCallback((id: number) => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handleSwipeRight = useCallback(
    async (id: number) => {
      const isLiked = likedIds.has(id);

      // Only fire API if they haven't liked it before
      if (!isLiked) {
        const newLiked = new Set(likedIds);
        newLiked.add(id);
        setLikedIds(newLiked);

        const duration = 2 * 1000;
        const end = Date.now() + duration;
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#ff0000", "#ff69b4", "#C5A059"],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#ff0000", "#ff69b4", "#C5A059"],
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();

        await likeProperty(id);
        window.dispatchEvent(new Event("likedPropertiesChanged"));
      }

      setCurrentIndex((prev) => prev + 1);
    },
    [likedIds],
  );

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Featured & Search Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
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

      {/* Properties Swipe Container */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full grow flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex justify-center items-center py-20 min-h-[500px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : properties.length > 0 && currentIndex < properties.length ? (
          <div className="relative w-full max-w-md h-[650px] perspective-1000 mt-8 mb-[100px]">
            {/* Render active and next card for smooth overlap depth performance */}
            {[...properties]
              .slice(currentIndex, currentIndex + 2)
              .reverse()
              .map((property, idx, array) => {
                // The top card in the visual stack is actually the last one rendered right now due to DOM flow overlap
                // "array.length - 1 - idx" gives us 0 for the top visual card, 1 for the one underneath.
                const isTopCard = idx === array.length - 1;
                const scale = isTopCard ? 1 : 0.95;
                const yOffset = isTopCard ? 0 : 20;
                const zIndex = isTopCard ? 10 : 0;
                const opacity = isTopCard ? 1 : 0.6;

                return (
                  <motion.div
                    key={property.id}
                    className="absolute inset-0 pointer-events-none"
                    initial={{ scale, y: yOffset, opacity }}
                    animate={{ scale, y: yOffset, opacity }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ zIndex }}
                  >
                    <div className="w-full h-full pointer-events-auto">
                      {/* Only the top card is fully interactive with the swipe hook */}
                      <SwipeablePropertyCard
                        property={property}
                        onSwipeLeft={isTopCard ? handleSwipeLeft : () => {}}
                        onSwipeRight={isTopCard ? handleSwipeRight : () => {}}
                      />
                    </div>
                  </motion.div>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-32 flex flex-col mx-auto bg-white max-w-md rounded-3xl items-center border border-gray-100 shadow-xl px-10">
            <span className="text-6xl mb-6 shadow-sm">🏠</span>
            <h3 className="text-3xl font-bold font-syne text-accent-dark mb-3">
              {filters.location ? "Coming Soon!" : "You've seen them all!"}
            </h3>
            <p className="text-gray-500 mb-8 max-w-[280px]">
              {filters.location
                ? `We're expanding to ${filters.location} soon. Stay tuned for new properties!`
                : "You've swiped through all available properties matching your criteria."}
            </p>
            <button
              onClick={() => {
                setFilters({
                  location: "",
                  minPrice: "",
                  maxPrice: "",
                  propertyType: "",
                  bedrooms: "",
                  priceRange: "",
                });
                setCurrentIndex(0);
              }}
              className="bg-gold text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:bg-yellow-600 hover:-translate-y-1 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <StickyCTA />
      <Footer />
    </main>
  );
}
