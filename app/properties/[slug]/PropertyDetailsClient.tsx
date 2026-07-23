"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Property Catalog Database with exact coordinates and specs
const PROPERTIES_DATA: Record<string, any> = {
  "ajuba-smart-city": {
    id: 1,
    title: "Ajuba Smart City, Phase 1",
    location: "Ajuba District, Abuja",
    price: "₦120,000,000",
    bedrooms: 4,
    bathrooms: 5,
    squareMeters: "450 sqm",
    tag: "Featured Development",
    coordinates: { lat: 9.0765, lng: 7.3985 },
    mainImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Redefining modern living in Abuja, Ajuba Smart City sets the benchmark for technological luxury. Spanning across prime acreage, the estate features luxury smart homes equipped with state-of-the-art automation and sustainable architecture tailored for high-net-worth family living.",
    specs: [
      { label: "Property Type", value: "Smart Detached Duplex" },
      { label: "Parking Space", value: "4 Vehicles" },
      { label: "Power Supply", value: "24/7 Solar Hybrid System" },
      { label: "Security", value: "Biometric Access & CCTV" },
    ],
    smartFeatures: [
      "Automated voice-controlled lighting & climate control",
      "Integrated solar backup inverter system",
      "Smart biometric door locks with video intercom",
      "Automated perimeter security & motion sensors",
    ],
    landmarks: [
      { name: "Nnamdi Azikiwe Int'l Airport", distance: "25 mins drive" },
      { name: "Central Business District (CBD)", distance: "12 mins drive" },
      { name: "Silverbird Galleria & Mall", distance: "10 mins drive" },
      { name: "Turkish International Hospital", distance: "8 mins drive" },
    ],
  },
  "nouveau-heights": {
    id: 2,
    title: "The Nouveau Heights",
    location: "Maitama, Abuja",
    price: "₦250,000,000",
    bedrooms: 3,
    bathrooms: 4,
    squareMeters: "380 sqm",
    tag: "Luxury Apartments",
    coordinates: { lat: 9.0882, lng: 7.4934 },
    mainImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Exclusive high-rise luxury apartments offering panoramic city views, private elevators, sky lounges, and uncompromised privacy in the heart of Maitama.",
    specs: [
      { label: "Property Type", value: "Penthouse Apartment" },
      { label: "Parking Space", value: "2 Underground Bays" },
      { label: "Elevator", value: "Private Card-Key Lift" },
      { label: "Security", value: "24-Hour Armed Guard & Concierge" },
    ],
    smartFeatures: [
      "Keyless smart card apartment access",
      "Centralized HVAC smart thermostat control",
      "High-speed fiber optic internet infrastructure",
      "Integrated surround audio systems",
    ],
    landmarks: [
      { name: "Hilton Abuja", distance: "5 mins drive" },
      { name: "Maitama General Hospital", distance: "4 mins drive" },
      { name: "National Mosque", distance: "8 mins drive" },
    ],
  },
  "kayceelaw-residence": {
    id: 3,
    title: "Kayceelaw Residence",
    location: "Wuye, Abuja",
    price: "₦180,000,000",
    bedrooms: 5,
    bathrooms: 6,
    squareMeters: "520 sqm",
    tag: "Smart Villas",
    coordinates: { lat: 9.0411, lng: 7.4475 },
    mainImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A serene collection of automated smart villas designed for modern family comfort, eco-friendly energy integration, and maximum security.",
    specs: [
      { label: "Property Type", value: "Detached Smart Villa" },
      { label: "Parking Space", value: "5 Vehicles" },
      { label: "Pool", value: "Private Infinity Pool" },
      { label: "Security", value: "24/7 Gated Access Control" },
    ],
    smartFeatures: [
      "Automated water management system",
      "Solar glass energy harvesting windows",
      "Mobile app remote control for all home appliances",
      "Smart security curtain automation",
    ],
    landmarks: [
      { name: "Wuye Ultra Modern Market", distance: "3 mins drive" },
      { name: "Wonderland Amusement Park", distance: "7 mins drive" },
      { name: "Abuja City Center", distance: "10 mins drive" },
    ],
  },
  "grand-horizon": {
    id: 4,
    title: "Grand Horizon Estates",
    location: "Guzape, Abuja",
    price: "₦95,000,000",
    bedrooms: 4,
    bathrooms: 4,
    squareMeters: "400 sqm",
    tag: "Gated Community",
    coordinates: { lat: 9.0289, lng: 7.5218 },
    mainImage:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Master-planned gated community offering prime residential plots, manicured parks, recreational clubhouses, and bespoke infrastructure.",
    specs: [
      { label: "Property Type", value: "Semi-Detached Duplex" },
      { label: "Parking Space", value: "3 Vehicles" },
      { label: "Roads", value: "Paved Dual Carriageways" },
      { label: "Security", value: "Perimeter Electric Fencing" },
    ],
    smartFeatures: [
      "Prepaid smart energy metering",
      "Community smart gate RFID pass",
      "Underground drainage & fiber network",
      "Automated street lighting",
    ],
    landmarks: [
      { name: "Guzape Hilltop Viewpoint", distance: "2 mins drive" },
      { name: "Asokoro District Boundary", distance: "5 mins drive" },
      { name: "National Hospital Abuja", distance: "12 mins drive" },
    ],
  },
};

