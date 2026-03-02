"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const services = [
  {
    category: "Manicure",
    items: [
      { name: "Classic Manicure", price: "$45", duration: "45 min", description: "Nail shaping, cuticle care, hand massage, and polish application." },
      { name: "Gel Manicure", price: "$65", duration: "60 min", description: "Long-lasting gel polish with meticulous prep and a flawless finish." },
      { name: "Luxury Spa Manicure", price: "$85", duration: "75 min", description: "Exfoliating scrub, paraffin treatment, extended massage, and gel polish." },
    ],
  },
  {
    category: "Nail Art",
    items: [
      { name: "Minimalist Design", price: "$80", duration: "75 min", description: "Clean lines, negative space, and subtle accents for an understated look." },
      { name: "Signature Art Set", price: "$120", duration: "90 min", description: "Hand-painted bespoke designs tailored to your personal aesthetic." },
      { name: "Full Custom Collection", price: "$160+", duration: "120 min", description: "Intricate, one-of-a-kind nail art with premium materials and embellishments." },
    ],
  },
  {
    category: "Extensions",
    items: [
      { name: "Soft Gel Extensions", price: "$95", duration: "90 min", description: "Natural-looking extensions with soft gel for a lightweight, flexible feel." },
      { name: "Hard Gel Sculpt", price: "$110", duration: "105 min", description: "Sculpted hard gel for maximum durability and a sleek, polished silhouette." },
      { name: "Full Set with Art", price: "$150+", duration: "120 min", description: "Extensions paired with your choice of nail art for a complete transformation." },
    ],
  },
]

function ServiceCategory({ category, index }: { category: typeof services[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <h3 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
        {category.category}
      </h3>
      <div className="mt-8 flex flex-col gap-0">
        {category.items.map((item, itemIndex) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15 + (itemIndex + 1) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group border-t border-border py-6 transition-colors duration-300 hover:bg-secondary/50 px-3 -mx-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-medium uppercase tracking-[0.1em] text-foreground transition-all duration-300 group-hover:tracking-[0.15em]">
                  {item.name}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="font-serif text-lg text-foreground">
                  {item.price}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.duration}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function Services() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })

  return (
    <section id="services" className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance"
          >
            Crafted with precision
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
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            Each service is designed to deliver an elevated experience from start
            to finish. Only the finest products and techniques are used.
          </motion.p>
        </div>

        {/* Service categories */}
        <div className="grid gap-12 md:gap-16 lg:grid-cols-3 lg:gap-12">
          {services.map((category, index) => (
            <ServiceCategory key={category.category} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
