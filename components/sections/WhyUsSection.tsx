"use client";
import { motion } from "framer-motion";
import { Award, Microscope, Heart, Shield, Users, MapPin } from "lucide-react";
import CLINIC_CONFIG from "@/config/clinic.config";

const iconMap: Record<string, React.ElementType> = {
  Award, Microscope, Heart, Shield, Users, MapPin,
};

export default function WhyUsSection() {
  return (
    <section className="py-28 bg-graphite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
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
              Why D&apos;CosMedics
            </span>
            <div className="gold-divider-short" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            The Standard of{" "}
            <span className="gold-text italic">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_CONFIG.whyUs.map((item, i) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass-card glass-card-hover rounded-xl p-7 group"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(197,160,33,0.12), rgba(197,160,33,0.04))",
                    border: "1px solid rgba(197,160,33,0.2)",
                  }}
                >
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="font-serif text-lg font-bold text-off-white mb-3">
                  {item.title}
                </h3>
                <p className="text-off-white/55 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
