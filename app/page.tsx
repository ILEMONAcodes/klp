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
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 overflow-hidden bg-slate-950">
        {/* Background Video / Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Main Title - Proportional Mobile Font Size */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-none">
            Kayceelaw <br className="sm:hidden" />
            <span className="text-white">Properties</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="mt-4 text-xs sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed px-2 sm:px-0">
            From luxury estates to accessible homes—discover exceptional properties
            and real estate services with Nigeria's most trusted agency.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
            {/* Explore Estates Button with Touch Feedback */}
            <motion.a
              href="#properties"
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-amber-500/20 text-center"
            >
              Explore Estates
            </motion.a>

            {/* Book Site Visit Button */}
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

      {/* Rest of your sections */}
      <FeaturedProperties />
      <AboutSection />
      <Footer />
    </main>
  );
}