"use client";
import { motion } from "framer-motion";
import { ArrowDown, Star, Award, Users } from "lucide-react";
import CLINIC_CONFIG from "@/config/clinic.config";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection() {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — Light Ivory with Dermatology Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Warm ivory base with radial blushes */}
        <div className="absolute inset-0">
  <img
    src="/images/model.webp"
    alt="D'CosMedics Clinic"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center"
    }}
  />
  <div style={{
    position: "absolute",
    inset: 0,
    background: "rgba(253,248,243,0.75)"
  }} />
</div>
        {/* Hexagon skin-cell pattern overlay */}
        <div className="hero-pattern-overlay" />
        {/* Warm copper orb — top right */}
        <div
          className="absolute top-[-60px] right-[-60px] w-[520px] h-[520px] rounded-full opacity-[0.12] pointer-events-none"
          style={{ background: "radial-gradient(circle, #C4A46B 0%, #EDD5C5 50%, transparent 75%)", filter: "blur(60px)" }}
        />
        {/* Soft rose orb — bottom left */}
        <div
          className="absolute bottom-[-80px] left-[-40px] w-[400px] h-[400px] rounded-full opacity-[0.10] pointer-events-none"
          style={{ background: "radial-gradient(circle, #B07A68 0%, #EDD5C5 55%, transparent 75%)", filter: "blur(70px)" }}
        />
        {/* Subtle centre glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #C4A46B 0%, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="inline-flex items-center gap-2 px-4 py-2 border border-accent/30 rounded-full mb-8"
          >
            <Star size={12} className="text-accent fill-accent" />
            <span className="text-xs tracking-[0.25em] text-accent font-medium uppercase">
              Kolkata&apos;s Premier Aesthetic Clinic
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.25}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
          >
            Redefining
            <br />
            <span className="gold-text-animate italic">Beauty</span>
            <br />
            through Clinical
            <br />
            Excellence.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="text-off-white/60 text-lg leading-relaxed mb-10 max-w-md"
          >
            {CLINIC_CONFIG.subTagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={scrollToBooking}
              className="btn-gold px-8 py-4 rounded-sm text-sm"
            >
              {CLINIC_CONFIG.ctaButton}
            </button>
            <button
              onClick={() =>
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-outline-gold px-8 py-4 rounded-sm text-sm"
            >
              Explore Treatments
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.75}
            className="mt-14 flex gap-8 pt-8 border-t border-accent/10"
          >
            {CLINIC_CONFIG.doctor.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-2xl font-bold gold-text">
                  {stat.value}
                </div>
                <div className="text-xs text-muted mt-1 leading-tight max-w-[80px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Doctor Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
        >
          <div className="relative">
            {/* Doctor profile card */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              {/* Gold corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-10"
                style={{
                  background:
                    "radial-gradient(circle at top right, #B07A68, transparent)",
                }}
              />

              {/* Avatar placeholder — replace with Dr. Dolly's photo */}
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full border-2 border-accent/40 overflow-hidden bg-graphite flex items-center justify-center mx-auto">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #2a2a2a, #1a1a1a)",
                    }}
                  >
                    <img
  src="/images/ph2.jpg"
  alt="Dr. Dolly Gupta"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top",
    borderRadius: "50%"
  }}
/>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-primary text-[10px] font-bold tracking-wider px-3 py-1 rounded-full whitespace-nowrap uppercase">
                  ✦ Verified MD
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl font-bold text-off-white mb-1">
                  {CLINIC_CONFIG.doctor.name}
                </h3>
                <p className="text-accent text-sm font-medium tracking-wide">
                  {CLINIC_CONFIG.doctor.title}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {CLINIC_CONFIG.doctor.credentials.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] tracking-wide text-muted border border-accent/15 px-2 py-0.5 rounded-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Philosophy quote */}
              <div className="border-t border-accent/15 pt-6">
                <p className="text-off-white/50 text-xs text-center leading-relaxed italic">
                  &ldquo;{CLINIC_CONFIG.doctor.philosophy}&rdquo;
                </p>
              </div>

              {/* Awards row */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="glass-card rounded-lg p-3 text-center">
                  <Award size={18} className="text-accent mx-auto mb-1" />
                  <p className="text-[10px] text-muted">19+ Years</p>
                </div>
                <div className="glass-card rounded-lg p-3 text-center">
                  <Users size={18} className="text-accent mx-auto mb-1" />
                  <p className="text-[10px] text-muted">15,000+ Patients</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full border border-accent/10"
              style={{ borderStyle: "dashed" }}
            />
            <div
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-accent/08"
              style={{ borderStyle: "dashed" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-accent" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
}
