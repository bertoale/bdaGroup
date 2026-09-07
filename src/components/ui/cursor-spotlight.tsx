"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CursorSpotlightProps {
  className?: string;
}

export function CursorSpotlight({ className }: CursorSpotlightProps) {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        setCursorText(target.getAttribute("data-cursor") || "Explore");
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={cn(
          "fixed pointer-events-none z-30 transition-opacity duration-500 rounded-full blur-[100px] opacity-20 hidden lg:block",
          className
        )}
        style={{
          width: "480px",
          height: "480px",
          left: `${mousePos.x - 240}px`,
          top: `${mousePos.y - 240}px`,
          background: "radial-gradient(circle, var(--color-brand-navy) 0%, transparent 70%)",
        }}
      />

      {isHovered && cursorText && (
        <div
          className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out hidden lg:flex items-center justify-center bg-brand-navy text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl tracking-widest uppercase backdrop-blur-md animate-in zoom-in-75 border border-white/20"
          style={{
            left: `${mousePos.x + 16}px`,
            top: `${mousePos.y + 16}px`,
          }}
        >
          {cursorText}
        </div>
      )}
    </>
  );
}

export default CursorSpotlight;
