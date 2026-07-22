"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Ajuba Smart City, Phase 1",
    location: "Ajuba District, Abuja",
    description:
      "Redefining modern living in Abuja, Ajuba Smart City sets the benchmark. Spanning across prime acreage, the estate features luxury smart homes equipped with state-of-the-art automation and sustainable architecture.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    link: "/properties/ajuba-smart-city",
    tag: "Featured Development",
  },
  {
    id: 2,
    title: "The Nouveau Heights",
    location: "Maitama, Abuja",
    description:
      "Exclusive high-rise luxury apartments offering panoramic city views, private elevators, sky lounges, and uncompromised privacy in the heart of Maitama.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    link: "/properties/nouveau-heights",
    tag: "Luxury Apartments",
  },
  {
    id: 3,
    title: "Kayceelaw Residence",
    location: "Wuye, Abuja",
    description:
      "A serene collection of automated smart villas designed for modern family comfort, eco-friendly energy integration, and maximum security.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    link: "/properties/kayceelaw-residence",
    tag: "Smart Villas",
  },
  {
    id: 4,
    title: "Grand Horizon Estates",
    location: "Guzape, Abuja",
    description:
      "Master-planned gated community offering prime residential plots, manicured parks, recreational clubhouses, and bespoke infrastructure.",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    link: "/properties/grand-horizon",
    tag: "Gated Community",
  },
];

// Duplicate list to create a seamless infinite marquee scroll
const extendedProjects = [...projects, ...projects, ...projects];

export default function FeaturedProperties() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth constant auto-scroll loop
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused && container) {
        // Increment scroll position continuously
        container.scrollLeft += 1;

        // Reset scroll position seamlessly when reaching half-point
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Toggle overlay on tap for mobile devices
  const handleCardClick = (index: number) => {
    setActiveCardIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#FBF9F5] py-12 sm:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* HEADER SECTION - COMPACT MOBILE TYPOGRAPHY */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <span className="text-[#F2B512] font-semibold text-xs sm:text-base block mb-1 sm:mb-2 tracking-wide uppercase">
              Our Flagship Developments
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-snug sm:leading-tight">
              Architectural Mastery & Contemporary Living
            </h2>
          </div>

          <p className="text-stone-600 text-xs sm:text-base max-w-md font-normal leading-relaxed">
            Explore our portfolio of smart, sustainable, and master-planned 
            residential communities engineered for modern luxury.
          </p>
        </div>

        {/* CONTINUOUS AUTO-SCROLL CAROUSEL */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setActiveCardIndex(null);
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div 
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 sm:pb-6 pt-2 scrollbar-none cursor-grab active:cursor-grabbing"
          >
            {extendedProjects.map((project, index) => {
              const isCardActive = activeCardIndex === index;

              return (
                <div
                  key={`${project.id}-${index}`}
                  onClick={() => handleCardClick(index)}
                  className="min-w-[82vw] sm:min-w-[380px] lg:min-w-[420px] h-[300px] sm:h-[380px] lg:h-[440px] relative rounded-2xl sm:rounded-3xl overflow-hidden shrink-0 shadow-lg select-none group cursor-pointer"
                >
                  {/* Property Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Base Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                    <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium rounded-full border border-white/20">
                      {project.tag}
                    </span>
                  </div>

                  {/* Static Bottom Title */}
                  <div className={`absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-white z-10 transition-opacity duration-300 ${
                    isCardActive ? "opacity-0" : "group-hover:opacity-0"
                  }`}>
                    <h3 className="text-lg sm:text-2xl font-bold tracking-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm flex items-center gap-1 font-light">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F2B512]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {project.location}
                    </p>
                  </div>

                  {/* PURPLE OVERLAY - HOVER & TOUCH/CLICK SLIDE UP */}
                  <div className={`absolute inset-0 bg-purple-900/95 text-white p-5 sm:p-8 z-20 flex flex-col justify-between backdrop-blur-sm transition-transform duration-500 ease-in-out ${
                    isCardActive ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
                  }`}>
                    <div className="space-y-2 sm:space-y-4 pt-4 sm:pt-10">
                      <h3 className="text-xl sm:text-3xl font-bold tracking-tight leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-purple-200 text-xs sm:text-sm flex items-center gap-1 font-medium">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {project.location}
                      </p>

                      <p className="text-purple-100/90 text-xs sm:text-sm leading-relaxed pt-1 font-normal line-clamp-4 sm:line-clamp-none">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-purple-700/50">
                      <Link
                        href={project.link}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-purple-950 font-bold rounded-full text-[11px] sm:text-xs uppercase tracking-wider hover:bg-purple-100 transition-colors"
                      >
                        View Details
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON (MOVED HIGHER) */}
        <div className="flex justify-center -mt-2 sm:pt-2">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2.5 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-full transition-all duration-300 text-xs sm:text-sm shadow-md hover:shadow-xl group"
          >
            <span>Explore All Developments</span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F2B512] text-stone-950 flex items-center justify-center group-hover:translate-x-1 transition-transform text-[10px] sm:text-xs font-bold">
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}