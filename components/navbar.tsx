"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Mail, Music, Sparkles } from "lucide-react"

const links = [
  { href: "/letter", label: "Letter", icon: Mail },
  { href: "/memories", label: "Memories", icon: Music },
  { href: "/ending", label: "Forever", icon: Sparkles },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-1.5 pointer-events-auto shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        {/* Home heart icon */}
        <Link
          href="/"
          className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
            pathname === "/"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
          aria-label="Home"
        >
          <Heart className="w-4 h-4" />
        </Link>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-0.5" />

        {/* Page links */}
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
