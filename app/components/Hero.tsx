"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const carouselImages = [
  "/turf-images/1.jpeg",
  "/turf-images/2.jpeg",
  "/turf-images/3.jpeg",
  "/turf-images/4.jpeg",
  "/turf-images/5.jpeg",
  "/turf-images/6.jpeg",
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {carouselImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Turf Background ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-slate-950/70"></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top right, rgba(6, 78, 59, 0.3), transparent)' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "bg-emerald-500 w-6"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 z-20 relative pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold tracking-wide text-sm md:text-base px-4 py-2 rounded-full mb-6">
            <span className="text-lg md:text-xl">৩,০০০/-</span>
            <span className="text-emerald-500/70">এন্ট্রি ফি</span>
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
            গ্যালাক্সি{" "}
            <span className="text-emerald-500/90 font-light italic">
              মিনিবার
            </span>
            <br />
            ফুটবল টুর্নামেন্ট
          </h1>

          <div className="flex items-center justify-center gap-2 text-slate-400 mb-12 font-light">
            <MapPin size={16} className="text-emerald-500/60" />
            <span>টার্ফ এক্স সোনাগাজী (হাসপাতাল স্টান্ড)</span>
          </div>

          <Link
            href="/register"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-slate-950 font-semibold rounded-full hover:bg-emerald-400 transition-all duration-300 hover:pr-10 mb-6"
          >
            রেজিস্টার করুন
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm md:text-base px-4 py-3 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span>শেষ সময়: <strong>১৮ ডিসেম্বর ২০২৫</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
