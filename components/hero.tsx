"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 md:px-8">
      {/* Animated decorative lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 top-0 h-full w-px origin-top bg-border/60 hidden md:block"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-8 top-0 h-full w-px origin-top bg-border/60 hidden md:block"
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          Luxury Nail Artistry
        </motion.p>

        {/* Main headline - each word staggered */}
        <motion.h1
          className="mt-6 font-serif text-5xl leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl text-balance"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.3 }}
        >
          {"Exquisite craft meets refined elegance".split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-16 origin-center bg-accent"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          A bespoke nail studio dedicated to precision, beauty, and an
          unparalleled experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center bg-foreground px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-lg"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-px">
              Book an Appointment
            </span>
          </Link>
          <Link
            href="#services"
            className="group inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-primary-foreground"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-px">
              View Services
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
