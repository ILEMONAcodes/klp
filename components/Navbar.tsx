"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-stone-200/60"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 shrink-0 overflow-hidden rounded-xl group-hover:scale-105 transition-transform">
            <Image
              src="/logo-transparent.png"
              alt="Kayceelaw Properties Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base leading-tight tracking-tight text-stone-900">
              KAYCEELAW
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-purple-700 -mt-0.5">
              Properties
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-wider font-bold transition-colors relative py-1 ${
                  isActive
                    ? "text-purple-950"
                    : "text-stone-600 hover:text-purple-950"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA BUTTON */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-full transition-all shadow-sm hover:shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            Get in Touch
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200/80 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-colors ${
                    isActive
                      ? "bg-purple-950 text-white"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-200/60 space-y-2">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              <Phone className="w-4 h-4" />
              Contact Us Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}