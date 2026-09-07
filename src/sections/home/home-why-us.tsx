"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function HomeWhyUs() {
  const pillars = [
    {
      id: "professional-team",
      title: "Professional Team",
      gif: "/professional-team.gif",
      description:
        "Our team comprises highly skilled professionals dedicated to delivering top-notch services. With a focus on expertise and professionalism, we ensure that every aspect of our work reflects a commitment to quality and excellence across Bali.",
    },
    {
      id: "trusted",
      title: "Trusted",
      gif: "/trusted.gif",
      description:
        "Over time, we've earned the trust of our clients through transparent communication, reliable service delivery, and consistent customer satisfaction. Our track record speaks for itself, fostering complete confidence that we prioritize client needs.",
    },
    {
      id: "integrated",
      title: "Integrated Solution",
      gif: "/integrated.gif",
      description:
        "We offer comprehensive and integrated solutions that address diverse needs. By providing a one-stop-shop for multiple property, hospitality, and digital sectors, we streamline operations and enhance efficiency from start to finish.",
    },
    {
      id: "result",
      title: "Great Result",
      gif: "/result.gif",
      description:
        "Our dedication to achieving great results sets us apart. We strive for excellence in every project, ensuring that our clients not only meet their goals but exceed them through proven yield and meticulous execution.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-10 md:px-14 lg:px-20 bg-brand-sand/35 backdrop-blur-[2px] relative border-b border-border/70 overflow-hidden">
      {/* Luxury Mesh Gradient Glow Orbs */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-brand-gold/20 via-brand-gold/5 to-transparent rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-navy/10 via-brand-gold/10 to-transparent rounded-full blur-[110px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(#0c356a_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal animation="fade-up" durationMs={600}>
          <div className="mb-16 md:mb-20 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight uppercase">
              Why Us
            </h2>
            <div className="w-20 h-1 bg-brand-gold mt-4 mb-6" />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Operating as a premier one-stop hub in Indonesia, we unite four foundational commitments across all company operations.
            </p>
          </div>
        </Reveal>

        {/* Elevated Bordered Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <Reveal
              key={pillar.id}
              animation="fade-up"
              delayMs={idx * 100}
              durationMs={600}
            >
              <div className="relative h-full flex flex-col sm:flex-row items-start gap-5 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-sm hover:shadow-md hover:border-brand-gold/60 transition-all duration-300 group overflow-hidden">
                {/* Subtle top accent highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Crisp Native-size GIF container */}
                <div className="size-14 sm:size-16 shrink-0 rounded-xl bg-white border border-border/60 shadow-xs flex items-center justify-center p-2 group-hover:border-brand-gold/30 transition-colors">
                  <div className="relative size-10 sm:size-12">
                    <Image
                      src={pillar.gif}
                      alt={pillar.title}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2.5 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-navy tracking-tight group-hover:text-brand-navy-light transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-foreground/75 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HomeWhyUs;
