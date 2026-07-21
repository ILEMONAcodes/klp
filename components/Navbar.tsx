import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo Icon + Company Name */}
        <a href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo-transparent.png"
            alt="Kayceelaw Properties"
            width={50}
            height={50}
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">
              Kayceelaw
            </span>
            <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase mt-0.5">
              Properties
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-200">
          <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
          <a href="#properties" className="hover:text-amber-400 transition-colors">Properties</a>
          <a href="#projects" className="hover:text-amber-400 transition-colors">Projects</a>
          <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
        </nav>

        {/* Direct Call Button */}
        <a
          href="tel:+2348164173622"
          className="hidden sm:flex items-center gap-2 bg-purple-900 hover:bg-purple-950 text-white border border-purple-700/60 text-xs font-semibold px-5 py-3 rounded-full transition shadow-lg shadow-purple-950/50"
        >
          <span className="text-amber-400 font-bold">📞</span>
          <span>+234 816 417 3622</span>
        </a>

      </div>
    </header>
  );
}