"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Leaf } from "lucide-react";
import CLINIC_CONFIG from "@/config/clinic.config";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-graphite relative overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #B07A68, transparent)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative">

            {/* ══════════════════════════════════════════════════
                DOCTOR IMAGE CARD
                ──────────────────────────────────────────────────
                RIGHT NOW: Shows a test placeholder photo
                
                TO USE REAL PHOTO:
                Step 1 → Put doctor.jpg inside public/images/
                Step 2 → Change src below to: /images/doctor.jpg
                Step 3 → Save with Ctrl+S
                ══════════════════════════════════════════════════ */}
            <div
              className="aspect-[4/5] rounded-2xl overflow-hidden relative"
              style={{
                border: "1px solid rgba(176,122,104,0.22)",
                boxShadow: "0 24px 64px rgba(176,122,104,0.13)",
              }}
            >
              <img
                src="\images\p1.jpg"
                alt="Dr. Dolly Gupta"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />

              {/* Soft gradient at bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "28%",
                  background: "linear-gradient(to top, rgba(253,248,243,0.4), transparent)",
                  pointerEvents: "none",
                }}
              />

              {/* Corner accent lines */}
              <div className="absolute top-0 right-0 w-1 h-24 bg-gradient-to-b from-accent to-transparent" />
              <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-l from-accent to-transparent" />
              <div className="absolute bottom-0 left-0 w-1 h-24 bg-gradient-to-t from-accent to-transparent" />
              <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-accent to-transparent" />
            </div>

            {/* Floating stats card */}
            <div
              className="absolute -right-8 top-16 glass-card rounded-xl p-5 shadow-2xl"
              style={{ minWidth: "160px" }}
            >
              <div className="font-serif text-3xl font-bold gold-text mb-1">
                {CLINIC_CONFIG.doctor.experience}
              </div>
              <div className="text-xs text-muted leading-tight">
                {CLINIC_CONFIG.doctor.experienceLabel}
              </div>
            </div>

            {/* Philosophy card */}
            <div className="absolute -left-8 -bottom-8 glass-card rounded-xl p-5 max-w-[220px] shadow-2xl">
              <Leaf size={16} className="text-accent mb-2" />
              <p className="text-[11px] text-off-white/70 italic leading-relaxed">
                &ldquo;{CLINIC_CONFIG.doctor.philosophy}&rdquo;
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="gold-divider-short" />
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-medium">
              Meet Your Doctor
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {CLINIC_CONFIG.doctor.name}
          </h2>
          <p className="text-accent font-medium tracking-wide mb-6">
            {CLINIC_CONFIG.doctor.title}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {CLINIC_CONFIG.doctor.credentials.map((c) => (
              <span
                key={c}
                className="text-xs px-3 py-1.5 rounded-sm border border-accent/25 text-accent/80 font-medium"
              >
                {c}
              </span>
            ))}
          </div>

          {CLINIC_CONFIG.doctor.bio.split("\n\n").map((para, i) => (
            <p key={i} className="text-off-white/65 leading-relaxed mb-4 text-[15px]">
              {para}
            </p>
          ))}

          <div className="mt-8 space-y-3">
            {[
              "Pioneer in meditative dermatology — the first in Kolkata",
              "International speaker on integrative aesthetic medicine",
              "USA-certified Trichologist for hair & scalp disorders",
              "Performed 3,000+ successful hair transplant surgeries",
              "Featured in Times of India, Vogue India, and Femina",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-off-white/70">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              onClick={() =>
                document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-gold px-8 py-4 rounded-sm text-sm"
            >
              Book a Consultation with Dr. Gupta
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
