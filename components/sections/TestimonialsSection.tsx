"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import CLINIC_CONFIG from "@/config/clinic.config";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={s <= rating ? "text-accent fill-accent" : "text-muted"}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout>();
  const testimonials = CLINIC_CONFIG.testimonials;

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => go(1), 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.3 } }),
  };

  return (
    <section id="testimonials" className="py-28 bg-primary relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-[0.04]"
        style={{ background: "radial-gradient(ellipse, #B07A68, transparent)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="gold-divider-short" />
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-medium">
              Patient Stories
            </span>
            <div className="gold-divider-short" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Lives We&apos;ve{" "}
            <span className="gold-text italic">Transformed</span>
          </h2>
          <p className="text-off-white/50 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Our greatest achievements walk out of our clinic with renewed confidence.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-10 md:p-14 overflow-hidden min-h-[300px] relative">
            {/* Large Quote icon */}
            <Quote
              size={80}
              className="absolute top-8 right-10 opacity-[0.04] text-accent"
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="mb-6">
                  <StarRating rating={testimonials[current].rating} />
                </div>

                <blockquote className="font-serif text-xl md:text-2xl text-off-white/85 leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[current].review}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-primary text-sm flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #B07A68, #C9907A)" }}
                  >
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-off-white">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs text-muted">
                      {testimonials[current].location} · Treatment:{" "}
                      <span className="text-accent/80">
                        {testimonials[current].treatment}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-8 h-2 bg-accent"
                      : "w-2 h-2 bg-muted hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-full border border-accent/25 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-10 h-10 rounded-full border border-accent/25 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mini grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`glass-card rounded-xl p-5 text-left transition-all duration-300 ${
                i === current ? "border-accent/40" : "hover:border-accent/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-primary text-[11px] font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #B07A68, #C9907A)" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-off-white leading-tight">{t.name}</p>
                  <p className="text-[10px] text-muted">{t.treatment}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} size={10} className="text-accent fill-accent" />
                ))}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Video Testimonials placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="font-serif text-2xl text-center mb-8 text-off-white/80">
            Video Testimonials
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Hair Transplant Journey", patient: "Rohit S.", duration: "3:24" },
              { title: "Acne Scar Before & After", patient: "Priya C.", duration: "2:17" },
              { title: "Anti-Aging Results", patient: "Ananya B.", duration: "4:05" },
            ].map((video) => (
              <div
                key={video.title}
                className="glass-card rounded-xl overflow-hidden group cursor-pointer"
              >
                {/* Video thumbnail placeholder */}
                <div
                  className="aspect-video relative flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}
                >
                  <div className="text-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, #B07A68, #C9907A)",
                      }}
                    >
                      <div
                        className="w-0 h-0 ml-1"
                        style={{
                          borderTop: "9px solid transparent",
                          borderBottom: "9px solid transparent",
                          borderLeft: "16px solid #FDF8F3",
                        }}
                      />
                    </div>
                    <p className="text-muted text-xs">Replace with YouTube embed</p>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-primary/80 text-accent text-xs px-2 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-off-white/85 text-sm mb-1">{video.title}</p>
                  <p className="text-xs text-muted">{video.patient}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
