'use client'

import { useState, useEffect } from 'react'
import { MusicPlayer } from '@/components/music-player'
import Image from 'next/image'

const photos = [
  { src: "https://picsum.photos/800/600?random=1", alt: "Memory 1" },
  { src: "https://picsum.photos/800/600?random=2", alt: "Memory 2" },
  { src: "https://picsum.photos/800/600?random=3", alt: "Memory 3" },
]

export default function MemoriesPage() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Relationship Timer
  useEffect(() => {
    const startDate = new Date('2021-01-15T00:00:00') // غيّر التاريخ بتاعك

    const calculateTime = () => {
      const now = new Date()
      const difference = now.getTime() - startDate.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeTogether({ days, hours, minutes, seconds })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Photo Carousel
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-100 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto pt-8 pb-4">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-800 text-center italic mb-2">
          💜 Our Story
        </h1>
        
        <h2 className="text-4xl md:text-5xl font-bold text-purple-800 text-center italic mb-8">
          Our Memories 💕
        </h2>
      </div>

      {/* Music Player */}
      <div className="max-w-4xl mx-auto mb-8">
        <MusicPlayer title="MOSH GEDE" artist="Amr Diab" />
      </div>

      {/* Photo Carousel */}
      <div className="max-w-4xl mx-auto mb-8 relative">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
          <Image
            src={photos[currentPhotoIndex].src}
            alt={photos[currentPhotoIndex].alt}
            fill
            className="object-cover"
          />
          
          {/* Left Arrow */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-3 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-3 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* Photo Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={w-3 h-3 rounded-full transition-all ${
                index === currentPhotoIndex ? 'bg-purple-600 w-8' : 'bg-purple-300'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Relationship Timer */}
      <div className="max-w-4xl mx-auto bg-purple-300 rounded-3xl p-8 text-center mb-8 shadow-xl">
        <p className="text-2xl text-purple-900 mb-4 italic">
          We've been together for 💜
        </p>
        <p className="text-2xl md:text-3xl font-semibold text-purple-900 italic">
          {timeTogether.days} days, {timeTogether.hours} hrs, {timeTogether.minutes} mins, and {timeTogether.seconds} secs 💜
        </p>
      </div>

      {/* Next Button */}
      <div className="max-w-4xl mx-auto text-center">
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-10 py-4 rounded-full text-2xl font-semibold transition-all transform hover:scale-105 shadow-lg">
          Next 💕
        </button>
      </div>
    </div>
  )
}
