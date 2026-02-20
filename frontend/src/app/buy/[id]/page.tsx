"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Share2,
  ArrowLeft,
  CheckCircle,
  Flame,
} from "lucide-react";
import confetti from "canvas-confetti";
import { fetchProperties } from "@/lib/api";
import { Property } from "@/types";

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [fireCount, setFireCount] = useState(0);
  const [showFireAnimation, setShowFireAnimation] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      if (!id) return;
      try {
        // Fetch all properties and find the one with the matching ID
        // In a real app, we'd have a specific endpoint for fetchById
        const data = await fetchProperties();
        const found = data.content.find((p) => p.id.toString() === id);
        if (found) {
          setProperty(found);
        }
      } catch (error) {
        console.error("Failed to load property", error);
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [id]);

  const handleConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const triggerFireReaction = () => {
    setFireCount((prev) => prev + 1);
    setShowFireAnimation(true);
    setTimeout(() => setShowFireAnimation(false), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h2 className="text-2xl font-syne text-accent-dark mb-4">
          Property Not Found
        </h2>
        <Link
          href="/buy"
          className="px-6 py-2 bg-accent-dark text-white rounded-full hover:bg-gold transition-colors"
        >
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-24 pb-12">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <Link
          href="/buy"
          className="inline-flex items-center text-gray-500 hover:text-gold transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Search
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image Gallery */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 group">
            <div className="aspect-video relative">
              {property.imageUrl ? (
                <Image
                  src={property.imageUrl}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              <button className="bg-white/90 backdrop-blur text-accent-dark px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white transition-colors shadow-lg">
                <Maximize size={16} /> View Photos
              </button>
            </div>
          </div>

          {/* Key Info Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-bold uppercase tracking-widest text-green-600">
                  {property.status}
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-sm font-medium text-gray-500 capitalize">
                  {property.type.toLowerCase()}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-syne text-accent-dark mb-2">
                {property.price
                  ? `₹${(property.price / 10000000).toFixed(2)} Cr`
                  : `₹${(property.rentAmount! / 1000).toFixed(1)}k/mo`}
              </h1>
              <div className="flex items-center text-gray-500 text-lg">
                <MapPin size={18} className="mr-2 text-gold" />
                {property.location}
              </div>
            </div>

            {/* Reactions Bar */}
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => setLiked(!liked)}
                className={`p-4 rounded-full border-2 transition-colors relative ${liked ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-red-300"}`}
              >
                <Heart
                  size={24}
                  className={
                    liked ? "fill-red-500 text-red-500" : "text-gray-400"
                  }
                />
              </motion.button>

              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={triggerFireReaction}
                  className="p-4 rounded-full border-2 border-gray-200 hover:border-orange-300 bg-orange-50 group transition-colors"
                >
                  <Flame
                    size={24}
                    className="text-orange-500 group-hover:fill-orange-500 transition-colors"
                  />
                  {fireCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {fireCount}
                    </span>
                  )}
                </motion.button>

                {/* Fire Animation Popup */}
                <AnimatePresence>
                  {showFireAnimation && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 1, y: 0, scale: 0.5, x: 0 }}
                          animate={{
                            opacity: 0,
                            y: -100 - Math.random() * 50,
                            x: (Math.random() - 0.5) * 60,
                            scale: 1.5,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute text-2xl"
                        >
                          🔥
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <button className="p-4 rounded-full border-2 border-gray-200 hover:border-gold hover:text-gold text-gray-400 transition-colors">
                <Share2 size={24} />
              </button>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-4 py-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center justify-center border-r border-gray-100">
              <Bed size={28} className="text-gray-400 mb-2" />
              <span className="text-2xl font-bold text-accent-dark">
                {property.bedrooms || 3}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">
                Beds
              </span>
            </div>
            <div className="flex flex-col items-center justify-center border-r border-gray-100">
              <Bath size={28} className="text-gray-400 mb-2" />
              <span className="text-2xl font-bold text-accent-dark">
                {property.bathrooms || 2}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">
                Baths
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Maximize size={28} className="text-gray-400 mb-2" />
              <span className="text-2xl font-bold text-accent-dark">
                {property.sqft || property.size}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">
                Sqft
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold font-syne text-accent-dark mb-4">
              About this home
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {property.description}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mt-4">
              Experience the pinnacle of luxury living with this exquisite
              property. Featuring state-of-the-art amenities, premium finishes,
              and a location that offers both privacy and connectivity. Every
              corner is designed with meticulous attention to detail to ensure a
              lifestyle of comfort and grandeur.
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-2xl font-bold font-syne text-accent-dark mb-6">
              Facts & Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Central Air",
                "2 Garage Spaces",
                "Swimming Pool",
                "Hardwood Floors",
                "Smart Home",
                "Solar Panels",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle size={18} className="text-gold" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-syne text-accent-dark mb-2">
                {property.title}
              </h3>
              <p className="text-gray-500">Listed by Rupali Homes</p>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleConfetti();
              }}
            >
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-gold transition-colors"
              />
              <textarea
                placeholder="I am interested in this property..."
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-gold transition-colors h-32"
              ></textarea>

              <button
                type="submit"
                className="w-full py-4 bg-accent-dark text-white rounded-xl font-bold text-lg hover:bg-gold transition-all duration-300 shadow-lg hover:shadow-gold/20 transform hover:-translate-y-1"
              >
                Book a Visit
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              By submitting, you agree to our Terms of Use and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
