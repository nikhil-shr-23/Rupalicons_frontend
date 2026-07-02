"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchProperties,
  likeProperty,
  unlikeProperty,
  fetchLikedPropertyIds,
} from "@/lib/api";
import { Property, PropertyType } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilterBar, { parsePriceRange, findPriceRangeLabel } from "@/components/SearchFilterBar";
import StickyCTA from "@/components/StickyCTA";
import SwipeablePropertyCard from "@/components/SwipeablePropertyCard";
import PropertyGridCard from "@/components/PropertyGridCard";
import { Layers, LayoutGrid } from "lucide-react";
import confetti from "canvas-confetti";

interface FilterState {
  location: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  bedrooms: string;
  priceRange?: string;
}

// Custom hook for responsive breakpoint
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
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

  const currentRequestId = useRef(0);

  // Swipe State Tracking
  const [currentIndex, setCurrentIndex] = useState(0);

  // View mode: "swipe" (Tinder-like) or "grid"
  // On mobile, default is "swipe". On desktop, always "grid".
  const isMobile = useIsMobile();
  const [mobileViewMode, setMobileViewMode] = useState<"swipe" | "grid">("swipe");

  // Determine effective view mode
  const viewMode = isMobile ? mobileViewMode : "grid";

  useEffect(() => {
    fetchLikedPropertyIds().then((ids) => setLikedIds(new Set(ids)));

    // Parse URL parameters for initial filters (e.g. from Hero search or Footer links)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      const city = params.get("city");
      const locList: string[] = [];
      if (q) locList.push(q);
      if (city) locList.push(city);
      const urlLocation = params.get("location") || locList.join(", ");

      const urlPropertyType = params.get("propertyType");
      const urlMinPrice = params.get("minPrice");
      const urlMaxPrice = params.get("maxPrice");

      // Reverse-map minPrice/maxPrice to a priceRange label for the dropdown
      const priceLabel = findPriceRangeLabel(
        urlMinPrice ? Number(urlMinPrice) : undefined,
        urlMaxPrice ? Number(urlMaxPrice) : undefined,
        "buy"
      );

      setFilters((prev) => ({
        ...prev,
        ...(urlLocation && { location: urlLocation }),
        ...(urlPropertyType && { propertyType: urlPropertyType }),
        ...(urlMinPrice && { minPrice: urlMinPrice }),
        ...(urlMaxPrice && { maxPrice: urlMaxPrice }),
        ...(priceLabel && { priceRange: priceLabel }),
      }));
    }
  }, []);

  const applyFilters = useCallback(async () => {
    const requestId = ++currentRequestId.current;
    setLoading(true);
    let minPrice: number | undefined = filters.minPrice
      ? Number(filters.minPrice)
      : undefined;
    let maxPrice: number | undefined = filters.maxPrice
      ? Number(filters.maxPrice)
      : undefined;

    // Parse priceRange dropdown label into numeric min/max
    if (filters.priceRange) {
      const parsed = parsePriceRange(filters.priceRange);
      minPrice = parsed.min;
      maxPrice = parsed.max;
    }

    try {
      const data = await fetchProperties(0, 100, {
        type: PropertyType.SALE,
        location: filters.location || undefined,
        minPrice: minPrice,
        maxPrice: maxPrice,
        bedrooms: filters.bedrooms ? Number(filters.bedrooms) : undefined,
      });

      if (requestId !== currentRequestId.current) return;

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
            p.buildingType?.toLowerCase().includes(ptLower)
          );
        }

        if (filters.bedrooms && filters.bedrooms !== "Any") {
          const minBeds = Number(filters.bedrooms);
          filtered = filtered.filter(p => p.bedrooms && p.bedrooms >= minBeds);
        }

        if (minPrice !== undefined) {
          filtered = filtered.filter(p => p.price && p.price >= minPrice!);
        }
        if (maxPrice !== undefined) {
          filtered = filtered.filter(p => p.price && p.price <= maxPrice!);
        }

        setProperties(filtered);
      }
    } catch (error) {
      if (requestId !== currentRequestId.current) return;
      console.error("Failed to load properties", error);
    } finally {
      if (requestId === currentRequestId.current) {
        setLoading(false);
      }
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

  // Empty state component (shared between views)
  const EmptyState = () => (
    <div className="text-center py-32 flex flex-col mx-auto bg-white max-w-md rounded-3xl items-center border border-gray-100 shadow-xl px-10">
      <span className="text-6xl mb-6 shadow-sm">🏠</span>
      <h3 className="text-3xl font-bold font-syne text-accent-dark mb-3">
        {filters.location ? "Coming Soon!" : "No properties found"}
      </h3>
      <p className="text-gray-500 mb-8 max-w-[280px]">
        {filters.location
          ? `We're expanding to ${filters.location} soon. Stay tuned for new properties!`
          : viewMode === "swipe"
            ? "You've swiped through all available properties matching your criteria."
            : "No properties match your current filters. Try adjusting your search."}
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
              mode="buy"
              initialFilters={{
                location: filters.location,
                propertyType: filters.propertyType,
                bedrooms: filters.bedrooms,
                priceRange: filters.priceRange || "",
              }}
              onSearch={(newFilters) => {
                setFilters((prev) => ({
                  ...prev,
                  location: newFilters.location,
                  propertyType: newFilters.propertyType,
                  bedrooms: newFilters.bedrooms,
                  priceRange: newFilters.priceRange,
                  minPrice: "", // Clear direct min/max so priceRange is single source of truth
                  maxPrice: "",
                }));
                setCurrentIndex(0);
              }}
            />
          </motion.div>

          {/* View mode toggle - visible ONLY on mobile */}
          {isMobile && !loading && properties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mt-6"
            >
              <p className="text-sm text-gray-500 font-medium">
                {properties.length} {properties.length === 1 ? "property" : "properties"} found
              </p>
              <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5">
                <button
                  onClick={() => setMobileViewMode("swipe")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    mobileViewMode === "swipe"
                      ? "bg-white text-accent-dark shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  id="view-toggle-swipe"
                >
                  <Layers size={16} />
                  Swipe
                </button>
                <button
                  onClick={() => setMobileViewMode("grid")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    mobileViewMode === "grid"
                      ? "bg-white text-accent-dark shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  id="view-toggle-grid"
                >
                  <LayoutGrid size={16} />
                  Grid
                </button>
              </div>
            </motion.div>
          )}

          {/* Property count - visible on desktop */}
          {!isMobile && !loading && properties.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500 font-medium mt-6"
            >
              {properties.length} {properties.length === 1 ? "property" : "properties"} found
            </motion.p>
          )}
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full grow">
        {loading ? (
          <div className="flex justify-center items-center py-20 min-h-[500px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : properties.length === 0 ? (
          <EmptyState />
        ) : viewMode === "swipe" ? (
          /* ============================================= */
          /*         SWIPE VIEW (mobile only)              */
          /* ============================================= */
          <div className="flex flex-col items-center justify-center">
            {currentIndex < properties.length ? (
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
                  You&apos;ve seen them all!
                </h3>
                <p className="text-gray-500 mb-8 max-w-[280px]">
                  You&apos;ve swiped through all available properties matching your criteria.
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
          </div>
        ) : (
          /* ============================================= */
          /*         GRID VIEW (desktop + mobile toggle)   */
          /* ============================================= */
          <AnimatePresence mode="wait">
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {properties.map((property, index) => (
                <PropertyGridCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      <StickyCTA />
      <Footer />
    </main>
  );
}
