"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { subsidiaries } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function HomeBusinessUnits() {
  return (
    <section
      id="businesses"
      className="relative w-full py-16 sm:py-24 px-6 sm:px-10 md:px-14 lg:px-20 bg-transparent text-foreground overflow-hidden border-t border-border/40"
    >
      {/* Pattern Loop Repeating Background */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 opacity-15"
        style={{
          backgroundImage: "url('https://storage.googleapis.com/bda_rental/bda-group/images/pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "320px 320px",
        }}
      />

      {/* Decorative ambient background accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-sand/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <Reveal animation="fade-up" durationMs={700} delayMs={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy uppercase leading-tight">
              Our Businesses
            </h2>
          </Reveal>
          <Reveal animation="fade-up" durationMs={800} delayMs={200}>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Discover our integrated ecosystem delivering premier hospitality,
              property management, real estate investment, maintenance, event
              curation, and digital transformation.
            </p>
          </Reveal>
        </div>

        {/* Vertical Zig-Zag Business Items */}
        <div className="flex flex-col gap-20 sm:gap-28 lg:gap-36">
          {subsidiaries.map((sub, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={sub.id}
                id={sub.id}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center",
                )}
              >
                {/* Visual / Image Side */}
                <div
                  className={cn(
                    "lg:col-span-6 w-full",
                    isEven ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <Reveal
                    animation={isEven ? "fade-left" : "fade-right"}
                    durationMs={800}
                    threshold={0.1}
                    className="w-full"
                  >
                    {/* Check if multi-images exist */}
                    {sub.images && sub.images.length > 1 ? (
                      sub.images.length === 2 ? (
                        /* 2 Images: Side-by-side / 2-column grid */
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 aspect-[4/3] sm:aspect-[16/10]">
                          {sub.images.slice(0, 2).map((img, i) => (
                            <div
                              key={i}
                              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-border/80 shadow-md transition-all duration-500 hover:shadow-xl"
                            >
                              <Image
                                src={img}
                                alt={`${sub.name} ${i + 1}`}
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* 3+ Images Collage: 1 Big Main Image on Left, 2 Stacked Images on Right */
                        <div className="grid grid-cols-12 gap-3 sm:gap-4 aspect-[4/3] sm:aspect-[16/10]">
                          {/* Large Primary Image */}
                          <div className="col-span-7 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-border/80 shadow-md transition-all duration-500 hover:shadow-xl">
                            <Image
                              src={sub.images[0]}
                              alt={`${sub.name} primary`}
                              fill
                              sizes="(max-width: 1024px) 60vw, 30vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </div>

                          {/* 2 Stacked Secondary Images */}
                          <div className="col-span-5 grid grid-rows-2 gap-3 sm:gap-4">
                            {sub.images.slice(1, 3).map((img, i) => (
                              <div
                                key={i}
                                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-border/80 shadow-md transition-all duration-500 hover:shadow-xl"
                              >
                                <Image
                                  src={img}
                                  alt={`${sub.name} sub-${i + 1}`}
                                  fill
                                  sizes="(max-width: 1024px) 40vw, 20vw"
                                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ) : (
                      /* Single Image Container */
                      <div className="group relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-white border border-border/80 shadow-xl shadow-brand-navy/5 transition-all duration-500 hover:shadow-2xl">
                        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                      </div>
                    )}
                  </Reveal>
                </div>

                {/* Content / Narrative Side */}
                <div
                  className={cn(
                    "lg:col-span-6 w-full flex flex-col justify-center",
                    isEven ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6",
                  )}
                >
                  <Reveal
                    animation={isEven ? "fade-right" : "fade-left"}
                    durationMs={800}
                    threshold={0.1}
                    className="w-full"
                  >
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight leading-snug mb-4 sm:mb-6">
                      {sub.name}
                    </h3>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8 font-normal">
                      {sub.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <a
                        href={sub.href}
                        target={sub.isExternal ? "_blank" : undefined}
                        rel={sub.isExternal ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
                      >
                        <span>
                          {sub.ctaText} {sub.name}
                        </span>
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeBusinessUnits;
