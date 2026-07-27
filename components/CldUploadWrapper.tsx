"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { X, UploadCloud } from "lucide-react";

interface CldUploadWrapperProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CldUploadWrapper({
  images,
  setImages,
}: CldUploadWrapperProps) {
  const handleUploadSuccess = (result: any) => {
    if (result?.info?.secure_url) {
      setImages((prev) => [...prev, result.info.secure_url]);
    }
  };

  const handleRemoveImage = (urlToRemove: string) => {
    setImages((prev) => prev.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-3">
      <CldUploadWidget
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"
        }
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-300 hover:border-purple-950 rounded-xl bg-white hover:bg-purple-50/20 transition-all cursor-pointer group"
          >
            <UploadCloud className="w-7 h-7 text-stone-400 group-hover:text-purple-950 transition-colors mb-1.5" />
            <span className="text-xs font-bold text-stone-700 group-hover:text-purple-950">
              Click to Upload Property Images
            </span>
            <span className="text-[10px] text-stone-400 mt-0.5">
              PNG, JPG, WEBP up to 10MB
            </span>
          </button>
        )}
      </CldUploadWidget>

      {/* Uploaded Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 group"
            >
              <Image
                src={url}
                alt={`Property image ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(url)}
                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}