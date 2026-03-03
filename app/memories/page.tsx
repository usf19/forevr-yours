"use client"
import { useState } from "react"
import { FallingHearts } from "@/components/falling-hearts"
import { SparkleStars } from "@/components/sparkle-stars"
import { MusicPlayer } from "@/components/music-player"
import { Navbar } from "@/components/navbar"
import { ImageCarousel } from "@/components/image-carousel"

const photos = [
  { src: "/images/memory-1.jpg", alt: "Memory 1" },
  { src: "/images/memory-2.jpg", alt: "Memory 2" },
  { src: "/images/memory-3.jpg", alt: "Memory 3" },
]


export default function MemoriesPage() {
  const [leaving, setLeaving] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    setLeaving(true)
    setTimeout(() => {
      router.push("/ending")
    }, 800)
  }

  return (
    <main
      className={`relative min-h-screen flex flex-col items-center bg-background transition-opacity duration-700 ${
        leaving ? "opacity-0" : ""
      }`}
    >
      <FallingHearts />
      <SparkleStars />
      <Navbar />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 pt-20 pb-12 w-full max-w-md animate-fade-in-up">
        <h1 className="text-3xl font-serif text-center text-foreground">
          {"Our Memories"}
        </h1>

        {/* Decorative hearts */}
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="text-primary animate-heartbeat text-lg"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {"\u2665"}
            </span>
          ))}
        </div>

        {/* Music Player */}
        <MusicPlayer title="MOSH GEDE" artist="Amr Diab" />

        {/* Swipeable Photo Carousel */}
        <ImageCarousel images={photos} />

        {/* Memory cards */}
        <div className="w-full flex flex-col gap-4">
          {[
            { text: "Our first conversation", delay: "0s" },
            { text: "The day everything changed", delay: "0.2s" },
            { text: "Every moment with you", delay: "0.4s" },
          ].map((memory, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border bg-card backdrop-blur-xl text-center text-foreground/80 text-sm animate-fade-in-up"
              style={{ animationDelay: memory.delay }}
            >
              {memory.text}
            </div>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="px-10 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base transition-all duration-300 hover:brightness-110 animate-pulse-glow cursor-pointer"
        >
          {"Next"}
        </button>
      </div>
    </main>
  )
}
