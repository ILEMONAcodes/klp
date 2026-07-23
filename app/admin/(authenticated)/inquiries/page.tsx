"use client";

import { useState } from "react";
import {
  Download,
  Search,
  Mail,
  Phone,
  Calendar,
  Filter,
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";

// Mock Database of Client Inquiries
const INITIAL_INQUIRIES = [
  {
    id: "INQ-1001",
    fullName: "Dr. Olayinka Adebayo",
    email: "olayinka.adebayo@example.com",
    phone: "+234 803 123 4567",
    preference: "Commercial Land & Development",
    message: "I am interested in acquiring a commercial land plot in Lekki Phase 1 for a hospital development project. Please send available C of O titles.",
    date: "2026-07-23",
    status: "New",
  },
  {
    id: "INQ-1002",
    fullName: "Chief Kenneth Okonkwo",
    email: "k.okonkwo@holdinggroup.ng",
    phone: "+234 802 987 6543",
    preference: "Schedule a Private Inspection",
    message: "Requesting a private weekend inspection for Apex Horizon Towers in Victoria Island for our corporate investment portfolio.",
    date: "2026-07-22",
    status: "Contacted",
  },
  {
    id: "INQ-1003",
    fullName: "Mrs. Fatima Bello",
    email: "fatima.bello@gmail.com",
    phone: "+234 814 555 0192",
    preference: "Residential Property Acquisition",
    message: "Looking for a 4-bedroom detached duplex with verified Governor's Consent in Ikoyi or Victoria Crest area.",
    date: "2026-07-21",
    status: "Completed",
  },
  {
    id: "INQ-1004",
    fullName: "Engr. Emmanuel Nwachukwu",
    email: "e.nwachukwu@buildtech.com",
    phone: "+234 701 444 8822",
    preference: "Joint Venture & Legal Title Consultation",
    message: "We need title perfection and legal verification services for a multi-hectare estate layout in Epe.",
    date: "2026-07-20",
    status: "New",
  },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Search & Filter Logic
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.preference.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Export to CSV Functionality
  const handleExportCSV = () => {
    const headers = ["ID,Full Name,Email,Phone,Preference,Message,Date,Status\n"];
    const rows = filteredInquiries.map(
      (inq) =>
        `"${inq.id}","${inq.fullName}","${inq.email}","${inq.phone}","${inq.preference}","${inq.message.replace(/"/g, '""')}","${inq.date}","${inq.status}"\n`
    );

    const blob = new Blob([...headers, ...rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `kayceelaw_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === "New"
        ? "Contacted"
        : currentStatus === "Contacted"
        ? "Completed"
        : "New";

    setInquiries(
      inquiries.map((inq) =>
        inq.id === id ? { ...inq, status: nextStatus } : inq
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry record?")) {
      setInquiries(inquiries.filter((inq) => inq.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER & EXPORT BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Client Inquiries & Database
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Manage incoming sales leads, contact form messages, and export records.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#F2B512]" /> Export Database (.CSV)
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-stone-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#FBF9F5] border border-stone-200 rounded-xl text-xs font-bold text-stone-800 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* INQUIRIES LIST / TABLE */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-[#FBF9F5] text-stone-900 uppercase text-[10px] font-extrabold tracking-wider border-b border-stone-200/80">
              <tr>
                <th className="py-4 px-4">Client Contact</th>
                <th className="py-4 px-4">Inquiry Category</th>
                <th className="py-4 px-4">Message Preview</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-bold text-stone-900 block text-sm">
                          {inq.fullName}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-purple-950" /> {inq.email}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-purple-950" /> {inq.phone}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-purple-950 bg-purple-50 px-2.5 py-1 rounded-lg text-[11px] border border-purple-100 inline-block">
                        {inq.preference}
                      </span>
                    </td>

                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-stone-600 line-clamp-2 text-xs leading-relaxed">
                        {inq.message}
                      </p>
                    </td>

                    <td className="py-4 px-4 text-stone-500 font-semibold text-[11px] whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" /> {inq.date}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(inq.id, inq.status)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                          inq.status === "New"
                            ? "bg-amber-500/10 text-amber-800 border border-amber-300 hover:bg-amber-500/20"
                            : inq.status === "Contacted"
                            ? "bg-blue-500/10 text-blue-800 border border-blue-300 hover:bg-blue-500/20"
                            : "bg-emerald-500/10 text-emerald-800 border border-emerald-300 hover:bg-emerald-500/20"
                        }`}
                        title="Click to cycle status"
                      >
                        {inq.status === "Completed" ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        {inq.status}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-stone-500 font-medium">
                    No client inquiries match your filter criteria.
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