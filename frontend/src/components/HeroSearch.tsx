"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, MapPin, Mic, Crosshair } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<
    "buy" | "rent" | "projects" | "pg" | "plot" | "commercial"
  >("buy");
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] =
    useState(false);

  // Placeholder Animation Logic
  const placeholders = [
    "Search by Project...",
    "Search by Locality...",
    "Search by Landmark...",
    "Search by Builder...",
  ];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "buy", label: "Buy", icon: "🏠" },
    { id: "rent", label: "Rental", icon: "🏷️" },
    { id: "projects", label: "Projects", icon: "🏢" },
    { id: "pg", label: "PG / Hostels", icon: "🛏️" },
    { id: "plot", label: "Plot & Land", icon: "📍" },
    { id: "commercial", label: "Commercial", icon: "🏪" },
  ];

  return (
    <div className="w-full max-w-5xl mt-8 relative z-20">
      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar bg-slate-900/80 backdrop-blur-md rounded-t-xl border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-slate-900"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {/* You can use icons here if needed, keeping it simple for now */}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Bar Container */}
      <div className="bg-white rounded-b-xl rounded-tr-xl shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2">
        {/* Location / City Selector */}
        <div className="relative w-full md:w-auto min-w-[140px] border-b md:border-b-0 md:border-r border-gray-200 px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-lg group">
          <div className="flex items-center justify-between text-gray-700 font-bold text-sm">
            Select City{" "}
            <ChevronDown
              size={16}
              className="text-gray-400 group-hover:text-accent-dark transition-transform group-hover:rotate-180"
            />
          </div>
          {/* Dropdown would go here */}
        </div>

        {/* Main Search Input */}
        <div className="flex-grow w-full relative flex items-center px-2">
          <Search className="text-gray-400 w-5 h-5 absolute left-4" />
          <input
            type="text"
            placeholder={placeholders[currentPlaceholderIndex]}
            className="w-full pl-12 pr-4 py-3 outline-none text-gray-700 placeholder-gray-400 text-ellipsis transition-all duration-500"
          />
          <div className="absolute right-4 flex items-center gap-2">
            <button
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
              aria-label="Use current location"
            >
              <Crosshair size={18} />
            </button>
            <button
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
              aria-label="Voice search"
            >
              <Mic size={18} />
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full md:w-auto bg-gold hover:bg-yellow-400 text-accent-dark font-bold px-8 py-4 rounded-lg transition-colors shadow-md uppercase tracking-wider text-sm">
          Search
        </button>
      </div>

      {/* Secondary Filters Row (Floating below) */}
      <div className="flex gap-4 mt-4 px-2">
        {["Budget", "Property Type", "Possession Status"].map((filter) => (
          <button
            key={filter}
            className="bg-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            {filter} <ChevronDown size={14} className="text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
