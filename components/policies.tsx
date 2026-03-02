"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const policies = [
  {
    title: "Booking & Appointments",
    content:
      "All appointments are booked online or via direct message. A booking confirmation will be sent to your email. Please arrive 5 minutes early to ensure a timely start. Walk-ins are not available at this time.",
  },
  {
    title: "Cancellation & Rescheduling",
    content:
      "We kindly request at least 24 hours notice for cancellations or rescheduling. Late cancellations (under 24 hours) will incur a 50% service fee. No-shows will be charged the full service amount.",
  },
  {
    title: "Deposits",
    content:
      "A non-refundable deposit of $20 is required at the time of booking to secure your appointment. This deposit will be applied toward your total service cost.",
  },
  {
    title: "Late Arrivals",
    content:
      "If you arrive more than 15 minutes late, your appointment may need to be shortened or rescheduled depending on availability. The full service fee may still apply.",
  },
  {
    title: "Health & Safety",
    content:
      "Your safety is our highest priority. All tools are sterilized between clients, and single-use items are disposed of after each appointment. Please inform us of any allergies or sensitivities prior to your visit.",
  },
  {
    title: "Aftercare & Repairs",
    content:
      "Complimentary repairs are offered within 48 hours of your appointment for any lifting or breakage under normal wear. After 48 hours, a repair fee will apply. Detailed aftercare instructions are provided after every service.",
  },
]

export function Policies() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" })
  const accordionRef = useRef(null)
  const accordionInView = useInView(accordionRef, { once: true, margin: "-60px" })

  return (
    <section id="policies" className="bg-secondary py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div ref={headerRef} className="mb-12 md:mb-16 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Studio Policies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance"
          >
            Good to know
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
            To ensure the best experience for every client, please review the
            following policies before your visit.
          </motion.p>
        </div>

        <div ref={accordionRef}>
          <Accordion type="single" collapsible className="w-full">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={accordionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="py-5 md:py-6 text-left font-serif text-base md:text-lg tracking-tight text-foreground hover:no-underline">
                    {policy.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 md:pb-6 text-sm leading-relaxed text-muted-foreground">
                    {policy.content}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
