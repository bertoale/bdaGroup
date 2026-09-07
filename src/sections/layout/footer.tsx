import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { subsidiaries } from "@/lib/data";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Building
} from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  YouTubeIcon,
  GoogleMapsIcon,
} from "@/components/ui/social-icons";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-brand-navy-light/40 relative overflow-hidden">
      {/* Background Batik Pattern (Gradasi Kiri Tipis, Kanan Tebal seperti Hospitality) */}
      <div
        className="absolute inset-0 bg-[url('https://storage.googleapis.com/bda-real-estate/general/image/footer-batik.webp')] bg-[length:1200px] opacity-35 mix-blend-overlay pointer-events-none z-0"
        style={{
          filter: "invert(1)",
          maskImage: "linear-gradient(to right, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 100%)",
        }}
      />

      {/* Subtle Ambient Glow for Depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Col 1: Group Identity */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="bg-white px-4 py-2 rounded-xl shadow-md border border-brand-gold/40 group-hover:border-brand-gold transition-all duration-300 inline-flex items-center">
                <div className="relative h-9 w-36 sm:w-40">
                  <Image
                    src="/bda-logos2.gif"
                    alt="Best Deals Asia Group"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Your premier destination for comprehensive solutions within property,
              hospitality, and digital services in Bali, Indonesia.
            </p>
          </div>

          {/* Col 2: Group Businesses */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold">
              Our Businesses
            </h3>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              {subsidiaries.map((sub) => (
                <li key={sub.name}>
                  <a
                    href={sub.href}
                    target={sub.isExternal ? "_blank" : undefined}
                    rel={sub.isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-brand-gold font-medium transition-colors text-xs sm:text-sm group"
                  >
                    <span>{sub.name}</span>
                    {sub.isExternal && (
                      <ArrowUpRight className="size-3 text-slate-400 group-hover:text-brand-gold opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Head Office & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold">
              Office & Contact
            </h3>
            
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 text-brand-gold mt-1" />
                <div className="text-xs leading-relaxed">
                  <strong className="text-white block font-semibold">Bali Head Office:</strong>
                  Jl. Dewi Sri IV No.2D, Legian, Kec. Kuta, Kabupaten Badung, Bali 80361, Indonesia
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-brand-gold" />
                <a href="tel:+623619344211" className="text-xs text-slate-300 hover:text-brand-gold transition-colors font-medium">
                  +62 361 9344211
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-brand-gold" />
                <a href="mailto:info@bestdealsasiagroup.com" className="text-xs text-slate-300 hover:text-brand-gold transition-colors font-medium">
                  info@bestdealsasiagroup.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-xs text-slate-400 block mb-2.5 font-medium">Follow & Connect:</span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/bestdealsasiarentals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-navy border border-white/15 flex items-center justify-center text-white transition-all"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <InstagramIcon className="size-4.5" />
                </a>
                <a
                  href="https://www.facebook.com/people/Best-Deals-Asia-Group/100086480796938/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-navy border border-white/15 flex items-center justify-center text-white transition-all"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <FacebookIcon className="size-4.5" />
                </a>
                <a
                  href="https://www.tiktok.com/@bestdealsasiagroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-navy border border-white/15 flex items-center justify-center text-white transition-all"
                  aria-label="TikTok"
                  title="TikTok"
                >
                  <TikTokIcon className="size-4.5" />
                </a>
                {/* 
                <a
                  href="https://www.youtube.com/@bestdealsasiagroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-navy border border-white/15 flex items-center justify-center text-white transition-all"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <YouTubeIcon className="size-4.5" />
                </a>
                */}
                <a
                  href="https://maps.google.com/?q=Best+Deals+Asia+Group+Legian+Bali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-navy border border-white/15 flex items-center justify-center text-white transition-all"
                  aria-label="Google Maps"
                  title="Google Maps"
                >
                  <GoogleMapsIcon className="size-4.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Best Deals Asia Group. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/#businesses" className="hover:text-brand-gold transition-colors">Businesses</a>
            <Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link>
            <Link href="/career" className="hover:text-brand-gold transition-colors">Career</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
