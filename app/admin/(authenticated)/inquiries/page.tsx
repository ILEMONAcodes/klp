import { Mail, Phone, Trash2, Calendar, User } from "lucide-react";
import { getInquiries, deleteInquiry } from "@/app/actions/inquiries";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Client Inquiries
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            Manage incoming messages and consultation requests from potential clients.
          </p>
        </div>
        <div className="text-xs font-bold text-stone-500 bg-white px-4 py-2.5 rounded-xl border border-stone-200/80 shadow-sm shrink-0">
          Total Messages: <span className="text-purple-950 font-extrabold">{inquiries.length}</span>
        </div>
      </div>

      {/* INQUIRIES LIST */}
      {inquiries.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4 hover:border-purple-200 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-950 font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">{inquiry.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-stone-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-purple-950" /> {inquiry.email}
                      </span>
                      {inquiry.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-purple-950" /> {inquiry.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <form action={deleteInquiry.bind(null, inquiry.id)}>
                    <button
                      type="submit"
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>

              {/* MESSAGE CONTENT */}
              <p className="text-xs text-stone-700 leading-relaxed bg-[#FBF9F5] p-4 rounded-2xl border border-stone-100">
                {inquiry.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-purple-50 text-purple-950 rounded-2xl flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-stone-900">No Inquiries Received Yet</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            When users submit contact forms on the public website, their messages will show up here automatically.
          </p>
        </div>
      )}
    </div>
  );
}