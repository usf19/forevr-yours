"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, Lock } from "lucide-react"
import { FallingHearts } from "@/components/falling-hearts"
import { SparkleStars } from "@/components/sparkle-stars"

export default function PasswordPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const router = useRouter()

  const handleUnlock = () => {
    if (password === "2112006") {
      setUnlocking(true)
      setError(false)
      setTimeout(() => {
        router.push("/letter")
      }, 1000)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <FallingHearts />
      <SparkleStars />

      <div
        className={`relative z-10 flex flex-col items-center gap-8 p-10 rounded-3xl border border-border bg-card backdrop-blur-xl animate-fade-in-up transition-all duration-700 ${
          unlocking ? "scale-110 opacity-0" : ""
        }`}
        style={{ maxWidth: 400, width: "90%" }}
      >
        {/* Heart icon */}
        <div className="animate-heartbeat">
          <Heart className="w-16 h-16 text-primary fill-primary" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-serif text-center text-foreground tracking-wide">
          {"Welcome"}
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          {"Enter the password to unlock something special"}
        </p>

        {/* Password input */}
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="password-input" className="sr-only">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="password-input"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-secondary text-foreground placeholder-muted-foreground border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                error
                  ? "border-destructive animate-[shake_0.5s_ease-in-out]"
                  : "border-border"
              }`}
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center animate-fade-in-up">
              {"Wrong password, try again"}
            </p>
          )}

          <button
            onClick={handleUnlock}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base transition-all duration-300 hover:brightness-110 animate-pulse-glow cursor-pointer"
          >
            {"Unlock"}
          </button>
        </div>

        {/* Hint */}
        <p className="text-xs text-muted-foreground/60 text-center">
          {"Hint: It's a number"}
        </p>
      </div>
    </main>
  )
}
