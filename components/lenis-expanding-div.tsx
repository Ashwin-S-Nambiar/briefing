"use client";

import React, { useRef, useEffect } from "react";
import { useLenis } from "@/components/smooth-scroller";

interface LenisExpandingDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * The scroll position (in pixels) where the expansion animation begins.
   */
  startScroll: number;
  /**
   * The scroll position (in pixels) where the expansion animation completes.
   */
  endScroll: number;
  /**
   * The initial scale value when scroll < startScroll.
   * Default: 0.8
   */
  startScale?: number;
  /**
   * The final scale value when scroll > endScroll.
   * Default: 1.0
   */
  endScale?: number;
}

export function LenisExpandingDiv({
  children,
  startScroll,
  endScroll,
  startScale = 0.8,
  endScale = 1.0,
  className,
  ...props
}: LenisExpandingDivProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !lenis) return;

    // Global conflict avoidance flag
    // @ts-ignore
    window.__LENIS_ACTIVE = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = ({ scroll }: { scroll: number }) => {
      // Respect user preference for reduced motion
      if (prefersReducedMotion.matches) {
        element.style.transform = "none";
        return;
      }

      // Calculate normalized progress (0 to 1)
      const range = endScroll - startScroll;
      const progress = Math.max(0, Math.min(1, (scroll - startScroll) / range));

      // Interpolate scale
      // Reversible: naturally handled by the continuous function of scroll position
      const currentScale = startScale + (endScale - startScale) * progress;

      // Apply GPU-friendly transform
      element.style.transform = `scale(${currentScale})`;
    };

    // Initial update to set correct state before scroll
    update({ scroll: lenis.scroll });

    // Hook into Lenis scroll event which runs on every RAF frame where scroll changes
    const unsubscribe = lenis.on("scroll", update);

    return () => {
      unsubscribe();
      // @ts-ignore
      window.__LENIS_ACTIVE = false;
      // Clean up style on unmount
      if (element) {
        element.style.transform = "";
      }
    };
  }, [lenis, startScroll, endScroll, startScale, endScale]);

  return (
    <div
      ref={elementRef}
      className={className}
      data-lenis-controlled="true"
      style={{
        willChange: "transform",
        // Ensure origin is set correctly for scaling (center is default, but explicit is safer)
        transformOrigin: "center center", 
      }}
      {...props}
    >
      {children}
    </div>
  );
}
