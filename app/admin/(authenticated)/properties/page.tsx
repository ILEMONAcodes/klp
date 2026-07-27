import Link from "next/link";
import { Plus, Trash2, Edit3, MapPin, Home } from "lucide-react";
import { getProperties, deleteProperty } from "@/app/actions/properties";

export default async function AdminPropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">Properties</h1>
          <p className="text-xs font-semibold text-stone-500 mt-0.5">
            Manage your property listings, updates, and availability.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add Property
        </Link>
      </div>

      {/* PROPERTIES LIST TABLE */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
        {properties.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-purple-50 text-purple-950 rounded-2xl flex items-center justify-center mx-auto">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-stone-800">No properties found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              You haven't added any properties yet. Click the button above to add your first listing.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100 bg-[#FBF9F5] text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Property</th>
                  <th className="py-4 px-4">Type</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100 text-xs font-semibold text-stone-700">
                {properties.map((prop: any) => {
                  let mainImage = null;
                  try {
                    const parsed = prop.images ? JSON.parse(prop.images) : [];
                    mainImage = Array.isArray(parsed) ? parsed[0] : prop.images;
                  } catch {
                    mainImage = prop.images ? prop.images.split(",")[0] : null;
                  }

                  return (
                    <tr key={prop.id} className="hover:bg-stone-50/60 transition-colors">
                      {/* TITLE & LOCATION */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                            {mainImage ? (
                              <img
                                src={mainImage}
                                alt={prop.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-400">
                                <Home className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-extrabold text-stone-900 text-xs">{prop.title}</p>
                            <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-stone-400" /> {prop.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* TYPE */}
                      <td className="py-4 px-4 text-stone-600">{prop.type}</td>

                      {/* PRICE */}
                      <td className="py-4 px-4 font-bold text-stone-900">
                        ₦{Number(prop.price).toLocaleString()}
                      </td>

                      {/* FEATURED / STANDARD BADGE */}
                      <td className="py-4 px-4">
                        {prop.isFeatured ? (
                          <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-lg">
                            Featured
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold rounded-lg">
                            Standard
                          </span>
                        )}
                      </td>

                      {/* EDIT & DELETE ACTIONS */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/properties/${prop.id}/edit`}
                            className="p-2 text-stone-600 hover:text-purple-950 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Edit Property"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          <form action={deleteProperty} className="inline">
                            <input type="hidden" name="id" value={prop.id} />
                            <button
                              type="submit"
                              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Property"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}