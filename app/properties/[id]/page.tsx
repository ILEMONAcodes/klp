import { getPropertyById } from "@/app/actions/properties";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import DynamicMapDisplay from "@/components/DynamicMapDisplay";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) return notFound();

  const isLand = property.type.toLowerCase() === "land";
  const imageUrls = property.images ? property.images.split(",") : ["/placeholder.jpg"];
  const featureList = property.features ? property.features.split(",").map((f: string) => f.trim()) : [];

  // Parse landmarks string "Landmark:Time,Landmark2:Time"
  const landmarkList = property.landmarks
    ? property.landmarks.split(",").map((item: string) => {
        const [name, value] = item.split(":");
        return { name: name?.trim(), value: value?.trim() };
      })
    : [];

  return (
    <main className="min-h-screen bg-white text-stone-900 pt-24 sm:pt-28 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        
        {/* BACK LINK */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-950 hover:underline"
        >
          ← Back to All Properties
        </Link>

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full uppercase tracking-wider">
              {property.type}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              {property.title}
            </h1>
            <p className="text-stone-500 text-sm sm:text-base font-medium flex items-center gap-1.5">
              📍 {property.location}
            </p>
          </div>

          <div className="md:text-right space-y-3">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Selling Price</p>
            <p className="text-3xl sm:text-4xl font-black text-purple-600">
              ₦{property.price.toLocaleString("en-NG")}
            </p>
            <a
              href={`https://wa.me/2340000000000?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all"
            >
              Schedule Private Tour
            </a>
          </div>
        </div>

        {/* CONDITIONAL SPEC HIGHLIGHT BAR (BEDS/BATHS/SIZE) */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200/80 flex flex-wrap items-center gap-6 sm:gap-12">
          {!isLand && property.bedrooms && (
            <div>
              <span className="text-xs text-stone-400 font-bold block uppercase">Bedrooms</span>
              <span className="text-lg font-black text-stone-800">{property.bedrooms} Beds</span>
            </div>
          )}
          {!isLand && property.bathrooms && (
            <div>
              <span className="text-xs text-stone-400 font-bold block uppercase">Bathrooms</span>
              <span className="text-lg font-black text-stone-800">{property.bathrooms} Baths</span>
            </div>
          )}
          {property.propertySize && (
            <div>
              <span className="text-xs text-stone-400 font-bold block uppercase">Total Size</span>
              <span className="text-lg font-black text-stone-800">{property.propertySize}</span>
            </div>
          )}
        </div>

        {/* MAIN GRID CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: GALLERY & DETAILS */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md">
              <img
                src={imageUrls[0]}
                alt={property.title}
                className="w-full h-[350px] sm:h-[480px] object-cover"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-stone-900">About the Estate</h3>
              <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* FEATURES & AUTOMATION */}
            {featureList.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-stone-900">Key Features & Amenities</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featureList.map((feat, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700">
                      <span className="text-purple-600 font-bold">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT: MAP & LANDMARKS */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* INTERACTIVE MAP */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
              <span className="text-[10px] font-bold text-purple-950 uppercase tracking-widest block">
                LOCATION PIN
              </span>
              <h3 className="text-xl font-bold text-stone-900">Interactive Map</h3>

              {property.latitude && property.longitude ? (
                <div className="space-y-4">
                  <DynamicMapDisplay lat={property.latitude} lng={property.longitude} />
                  <a
                    href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center py-3 bg-stone-100 hover:bg-stone-200 text-purple-950 text-xs font-bold rounded-xl transition-all"
                  >
                    Open Direct Directions in Google Maps
                  </a>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-stone-400 bg-stone-50 rounded-2xl border border-dashed">
                  Map coordinates not specified for this listing.
                </div>
              )}
            </div>

            {/* LANDMARKS */}
            {landmarkList.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-stone-900">Nearest Landmarks & Routes</h3>
                <div className="space-y-3">
                  {landmarkList.map((lm, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl text-xs font-medium">
                      <span className="text-stone-700 font-semibold">• {lm.name}</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-950 rounded-full font-bold text-[11px]">
                        {lm.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DIRECT INQUIRY CTA */}
            <div className="bg-purple-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-4">
              <h3 className="text-xl font-bold">Interested in this property?</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Speak directly with a Kayceelaw Properties senior real estate advisor today.
              </p>
              <a
                href={`tel:+2340000000000`}
                className="block text-center py-3 bg-white hover:bg-gray-100 text-purple-950 font-extrabold text-xs rounded-xl shadow transition-all"
              >
                Call Real Estate Advisor
              </a>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}