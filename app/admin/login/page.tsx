"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, KeyRound, AlertCircle, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Authentication failed.");
      }

      // Successful login! The HTTP-only cookie is set by the API route.
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Update main background to CREAM color
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col items-center justify-center p-4">
      
      {/* Return to website link (top left) */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-full border border-stone-200/60 transition-colors">
        <Home className="w-3.5 h-3.5" />
        Return to Website
      </Link>

      {/* Main Login Card - Updated to DEEP PURPLE */}
      <div className="w-full max-w-lg bg-[#43016C] border border-purple-950 rounded-3xl p-10 md:p-14 shadow-3xl space-y-9 relative overflow-hidden">
        
        {/* Abstract background shape for flair */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#F2B512] opacity-10 blur-3xl pointer-events-none"></div>

        {/* LOGO & HEADER */}
        <div className="text-center space-y-4 relative z-10">
          <div className="inline-flex p-3.5 bg-white/10 border border-white/20 rounded-2xl">
            {/* The icon from Screen Shot 2026-07-23 at 5.43.55 PM.png */}
            <ShieldCheck className="w-9 h-9 text-[#F2B512]" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Kayceelaw Admin Portal
          </h1>
          <p className="text-xs text-purple-200/90 font-medium">
            Authorized personnel login only
          </p>
        </div>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs font-semibold flex items-center gap-3 relative z-10">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-300 absolute left-4 top-4" />
              <input
                type="email"
                required
                placeholder="admin@kayceelawproperties.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // Styling input fields for purple background
                className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/10 text-white rounded-xl focus:outline-none focus:border-[#F2B512] text-xs font-medium placeholder-purple-300/60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-purple-300 absolute left-4 top-4" />
              <input
                type="password"
                required
                placeholder="••••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/10 text-white rounded-xl focus:outline-none focus:border-[#F2B512] text-xs font-medium placeholder-purple-300/60"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-4 bg-[#800DFE] hover:bg-[#902AFE] active:bg-[#700BDE] text-white font-bold text-xs rounded-xl shadow-lg transition-all duration-150 flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                {/* The text from Screen Shot 2026-07-23 at 5.43.55 PM.png */}
                <span>Sign In to Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Optional copyright footer */}
      <p className="absolute bottom-6 text-[10px] text-stone-500 font-medium">
        © {new Date().getFullYear()} Kayceelaw Properties. All rights reserved.
      </p>
    </div>
  );
}