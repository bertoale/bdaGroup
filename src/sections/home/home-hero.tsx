"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function HomeHero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      setMouseOffset({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-transparent text-foreground flex flex-col justify-between pt-24 pb-8 px-6 sm:pt-28 sm:pb-10 sm:px-10 md:px-14 lg:px-20 overflow-hidden select-none"
    >
      {/* 1. Cinematic Tropical Architectural Villa Blend (Left to Center) */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[68%] h-full z-0 pointer-events-none overflow-hidden"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.3}px, ${
            scrollY * 0.12 + mouseOffset.y * -0.3
          }px, 0) scale(1.03)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1800&q=85"
          alt="Luxury Bali Architectural Villa by Best Deals Asia Group"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 68vw"
          className="object-cover object-center"
        />

        {/* Seamless Horizontal & Radial Gradient Masks toward right text */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* 2. Soft Architectural Blueprint Accent Line */}
      <div className="absolute left-8 sm:left-14 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-brand-navy/30 hidden lg:block" />

      {/* 3. Background Kinetic Watermark with Parallax Speed */}
      <div
        className="absolute -right-14 -bottom-10 pointer-events-none opacity-[0.035] dark:opacity-[0.05] font-black text-[22vw] leading-none select-none tracking-tighter z-0 text-brand-navy"
        style={{
          transform: `translate3d(${mouseOffset.x * -1.1}px, ${
            scrollY * 0.2 + mouseOffset.y * -1.1
          }px, 0)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        BDA
      </div>

      {/* Dynamic Spacing */}
      <div className="pt-12 sm:pt-8 z-10" />

      {/* Center/Main Headline with Kinetic Typography Staggered Reveal */}
      <div
        className="w-full flex flex-col items-end text-right my-auto py-8 sm:py-12 z-10"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.3}px, ${
            scrollY * -0.08 + mouseOffset.y * 0.3
          }px, 0)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <div className="overflow-hidden mb-2 sm:mb-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-light text-brand-navy/80 tracking-[-0.01em]">
            Best Deals Asia Group
          </h2>
        </div>

        <div className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.2rem] font-[850] uppercase tracking-[-0.03em] text-brand-navy leading-[1.03]">
          <div className="overflow-hidden">
            <span className="inline-block animate-in slide-in-from-bottom-full duration-700 delay-100 ease-out">
              INNOVATION IN
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block text-brand-navy-light animate-in slide-in-from-bottom-full duration-700 delay-200 ease-out">
              EVERY VENTURE
            </span>
          </div>
        </div>

        {/* Dynamic Expanding Gold Line */}
        <div className="w-36 sm:w-56 md:w-80 h-[3px] bg-brand-gold mt-6 sm:mt-8 origin-right animate-in zoom-in-x duration-1000 delay-300" />

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex items-center justify-end gap-3 pt-1">
          <a
            href="#businesses"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-brand-navy hover:bg-brand-navy-light px-5 py-2.5 rounded-full shadow-md border border-brand-gold/30 transition-all group"
          >
            <span>Explore Businesses</span>
            <ArrowUpRight className="size-3.5 text-brand-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy bg-brand-gold hover:bg-brand-gold-hover px-5 py-2.5 rounded-full shadow-sm transition-all"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
