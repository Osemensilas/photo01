"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Wedding & Events",
    desc: "Every glance, every tear, every laugh — preserved forever.",
    icon: "💍",
  },
  {
    title: "Portrait & Lifestyle",
    desc: "Authentic stories told through light, shadow, and expression.",
    icon: "🌿",
  },
  {
    title: "Fashion & Editorial",
    desc: "Bold, intentional imagery built for brands and creatives.",
    icon: "✦",
  },
  {
    title: "Nature & Landscape",
    desc: "The world in its raw, unfiltered, breathtaking beauty.",
    icon: "🏔",
  },
];

const featured = [
  { src: "/images/feature5.jpg", label: "Wedding", span: "col-span-2 row-span-2" },
  { src: "/images/feature2.jpg", label: "Portrait", span: "" },
  { src: "/images/feature4.jpg", label: "Fashion", span: "" },
  { src: "/images/feature1.jpg", label: "Landscape", span: "" },
  { src: "/images/feature3.jpg", label: "Lifestyle", span: "" },
];

export default function HomePage() {
  return (
    <div className="bg-[#F5F0E8]">

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C140D]/80 via-[#1C140D]/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pb-16 sm:pb-24 w-full">
          <div className="max-w-xl">
            <p className="text-[#D9C9B0] text-[10px] uppercase tracking-[0.3em] mb-4 animate-fade-in">
              Photography · Lagos, Nigeria
            </p>
            <h1 className="font-display text-5xl sm:text-7xl text-[#F5F0E8] leading-[0.95] tracking-tight mb-6">
              Where Light<br />
              <em className="text-[#C9A96E] not-italic">Becomes</em><br />
              Memory
            </h1>
            <p className="text-[#B8A898] text-sm leading-relaxed max-w-sm mb-8 font-light">
              Timeless photography for weddings, portraits, fashion, and the beautiful landscapes of life.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/gallery"
                className="px-7 py-3 bg-[#C9A96E] text-[#1C140D] text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#F5F0E8] transition-colors duration-300"
              >
                View Gallery
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3 border border-[#F5F0E8]/40 text-[#F5F0E8] text-[11px] uppercase tracking-[0.2em] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-300"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-10 hidden sm:flex flex-col items-center gap-2 z-10">
          <p className="text-[#D9C9B0] text-[9px] uppercase tracking-[0.3em] rotate-90 mb-4">Scroll</p>
          <div className="w-px h-12 bg-[#C9A96E]/60" />
        </div>
      </section>

      {/* ── INTRO STRIP ── */}
      <section className="py-8 bg-[#3B2F1E] px-6 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee text-[11px] uppercase tracking-[0.25em] text-[#A0907A]">
          {["Wedding Photography", "✦", "Portrait Sessions", "✦", "Fashion Editorial", "✦", "Nature & Landscape", "✦", "Lifestyle Stories", "✦", "Wedding Photography", "✦", "Portrait Sessions", "✦", "Fashion Editorial", "✦"].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="py-20 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-2">Portfolio</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#3B2F1E] leading-tight">
              Featured<br />Work
            </h2>
          </div>
          <Link href="/gallery" className="text-[11px] uppercase tracking-[0.2em] text-[#6B5744] hover:text-[#A0785A] transition-colors border-b border-[#6B5744]/40 pb-0.5 hidden sm:block">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[200px] sm:auto-rows-[220px]">
          {featured.map((img, i) => (
            <div key={i} className={`relative overflow-hidden group cursor-pointer ${img.span}`}>
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1C140D]/0 group-hover:bg-[#1C140D]/40 transition-all duration-300 flex items-end p-4">
                <span className="text-[#F5F0E8] text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link href="/gallery" className="text-[11px] uppercase tracking-[0.2em] text-[#6B5744] border-b border-[#6B5744]/40 pb-0.5">
            View All →
          </Link>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-[#EDE5D8] px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-2">What I Offer</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#3B2F1E]">Specialties</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-[#F5F0E8] p-7 group hover:bg-[#3B2F1E] transition-colors duration-500 cursor-default">
                <span className="text-2xl block mb-5">{s.icon}</span>
                <h3 className="font-display text-lg text-[#3B2F1E] group-hover:text-[#C9A96E] mb-3 transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-[12px] text-[#6B5744] group-hover:text-[#A0907A] leading-relaxed transition-colors duration-300">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE SECTION ── */}
      <section className="relative py-28 px-6 sm:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/"
            alt="Quote bg"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#1C140D]/75" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-display text-3xl sm:text-5xl text-[#F5F0E8] leading-tight italic mb-6">
            A photograph is a secret about a secret. The more it tells you, the less you know.
          </p>
          <p className="text-[#C9A96E] text-[11px] uppercase tracking-[0.25em]">— Diane Arbus</p>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-20 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-2">Kind Words</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#3B2F1E]">Client Stories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { text: "She captured our wedding day with such grace. Every photo feels like a painting.", name: "Adaeze & Emeka", type: "Wedding" },
            { text: "My brand shoot was everything I imagined and more. The editorial feel was just perfect.", name: "Zainab Usman", type: "Fashion Editorial" },
            { text: "I finally have portraits I love. She made me feel completely at ease the whole session.", name: "Tolu Abiodun", type: "Portrait Session" },
          ].map((r, i) => (
            <div key={i} className="border border-[#D9C9B0] p-7 bg-[#FAF7F2]">
              <p className="font-display text-4xl text-[#D9C9B0] leading-none mb-4">"</p>
              <p className="text-[13px] text-[#6B5744] leading-relaxed italic mb-6">{r.text}</p>
              <div className="border-t border-[#D9C9B0] pt-4">
                <p className="text-[#3B2F1E] text-sm font-semibold">{r.name}</p>
                <p className="text-[#A0785A] text-[10px] uppercase tracking-widest mt-0.5">{r.type}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#3B2F1E] px-6 sm:px-10 text-center">
        <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-3">Let's Work Together</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#F5F0E8] mb-6">
          Ready to Tell<br />
          <em className="text-[#C9A96E] not-italic">Your Story?</em>
        </h2>
        <p className="text-[#A0907A] text-sm mb-10 max-w-sm mx-auto font-light">
          Whether it's your wedding day, a portrait session, or a creative editorial — let's make something beautiful.
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-[#C9A96E] text-[#1C140D] text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-[#F5F0E8] transition-colors duration-300"
        >
          Start a Conversation
        </Link>
      </section>
    </div>
  );
}