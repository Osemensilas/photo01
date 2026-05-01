"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  "Wedding & Events",
  "Portrait Session",
  "Fashion & Editorial",
  "Nature & Landscape",
  "Lifestyle",
  "Other",
];

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "For weddings, I recommend booking at least 3–6 months in advance. For portraits and editorial shoots, 2–4 weeks is usually enough.",
  },
  {
    q: "Do you travel for shoots?",
    a: "Absolutely. I'm based in Lagos but available for shoots across Nigeria and internationally. Travel fees apply for locations outside Lagos.",
  },
  {
    q: "How long until I receive my photos?",
    a: "Portrait and lifestyle galleries are delivered within 5–7 days. Wedding galleries are delivered within 3–4 weeks after the event.",
  },
  {
    q: "What's your payment structure?",
    a: "A 50% deposit is required to secure your date. The remaining balance is due one week before your session.",
  },
];

export default function ContactPage() {
  const [active, setActive] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen">

      {/* ── PAGE HEADER ── */}
      <section className="pt-28 pb-16 px-6 sm:px-10 max-w-7xl mx-auto">
        <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-3">Get in Touch</p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h1 className="font-display text-5xl sm:text-7xl text-[#3B2F1E] leading-[0.9]">
            Let's Start<br />
            <em className="text-[#A0785A] not-italic">A Conversation</em>
          </h1>
          <p className="text-[#6B5744] text-sm max-w-xs leading-relaxed font-light sm:text-right">
            Whether you have a date in mind or just a feeling — reach out and let's figure it out together.
          </p>
        </div>
        <div className="h-px bg-[#D9C9B0] mt-12" />
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* ── LEFT: Contact Info ── */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* Photo */}
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <Image
                src="/images/hero.png"
                alt="Photographer"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C140D]/60 to-transparent flex items-end p-6">
                <div>
                  <p className="font-display text-xl text-[#F5F0E8]">Temi Digital Studio</p>
                  <p className="text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] mt-0.5">
                    Abuja-based Photographer
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-5">
              <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em]">Direct Contact</p>

              {[
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
                    </svg>
                  ),
                  label: "Email",
                  value: "osemensilas@gmail.com",
                  href: "mailto:osemensilas@gmail.com",
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  ),
                  label: "Phone / WhatsApp",
                  value: "+234 905 406 0454",
                  href: "tel:+2349054060454",
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  ),
                  label: "Location",
                  value: "Dutse Bupma, Abuja, Nigeria",
                  href: "#",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-8 h-8 bg-[#EDE5D8] flex items-center justify-center text-[#A0785A] flex-shrink-0 group-hover:bg-[#3B2F1E] group-hover:text-[#C9A96E] transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#A0785A] mb-0.5">{item.label}</p>
                    <p className="text-[#3B2F1E] text-sm font-light group-hover:text-[#A0785A] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-4">Follow Along</p>
              <div className="flex gap-3">
                {[
                  { label: "Instagram", handle: "@temidigitalstudio" },
                  { label: "Twitter", handle: "@temidigitalstudio" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    className="flex-1 border border-[#D9C9B0] px-4 py-3 hover:border-[#A0785A] hover:bg-[#EDE5D8] transition-all duration-200 group"
                  >
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#A0785A] mb-0.5">{s.label}</p>
                    <p className="text-[12px] text-[#3B2F1E] font-light group-hover:text-[#A0785A] transition-colors">{s.handle}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-[#3B2F1E] px-6 py-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#7DBF7D] animate-pulse" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E]">Currently Accepting Bookings</p>
              </div>
              <p className="text-[#A0907A] text-[12px] font-light leading-relaxed">
                Available for weddings & sessions from <span className="text-[#F5F0E8]">June 2025</span> onwards. Limited weekend slots remaining.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center px-6 bg-[#EDE5D8] border border-[#D9C9B0]">
                <div className="w-14 h-14 bg-[#3B2F1E] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#C9A96E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-display text-3xl text-[#3B2F1E] mb-3">Message Received</p>
                <p className="text-[#6B5744] text-sm leading-relaxed max-w-sm font-light mb-8">
                  Thank you for reaching out. I'll be in touch within 24–48 hours to discuss your session.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", date: "", message: "" }); }}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#A0785A] border-b border-[#A0785A] pb-0.5 hover:text-[#3B2F1E] hover:border-[#3B2F1E] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-1">Book a Session</p>
                  <h2 className="font-display text-2xl sm:text-3xl text-[#3B2F1E]">Tell Me About Your Vision</h2>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744]">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ada Okafor"
                      className="bg-transparent border border-[#D9C9B0] px-4 py-3 text-[13px] text-[#3B2F1E] placeholder-[#B8A898] focus:outline-none focus:border-[#A0785A] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744]">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ada@email.com"
                      className="bg-transparent border border-[#D9C9B0] px-4 py-3 text-[13px] text-[#3B2F1E] placeholder-[#B8A898] focus:outline-none focus:border-[#A0785A] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744]">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="bg-transparent border border-[#D9C9B0] px-4 py-3 text-[13px] text-[#3B2F1E] placeholder-[#B8A898] focus:outline-none focus:border-[#A0785A] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744]">Type of Session *</label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="bg-[#F5F0E8] border border-[#D9C9B0] px-4 py-3 text-[13px] text-[#3B2F1E] focus:outline-none focus:border-[#A0785A] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744]">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="bg-transparent border border-[#D9C9B0] px-4 py-3 text-[13px] text-[#3B2F1E] focus:outline-none focus:border-[#A0785A] transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744]">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your vision, the vibe you're going for, the location you have in mind..."
                    className="bg-transparent border border-[#D9C9B0] px-4 py-3 text-[13px] text-[#3B2F1E] placeholder-[#B8A898] focus:outline-none focus:border-[#A0785A] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#3B2F1E] text-[#F5F0E8] text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-[#A0785A] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>

                <p className="text-[10px] text-[#A0907A] text-center leading-relaxed">
                  I respond to all enquiries within 24–48 hours. For urgent bookings, reach out via WhatsApp.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#EDE5D8] py-20 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-3">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#3B2F1E] mb-12">Common Questions</h2>

          <div className="flex flex-col divide-y divide-[#D9C9B0]">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                >
                  <span className="font-display text-base sm:text-lg text-[#3B2F1E] group-hover:text-[#A0785A] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <span className={`text-[#A0785A] text-lg flex-shrink-0 mt-0.5 transition-transform duration-300 ${active === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {active === i && (
                  <p className="mt-3 text-[#6B5744] text-sm leading-relaxed font-light pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/feature5.jpg"
            alt="CTA background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#1C140D]/80" />
        </div>
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <p className="text-[#C9A96E] text-[10px] uppercase tracking-[0.3em] mb-4">Still Deciding?</p>
          <h2 className="font-display text-4xl sm:text-5xl text-[#F5F0E8] leading-tight mb-6">
            Take a Look at<br />
            <em className="text-[#C9A96E] not-italic">The Gallery First</em>
          </h2>
          <p className="text-[#A0907A] text-sm mb-8 font-light">
            Browse through my work and get a feel for what we could create together.
          </p>
          <Link
            href="/gallery"
            className="inline-block px-10 py-4 bg-[#C9A96E] text-[#1C140D] text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-[#F5F0E8] transition-colors duration-300"
          >
            View Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}