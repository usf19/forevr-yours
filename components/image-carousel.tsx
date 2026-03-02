"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselImage {
  src: string
  alt: string
}

export function ImageCarousel({ images }: { images: CarouselImage[] }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goTo = (index: number) => {
    if (index < 0) setCurrent(images.length - 1)
    else if (index >= images.length) setCurrent(0)
    else setCurrent(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(current + 1)
      else goTo(current - 1)
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Image container */}
      <div
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-500 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: `translateX(${(i - current) * 100}%)`,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, 400px"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

        {/* Left arrow */}
        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-card/60 backdrop-blur-sm border border-border text-foreground/80 hover:bg-card/80 transition-all duration-200 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-card/60 backdrop-blur-sm border border-border text-foreground/80 hover:bg-card/80 transition-all duration-200 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
