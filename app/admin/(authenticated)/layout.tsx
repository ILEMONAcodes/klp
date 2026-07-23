"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Mail,
  Users,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

const ADMIN_NAV = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Building },
  { name: "Inquiries & Leads", href: "/admin/inquiries", icon: Mail },
  { name: "Executive Team", href: "/admin/executives", icon: Users },
  { name: "Settings & Security", href: "/admin/settings", icon: ShieldCheck },
];

export default function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // ignore
    }
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col md:flex-row">
      {/* MOBILE TOP HEADER */}
      <header className="md:hidden bg-purple-950 text-white p-4 flex items-center justify-between sticky top-0 z-50 border-b border-purple-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative rounded-lg bg-white/10 p-1">
            <Image
              src="/logo-transparent.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-[#F2B512]">
            KAYCEELAW ADMIN
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
          aria-label="Toggle Navigation"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* DESKTOP SIDEBAR / MOBILE DRAWER */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-purple-950 text-white p-6 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* BRANDING */}
          <div className="hidden md:flex items-center gap-3 border-b border-purple-900/80 pb-6">
            <div className="w-9 h-9 relative rounded-xl bg-white/10 p-1.5 shrink-0">
              <Image
                src="/logo-transparent.png"
                alt="Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-tight text-[#F2B512]">
                KAYCEELAW
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-purple-300">
                Management Panel
              </p>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-1.5 pt-4 md:pt-0">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#F2B512] text-purple-950 shadow-md"
                      : "text-purple-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-6 border-t border-purple-900/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-purple-200 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#F2B512]" /> View Website
            </span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}