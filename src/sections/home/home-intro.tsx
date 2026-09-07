"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ShieldCheck } from "lucide-react";

export function HomeIntro() {
  return (
    <section
      id="introduction"
      className="relative w-full bg-transparent text-foreground py-16 sm:py-24 px-6 sm:px-10 md:px-14 lg:px-20 overflow-hidden border-b border-border/60"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* --- MOBILE & TABLET LAYOUT (< lg): Unified Integrated Card --- */}
        <Reveal
          animation="fade-up"
          durationMs={800}
          delayMs={100}
          className="block lg:hidden w-full"
        >
          <div className="w-full bg-card rounded-3xl overflow-hidden shadow-xl border border-border">
            {/* Top Image Banner */}
            <div className="relative w-full h-[240px] sm:h-[320px]">
              <Image
                src="https://storage.googleapis.com/bda_rental/bda-group/images/intro.webp"
                alt="About Best Deals Asia Group"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Bottom Navy Content Area */}
            <div className="bg-brand-navy text-white p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Introduction
              </h2>

              <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Welcome to Best Deals Asia Group, your premier destination for
                  comprehensive solutions within the property industry.
                  Operating as a fully registered company in Indonesia, we offer
                  a diverse range of services under the Best Deals Asia Group
                  banner.
                </p>
                <p>
                  As a one-stop shopping hub, we specialize in holiday rental
                  accommodation, advanced holiday rental marketing, digital
                  solutions, event planning, property management, hospitality
                  services, and real estate agency operations. Our large and
                  dedicated team is committed to delivering excellence across
                  all aspects of our company operations.
                </p>
              </div>

              <div className="w-full flex items-center justify-between mt-6 pt-4 border-t border-white/20 text-[11px] text-brand-gold font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5" />
                  Fully Registered Company in Indonesia
                </span>
                <span>Best Deals Asia Group</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* --- DESKTOP LAYOUT (>= lg): Signature Overlapping Architectural Composition --- */}
        <div className="hidden lg:flex relative w-full lg:min-h-[480px] xl:min-h-[520px] items-center">
          {/* Left Background Image Card */}
          <Reveal
            animation="fade-right"
            durationMs={900}
            className="absolute inset-y-0 left-0 w-[58%] h-full z-0 rounded-[2.5rem] overflow-hidden shadow-xl border border-white/60"
          >
            <Image
              src="https://storage.googleapis.com/bda_rental/bda-group/images/intro.webp"
              alt="Bali Villa Architecture Overview"
              fill
              sizes="58vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </Reveal>

          {/* Right Floating Overlapping Signature Card */}
          <Reveal
            animation="fade-left"
            durationMs={900}
            delayMs={200}
            className="relative ml-auto w-[50%] xl:w-[48%] z-10"
          >
            <div className="bg-brand-navy text-white rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/10 space-y-4 backdrop-blur-md">
              <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Introduction
              </h2>

              <div className="space-y-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                <p>
                  Welcome to Best Deals Asia Group, your premier destination for
                  comprehensive solutions within the property industry.
                  Operating as a fully registered company in Indonesia, we offer
                  a diverse range of services under the Best Deals Asia Group
                  banner.
                </p>
                <p>
                  As a one-stop shopping hub, we specialize in holiday rental
                  accommodation, advanced holiday rental marketing, digital
                  solutions, event planning, property management, hospitality
                  services, and real estate agency operations. Our large and
                  dedicated team is committed to delivering excellence across
                  all aspects of our company operations.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default HomeIntro;
