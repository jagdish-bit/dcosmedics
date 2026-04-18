"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, Zap, Star, ChevronDown, ArrowRight } from "lucide-react";
import CLINIC_CONFIG from "@/config/clinic.config";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Wind,
  Zap,
  Star,
};

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section id="services" className="py-28 bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.025]"
        style={{ background: "radial-gradient(circle, #B07A68, transparent)", filter: "blur(100px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="gold-divider-short" />
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-medium">
              Our Expertise
            </span>
            <div className="gold-divider-short" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Treatments &{" "}
            <span className="gold-text italic">Services</span>
          </h2>
          <p className="text-off-white/50 max-w-xl mx-auto text-[15px] leading-relaxed">
            From advanced dermatology to transformative hair restoration —
            every treatment is tailored to your unique biology and aesthetic goals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {CLINIC_CONFIG.services.map((service, i) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const isOpen = activeService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className={`glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer group`}
                onClick={() => setActiveService(isOpen ? null : service.id)}
              >
                {/* Card Header */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, rgba(197,160,33,0.15), rgba(197,160,33,0.05))",
                        border: "1px solid rgba(197,160,33,0.25)",
                      }}
                    >
                      <Icon size={22} className="text-accent" />
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className="text-muted group-hover:text-accent transition-colors" />
                    </motion.div>
                  </div>

                  <div className="mb-1">
                    <span className="text-xs tracking-[0.2em] text-accent/70 uppercase font-medium">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-off-white mb-3">
                    {service.headline}
                  </h3>
                  <p className="text-off-white/50 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Expandable Treatment List */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 border-t border-accent/10">
                        <p className="text-xs text-muted tracking-[0.2em] uppercase mt-6 mb-4 font-medium">
                          Treatments & Pricing
                        </p>
                        <div className="space-y-3">
                          {service.treatments.map((t) => (
                            <div
                              key={t.name}
                              className="flex items-center justify-between py-2.5 border-b border-accent/08 last:border-0"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-accent" />
                                <span className="text-sm text-off-white/75">{t.name}</span>
                              </div>
                              <span className="text-xs font-medium text-accent/80 whitespace-nowrap ml-4">
                                {t.price}
                              </span>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="mt-6 flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors group/btn"
                        >
                          <span className="font-medium">Book this treatment</span>
                          <ArrowRight
                            size={14}
                            className="group-hover/btn:translate-x-1 transition-transform"
                          />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom gold bar (shown when collapsed) */}
                {!isOpen && (
                  <div className="px-8 pb-6">
                    <div className="flex items-center gap-2 text-xs text-muted group-hover:text-accent transition-colors">
                      <span>{service.treatments.length} treatments available</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Consultation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="glass-card inline-flex flex-col sm:flex-row items-center gap-6 px-10 py-6 rounded-2xl">
            <div className="text-left">
              
              <p className="font-serif text-xl text-off-white">
                Not sure which treatment is right for you?
                
              </p>
            </div>
            <button
              onClick={() =>
                document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-gold px-8 py-3.5 rounded-sm text-sm whitespace-nowrap flex-shrink-0"
            >
              Get Expert Advice
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
