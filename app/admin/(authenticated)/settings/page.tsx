"use client";

import { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  User,
  Bell,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [profileData, setProfileData] = useState({
    fullName: "Admin Officer",
    email: "admin@kayceelawproperties.com",
    role: "Super Administrator",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [securityOpts, setSecurityOpts] = useState({
    twoFactor: false,
    emailNotifications: true,
    autoLogout: "30",
  });

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage({
      type: "success",
      text: "Profile information updated successfully.",
    });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setStatusMessage({
        type: "error",
        text: "New passwords do not match. Please verify and try again.",
      });
      return;
    }
    if (passwords.newPassword.length < 8) {
      setStatusMessage({
        type: "error",
        text: "Password must be at least 8 characters long.",
      });
      return;
    }

    setStatusMessage({
      type: "success",
      text: "Security credentials updated successfully.",
    });
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Settings & Security
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm">
          Manage your account credentials, security preferences, and system notifications.
        </p>
      </div>

      {/* ALERT NOTIFICATION */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold border transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* SECTION 1: ACCOUNT PROFILE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-950">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-stone-900">
              Account Profile
            </h2>
            <p className="text-stone-500 text-xs">
              Primary details for this administrative account
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profileData.fullName}
                onChange={(e) =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
                className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                Email Address
              </label>
              <input
                type="email"
                required
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-800">
              Administrative Access Role
            </label>
            <input
              type="text"
              disabled
              value={profileData.role}
              className="w-full p-3 bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold text-stone-500 cursor-not-allowed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4 text-purple-400" /> Update Profile
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: PASSWORD & SECURITY */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-950">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-stone-900">
              Change Password
            </h2>
            <p className="text-stone-500 text-xs">
              Update your account password regularly for enhanced protection
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-800">
              Current Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
              className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="At least 8 characters"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                placeholder="Re-enter new password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-950"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4 text-purple-400" /> Change Password
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 3: SYSTEM PREFERENCES */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-950">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-stone-900">
              Security & Notifications
            </h2>
            <p className="text-stone-500 text-xs">
              Configure session and alert settings
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-2xl">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-stone-900 block">
                Inquiry Email Alerts
              </span>
              <span className="text-[11px] text-stone-500 block">
                Receive instant email notifications whenever a prospective client submits an inquiry form.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={securityOpts.emailNotifications}
                onChange={(e) =>
                  setSecurityOpts({
                    ...securityOpts,
                    emailNotifications: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-950"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-2xl">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-stone-900 block">
                Automatic Session Timeout
              </span>
              <span className="text-[11px] text-stone-500 block">
                Automatically log out after a set period of inactivity.
              </span>
            </div>
            <select
              value={securityOpts.autoLogout}
              onChange={(e) =>
                setSecurityOpts({
                  ...securityOpts,
                  autoLogout: e.target.value,
                })
              }
              className="px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-800 focus:outline-none"
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">1 Hour</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}