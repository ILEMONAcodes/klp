"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Trophy, Award, ShieldCheck, Cpu, Leaf, Medal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ANIMATED COUNTER COMPONENT
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds counting animation
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const TEAM_MEMBERS = [
  {
    name: "Emmanuel Kelechukwu Chris Esq.",
    title: "Managing Director / CEO",
    image: "/team-emmanuel.jpg",
    bio: "Legal practitioner and visionary real estate strategist with over a decade of experience in high-yield property acquisition and urban development across Nigeria.",
  },
  {
    name: "Odebala Winifred",
    title: "Chief Legal Officer",
    image: "/team-winifred.jpg",
    bio: "Ensuring seamless perfection in property title verification, documentation, and regulatory compliance for every client investment.",
  },
  {
    name: "Sunday Goodness",
    title: "Chief Operating Officer",
    image: "/team-goodness.jpg",
    bio: "Directing operational efficiency, estate infrastructure management, and project execution standards across all developments.",
  },
  {
    name: "Ebiloma Uchubiyojo Fortress",
    title: "Acting Head of Sales",
    image: "/team-fortress.jpg",
    bio: "Spearheading client acquisition strategies, real estate portfolio management, and market expansion initiatives.",
  },
  {
    name: "Rachel Ogbeha",
    title: "Head of Client Relations",
    image: "/team-rachel.jpg",
    bio: "Dedicated to providing exceptional client onboarding, private tour coordination, and post-purchase advisory support.",
  },
  {
    name: "Joseph Sabastine",
    title: "Senior Project Architect",
    image: "/team-joseph.jpg",
    bio: "Translating contemporary smart-city concepts into sustainable, luxurious residential reality.",
  },
  {
    name: "Abiola Nathaniel",
    title: "Lead Infrastructure Engineer",
    image: "/team-abiola.jpg",
    bio: "Supervising structural integrity, subterranean utilities, and smart energy grid installations.",
  },
];

const COMPANY_STATS = [
  { numericValue: 15, suffix: "+", label: "Years Experience" },
  { numericValue: 500, suffix: "+", label: "Properties Sold" },
  { numericValue: 1200, suffix: "+", label: "Satisfied Clients" },
  { numericValue: 100, suffix: "%", label: "Verified Titles" },
];

const CORE_VALUES = [
  {
    title: "Integrity & Legal Perfection",
    desc: "Every plot and home in our portfolio undergoes rigorous legal vetting to guarantee 100% unencumbered titles.",
  },
  {
    title: "Smart Innovation",
    desc: "Integrating sustainable energy, automated security, and modern architectural standards into every development.",
  },
  {
    title: "Client-Centric Excellence",
    desc: "Building enduring relationships by prioritizing client wealth creation and tailored real estate advisory.",
  },
];

