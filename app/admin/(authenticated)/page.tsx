"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building,
  Mail,
  Users,
  Download,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

const QUICK_STATS = [
  {
    title: "Total Properties",
    value: "24",
    change: "+3 this month",
    icon: Building,
    href: "/admin/properties",
  },
  {
    title: "Inquiries & Leads",
    value: "148",
    change: "+12 new today",
    icon: Mail,
    href: "/admin/inquiries",
  },
  {
    title: "Executive Officers",
    value: "7",
    change: "Active roster",
    icon: Users,
    href: "/admin/executives",
  },
  {
    title: "Verified Title Rate",
    value: "100%",
    change: "Legal perfection",
    icon: CheckCircle2,
    href: "#",
  },
];

const RECENT_INQUIRIES = [
  {
    id: "INQ-001",
    name: "Dr. Olayinka Adebayo",
    email: "olayinka@example.com",
    preference: "Commercial Land & Development",
    date: "2026-07-23",
    status: "New",
  },
  {
    id: "INQ-002",
    name: "Chief Kenneth Okonkwo",
    email: "kenneth@example.com",
    preference: "Schedule a Private Inspection",
    date: "2026-07-22",
    status: "Contacted",
  },
  {
    id: "INQ-003",
    name: "Mrs. Fatima Bello",
    email: "fatima@example.com",
    preference: "Residential Property Acquisition",
    date: "2026-07-21",
    status: "Pending",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* TOP HEADER & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Manage real estate listings, client messages, and corporate team members.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/properties/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#F2B512]" /> Add New Property
          </Link>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200/90 text-stone-900 hover:bg-stone-50 font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-purple-950" /> Export Database
          </Link>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {QUICK_STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-purple-950/10 text-purple-950 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {stat.change}
                </span>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 block">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-stone-600">
                  {stat.title}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* RECENT INQUIRIES & QUICK MANAGEMENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* RECENT CLIENT INQUIRIES TABLE */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Recent Inquiries
              </h2>
              <p className="text-stone-600 text-xs">
                Latest submissions from the website contact form.
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-purple-950 hover:text-amber-600 font-bold text-xs flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-[#FBF9F5] text-stone-900 uppercase text-[10px] font-extrabold tracking-wider border-b border-stone-200/80">
                <tr>
                  <th className="py-3 px-3">Client Name</th>
                  <th className="py-3 px-3">Preference</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {RECENT_INQUIRIES.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-stone-900">
                      {inq.name}
                      <span className="block text-[11px] font-normal text-stone-500">
                        {inq.email}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-stone-600">
                      {inq.preference}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-stone-500">
                      {inq.date}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          inq.status === "New"
                            ? "bg-amber-500/10 text-amber-800 border border-amber-300"
                            : inq.status === "Contacted"
                            ? "bg-emerald-500/10 text-emerald-800 border border-emerald-300"
                            : "bg-stone-100 text-stone-700"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SYSTEM STATUS & QUICK PANELS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-purple-950 text-white p-6 rounded-3xl shadow-md space-y-4 relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F2B512]">
                Database Backup
              </span>
              <h3 className="text-lg font-bold">Inquiries Export Ready</h3>
              <p className="text-purple-200 text-xs leading-relaxed">
                Download your entire database of customer messages and leads as a clean CSV or JSON spreadsheet.
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F2B512] hover:bg-amber-400 text-purple-950 font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <Download className="w-4 h-4" /> Go to Export Center
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold border-b border-stone-100 pb-3">
              <Clock className="w-4 h-4 text-purple-950" />
              <h3 className="text-sm">Admin Activity Log</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Added 3 new estate listings to properties.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Updated leadership details for Managing Director.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}