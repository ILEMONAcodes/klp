"use client";

import Link from "next/link";
import { ArrowLeft, UploadCloud, X } from "lucide-react";
import { createExecutive } from "@/app/actions/executives";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
    >
      {pending ? "Saving Executive..." : "Save Executive Member"}
    </button>
  );
}

export default function NewExecutivePage() {
  const [image, setImage] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/executives"
          className="flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-purple-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Executives
        </Link>
        <h1 className="text-xl font-extrabold text-stone-900">Add Team Member</h1>
      </div>

      <form
        action={createExecutive}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-5"
      >
        <input type="hidden" name="image" value={image} />

        {/* PROFILE PHOTO UPLOAD */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-2">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            {image ? (
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-stone-200">
                <img src={image} alt="Profile preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="w-full flex flex-col items-center justify-center p-5 border-2 border-dashed border-stone-300 hover:border-purple-950 rounded-2xl bg-white hover:bg-purple-50/20 transition-all cursor-pointer group">
                <UploadCloud className="w-6 h-6 text-stone-400 group-hover:text-purple-950 mb-1" />
                <span className="text-xs font-bold text-stone-700 group-hover:text-purple-950">
                  Upload Executive Headshot
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* FULL NAME & ROLE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Arc. Kaycee Lawal"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Position / Role
            </label>
            <input
              type="text"
              name="role"
              required
              placeholder="e.g. Chief Executive Officer"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>
        </div>

        {/* EMAIL & PHONE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="kaycee@kayceelaw.com"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="+234 800 000 0000"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>
        </div>

        {/* BIOGRAPHY */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            Short Biography
          </label>
          <textarea
            name="bio"
            rows={4}
            placeholder="Write a brief professional background..."
            className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-3 border-t border-stone-100">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}