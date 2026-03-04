"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ImageSequenceProps {
  baseUrl: string;
  frameCount: number;
  containerRef: React.RefObject<HTMLElement>;
  className?: string;
}

const ImageSequence: React.FC<ImageSequenceProps> = ({
  baseUrl,
  frameCount,
  containerRef,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<{ img: HTMLImageElement; loaded: boolean }[]>([]);
  const frame = useRef(0);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  const getFrameUrl = (index: number) => {
    return `${baseUrl}/frame_${String(index).padStart(3, "0")}_delay-0.041s.webp`;
  };

  useEffect(() => {
    images.current = Array.from({ length: frameCount }, (_, i) => {
      const img = new Image();
      return { img, loaded: false };
    });

    if (images.current.length > 0) {
        images.current[0].img.src = getFrameUrl(0);
        images.current[0].img.onload = () => {
          images.current[0].loaded = true;
          setFirstFrameLoaded(true);
          
          for (let i = 1; i < frameCount; i++) {
            images.current[i].img.src = getFrameUrl(i);
            images.current[i].img.onload = () => {
              images.current[i].loaded = true;
            };
          }
        };
    }
  }, [baseUrl, frameCount]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    let frameToDrawData = images.current[frameIndex];
    if (!frameToDrawData || !frameToDrawData.loaded) {
        for (let i = frameIndex; i >= 0; i--) {
            if (images.current[i]?.loaded) {
                frameToDrawData = images.current[i];
                break;
            }
        }
    }
    if (!frameToDrawData || !frameToDrawData.loaded) return;

    const img = frameToDrawData.img;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let sx = 0, sy = 0, sWidth = img.naturalWidth, sHeight = img.naturalHeight;

    if (canvasRatio > imgRatio) {
      sHeight = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sHeight) / 2;
    } else {
      sWidth = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sWidth) / 2;
    }
    
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
  }, []);

  useEffect(() => {
    if (!firstFrameLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    let requestId: number;

    const resizeCanvas = () => {
        if (!canvasRef.current) return;
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        drawFrame(frame.current);
    };

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      
      let scrollFraction = -top / scrollableHeight;
      scrollFraction = Math.min(1, Math.max(0, scrollFraction));

      const newFrame = Math.floor(scrollFraction * (frameCount - 1));

      if (newFrame !== frame.current) {
        frame.current = newFrame;
        if(requestId) cancelAnimationFrame(requestId);
        requestId = requestAnimationFrame(() => drawFrame(newFrame));
      }
    };
    
    resizeCanvas();
    drawFrame(0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [firstFrameLoaded, containerRef, frameCount, drawFrame]);

  return (
    <canvas ref={canvasRef} className={cn("w-full h-full", className)} />
  );
};

export default ImageSequence;
