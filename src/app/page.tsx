"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ImageSequence from "@/components/image-sequence";
import { sequences } from "@/lib/sequences";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const natureRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-background text-foreground">
      <Header />
      
      <main>
        <section ref={heroRef} className="relative h-[200vh] text-primary-foreground">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <ImageSequence {...sequences.hero} containerRef={heroRef} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h1 className="font-headline text-5xl md:text-8xl lg:text-9xl drop-shadow-md">
                Atmos
              </h1>
              <p className="font-body text-lg md:text-2xl mt-4 max-w-2xl drop-shadow">
                Where silence speaks and mountains listen.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 sm:py-32 bg-background">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center" data-aos="fade-up">
            <h2 className="font-headline text-4xl sm:text-5xl text-primary">A Sanctuary Above</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Carved into the serene alpine landscape, Atmos is more than a retreat; it's a state of being. We merge minimalist architecture with the raw beauty of nature to create a space of quiet contemplation and refined luxury. Every detail is curated to calm the mind and soothe the soul.
            </p>
          </div>
        </section>

        <section ref={interiorRef} id="interior" className="relative h-[250vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <ImageSequence {...sequences.interior} containerRef={interiorRef} />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex items-center justify-start p-12 md:p-24">
              <div className="max-w-md text-primary-foreground">
                <h3 className="font-headline text-3xl md:text-5xl">The Interior Experience</h3>
                <p className="mt-4 font-body text-base md:text-lg">
                  Our spaces are designed to be a seamless extension of the surrounding tranquility. Warm wood, natural stone, and expansive glass walls frame the panoramic views, creating an atmosphere of understated elegance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={natureRef} id="nature" className="relative h-[250vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <ImageSequence {...sequences.nature} containerRef={natureRef} />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex items-center justify-end p-12 md:p-24">
              <div className="max-w-md text-primary-foreground text-right">
                <h3 className="font-headline text-3xl md:text-5xl">Nature & Landscape</h3>
                <p className="mt-4 font-body text-base md:text-lg">
                  Step outside and into a world of pristine wilderness. Explore ancient forests, crystal-clear lakes, and breathtaking trails right at your doorstep. Here, nature is not just a view; it's an invitation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={bookingRef} id="booking" className="relative h-[250vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <ImageSequence {...sequences.booking} containerRef={bookingRef} />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 p-4">
              <h3 className="font-headline text-4xl md:text-6xl text-primary-foreground text-center">Begin Your Escape</h3>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-12 py-8 text-lg font-body transition-transform hover:scale-105">
                Book Your Stay
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
