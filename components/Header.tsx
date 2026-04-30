"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {

    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return ( 
        <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E8]/90 backdrop-blur-sm border-b border-[#D9C9B0]/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-xl tracking-[0.15em] text-[#3B2F1E] uppercase">
            Temi<span className="text-[#A0785A]">Digital</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#A0785A] border-b border-[#A0785A] pb-0.5"
                    : "text-[#6B5744] hover:text-[#A0785A]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-[11px] uppercase tracking-[0.2em] px-5 py-2 bg-[#3B2F1E] text-[#F5F0E8] hover:bg-[#A0785A] transition-colors duration-300"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-[#3B2F1E] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-[#3B2F1E] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-[#3B2F1E] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#F5F0E8] border-t border-[#D9C9B0]/50 px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-[12px] uppercase tracking-[0.2em] ${
                  pathname === link.href ? "text-[#A0785A]" : "text-[#6B5744]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 bg-[#3B2F1E] text-[#F5F0E8] text-center"
            >
              Book Now
            </Link>
          </div>
        )}
      </header>
        </>
     );
}
 
export default Header;