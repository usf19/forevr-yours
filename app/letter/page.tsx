"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FallingHearts } from "@/components/falling-hearts"
import { SparkleStars } from "@/components/sparkle-stars"
import { Navbar } from "@/components/navbar"

export default function LetterPage() {
  const [showLetter, setShowLetter] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    setLeaving(true)
    setTimeout(() => {
      router.push("/memories")
    }, 800)
  }

  return (
    <main
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background transition-opacity duration-700 ${
        leaving ? "opacity-0" : ""
      }`}
    >
      <FallingHearts />
      <SparkleStars />
      <Navbar />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 pt-20 w-full max-w-md">
        {!showLetter ? (
          /* Pre-letter: click the flower */
          <div className="flex flex-col items-center gap-8 animate-fade-in-up">
            <h1 className="text-3xl font-serif text-center text-foreground">
              {"My Letter to You"}
            </h1>
            <p className="text-muted-foreground text-center text-sm">
              {"click on the flower"}
            </p>
            <button
              onClick={() => setShowLetter(true)}
              className="text-8xl animate-float cursor-pointer transition-transform duration-300 hover:scale-125 focus:outline-none bg-transparent border-none"
              aria-label="Open love letter"
            >
              {"🌸"}
            </button>
          </div>
        ) : (
          /* Letter content */
          <div className="flex flex-col items-center gap-8 animate-fade-in-up">
            <h2 className="text-3xl font-serif text-center text-foreground">
              {"My Love Letter"}
            </h2>

            <div className="w-full p-8 rounded-2xl border border-border bg-card backdrop-blur-xl">
              <p className="text-foreground/90 leading-relaxed text-center font-light text-base">
                {"From the very first moment I met you, you've filled my life with color, laughter, and peace. You are my favorite story, my sweetest melody, and my forever person."}
              </p>
            </div>

            {/* Decorative hearts */}
            <div className="flex items-center gap-4">
              {["#a855f7", "#c084fc", "#7c3aed", "#c084fc", "#a855f7"].map(
                (color, i) => (
                  <span
                    key={i}
                    className="animate-heartbeat text-xl"
                    style={{
                      color,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    {"\u2665"}
                  </span>
                )
              )}
            </div>

            <button
              onClick={handleNext}
              className="px-10 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base transition-all duration-300 hover:brightness-110 animate-pulse-glow cursor-pointer"
            >
              {"Next"}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
