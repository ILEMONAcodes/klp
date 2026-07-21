"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  {
    value: 1500,
    suffix: "+",
    label: "Happy Clients Served",
    icon: (
      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    value: 50,
    suffix: "+",
    label: "Hectares Active",
    icon: (
      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v3m0 0h3" />
      </svg>
    ),
  },
  {
    value: 100,
    suffix: "%",
    label: "Verified Titles",
    icon: (
      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296A3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043A3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    value: 24,
    suffix: "/7",
    label: "Dedicated Support",
    icon: (
      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
];

export default function AboutSection() {
  return (
    <section className="relative bg-[#fbf9f5] text-stone-900 py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN: TALL FEATURED VIDEO BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 h-full min-h-[480px] lg:min-h-[620px] relative"
          >
            <div className="relative w-full h-full rounded-tr-[100px] rounded-bl-[30px] rounded-tl-[16px] rounded-br-[16px] overflow-hidden shadow-xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/about-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: SMALLER HEADERS, TEXT, STATS & BUTTONS */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Headers & Narrative */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
              >
                {/* SMALLER SUB-LABEL (text-sm/md instead of text-xl) */}
                <span className="text-amber-500 font-bold text-sm sm:text-base block mb-1">
                  About Us
                </span>

                {/* SMALLER COMPACT TITLE (text-2xl/4xl instead of text-5xl) */}
                <h2 className="text-2xl sm:text-4xl font-extrabold leading-snug text-stone-900 tracking-tight">
                  We are Building the Future of Nigeria's Real Estate
                </h2>
              </motion.div>

              {/* SMALLER BODY TEXT (text-sm/base instead of text-lg) */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-stone-700 text-sm sm:text-base font-normal leading-relaxed"
              >
                At Kayceelaw Properties, we bridge the gap between aspirational
                living and real estate investments. Based in Abuja, we specialize
                in delivering contemporary, high-value developments—ranging from
                smart luxury estates to well-planned, accessible residential
                communities like the Ajuba Residential District.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-stone-700 text-sm sm:text-base font-normal leading-relaxed"
              >
                Whether you are looking to build your dream home or expand an
                investment portfolio, our focus is on structural integrity, prime
                strategic locations, modern infrastructure, and seamless client
                experiences.
              </motion.p>
            </div>

            {/* 2x2 Icon Stats Grid (Smaller numbers and icons) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-stone-300/60">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2.5 bg-amber-500/10 rounded-xl shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 tracking-tight">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={3200}
                      />
                    </div>
                    <div className="text-stone-700 text-xs font-semibold mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-300/60"
            >
              <div>
                <h4 className="font-bold text-stone-900 text-base mb-0.5">
                  Talk To Us
                </h4>
                <p className="text-stone-600 text-xs mb-3">
                  Get started with Kayceelaw by speaking to one of our experts.
                </p>
                <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-full transition-all duration-300 text-xs shadow-sm">
                  Let's Talk
                </button>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-base mb-0.5">
                  Project Catalog
                </h4>
                <p className="text-stone-600 text-xs mb-3">
                  Explore our portfolio through our collection of estate guides.
                </p>
                <button className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-full transition-all duration-300 text-xs shadow-sm">
                  View Catalog
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}