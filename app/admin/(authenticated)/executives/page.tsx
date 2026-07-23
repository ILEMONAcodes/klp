"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, ShieldCheck, Mail, Globe, UserPlus, X } from "lucide-react";

const INITIAL_EXECUTIVES = [
  {
    id: "EXEC-01",
    name: "Barr. Kayode Lawson",
    role: "Managing Director / CEO",
    qualifications: "LL.B, BL, LL.M (Property Law)",
    bio: "Over 18 years of experience in commercial property legal structures and real estate investments across Nigeria.",
    email: "kayode@kayceelawproperties.com",
    linkedin: "https://linkedin.com",
    image: "/placeholder-exec.jpg",
  },
  {
    id: "EXEC-02",
    name: "Dr. Cecilia Adeyemi",
    role: "Chief Operating Officer",
    qualifications: "Ph.D. Urban Planning, B.Sc. Estate Management",
    bio: "Pioneered legal land title verifications and strategic estate acquisition frameworks.",
    email: "cecilia@kayceelawproperties.com",
    linkedin: "https://linkedin.com",
    image: "/placeholder-exec.jpg",
  },
];

export default function AdminExecutivesPage() {
  const [executives, setExecutives] = useState(INITIAL_EXECUTIVES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExec, setNewExec] = useState({
    name: "",
    role: "",
    qualifications: "",
    bio: "",
    email: "",
    linkedin: "",
  });

  const handleAddExec = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExec.name || !newExec.role) return;

    const createdExec = {
      id: `EXEC-0${executives.length + 1}`,
      ...newExec,
      image: "/placeholder-exec.jpg",
    };

    setExecutives([...executives, createdExec]);
    setNewExec({ name: "", role: "", qualifications: "", bio: "", email: "", linkedin: "" });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this executive officer from the roster?")) {
      setExecutives(executives.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Executive Leadership Roster
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Manage corporate board members and executive officers displayed on the website.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-[#F2B512]" /> Add Executive Member
        </button>
      </div>

      {/* EXECUTIVES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {executives.map((exec) => (
          <div
            key={exec.id}
            className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-950/10 border border-purple-950/20 flex items-center justify-center font-extrabold text-purple-950 text-xl shrink-0">
                {exec.name.charAt(0)}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-extrabold text-stone-900 text-base">
                    {exec.name}
                  </h3>
                  <button
                    onClick={() => handleDelete(exec.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove Executive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  {exec.role}
                </p>

                {exec.qualifications && (
                  <p className="text-[11px] font-semibold text-stone-500">
                    {exec.qualifications}
                  </p>
                )}
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
              {exec.bio}
            </p>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Mail className="w-3.5 h-3.5 text-purple-950" /> {exec.email}
              </span>
              <span className="text-[10px] font-extrabold text-purple-950 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                Verified Executive
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ADD EXECUTIVE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h2 className="text-lg font-extrabold text-stone-900">
                Add Executive Officer
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExec} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">
                  Full Name & Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barr. Kayode Lawson"
                  value={newExec.name}
                  onChange={(e) => setNewExec({ ...newExec, name: e.target.value })}
                  className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Role / Position *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Legal Officer"
                    value={newExec.role}
                    onChange={(e) => setNewExec({ ...newExec, role: e.target.value })}
                    className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    Qualifications
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. LL.B, BL, LL.M"
                    value={newExec.qualifications}
                    onChange={(e) =>
                      setNewExec({ ...newExec, qualifications: e.target.value })
                    }
                    className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">
                  Corporate Email
                </label>
                <input
                  type="email"
                  placeholder="executive@kayceelawproperties.com"
                  value={newExec.email}
                  onChange={(e) => setNewExec({ ...newExec, email: e.target.value })}
                  className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">
                  Short Biography
                </label>
                <textarea
                  rows={3}
                  placeholder="Summary of legal or corporate real estate background..."
                  value={newExec.bio}
                  onChange={(e) => setNewExec({ ...newExec, bio: e.target.value })}
                  className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-950 text-white font-bold text-xs rounded-xl shadow-md hover:bg-purple-900"
                >
                  Save Executive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}