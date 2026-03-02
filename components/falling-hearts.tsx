"use client"

import { useEffect, useState } from "react"

interface HeartParticle {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  symbol: string
}

const symbols = ["\u2665", "\u2764", "\u2661", "\u2726", "\u2727"]

export function FallingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([])

  useEffect(() => {
    const particles: HeartParticle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 16 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }))
    setHearts(particles)
  }, [])

  return (
    <div className="falling-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-particle"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.symbol}
        </span>
      ))}
    </div>
  )
}
