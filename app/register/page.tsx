"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Navbar } from "../components";

interface FormData {
  name: string;
  mobile: string;
  teamName: string;
  address: string;
  managerName: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    teamName: "",
    address: "",
    managerName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          mobile: "",
          teamName: "",
          address: "",
          managerName: "",
        });
      } else {
        setError(data.error || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      }
    } catch {
      setError("সার্ভারে সমস্যা হয়েছে");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen p-4 pt-24">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle size={40} className="text-emerald-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              রেজিস্ট্রেশন সফল হয়েছে!
            </h1>
            <p className="text-slate-400 mb-8">
              আপনার টিম সফলভাবে রেজিস্টার হয়েছে। শীঘ্রই আমরা আপনার সাথে যোগাযোগ
              করব।
            </p>
            <div className="flex justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-emerald-500 text-slate-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
              >
                হোমে ফিরুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Custom Navbar for Register Page */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <div className="text-emerald-500 font-bold text-xl">
              <span>Turf</span>
              <span className="text-white">X</span>
            </div>
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 bg-emerald-500 text-slate-950 font-semibold rounded-full hover:bg-emerald-400 transition-colors text-sm"
          >
            রেজিস্টার করুন
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 pt-24 sm:pt-28">
        <div className="max-w-lg mx-auto">
          {/* Info Card */}
          <div className="glass-panel p-4 sm:p-6 rounded-xl mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              গ্যালাক্সি মিনিবার ফুটবল টুর্নামেন্ট ২০২৫
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mb-4">
              টার্ফ এক্স সোনাগাজী (হাসপাতাল স্টান্ড)
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">এন্ট্রি ফি:</span>
                <span className="text-emerald-400 font-semibold">৩,০০০/-</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">খেলোয়াড়:</span>
                <span className="text-white">৬+৩ জন</span>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="glass-panel p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-6">
              টিমের তথ্য দিন
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5 sm:mb-2">
                  নাম <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800 border border-white/10 rounded-lg text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
                  placeholder="আপনার নাম"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5 sm:mb-2">
                  মোবাইল নাম্বার <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800 border border-white/10 rounded-lg text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
                  placeholder="০১XXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5 sm:mb-2">
                  ক্লাব/দলের নাম <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800 border border-white/10 rounded-lg text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
                  placeholder="দলের নাম লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5 sm:mb-2">
                  ঠিকানা <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800 border border-white/10 rounded-lg text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors resize-none"
                  placeholder="আপনার ঠিকানা"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5 sm:mb-2">
                  ম্যানেজারের নাম <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800 border border-white/10 rounded-lg text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
                  placeholder="ম্যানেজারের নাম"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 bg-emerald-500 text-slate-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6 text-sm sm:text-base"
              >
                {isSubmitting ? "রেজিস্ট্রেশন হচ্ছে..." : "রেজিস্ট্রেশন করুন"}
              </button>

              {error && (
                <div className="p-4 rounded-lg text-sm bg-red-500/20 text-red-400 border border-red-500/30 mt-4">
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Payment Info */}
          <div className="mt-6 sm:mt-8 p-4 rounded-lg bg-slate-900/50 border border-white/5">
            <p className="text-sm text-slate-400 text-center">
              রেজিস্ট্রেশনের পর এন্ট্রি ফি{" "}
              <span className="text-emerald-400 font-semibold">৩,০০০/-</span>{" "}
              টাকা বিকাশ/নগদে পাঠান:{" "}
              <span className="text-white font-medium">01839759953</span>{" "}
              (মাইনুল)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
