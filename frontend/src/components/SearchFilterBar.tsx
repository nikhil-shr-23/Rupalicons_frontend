"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  IndianRupee,
  Home,
  Bed,
} from "lucide-react";

export interface SearchFilters {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
}

interface SearchFilterBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchFilterBar({ onSearch }: SearchFilterBarProps) {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = () => {
    onSearch({ location, propertyType, priceRange, bedrooms });
  };

  return (
    <div className="bg-white rounded-full shadow-lg border border-gray-100 p-2 flex flex-col md:flex-row items-center gap-2 max-w-6xl mx-auto mt-8">
      {/* Location */}
      <div className="flex-1 w-full md:w-auto px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 flex items-center gap-3">
        <div className="p-2 bg-gray-50 rounded-full text-gray-400">
          <MapPin size={18} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
            Location
          </p>
          <input
            type="text"
            placeholder="Golf Course Road, Gurgaon"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm font-medium text-accent-dark placeholder-gray-300 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Property Type */}
      <div className="flex-1 w-full md:w-auto px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 flex items-center gap-3">
        <div className="p-2 bg-gray-50 rounded-full text-gray-400">
          <Home size={18} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
            Property type
          </p>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full text-sm font-medium text-accent-dark bg-transparent focus:outline-none appearance-none cursor-pointer"
          >
            <option value="">Any Type</option>
            <option value="Apartments">Apartments</option>
            <option value="Houses">Houses</option>
            <option value="Villas">Villas</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
      </div>

      {/* Price Range */}
      <div className="flex-1 w-full md:w-auto px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 flex items-center gap-3">
        <div className="p-2 bg-gray-50 rounded-full text-gray-400">
          <IndianRupee size={18} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
            Price
          </p>
          <input
            type="text"
            placeholder="₹10,000-₹50,000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full text-sm font-medium text-accent-dark placeholder-gray-300 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="flex-1 w-full md:w-auto px-6 py-2 border-b md:border-b-0 md:border-r border-gray-100 flex items-center gap-3">
        <div className="p-2 bg-gray-50 rounded-full text-gray-400">
          <Bed size={18} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
            Bedrooms
          </p>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full text-sm font-medium text-accent-dark bg-transparent focus:outline-none appearance-none cursor-pointer"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pl-2">
        <button className="p-4 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gold transition-colors flex items-center gap-2 group">
          <SlidersHorizontal
            size={18}
            className="text-gray-400 group-hover:text-gold transition-colors"
          />
          <span className="text-sm font-medium text-gray-600 hidden lg:inline">
            More
          </span>
        </button>
        <button
          onClick={handleSearch}
          className="px-8 py-4 bg-accent-dark text-white rounded-full font-medium hover:bg-gold hover:text-accent-dark transition-all shadow-md flex items-center gap-2"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  );
}
