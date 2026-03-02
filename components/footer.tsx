"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <footer ref={ref} className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8 md:flex-row md:justify-between"
        >
          <Link href="/" className="font-serif text-xl tracking-wide text-foreground">
            Maison
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            {["Services", "Policies", "Contact"].map((label) => (
              <Link
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-muted-foreground">
            {"2026 Maison Nail Studio"}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
