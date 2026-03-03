"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { FallingHearts } from "@/components/falling-hearts"
import { SparkleStars } from "@/components/sparkle-stars"
import { Navbar } from "@/components/navbar"

export default function EndingPage() {
  const [showContent, setShowContent] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showPoem, setShowPoem] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 500)
    const t2 = setTimeout(() => setShowMessage(true), 1500)
    const t3 = setTimeout(() => setShowPoem(true), 2500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-background">
      <FallingHearts />
      <SparkleStars />
      <Navbar />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 pt-20 pb-12 w-full max-w-md">
        {/* Big animated heart */}
        <div
          className={`transition-all duration-1000 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            <Heart className="w-24 h-24 text-primary fill-primary animate-heartbeat" />
            {/* Glow ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-full animate-pulse-glow" />
          </div>
        </div>

        {/* Title */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl font-serif text-center text-foreground">
            {"Forever Yours"}
          </h1>
        </div>

        {/* Separator */}
        <div
          className={`flex items-center gap-3 transition-all duration-1000 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="h-px w-12 bg-primary/40" />
          <span className="text-primary text-sm">{"\u2726"}</span>
          <div className="h-px w-12 bg-primary/40" />
        </div>

        {/* Main heading */}
        <div
          className={`transition-all duration-1000 ${
            showMessage
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl font-serif text-center text-foreground leading-relaxed">
            {"Forever and Always"}
          </h2>
        </div>

        {/* Message card */}
        <div
          className={`w-full p-8 rounded-2xl border border-border bg-card backdrop-blur-xl transition-all duration-1000 ${
            showPoem
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-foreground/90 leading-loose text-center font-light">
            {"No matter where life takes us..."}
          </p>
          <p className="text-foreground/90 leading-loose text-center font-light mt-2">
            {"You'll always be my favorite person,"}
          </p>
          <p className="text-foreground/90 leading-loose text-center font-light mt-2">
            {"My safe place, my home."}
          </p>
        </div>

        {/* Decorative hearts row */}
        <div
          className={`flex items-center gap-4 transition-all duration-1000 delay-500 ${
            showPoem
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { color: "#7c3aed", size: "text-sm" },
            { color: "#a855f7", size: "text-lg" },
            { color: "#c084fc", size: "text-2xl" },
            { color: "#a855f7", size: "text-lg" },
            { color: "#7c3aed", size: "text-sm" },
          ].map((h, i) => (
            <span
              key={i}
              className={`${h.size} animate-heartbeat`}
              style={{ color: h.color, animationDelay: `${i * 0.2}s` }}
            >
              {"\u2665"}
            </span>
          ))}
        </div>

        {/* Replay button */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            showPoem
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <button
            onClick={() => router.push("/")}
            className="px-10 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base transition-all duration-300 hover:brightness-110 animate-pulse-glow cursor-pointer"
          >
            {"Replay"}
          </button>
        </div>
      </div>
    </main>
  )
}
