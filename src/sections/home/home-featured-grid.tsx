"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRight, Check } from "lucide-react";

export function HomeFeaturedGrid() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 space-y-16">
        
        {/* Luxury Architectural Villa & Hospitality Showcase */}
        <Reveal animation="fade-up" durationMs={800}>
          <div className="rounded-[2.5rem] bg-brand-sand/70 p-8 sm:p-12 lg:p-14 border border-border/80 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy block mb-2">
                    SIGNATURE HOSPITALITY
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                    Curated Luxury Living & Professional Estate Care
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
                  Whether you seek an unforgettable Bali holiday rental or an end-to-end management partner for your private estate, BDA combines hospitality expertise with rigorous financial transparency.
                </p>

                <div className="space-y-2.5">
                  {[
                    "Personal inspection of all listed villas for quality control",
                    "Multi-channel distribution (Airbnb, Booking.com, Luxury Escapes, Direct)",
                    "Dedicated in-house maintenance, cleaning, and guest concierge",
                    "Regular performance reporting and revenue optimization"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-brand-navy">
                      <div className="size-4 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center shrink-0">
                        <Check className="size-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a 
                    href="https://bestdealsasiarentals.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold px-6 py-3 rounded-full transition-all shadow-md group"
                  >
                    <span>Browse Bali Rentals</span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a 
                    href="https://bestdealsasiahospitality.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-brand-sand text-brand-navy border border-brand-navy/20 text-xs font-bold px-6 py-3 rounded-full transition-all"
                  >
                    <span>Hospitality Operations</span>
                  </a>
                </div>
              </div>

              {/* Asymmetrical Architectural Photo Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-md h-48 sm:h-56">
                    <Image 
                      src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80" 
                      alt="Luxury Villa Living Room" 
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-md h-36 sm:h-44">
                    <Image 
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" 
                      alt="Private Pool Villa" 
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-md h-36 sm:h-44">
                    <Image 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" 
                      alt="Resort Bali" 
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-md h-48 sm:h-56">
                    <Image 
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
                      alt="Modern Villa Architecture" 
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default HomeFeaturedGrid;
