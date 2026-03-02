"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Clock, Mail, Phone, Instagram, ArrowUpRight } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    label: "Studio",
    value: "245 Rose Avenue, Suite 3B\nLos Angeles, CA 90026",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Tue - Sat: 10am - 7pm\nSun - Mon: Closed",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@maisonnails.com",
    href: "mailto:hello@maisonnails.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(323) 555-0178",
    href: "tel:+13235550178",
  },
]

export function Contact() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })
  const detailsRef = useRef(null)
  const detailsInView = useInView(detailsRef, { once: true, margin: "-60px" })
  const quoteRef = useRef(null)
  const quoteInView = useInView(quoteRef, { once: true, margin: "-60px" })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" })

  return (
    <section id="contact" className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Get in Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance"
          >
            {"Let's create something beautiful"}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px w-12 origin-center bg-accent"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            Ready to book your appointment or have a question? Reach out through
            any of the channels below.
          </motion.p>
        </div>

        {/* Contact grid */}
        <div ref={detailsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col gap-4 border border-border p-6 md:p-8 transition-all duration-500 hover:bg-secondary/80 hover:border-accent/30"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <item.icon className="h-5 w-5 text-accent" />
              </motion.div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm text-foreground underline-offset-4 hover:underline whitespace-pre-line leading-relaxed"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                  {item.value}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          ref={quoteRef}
          initial={{ opacity: 0, y: 30 }}
          animate={quoteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={quoteInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-16 origin-center bg-border"
          />
          <blockquote className="mt-10">
            <p className="max-w-xl font-serif text-xl leading-relaxed text-foreground italic md:text-2xl">
              {'"Every set tells a story. My goal is to create something that feels uniquely yours."'}
            </p>
            <footer className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              — The Artist
            </footer>
          </blockquote>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="mailto:hello@maisonnails.com"
            className="group inline-flex items-center justify-center gap-2 bg-foreground px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-lg w-full sm:w-auto"
          >
            Send a Message
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 border border-foreground px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-primary-foreground w-full sm:w-auto"
          >
            <Instagram className="h-3.5 w-3.5" />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}
