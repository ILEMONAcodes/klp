"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

interface ExecutiveMember {
  id: string;
  name: string;
  role?: string;
  title?: string; // Fallback for static items
  image?: string | null;
  bio?: string | null;
}

export default function ExecutiveGrid({ members }: { members: ExecutiveMember[] }) {
  return (
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
        {members.map((member, idx) => {
          const isSlideFromLeft = idx % 2 === 0;

          return (
            <motion.div
              key={member.id || idx}
              initial={{
                opacity: 0,
                x: isSlideFromLeft ? -60 : 60,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <div className="h-72 w-full relative bg-stone-100 overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>

              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-stone-900">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
                    {member.role || member.title}
                  </p>
                  <p className="text-stone-600 text-xs leading-relaxed pt-2">
                    {member.bio || "No biography provided."}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}