const AWARDS = [
  {
    title: "Best Real Estate Agency in Abuja",
    year: "2023",
    icon: Trophy,
    category: "Excellence Award",
    slideDir: { x: -40, y: 0 }, // Slide from Left
  },
  {
    title: "Excellence in Customer Service",
    year: "2022",
    icon: ShieldCheck,
    category: "Client Satisfaction",
    slideDir: { x: 0, y: 40 }, // Slide from Bottom
  },
  {
    title: "Top Property Developer Recognition",
    year: "2021",
    icon: Award,
    category: "Development",
    slideDir: { x: 40, y: 0 }, // Slide from Right
  },
  {
    title: "Sustainable Development Award",
    year: "2020",
    icon: Leaf,
    category: "Green Building",
    slideDir: { x: -40, y: 0 }, // Slide from Left
  },
  {
    title: "Innovation in Real Estate Tech",
    year: "2019",
    icon: Cpu,
    category: "Smart Homes",
    slideDir: { x: 0, y: 40 }, // Slide from Bottom
  },
  {
    title: "Legal Title Integrity Honors",
    year: "2018",
    icon: Medal,
    category: "Trust & Security",
    slideDir: { x: 40, y: 0 }, // Slide from Right
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FBF9F5] text-stone-900 pt-16 sm:pt-20">
      <Navbar />

      {/* HERO SECTION WITH VISIBLE VIDEO BACKGROUND */}
      <section className="relative pt-20 pb-28 md:pb-36 text-white overflow-hidden bg-slate-950">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        >
          <source src="/about-video.mp4" type="video/mp4" />
        </video>

        {/* Soft Transparent Purple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 via-purple-950/70 to-slate-950/85 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl"
          >
            <span className="px-3.5 py-1.5 bg-amber-500/20 text-[#F2B512] font-bold text-xs uppercase tracking-wider rounded-full border border-[#F2B512]/40 backdrop-blur-sm inline-block">
              About Kayceelaw Properties
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Redefining Luxury Living & Smart Real Estate
            </h1>
            <p className="text-stone-200 text-sm sm:text-lg leading-relaxed max-w-2xl">
              Kayceelaw Properties is a premier real estate development and legal advisory firm committed to delivering high-yield landed property, smart homes, and secure estates across Nigeria.
            </p>
          </motion.div>

          {/* SLOWLY ANIMATED STATS COUNTER GRID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6"
          >
            {COMPANY_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 border border-white/20 backdrop-blur-md p-5 sm:p-6 rounded-2xl text-center shadow-lg"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-[#F2B512] block">
                  <AnimatedCounter value={stat.numericValue} suffix={stat.suffix} />
                </span>
                <span className="text-xs sm:text-sm text-stone-200 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CURVED SECTION DIVIDER */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg
            className="relative block w-full h-12 sm:h-20 text-[#FBF9F5]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* MISSION, VISION & VALUES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
            Our Foundation & Vision
          </h2>
          <p className="text-stone-600 text-xs sm:text-base">
            Guiding high-net-worth individuals and families toward generational wealth through safe real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CORE_VALUES.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-[#F2B512] flex items-center justify-center font-bold text-lg">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-stone-900">{val.title}</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AWARDS & RECOGNITION SECTION (NOW ON CREAM BACKGROUND ABOVE LEADERSHIP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 space-y-12 overflow-hidden">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 bg-amber-500/10 text-amber-700 font-bold text-xs uppercase tracking-widest rounded-full border border-amber-300 inline-block">
            Milestones & Honors
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900">
            Awards & Industry Recognition
          </h2>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
            Honored for our unwavering commitment to legal transparency, architectural perfection, and client satisfaction.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AWARDS.map((award, idx) => {
            const Icon = award.icon;
            return (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  x: award.slideDir.x,
                  y: award.slideDir.y,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group bg-white border border-stone-200/90 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex items-start gap-4"
              >
                {/* Custom Styled Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-purple-950 text-[#F2B512] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#F2B512] group-hover:text-purple-950 transition-all duration-300 shadow-md">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900">
                      {award.category}
                    </span>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-300/60">
                      {award.year}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-purple-950 transition-colors leading-snug">
                    {award.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* EXECUTIVE LEADERSHIP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 space-y-12 overflow-hidden">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-purple-900 font-bold text-xs uppercase tracking-widest">
            Executive Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
            Meet the Minds Behind Kayceelaw
          </h2>
          <p className="text-stone-600 text-xs sm:text-base">
            A seasoned team of legal experts, engineers, and real estate developers dedicated to your success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => {
            const isSlideFromLeft = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  x: isSlideFromLeft ? -60 : 60,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                <div className="h-72 w-full relative bg-stone-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "";
                    }}
                  />
                </div>

                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-900">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
                      {member.title}
                    </p>
                    <p className="text-stone-600 text-xs leading-relaxed pt-2">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="bg-purple-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold">
              Ready to Secure Your Next Property Investment?
            </h2>
            <p className="text-purple-200 text-xs sm:text-sm leading-relaxed">
              Schedule a private consultation or tour with our executive team today.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/properties"
              className="inline-block px-8 py-3.5 bg-[#F2B512] hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-full transition-all shadow-md"
            >
              Explore Our Properties
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}