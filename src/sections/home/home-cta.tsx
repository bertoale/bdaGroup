"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";

export function HomeCta() {
  return (
    <section className="py-20 sm:py-28 bg-brand-navy text-white relative overflow-hidden">
      {/* Background Architectural Blueprint Line Motif */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        <Reveal animation="zoom-in" durationMs={800}>
          <div className="bg-brand-navy-dark border border-white/15 rounded-[2.5rem] p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            
            {/* Left Content */}
            <div className="max-w-2xl space-y-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                CONNECT WITH BEST DEALS ASIA GROUP
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Ready to Maximize Your Property or Expand in Bali?
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                Whether you are a villa owner seeking comprehensive marketing and management, an investor acquiring Bali real estate, or an enterprise needing digital and event curation.
              </p>

              <div className="flex items-center gap-6 text-xs text-slate-300 pt-2">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-brand-gold" />
                  Legian, Kuta - Bali
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="size-4 text-brand-gold" />
                  +62 361 9344211
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="https://bestdealsasiahospitality.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full shadow-lg transition-all text-center group"
              >
                <span>Market Your Place</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full transition-all text-center"
              >
                <span>Contact Head Office</span>
              </Link>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HomeCta;
