"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TurfXLogo } from "./common/TurfXLogo";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <TurfXLogo size="small" />
        </div>

        <Link
          href="/register"
          className="px-6 py-2 bg-emerald-500 text-slate-950 font-semibold rounded-full hover:bg-emerald-400 transition-colors text-sm"
        >
          রেজিস্টার করুন
        </Link>
      </div>
    </nav>
  );
};
