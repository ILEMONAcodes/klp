"use client";

import Link from "next/link";
import { ArrowLeft, UploadCloud, X } from "lucide-react";
import { createProperty, updateProperty } from "@/app/actions/properties";
import { useState } from "react";
import { useFormStatus } from "react-dom";

interface PropertyData {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  status?: string;
  isFeatured?: boolean;
  images?: string;
  latitude?: number | null;
  longitude?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  propertySize?: string | null;
  features?: string;
  landmarks?: string;
}

function SubmitButton({ isEditing }: { isEditing?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
    >
      {pending
        ? isEditing
          ? "Updating Property..."
          : "Saving Property..."
        : isEditing
        ? "Update Property"
        : "Save Property"}
    </button>
  );
}

export default function NewPropertyPage({
  editData,
}: {
  editData?: PropertyData;
}) {
  const isEditing = Boolean(editData?.id);

  const initialImages = editData?.images
    ? editData.images.includes(",")
      ? editData.images.split(",")
      : [editData.images]
    : [];

  const [images, setImages] = useState<string[]>(initialImages);
  const [propertyType, setPropertyType] = useState(
    editData?.type || "Residential"
  );

  const [location, setLocation] = useState(editData?.location || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [latitude, setLatitude] = useState(
    editData?.latitude ? String(editData.latitude) : "6.5244"
  );
  const [longitude, setLongitude] = useState(
    editData?.longitude ? String(editData.longitude) : "3.3792"
  );
  const [isSearchingMap, setIsSearchingMap] = useState(false);

  const isLand = propertyType.toLowerCase() === "land";

  const handleSearchLocation = async (queryToSearch?: string) => {
    let query = queryToSearch || searchQuery || location;
    if (!query || query.trim() === "") return;

    query = query.replace(/,?\s*nigeria$/i, "").trim();

    setIsSearchingMap(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query + ", Nigeria"
        )}`,
        {
          headers: {
            "User-Agent": "KayceelawPropertiesApp/1.0",
          },
        }
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setLatitude(parseFloat(data[0].lat).toFixed(6));
        setLongitude(parseFloat(data[0].lon).toFixed(6));
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    } finally {
      setIsSearchingMap(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const formAction =
    isEditing && editData?.id
      ? updateProperty.bind(null, editData.id)
      : createProperty;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/properties"
          className="flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-purple-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>
        <h1 className="text-xl font-extrabold text-stone-900">
          {isEditing ? "Edit Property" : "Add New Property"}
        </h1>
      </div>

      <form
        action={formAction}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-6"
      >
        <input type="hidden" name="images" value={JSON.stringify(images)} />
        <input type="hidden" name="latitude" value={latitude} />
        <input type="hidden" name="longitude" value={longitude} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={editData?.title || ""}
              placeholder="e.g. Victoria Crest Estate"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Price (₦)</label>
            <input
              type="number"
              name="price"
              step="any"
              required
              defaultValue={editData?.price || ""}
              placeholder="180000000"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Property Type</label>
            <select
              name="type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
              <option value="Duplex">Duplex</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Location Address</label>
            <input
              type="text"
              name="location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Lekki Phase 1, Lagos"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Property Size</label>
            <input
              type="text"
              name="propertySize"
              defaultValue={editData?.propertySize || ""}
              placeholder="e.g. 600 sqm or 2 Hectares"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>

          {!isLand && (
            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-purple-50/40 rounded-2xl border border-purple-100">
              <div>
                <label className="block text-xs font-bold text-purple-950 mb-1">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  defaultValue={editData?.bedrooms ?? ""}
                  placeholder="4"
                  className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-950 mb-1">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  defaultValue={editData?.bathrooms ?? ""}
                  placeholder="5"
                  className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
                />
              </div>
            </div>
          )}

          <div className="sm:col-span-2 p-4 bg-white rounded-2xl border border-stone-200/80 space-y-3">
            <div>
              <label className="block text-xs font-bold text-stone-800">
                Map Location Pin
              </label>
              <p className="text-[11px] text-stone-500">
                Search landmark/area or paste coordinates from Google Maps.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specific landmark (e.g. Eko Atlantic, Lagos)"
                className="flex-1 px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
              />
              <button
                type="button"
                onClick={() => handleSearchLocation()}
                disabled={isSearchingMap}
                className="px-4 py-2 bg-purple-950 text-white rounded-xl text-xs font-bold hover:bg-purple-900 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSearchingMap ? "Finding..." : "Find Coordinates"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono text-stone-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono text-stone-800"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 p-4 bg-white rounded-2xl border border-stone-200/80 space-y-3">
            <label className="block text-xs font-bold text-stone-800">
              Property Images
            </label>

            <label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-300 hover:border-purple-950 rounded-xl bg-white hover:bg-purple-50/20 transition-all cursor-pointer group">
              <UploadCloud className="w-7 h-7 text-stone-400 group-hover:text-purple-950 transition-colors mb-1.5" />
              <span className="text-xs font-bold text-stone-700 group-hover:text-purple-950">
                Click to Choose Property Images
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">
                PNG, JPG, WEBP formats supported
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                {images.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 group"
                  >
                    <img
                      src={imgSrc}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Features (Comma Separated)
            </label>
            <input
              type="text"
              name="features"
              defaultValue={editData?.features || ""}
              placeholder="24/7 Power, Swimming Pool, Security"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Landmarks (Format: Name:Time)
            </label>
            <input
              type="text"
              name="landmarks"
              defaultValue={editData?.landmarks || ""}
              placeholder="Shoprite:5 mins away, Airport:20 mins away"
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              required
              defaultValue={editData?.description || ""}
              placeholder="Provide a detailed description..."
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950 text-stone-800"
            ></textarea>
          </div>

          <div className="sm:col-span-2 flex items-center justify-between pt-4 border-t border-stone-100">
            <label className="flex items-center gap-2 text-xs font-bold text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                value="true"
                defaultChecked={editData?.isFeatured ?? false}
                className="w-4 h-4 rounded text-purple-950"
              />
              Mark as Featured Property
            </label>

            <SubmitButton isEditing={isEditing} />
          </div>
        </div>
      </form>
    </div>
  );
}