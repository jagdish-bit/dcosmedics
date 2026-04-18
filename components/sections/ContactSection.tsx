"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import CLINIC_CONFIG from "@/config/clinic.config";

export default function ContactSection() {
  return (
    <section id="contact" className="py-28 bg-primary relative overflow-hidden">
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
              Find Us
            </span>
            <div className="gold-divider-short" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Visit{" "}
            <span className="gold-text italic">D&apos;CosMedics</span>
          </h2>
          <p className="text-muted text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Two convenient locations across Kolkata — find the branch nearest to you.
          </p>
        </motion.div>

        {/* Contact Info Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          <div className="glass-card glass-card-hover rounded-xl p-5 flex gap-4">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(176,122,104,0.12), rgba(176,122,104,0.04))", border: "1px solid rgba(176,122,104,0.2)" }}>
              <Phone size={17} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted tracking-wider uppercase mb-1">Phone</p>
              <a href={`tel:${CLINIC_CONFIG.contact.phone}`}
                className="text-sm text-off-white/80 hover:text-accent transition-colors font-medium">
                {CLINIC_CONFIG.contact.phone}
              </a>
            </div>
          </div>

          <div className="glass-card glass-card-hover rounded-xl p-5 flex gap-4">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(176,122,104,0.12), rgba(176,122,104,0.04))", border: "1px solid rgba(176,122,104,0.2)" }}>
              <MessageCircle size={17} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted tracking-wider uppercase mb-1">WhatsApp</p>
              <a href={`https://wa.me/${CLINIC_CONFIG.contact.whatsapp}`} target="_blank" rel="noreferrer"
                className="text-sm text-off-white/80 hover:text-accent transition-colors font-medium">
                Chat with us
              </a>
            </div>
          </div>

          <div className="glass-card glass-card-hover rounded-xl p-5 flex gap-4">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(176,122,104,0.12), rgba(176,122,104,0.04))", border: "1px solid rgba(176,122,104,0.2)" }}>
              <Mail size={17} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted tracking-wider uppercase mb-1">Email</p>
              <a href={`mailto:${CLINIC_CONFIG.contact.email}`}
                className="text-sm text-off-white/80 hover:text-accent transition-colors font-medium">
                {CLINIC_CONFIG.contact.email}
              </a>
            </div>
          </div>

          <div className="glass-card glass-card-hover rounded-xl p-5 flex gap-4">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(176,122,104,0.12), rgba(176,122,104,0.04))", border: "1px solid rgba(176,122,104,0.2)" }}>
              <Clock size={17} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted tracking-wider uppercase mb-1">Hours</p>
              <p className="text-sm text-off-white/80 leading-relaxed">
                {CLINIC_CONFIG.contact.hours.weekdays}<br />
                {CLINIC_CONFIG.contact.hours.sunday}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Two Branch Maps */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Branch 1 — Kalighat */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, rgba(176,122,104,0.1), rgba(196,164,107,0.06))", borderBottom: "1px solid rgba(176,122,104,0.15)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #B07A68, #C4A46B)", color: "#FDF8F3" }}>
                1
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#2C1A12" }}>Main Clinic — Kalighat</p>
                <p className="text-xs text-muted">Flagship Location · Next to Metro Gate 4</p>
              </div>
            </div>

            <div style={{ height: "260px" }}>
              <iframe
                src="https://www.google.com/maps?q=82A+Rash+Behari+Avenue+Kolkata+700029&output=embed"
                className="w-full h-full"
                style={{ border: 0, filter: "saturate(90%) contrast(95%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="px-6 py-5 flex items-start gap-3">
              <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm leading-relaxed" style={{ color: "#2C1A12", opacity: 0.8 }}>
                  82A Rash Behari Avenue, Next to Kalighat Metro Gate No. 4, Kolkata – 700029
                </p>
                <a
                  href="https://maps.google.com/?q=82A+Rash+Behari+Avenue+Kolkata+700029"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-accent hover:text-accent-light mt-2 inline-flex items-center gap-1 transition-colors font-medium"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Branch 2 — Salt Lake */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, rgba(196,164,107,0.1), rgba(176,122,104,0.06))", borderBottom: "1px solid rgba(196,164,107,0.15)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #C4A46B, #B07A68)", color: "#FDF8F3" }}>
                2
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#2C1A12" }}>Salt Lake Branch — Bidhannagar</p>
                <p className="text-xs text-muted">Near City Centre 1 · Sector 1</p>
              </div>
            </div>

            <div style={{ height: "260px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0!2d88.3990007!3d22.5898565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027759fab9a799%3A0xacc6cca6f92acc7b!2sDCOSMEDICS%20Skin%2CHair%20and%20Wellness%20Clinic.Saltlake%20Branch.!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full"
                style={{ border: 0, filter: "saturate(90%) contrast(95%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="px-6 py-5 flex items-start gap-3">
              <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm leading-relaxed" style={{ color: "#2C1A12", opacity: 0.8 }}>
                  No 2, BB 97, Salt Lake Rd, near Tank, near City Centre 1, BB Block, Sector 1, Bidhannagar, Kolkata – 700064
                </p>
                <a
                  href="https://maps.app.goo.gl/N1woETzc6gFcToYa8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-accent hover:text-accent-light mt-2 inline-flex items-center gap-1 transition-colors font-medium"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Book CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={() =>
              document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-gold px-10 py-4 rounded-sm text-sm"
          >
            Book at Either Location
          </button>
        </motion.div>

      </div>
    </section>
  );
}
