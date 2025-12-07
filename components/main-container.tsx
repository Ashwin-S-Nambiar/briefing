'use client';

import { usePathname } from "next/navigation";
import { LenisExpandingDiv } from "./lenis-expanding-div";
import { cn } from "@/lib/utils";

export function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Base classes for the container (paper card look)
  const containerClasses = "w-full min-h-[calc(100vh-4rem)] paper-texture rounded-3xl flex flex-col overflow-hidden relative shadow-2xl";

  // If on the homepage, wrap with LenisExpandingDiv to provide the sticky expand animation
  if (isHome) {
    return (
      <LenisExpandingDiv
        className={containerClasses}
        startScroll={0}
        endScroll={500}
        startScale={0.92}
        endScale={1.0}
      >
        {children}
      </LenisExpandingDiv>
    );
  }

  // On other pages, render the static container
  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}