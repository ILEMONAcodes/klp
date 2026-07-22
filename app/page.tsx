"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FeaturedProperties from "@/components/FeaturedProperties";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION - CLAMPED HEIGHT & ARCS */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 overflow-hidden bg-slate-950 [clip-path:ellipse(150%_100%_at_50%_0%)] md:[clip-path:none]">
        {/* Background Video / Lightened Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60" // Increased video opacity
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Lightened Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/30 to-slate-950/80" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Main Title - Proportional Mobile Font Size */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-none">
            Kayceelaw <br className="sm:hidden" />
            <span className="text-white">Properties</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="mt-4 text-xs sm:text-base md:text-lg text-slate-200 max-w-xl leading-relaxed px-2 sm:px-0">
            From luxury estates to accessible homes—discover exceptional properties
            and real estate services with Nigeria's most trusted agency.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
            <motion.a
              href="#properties"
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-amber-500/20 text-center"
            >
              Explore Estates
            </motion.a>
            <motion.a
              href="#contact"
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md text-white font-semibold text-sm border border-white/20 transition-all duration-200 text-center"
            >
              Book Site Visit
            </motion.a>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <FeaturedProperties />

      {/* CLAMPED SECOND VIDEO/IMAGE SECTION HEIGHT */}
      <AboutSection /> 

      <Footer />
    </main>
  );
}