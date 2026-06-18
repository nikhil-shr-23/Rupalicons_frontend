"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play, Instagram, Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface InstagramPost {
  id: string;
  image: string;
  permalink: string;
  likes: number;
  comments?: number;
}

const InstagramReels = () => {
  const [reels, setReels] = useState<InstagramPost[]>([]);

  useEffect(() => {
    // Mock data fallback
    const mockReels = [
      {
        id: "1",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        permalink: "https://instagram.com/rupali_homes",
        likes: 1200,
      },
      {
        id: "2",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        permalink: "https://instagram.com/rupali_homes",
        likes: 2100,
      },
      {
        id: "3",
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        permalink: "https://instagram.com/rupali_homes",
        likes: 1500,
      },
      {
        id: "4",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        permalink: "https://instagram.com/rupali_homes",
        likes: 3400,
      },
      {
        id: "5",
        image:
          "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        permalink: "https://instagram.com/rupali_homes",
        likes: 980,
      },
    ];

    const fetchReels = async () => {
      try {
        const res = await fetch("/api/instagram");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.data) {
          setReels(data.data);
        } else {
          // Fallback to mock data if API fails or token is missing (for demo purposes)
          console.warn("Using mock data due to API error/missing token");
          setReels(mockReels);
        }
      } catch (err) {
        // Silently fail and use mock data as per user request
        setReels(mockReels); // Fallback
      }
    };

    fetchReels();
  }, []);

  // Duplicate reels for seamless loop if we have enough items, otherwise just show them
  // If we have very few items, we might need to duplicate more
  // Duplicate reels to create a seamless loop. We need enough items to fill the screen twice.
  const copiesCount = reels.length > 0 && reels.length < 4 ? 4 : 2;
  const displayReels = Array(copiesCount).fill(reels).flat();
  const shiftPercent = `-${100 / copiesCount}%`;

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold font-syne mb-4">
            Follow Us On <span className="text-gold">Instagram</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl">
            Stay updated with our latest luxury projects, behind-the-scenes, and
            design inspiration.
          </p>
        </div>
        <Link
          href="https://instagram.com/rupali_homes"
          target="_blank"
          className="px-6 py-3 bg-white border border-gray-200 rounded-full text-accent-dark font-medium hover:bg-gold hover:text-white hover:border-gold transition-all flex items-center gap-2 group"
        >
          <Instagram size={20} />
          @rupali_homes
        </Link>
      </div>

      {/* Infinite Carousel */}
      <div className="relative w-full">
        {/* Gradients for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden md:block" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 px-6"
            animate={{
              x: ["0%", shiftPercent],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {displayReels.map((reel, index) => (
              <Link
                href={reel.permalink}
                target="_blank"
                key={`${reel.id}-${index}`}
                className="relative group shrink-0 w-[280px] h-[500px] rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={reel.image}
                  alt={`Rupali Homes Reel ${index}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized={true} // Allow external images from FB/Insta CDN
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                    <Play fill="white" className="text-white ml-1" size={32} />
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Views not available in basic display API often, so maybe hide or use if available */}
                      {/* <div className="flex items-center gap-1">
                        <Play size={16} fill="currentColor" />
                        <span className="text-sm font-medium">N/A</span>
                      </div> */}
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span className="text-sm font-medium">
                          {reel.likes}
                        </span>
                      </div>
                    </div>
                    <Instagram size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InstagramReels;
