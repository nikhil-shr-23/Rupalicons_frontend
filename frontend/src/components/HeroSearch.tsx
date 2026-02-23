"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const cities = [
  "All Cities",
  "Gurgaon",
  "Delhi",
  "Noida",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
];

const budgetRanges = {
  buy: [
    "Under ₹50 Lac",
    "₹50 Lac - ₹1 Cr",
    "₹1 Cr - ₹2 Cr",
    "₹2 Cr - ₹5 Cr",
    "₹5 Cr+",
  ],
  rent: [
    "Under ₹10,000",
    "₹10,000 - ₹25,000",
    "₹25,000 - ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000+",
  ],
};

const propertyTypes = [
  "Apartment",
  "Villa",
  "Builder Floor",
  "Penthouse",
  "Office Space",
  "Shop",
];

const possessionStatuses = [
  "Ready to Move",
  "Within 1 Year",
  "Within 3 Years",
  "Under Construction",
];

export default function HeroSearch({
  onTabChange,
}: {
  onTabChange?: (tab: string) => void;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "buy" | "rent" | "projects" | "plot" | "commercial"
  >("buy");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPossession, setSelectedPossession] = useState("");

  // Notify parent of tab changes
  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTab);
    }
  }, [activeTab, onTabChange]);

  // Dropdown visibility
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] =
    useState(false);
  const [showPossessionDropdown, setShowPossessionDropdown] = useState(false);

  // Refs for closing dropdowns on outside click
  const cityRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);
  const propertyTypeRef = useRef<HTMLDivElement>(null);
  const possessionRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node))
        setShowCityDropdown(false);
      if (budgetRef.current && !budgetRef.current.contains(e.target as Node))
        setShowBudgetDropdown(false);
      if (
        propertyTypeRef.current &&
        !propertyTypeRef.current.contains(e.target as Node)
      )
        setShowPropertyTypeDropdown(false);
      if (
        possessionRef.current &&
        !possessionRef.current.contains(e.target as Node)
      )
        setShowPossessionDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Placeholder Animation
  const placeholders = [
    "Search by Project...",
    "Search by Locality...",
    "Search by Landmark...",
    "Search by City...",
  ];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "projects", label: "Projects" },
    { id: "plot", label: "Plot & Land" },
    { id: "commercial", label: "Commercial" },
  ];

  // Reset filters when switching tabs
  useEffect(() => {
    setSelectedBudget("");
    setSelectedPropertyType("");
    setSelectedPossession("");
  }, [activeTab]);

  const handleSearch = () => {
    // Navigate to buy or rent page with filters
    const target = activeTab === "rent" ? "/rent" : "/buy";
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCity !== "All Cities") params.set("city", selectedCity);
    if (selectedBudget) params.set("budget", selectedBudget);
    if (selectedPropertyType) params.set("propertyType", selectedPropertyType);
    if (selectedPossession) params.set("possession", selectedPossession);

    const queryString = params.toString();
    router.push(queryString ? `${target}?${queryString}` : target);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full max-w-4xl mt-20 relative z-20">
      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar bg-slate-900/80 backdrop-blur-md rounded-t-lg border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-slate-900"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Bar Container */}
      <div className="bg-white rounded-b-xl rounded-tr-xl shadow-xl p-1.5 flex flex-col md:flex-row items-center gap-1.5">
        {/* City Selector Dropdown */}
        <div
          ref={cityRef}
          className="relative w-full md:w-auto min-w-[150px] border-b md:border-b-0 md:border-r border-gray-200 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded-lg group"
          onClick={() => setShowCityDropdown(!showCityDropdown)}
        >
          <div className="flex items-center justify-between text-gray-700 font-bold text-sm">
            {selectedCity}
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform ${showCityDropdown ? "rotate-180" : ""}`}
            />
          </div>

          {/* City Dropdown */}
          {showCityDropdown && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2 max-h-64 overflow-y-auto">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCity(city);
                    setShowCityDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                    selectedCity === city
                      ? "text-gold font-semibold bg-gold/5"
                      : "text-gray-700"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Search Input */}
        <div className="grow w-full relative flex items-center px-2">
          <Search className="text-gray-400 w-4 h-4 absolute left-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[currentPlaceholderIndex]}
            className="w-full pl-10 pr-3 py-2.5 outline-none text-gray-700 placeholder-gray-400 text-sm text-ellipsis transition-all duration-500"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-gold hover:bg-gold-hover text-accent-dark font-semibold px-7 py-3 rounded-lg transition-colors shadow-md uppercase tracking-wide text-xs md:text-sm"
        >
          Search
        </button>
      </div>

      {/* Secondary Filters Row */}
      <div className="flex gap-3 mt-3 px-1.5 flex-wrap">
        {/* Budget Dropdown */}
        <div ref={budgetRef} className="relative">
          <button
            onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
            className="bg-white px-5 py-2.5 rounded-lg shadow-md text-xs md:text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            {selectedBudget || "Budget"}
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${showBudgetDropdown ? "rotate-180" : ""}`}
            />
          </button>
          {showBudgetDropdown && (
            <div className="absolute bottom-full left-0 mb-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2">
              {(activeTab === "rent"
                ? budgetRanges.rent
                : budgetRanges.buy
              ).map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedBudget(selectedBudget === range ? "" : range);
                    setShowBudgetDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                    selectedBudget === range
                      ? "text-gold font-semibold bg-gold/5"
                      : "text-gray-700"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Type Dropdown - Hidden for Plot & Land */}
        {activeTab !== "plot" && (
          <div ref={propertyTypeRef} className="relative">
            <button
              onClick={() =>
                setShowPropertyTypeDropdown(!showPropertyTypeDropdown)
              }
            className="bg-white px-5 py-2.5 rounded-lg shadow-md text-xs md:text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              {selectedPropertyType || "Property Type"}
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform ${showPropertyTypeDropdown ? "rotate-180" : ""}`}
              />
            </button>
            {showPropertyTypeDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedPropertyType(
                        selectedPropertyType === type ? "" : type,
                      );
                      setShowPropertyTypeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                      selectedPropertyType === type
                        ? "text-gold font-semibold bg-gold/5"
                        : "text-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Possession Status Dropdown - Hidden when Rent tab is active */}
        {activeTab !== "rent" && (
          <div ref={possessionRef} className="relative">
            <button
              onClick={() => setShowPossessionDropdown(!showPossessionDropdown)}
              className="bg-white px-5 py-2.5 rounded-lg shadow-md text-xs md:text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              {selectedPossession || "Possession Status"}
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform ${showPossessionDropdown ? "rotate-180" : ""}`}
              />
            </button>
            {showPossessionDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2">
                {possessionStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedPossession(
                        selectedPossession === status ? "" : status,
                      );
                      setShowPossessionDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                      selectedPossession === status
                        ? "text-gold font-semibold bg-gold/5"
                        : "text-gray-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
