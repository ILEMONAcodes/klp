"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  Building,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";

// Mock initial properties data
const INITIAL_PROPERTIES = [
  {
    id: "PROP-001",
    title: "Victoria Crest Estate",
    location: "Lekki Phase 1, Lagos",
    price: "₦180,000,000",
    type: "Residential",
    titleType: "Certificate of Occupancy (C of O)",
    status: "Active",
    featured: true,
    image: "/placeholder-property.jpg",
  },
  {
    id: "PROP-002",
    title: "Apex Horizon Towers",
    location: "Victoria Island, Lagos",
    price: "₦450,000,000",
    type: "Commercial",
    titleType: "Governor's Consent",
    status: "Active",
    featured: true,
    image: "/placeholder-property.jpg",
  },
  {
    id: "PROP-003",
    title: "Greenwich Park Gardens",
    location: "Epe, Lagos",
    price: "₦25,000,000",
    type: "Land",
    titleType: "Registered Survey / Deed",
    status: "Sold Out",
    featured: false,
    image: "/placeholder-property.jpg",
  },
];

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = properties.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this property listing?")) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setProperties(
      properties.map((p) =>
        p.id === id ? { ...p, featured: !p.featured } : p
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Property Management
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            View, edit, toggle visibility, or add new real estate listings.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-[#F2B512]" /> Add New Property
        </Link>
      </div>

      {/* FILTER & SEARCH */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
          />
        </div>
        <div className="text-xs font-bold text-stone-500">
          Total: <span className="text-purple-950 font-extrabold">{filteredProperties.length}</span> properties
        </div>
      </div>

      {/* PROPERTY TABLE */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-[#FBF9F5] text-stone-900 uppercase text-[10px] font-extrabold tracking-wider border-b border-stone-200/80">
              <tr>
                <th className="py-4 px-4">Property</th>
                <th className="py-4 px-4">Type & Legal Title</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Featured</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-stone-100 relative overflow-hidden shrink-0 border border-stone-200">
                          <Building className="w-6 h-6 text-stone-400 absolute inset-0 m-auto" />
                        </div>
                        <div>
                          <span className="font-bold text-stone-900 block text-sm">
                            {prop.title}
                          </span>
                          <span className="text-stone-500 text-[11px]">
                            {prop.location}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-stone-800 block">
                        {prop.type}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {prop.titleType}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-extrabold text-purple-950">
                      {prop.price}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleFeatured(prop.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border cursor-pointer transition-colors ${
                          prop.featured
                            ? "bg-amber-500/10 text-amber-900 border-amber-300 hover:bg-amber-500/20"
                            : "bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200"
                        }`}
                      >
                        {prop.featured ? "Featured ★" : "Standard"}
                      </button>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          prop.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {prop.status === "Active" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                        {prop.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/properties`}
                          target="_blank"
                          className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prop.id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Delete Property"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-stone-500 font-medium">
                    No properties found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}