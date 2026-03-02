"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  left: number
  top: number
  size: number
  delay: number
}

export function SparkleStars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const sparkles: Star[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }))
    setStars(sparkles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-[#c084fc] animate-sparkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  )
}
