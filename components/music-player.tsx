"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, Music } from "lucide-react"

interface MusicPlayerProps {
  title: string
  artist: string
}

export function MusicPlayer({ title, artist }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180) // 3 minutes placeholder
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            stopInterval()
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      stopInterval()
    }
    return stopInterval
  }, [isPlaying, duration, stopInterval])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (currentTime / duration) * 100

  return (
    <div className="w-full p-6 rounded-2xl border border-border bg-card backdrop-blur-xl">
      {/* Album art placeholder */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
          <Music className="w-6 h-6 text-primary" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="text-foreground font-medium text-sm uppercase tracking-wide truncate">
            {title}
          </h3>
          <p className="text-muted-foreground text-xs">{artist}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-end justify-center gap-[3px] h-10 mb-4">
        {Array.from({ length: 30 }, (_, i) => {
          const height = isPlaying
            ? Math.random() * 100
            : 20 + Math.sin(i * 0.5) * 15
          return (
            <div
              key={i}
              className="w-[3px] rounded-full transition-all duration-150"
              style={{
                height: `${Math.max(height, 10)}%`,
                backgroundColor:
                  i / 30 < progress / 100
                    ? "var(--primary)"
                    : "var(--muted-foreground)",
                opacity: i / 30 < progress / 100 ? 1 : 0.3,
              }}
            />
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 hover:brightness-110 animate-pulse-glow cursor-pointer"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </button>
      </div>
    </div>
    <audio
          ref={audioRef}
          src="/06_Amr_Diab_Mosh_Gedid_مرو_دياب_مش_جديد.mp3"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => {
            setCurrentTime(e.target.currentTime)
            setDuration(e.target.duration || 180)
          }}
          style={{ display: 'none' }}
        />
  )
}
