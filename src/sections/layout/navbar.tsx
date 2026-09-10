"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full bg-[#ffffff] border-b border-border/80 transition-all duration-200",
        isScrolled ? "py-2.5 shadow-sm" : "py-3.5",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative h-11 w-36 sm:w-44 transition-transform hover:opacity-95">
              <Image
                src="/bda-logos2.gif"
                alt="Best Deals Asia Group"
                fill
                priority
                unoptimized
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors",
                pathname === "/"
                  ? "text-brand-navy bg-brand-navy/5"
                  : "text-foreground/75 hover:text-brand-navy hover:bg-brand-sand",
              )}
            >
              Home
            </Link>

            <a
              href="/#businesses"
              className="px-3.5 py-2 text-sm font-semibold rounded-lg text-foreground/75 hover:text-brand-navy hover:bg-brand-sand transition-colors"
            >
              Businesses
            </a>
            <Link
              href="/career"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors",
                pathname === "/career"
                  ? "text-brand-navy bg-brand-navy/5"
                  : "text-foreground/75 hover:text-brand-navy hover:bg-brand-sand",
              )}
            >
              Career
            </Link>
            <Link
              href="/contact"
              className={cn(
                "px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors",
                pathname === "/contact"
                  ? "text-brand-navy bg-brand-navy/5"
                  : "text-foreground/75 hover:text-brand-navy hover:bg-brand-sand",
              )}
            >
              Contact Us
            </Link>
          </nav>

          {/* Standard Right CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://bestdealsasiarentals.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-brand-navy bg-brand-sand hover:bg-brand-navy/10 rounded-lg transition-colors"
            >
              Place to Stay
            </a>

            <a
              href="https://bestdealsasiahospitality.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-brand-navy bg-brand-gold hover:bg-brand-gold-hover rounded-lg shadow-sm active:scale-95 transition-all"
            >
              <span>Market Your Place</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-brand-sand focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white shadow-xl max-h-[85vh] overflow-y-auto px-4 py-6 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 pb-3 border-b border-border">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-sm font-bold text-brand-navy rounded-lg hover:bg-brand-sand"
              >
                Home
              </Link>
              <a
                href="/#businesses"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-sm font-semibold text-foreground rounded-lg hover:bg-brand-sand"
              >
                Businesses
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-sm font-semibold text-foreground rounded-lg hover:bg-brand-sand"
              >
                Contact Us
              </Link>
              <Link
                href="/career"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-sm font-semibold text-foreground rounded-lg hover:bg-brand-sand"
              >
                Career
              </Link>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://bestdealsasiarentals.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs font-bold text-brand-navy bg-brand-sand rounded-xl"
              >
                Place to Stay
              </a>
              <a
                href="https://bestdealsasiahospitality.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold text-brand-navy bg-brand-gold hover:bg-brand-gold-hover rounded-xl shadow-sm"
              >
                Market Your Place
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
