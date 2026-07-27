import Link from "next/link";
import { Plus, Trash2, UserCheck, Mail, Phone, User } from "lucide-react";
import { getExecutives, deleteExecutive } from "@/app/actions/executives";

export default async function AdminExecutivesPage() {
  const executives = await getExecutives();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">Executive Team</h1>
          <p className="text-xs font-semibold text-stone-500 mt-0.5">
            Manage your key team members, profiles, and contact details.
          </p>
        </div>

        <Link
          href="/admin/executives/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add Executive
        </Link>
      </div>

      {/* EXECUTIVES LIST TABLE */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
        {executives.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-purple-50 text-purple-950 rounded-2xl flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-stone-800">No executives added</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              You haven't added any executive team members yet. Click the button above to add your first member.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100 bg-[#FBF9F5] text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Member</th>
                  <th className="py-4 px-4">Role</th>
                  <th className="py-4 px-4">Contact</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100 text-xs font-semibold text-stone-700">
                {executives.map((member: any) => (
                  <tr key={member.id} className="hover:bg-stone-50/60 transition-colors">
                    {/* AVATAR & NAME */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                              <User className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-extrabold text-stone-900 text-xs">{member.name}</p>
                          <p className="text-[11px] text-stone-500 line-clamp-1 max-w-xs mt-0.5">
                            {member.bio || "No biography added."}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ROLE */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-950 text-[11px] font-bold rounded-lg border border-purple-100">
                        {member.role}
                      </span>
                    </td>

                    {/* CONTACT INFO */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5 text-[11px] text-stone-600">
                        {member.email && (
                          <p className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-stone-400" /> {member.email}
                          </p>
                        )}
                        {member.phone && (
                          <p className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-stone-400" /> {member.phone}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 px-6 text-right">
                      <form action={deleteExecutive} className="inline">
                        <input type="hidden" name="id" value={member.id} />
                        <button
                          type="submit"
                          className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Executive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}