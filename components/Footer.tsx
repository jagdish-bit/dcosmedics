import CLINIC_CONFIG from "@/config/clinic.config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-graphite border-t border-accent/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-serif text-2xl font-bold gold-text mb-2">
              D&apos;CosMedics
            </div>
            <p className="text-[10px] tracking-[0.3em] text-muted uppercase mb-4">
              Clinical Excellence
            </p>
            <p className="text-sm text-off-white/50 leading-relaxed max-w-xs">
              {CLINIC_CONFIG.subTagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-muted mb-5">Quick Links</p>
            <div className="space-y-3">
              {["About Dr. Gupta", "Services", "Patient Stories", "Book Consultation", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-sm text-off-white/50 hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-muted mb-5">Contact</p>
            <div className="space-y-3 text-sm text-off-white/50">
              <p>{CLINIC_CONFIG.contact.address}</p>
              <a href={`tel:${CLINIC_CONFIG.contact.phone}`} className="block hover:text-accent transition-colors">
                {CLINIC_CONFIG.contact.phone}
              </a>
              <a href={`mailto:${CLINIC_CONFIG.contact.email}`} className="block hover:text-accent transition-colors">
                {CLINIC_CONFIG.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="gold-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {year} {CLINIC_CONFIG.fullName}. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Treatments are medical procedures — individual results may vary. Consult Dr. Gupta for personalized advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
