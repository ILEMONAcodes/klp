import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer"; // 1. Added Footer import

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#FBF9F5]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden pt-32 pb-24 text-white">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
          {/* CLEAN, ELEGANT HEADLINE */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-normal mb-6 text-white leading-tight">
            Kayceelaw Properties
          </h1>
          <p className="text-lg sm:text-xl text-stone-200 max-w-2xl mb-10 font-normal leading-relaxed">
            From luxury estates to accessible homes—discover exceptional properties and real estate services with Nigeria's most trusted agency.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3.5 bg-[#F2B512] hover:bg-amber-500 text-stone-950 font-semibold rounded-full shadow-lg transition-all duration-300 text-sm">
              Explore Estates
            </button>
            <button className="px-8 py-3.5 bg-transparent border border-white/80 hover:border-[#F2B512] text-white hover:text-[#F2B512] font-semibold rounded-full transition-all duration-300 text-sm">
              Book Site Visit
            </button>
          </div>
        </div>

        {/* CURVED MASK INTO CREAM BACKGROUND */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
          <svg
            className="relative block w-full h-16 sm:h-28 md:h-36 text-[#FBF9F5]"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* 1. FEATURED PROPERTIES SLIDER & QUOTE */}
      <FeaturedProperties />

      {/* 2. ABOUT SECTION */}
      <AboutSection />

      {/* 3. FOOTER SECTION */}
      <Footer />
    </main>
  );
}