export default function PropertyDetailsClient({ slug }: { slug: string }) {
  const router = useRouter();

  // Fallback to default property if slug isn't found
  const property = PROPERTIES_DATA[slug] || PROPERTIES_DATA["ajuba-smart-city"];

  const [activeImage, setActiveImage] = useState(property.mainImage);
  const [mapZoom, setMapZoom] = useState(16);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=${mapZoom}&output=embed`;

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-stone-900 pt-24 sm:pt-28 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-10">
        
        {/* BACK NAVIGATION & TITLE HEADER */}
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-purple-900 hover:text-purple-700 transition-colors"
          >
            ← Back to All Properties
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-amber-500/10 text-[#F2B512] font-bold text-xs uppercase tracking-wider rounded-full border border-[#F2B512]/30 inline-block">
                {property.tag}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 pt-1">
                {property.title}
              </h1>
              <p className="text-stone-500 text-xs sm:text-base flex items-center gap-1.5 font-medium">
                <svg
                  className="w-4 h-4 text-[#F2B512]"
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
            </div>

            {/* PRICE & PRIMARY CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-left sm:text-right">
                <span className="text-stone-400 text-xs uppercase block font-medium">
                  Selling Price
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#F2B512]">
                  {property.price}
                </span>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-purple-900 hover:bg-purple-800 text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md text-center"
              >
                Schedule Private Tour
              </a>
            </div>
          </div>
        </div>

        {/* RESPONSIVE LAYOUT GRID: GALLERY & DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: HIGH-RES GALLERY & SPECS (7 COLS ON DESKTOP) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive Image Gallery */}
            <div className="space-y-3">
              <div className="h-[300px] sm:h-[450px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-stone-200 relative bg-stone-900">
                <img
                  src={activeImage}
                  alt={property.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {property.gallery.map((imgUrl: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === imgUrl
                        ? "border-purple-900 scale-95 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* KEY ATTRIBUTES SUMMARY ROW */}
            <div className="grid grid-cols-3 gap-3 bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm text-center">
              <div>
                <span className="text-stone-400 text-xs block font-medium">Bedrooms</span>
                <span className="text-stone-900 font-bold text-lg sm:text-xl">
                  {property.bedrooms} Beds
                </span>
              </div>
              <div className="border-x border-stone-100">
                <span className="text-stone-400 text-xs block font-medium">Bathrooms</span>
                <span className="text-stone-900 font-bold text-lg sm:text-xl">
                  {property.bathrooms} Baths
                </span>
              </div>
              <div>
                <span className="text-stone-400 text-xs block font-medium">Total Area</span>
                <span className="text-stone-900 font-bold text-lg sm:text-xl">
                  {property.squareMeters}
                </span>
              </div>
            </div>

            {/* FULL DESCRIPTION */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-200/80 space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-stone-900">About the Estate</h3>
              <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
                {property.description}
              </p>

              <hr className="border-stone-100" />

              {/* Architectural Specs */}
              <h4 className="text-base font-bold text-purple-900 pt-2">
                Architectural Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.specs.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-100"
                  >
                    <span className="text-stone-400 text-[11px] block font-medium">
                      {item.label}
                    </span>
                    <span className="text-stone-900 text-xs sm:text-sm font-semibold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Smart Home Automation Specs */}
              <h4 className="text-base font-bold text-purple-900 pt-2">
                Smart Automation & Security
              </h4>
              <ul className="space-y-2">
                {property.smartFeatures.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                    <span className="text-[#F2B512] font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE MAP & LANDMARKS (5 COLS ON DESKTOP) */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            {/* INTERACTIVE MAP COMPONENT */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-200/80 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-purple-900 font-semibold text-xs uppercase tracking-wider block">
                    Location Pin
                  </span>
                  <h3 className="text-lg font-bold text-stone-900">Interactive Map</h3>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200">
                  <button
                    onClick={() => setMapZoom((z) => Math.min(z + 1, 19))}
                    className="w-7 h-7 bg-white hover:bg-stone-200 text-stone-900 font-bold rounded-full text-xs transition-colors flex items-center justify-center"
                    title="Zoom In"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setMapZoom((z) => Math.max(z - 1, 12))}
                    className="w-7 h-7 bg-white hover:bg-stone-200 text-stone-900 font-bold rounded-full text-xs transition-colors flex items-center justify-center"
                    title="Zoom Out"
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Embedded Interactive Google Map */}
              <div className="w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-stone-200 relative bg-stone-100">
                <iframe
                  title={`Map showing ${property.title}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={mapEmbedUrl}
                />
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${property.coordinates.lat},${property.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-purple-950 hover:bg-purple-900 text-white text-xs font-semibold rounded-full transition-colors block text-center shadow-sm"
              >
                Open Direct Directions in Google Maps
              </a>
            </div>

            {/* NEAREST LANDMARKS SECTION */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-200/80 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-stone-900">Nearest Landmarks & Routes</h3>
              
              <div className="space-y-3">
                {property.landmarks.map((lm: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#F2B512]" />
                      <span className="text-xs sm:text-sm font-medium text-stone-800">
                        {lm.name}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-purple-900 bg-purple-100 px-2.5 py-1 rounded-full">
                      {lm.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT CARD */}
            <div className="bg-purple-950 text-white p-6 rounded-2xl sm:rounded-3xl space-y-3 shadow-md">
              <h4 className="text-lg font-bold">Interested in this property?</h4>
              <p className="text-purple-200 text-xs leading-relaxed">
                Speak directly with a Kayceelaw Properties senior real estate advisor today.
              </p>
              <a
                href="tel:+2348000000000"
                className="w-full py-3 bg-[#F2B512] hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-full transition-colors block text-center"
              >
                Call Real Estate Advisor
              </a>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}