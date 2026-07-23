"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { ArrowLeft, Upload, ShieldCheck } from "lucide-react";

export default function NewPropertyPage() {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "Residential",
    titleType: "Certificate of Occupancy (C of O)",
    description: "",
    featured: false,
    status: "Active",
    features: ["24/7 Security", "Paved Roads", "Perimeter Fencing"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Property created successfully!");
    router.push("/admin/properties");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* TOP BAR */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/properties"
          className="p-2.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Add New Property
          </h1>
          <p className="text-stone-600 text-xs">
            Create a new verified real estate listing for the website.
          </p>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
        {/* BASIC DETAILS */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-purple-950 border-b border-stone-100 pb-2">
            1. Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                Property Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Victoria Crest Estate"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                Location *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lekki Phase 1, Lagos"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                Price (₦) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ₦180,000,000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                Property Category
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-950"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land / Plot</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                Legal Title Status *
              </label>
              <select
                value={formData.titleType}
                onChange={(e) => setFormData({ ...formData, titleType: e.target.value })}
                className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-950"
              >
                <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                <option value="Governor's Consent">Governor's Consent</option>
                <option value="Gazette">Gazette</option>
                <option value="Registered Survey / Deed">Registered Survey / Deed</option>
              </select>
            </div>
          </div>
        </div>

        {/* MEDIA UPLOAD PLACEHOLDER */}
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-purple-950 border-b border-stone-100 pb-2">
            2. Property Images
          </h2>

          <div className="border-2 border-dashed border-stone-200 rounded-2xl p-8 text-center bg-[#FBF9F5] hover:bg-stone-50 transition-colors cursor-pointer space-y-2">
            <Upload className="w-8 h-8 text-purple-950 mx-auto" />
            <p className="text-xs font-bold text-stone-800">
              Click to upload property photo or drag and drop
            </p>
            <p className="text-[10px] text-stone-500">
              PNG, JPG or WEBP (Max 5MB each)
            </p>
          </div>
        </div>

        {/* DESCRIPTION & OPTIONS */}
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-purple-950 border-b border-stone-100 pb-2">
            3. Details & Visibility
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-800">
              Full Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe key selling points, layout, security, proximity to major landmarks..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-950"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-purple-950 focus:ring-purple-950"
              />
              <span className="text-xs font-bold text-stone-800">
                Highlight as Featured Listing
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status === "Active"}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked ? "Active" : "Draft" })
                }
                className="w-4 h-4 rounded text-purple-950 focus:ring-purple-950"
              />
              <span className="text-xs font-bold text-stone-800">
                Publish Immediately
              </span>
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-6 border-t border-stone-100 flex justify-end gap-3">
          <Link
            href="/admin/properties"
            className="px-5 py-3 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#F2B512]" /> Save Property Listing
          </button>
        </div>
      </form>
    </div>
  );
}