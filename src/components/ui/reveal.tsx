"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in";
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  once?: boolean;
}

export function Reveal({
  children,
  animation = "fade-up",
  delayMs = 0,
  durationMs = 700,
  threshold = 0.15,
  once = true,
  className,
  ...props
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getTransformStyle = () => {
    if (isVisible) {
      return "opacity-100 translate-x-0 translate-y-0 scale-100";
    }

    switch (animation) {
      case "fade-up":
        return "opacity-0 translate-y-12";
      case "fade-down":
        return "opacity-0 -translate-y-12";
      case "fade-left":
        return "opacity-0 translate-x-12";
      case "fade-right":
        return "opacity-0 -translate-x-12";
      case "zoom-in":
        return "opacity-0 scale-95";
      default:
        return "opacity-0 translate-y-12";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu",
        getTransformStyle(),
        className
      )}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Reveal;
