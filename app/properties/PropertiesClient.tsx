"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  status: string;
  isFeatured: boolean;
  images: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  propertySize?: string | null;
  features?: string | null;
}

const CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Land",
  "Duplex",
];

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function PropertiesClient({ initialProperties }: { initialProperties: Property[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Real-time Search & Filter Logic on Database Properties
  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || property.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, initialProperties]);

  return (
    <main className="min-h-screen bg-white text-stone-900 pt-24 sm:pt-28 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-10">
        
        {/* PAGE HEADER */}
        <div className="text-center sm:text-left max-w-3xl space-y-2 sm:space-y-3">
          <span className="text-purple-600 font-semibold text-xs sm:text-sm tracking-wide uppercase block">
            Exclusive Listings
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
            Explore Estates & Developments
          </h1>
          <p className="text-stone-600 text-xs sm:text-base font-normal leading-relaxed">
            Browse through our master-planned communities, luxury apartments, and smart villas across prime locations.
          </p>
        </div>

        {/* SEARCH & TAB NAVIGATION BAR */}
        <div className="space-y-5 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-stone-200/80">
          
          {/* Search Field */}
          <div className="relative w-full">
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, title, or property type..."
              className="w-full pl-11 pr-10 py-3 sm:py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none border-t border-stone-100">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-purple-950 text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-purple-100 hover:text-purple-950"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS COUNT SUMMARY */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 font-medium px-1">
          <span>
            Showing <strong className="text-stone-900">{filteredProperties.length}</strong> {filteredProperties.length === 1 ? "property" : "properties"}
          </span>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-purple-600 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* VERTICAL STACKED LISTING WITH STAGGER ANIMATIONS */}
        <AnimatePresence mode="wait">
          {filteredProperties.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6 sm:gap-8"
            >
              {filteredProperties.map((property) => {
                const imageUrls = property.images ? property.images.split(",") : [];
                const mainImage = imageUrls[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";
                const isLand = property.type.toLowerCase() === "land";

                return (
                  <motion.div
                    key={property.id}
                    variants={cardVariants}
                    className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-stone-200/80 transition-shadow duration-300 grid grid-cols-1 md:grid-cols-12 group"
                  >
                    {/* Left Column: Image Box */}
                    <div className="md:col-span-5 lg:col-span-5 h-[220px] sm:h-[280px] md:h-full relative overflow-hidden">
                      <img
                        src={mainImage}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold rounded-full border border-white/20">
                          {property.type}
                        </span>
                        {property.isFeatured && (
                          <span className="px-3 py-1 bg-purple-950 text-white text-[10px] sm:text-xs font-semibold rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Content Details */}
                    <div className="md:col-span-7 lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-purple-600 font-bold text-base sm:text-xl">
                            ₦{property.price.toLocaleString("en-NG")}
                          </span>

                          {/* CONDITIONAL SPECS: HIDDEN FOR LAND */}
                          {!isLand && (property.bedrooms || property.bathrooms) && (
                            <div className="text-stone-500 text-xs font-semibold flex items-center gap-2">
                              {property.bedrooms && <span>{property.bedrooms} Beds</span>}
                              {property.bedrooms && property.bathrooms && <span>•</span>}
                              {property.bathrooms && <span>{property.bathrooms} Baths</span>}
                            </div>
                          )}
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug group-hover:text-purple-900 transition-colors">
                          {property.title}
                        </h2>

                        <p className="text-stone-500 text-xs sm:text-sm flex items-center gap-1.5 font-medium">
                          <svg
                            className="w-4 h-4 text-purple-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>
                          {property.location}
                        </p>

                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal pt-1 line-clamp-3">
                          {property.description}
                        </p>
                      </div>

                      {/* Bottom CTA Button */}
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                        <Link
                          href={`/properties/${property.id}`}
                          className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 bg-purple-900 hover:bg-purple-800 text-white font-semibold text-xs rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          View Property Details
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* EMPTY STATE */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-3"
            >
              <p className="text-stone-800 font-bold text-lg">No properties found</p>
              <p className="text-stone-500 text-xs sm:text-sm max-w-sm mx-auto">
                {searchQuery
                  ? `We couldn't find anything matching "${searchQuery}". Try searching for another location.`
                  : "No properties available at the moment. Check back soon or add one in the admin portal!"}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-5 py-2 bg-purple-900 text-white text-xs font-bold rounded-full hover:bg-purple-800 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </main>
  );
}