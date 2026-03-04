"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 p-6 md:p-8 transition-colors duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className={cn(
          "font-headline text-2xl md:text-3xl transition-colors",
          isScrolled ? "text-primary" : "text-white"
        )}>
          Atmos
        </Link>
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link href="#about" className={cn(
            "font-body text-base md:text-lg hover:underline transition-colors",
            isScrolled ? "text-primary" : "text-white"
          )}>
            About
          </Link>
          <Link href="#interior" className={cn(
            "font-body text-base md:text-lg hover:underline transition-colors",
            isScrolled ? "text-primary" : "text-white"
          )}>
            Experience
          </Link>
          <Link href="#booking" className={cn(
            "font-body text-base md:text-lg hover:underline transition-colors",
            isScrolled ? "text-primary" : "text-white"
          )}>
            Booking
          </Link>
        </div>
      </nav>
    </header>
  );
}
