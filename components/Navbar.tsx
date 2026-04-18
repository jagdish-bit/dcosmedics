"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import CLINIC_CONFIG from "@/config/clinic.config";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-md border-b border-accent/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex flex-col leading-none group"
          >
            <span className="font-serif text-2xl font-bold gold-text">
              D'CosMedics
            </span>
            <span className="text-[10px] tracking-[0.3em] text-muted uppercase font-sans font-medium">
              Clinical Excellence
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium text-off-white/70 hover:text-accent transition-colors duration-300 tracking-wide uppercase"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${CLINIC_CONFIG.contact.phone}`}
              className="flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors"
            >
              <Phone size={14} />
              <span className="font-medium">{CLINIC_CONFIG.contact.phone}</span>
            </a>
            <button
              onClick={() => handleNav("#booking")}
              className="btn-gold px-5 py-2.5 rounded-sm"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-accent hover:text-accent-light transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl flex flex-col pt-24 px-8"
          style={{ background: "rgba(253,248,243,0.98)" }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleNav(link.href)}
                  className="font-serif text-3xl text-left text-off-white/80 hover:text-accent transition-colors border-b border-accent/10 pb-4"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4 flex flex-col gap-4"
              >
                <a
                  href={`tel:${CLINIC_CONFIG.contact.phone}`}
                  className="flex items-center gap-3 text-accent"
                >
                  <Phone size={18} />
                  <span className="text-lg font-medium">{CLINIC_CONFIG.contact.phone}</span>
                </a>
                <button
                  onClick={() => handleNav("#booking")}
                  className="btn-gold py-4 rounded-sm text-base"
                >
                  Book a Consultation
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
