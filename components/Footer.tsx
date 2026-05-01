import Link from "next/link";

const Footer = () => {

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return ( 
        <>
        <footer className="bg-[#3B2F1E] text-[#D9C9B0] py-14 px-6 sm:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
                <div>
                    <p className="font-display text-xl tracking-[0.15em] text-[#F5F0E8] uppercase mb-3">
                    Temi<span className="text-[#A0785A]">Digital</span>
                    </p>
                    <p className="text-[12px] leading-relaxed text-[#A0907A] max-w-xs">
                    Capturing timeless moments — weddings, portraits, fashion, and everything in between.
                    </p>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#A0785A] mb-4">Navigate</p>
                    <div className="flex flex-col gap-2">
                        {navLinks.map((l) => (
                            <Link key={l.href} href={l.href} className="text-[12px] text-[#A0907A] hover:text-[#F5F0E8] transition-colors uppercase tracking-widest">
                            {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#A0785A] mb-4">Connect</p>
                    <div className="flex flex-col gap-2 text-[12px] text-[#A0907A]">
                        <a href="mailto:osemensilas@gmail.com" className="hover:text-[#F5F0E8] transition-colors">osemensilas@gmail.com</a>
                        <a href="tel:+2349054060454" className="hover:text-[#F5F0E8] transition-colors">+234 9054 060 454</a>
                        <p>Duste Bupma, FCT Abuja, Nigeria</p>
                    </div>
                    <div className="flex gap-4 mt-4">
                    {["IG", "TW", "FB"].map((s) => (
                        <a key={s} href="#" className="text-[11px] text-[#A0907A] hover:text-[#A0785A] transition-colors uppercase tracking-widest">{s}</a>
                    ))}
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#6B5744]/40 text-[10px] text-[#6B5744] uppercase tracking-widest text-center">
                © {new Date().getFullYear()} Temi Digital Studio. All rights reserved.
            </div>
        </footer>
        </>
     );
}
 
export default Footer;