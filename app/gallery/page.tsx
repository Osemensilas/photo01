"use client";

import Image from "next/image";
import { useState } from "react";

const categories = ["All", "Wedding", "Portrait", "Fashion", "Landscape", "Lifestyle"];

const photos = [
  { src: "/", cat: "Wedding", size: "tall" },
  { src: "/", cat: "Portrait", size: "square" },
  { src: "/", cat: "Fashion", size: "square" },
  { src: "/", cat: "Landscape", size: "wide" },
  { src: "/", cat: "Wedding", size: "square" },
  { src: "/", cat: "Portrait", size: "tall" },
  { src: "/", cat: "Fashion", size: "square" },
  { src: "/", cat: "Landscape", size: "wide" },
  { src: "/", cat: "Lifestyle", size: "square" },
  { src: "/", cat: "Wedding", size: "square" },
  { src: "/", cat: "Fashion", size: "tall" },
  { src: "/", cat: "Landscape", size: "wide" },
  { src: "/", cat: "Lifestyle", size: "square" },
  { src: "/", cat: "Portrait", size: "square" },
  { src: "/", cat: "Lifestyle", size: "wide" },
];

const sizeClass: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.cat === active);

  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-12 px-6 sm:px-10 max-w-7xl mx-auto">
        <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-3">Work</p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h1 className="font-display text-4xl sm:text-6xl text-[#3B2F1E] leading-tight">
            The Gallery
          </h1>
          <p className="text-[#6B5744] text-sm max-w-xs leading-relaxed font-light">
            A curated collection spanning weddings, portraits, fashion, and the world's natural beauty.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#D9C9B0] mt-10 mb-8" />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-200 border ${
                active === cat
                  ? "bg-[#3B2F1E] text-[#F5F0E8] border-[#3B2F1E]"
                  : "bg-transparent text-[#6B5744] border-[#D9C9B0] hover:border-[#A0785A] hover:text-[#A0785A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] gap-3">
          {filtered.map((photo, i) => (
            <div
              key={i}
              onClick={() => setLightbox(photo.src)}
              className={`relative overflow-hidden group cursor-zoom-in bg-[#D9C9B0] ${sizeClass[photo.size] ?? ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.cat}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1C140D]/0 group-hover:bg-[#1C140D]/35 transition-all duration-300 flex flex-col items-center justify-center gap-1">
                <span className="text-[#F5F0E8] text-[9px] uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#3B2F1E]/60 px-3 py-1">
                  {photo.cat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-[#A0785A] text-sm uppercase tracking-widest">
            No photos in this category yet.
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-[#1C140D]/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-8 text-[#D9C9B0] text-[11px] uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors"
          >
            Close ✕
          </button>
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={lightbox}
              alt="Lightbox"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}