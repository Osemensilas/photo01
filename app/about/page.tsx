import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "8+", label: "Years of Experience" },
  { value: "500+", label: "Sessions Captured" },
  { value: "120+", label: "Weddings Shot" },
  { value: "14", label: "Awards Won" },
];

const gear = [
  "Sony A7R V", "Canon EOS R5", "85mm f/1.4 Portrait Lens",
  "35mm f/1.8 Prime", "70–200mm f/2.8 Zoom", "Profoto B10 Strobe",
];

export default function AboutPage() {
  return (
    <div className="bg-[#F5F0E8] min-h-screen">

      {/* ── HERO INTRO ── */}
      <section className="pt-20 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-3 mt-8">The Photographer</p>
          <h1 className="font-display text-5xl sm:text-7xl text-[#3B2F1E] leading-[0.9] mb-10">
            About<br />
            <em className="text-[#A0785A] not-italic">Me</em>
          </h1>
        </div>

        {/* Full-bleed asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
          <div className="relative h-[50vh] lg:h-auto overflow-hidden">
            <Image
              src="/images/hero.png"
              alt="Photographer"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F5F0E8]/20" />
          </div>

          <div className="bg-[#EDE5D8] flex flex-col justify-center px-10 sm:px-16 py-16">
            <p className="font-display text-2xl sm:text-3xl text-[#3B2F1E] leading-snug mb-6 italic">
              I do not just take photographs, I collect the light that makes you, you.
            </p>
            <p className="text-[#6B5744] text-sm leading-relaxed mb-4 font-light">
              Hello, I am <strong className="text-[#3B2F1E] font-semibold">Temitope JohnJoel</strong>, a Abuja-based photographer with over 8 years of experience telling stories through light, composition, and emotion.
            </p>
            <p className="text-[#6B5744] text-sm leading-relaxed mb-4 font-light">
              My work spans weddings, portraits, fashion editorials, and landscapes. Every shoot is an opportunity to find something honest, something fleeting, and make it last forever.
            </p>
            <p className="text-[#6B5744] text-sm leading-relaxed font-light">
              Whether I am in a bridal suite or a dusty field at golden hour, my philosophy is the same - be present, be patient, and let the moment speak.
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#3B2F1E] py-14 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="font-display text-4xl sm:text-5xl text-[#C9A96E] mb-1">{s.value}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A0907A]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-20 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-3">My Approach</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#3B2F1E] mb-6 leading-tight">
              Light-led.<br />Emotion-driven.<br />Always Honest.
            </h2>
            <p className="text-[#6B5744] text-sm leading-relaxed mb-4 font-light">
              I believe the best photographs happen when people forget the camera exists. My style leans into natural light, authentic moments, and quiet beauty — never forced, never staged.
            </p>
            <p className="text-[#6B5744] text-sm leading-relaxed mb-8 font-light">
              I have shot in the heart of Abuja markets, on the shores of the capital, in studio setups, and in the aisle of intimate garden weddings. Every environment tells a different story.
            </p>
            <Link
              href="/gallery"
              className="inline-block px-8 py-3 bg-[#A0785A] text-[#F5F0E8] text-[11px] uppercase tracking-[0.2em] hover:bg-[#3B2F1E] transition-colors duration-300"
            >
              See My Work
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/about1.jpg"
                alt="Behind the scenes"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 mt-8 overflow-hidden">
              <Image
                src="/images/about2.jpg"
                alt="Portrait session"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 overflow-hidden col-span-2">
              <Image
                src="/"
                alt="Camera gear"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── GEAR ── */}
      <section className="py-16 bg-[#EDE5D8] px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-2">Tools of the Trade</p>
              <h2 className="font-display text-3xl text-[#3B2F1E]">My Gear</h2>
            </div>
            <p className="text-[#6B5744] text-sm font-light max-w-xs">
              Premium equipment for every kind of shoot - because your moments deserve the best.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gear.map((item, i) => (
              <div key={i} className="bg-[#F5F0E8] border border-[#D9C9B0] px-5 py-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A0785A] flex-shrink-0" />
                <p className="text-[#3B2F1E] text-sm font-light">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES TIMELINE ── */}
      <section className="py-20 px-6 sm:px-10 max-w-4xl mx-auto">
        <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-3">Journey</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[#3B2F1E] mb-12">How I Got Here</h2>

        <div className="relative pl-6 border-l border-[#D9C9B0] flex flex-col gap-10">
          {[
            { year: "2016", title: "First Camera, First Love", desc: "Started shooting street photography around Lagos with a borrowed DSLR. Fell irreversibly in love." },
            { year: "2018", title: "First Wedding Commission", desc: "Shot my first paid wedding and never looked back. The emotional depth of wedding photography hooked me." },
            { year: "2020", title: "Fashion & Editorial Work", desc: "Began collaborating with Lagos-based fashion designers for lookbooks and editorial campaigns." },
            { year: "2022", title: "International Recognition", desc: "Featured in West African Photography Quarterly and won the Lagos Portrait Award." },
            { year: "2024", title: "Studio Launch", desc: "Opened Lumière Studio — a dedicated space for portraits, fashion, and creative sessions." },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[#A0785A] border-2 border-[#F5F0E8]" />
              <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.2em] mb-1">{item.year}</p>
              <h3 className="font-display text-lg text-[#3B2F1E] mb-1">{item.title}</h3>
              <p className="text-[#6B5744] text-sm font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#3B2F1E] text-center px-6">
        <h2 className="font-display text-4xl sm:text-5xl text-[#F5F0E8] mb-4">
          Let Us Make Something<br />
          <em className="text-[#C9A96E] not-italic">Beautiful Together</em>
        </h2>
        <p className="text-[#A0907A] text-sm mb-8 font-light">Every story deserves to be told beautifully.</p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-[#C9A96E] text-[#1C140D] text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-[#F5F0E8] transition-colors duration-300"
        >
          Book a Session
        </Link>
      </section>
    </div>
  );
}