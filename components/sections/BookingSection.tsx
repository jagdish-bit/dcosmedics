"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, CheckCircle, ArrowRight, ArrowLeft, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import CLINIC_CONFIG from "@/config/clinic.config";

const STEPS = ["Personal Info", "Select Service", "Choose Branch", "Choose Date", "Confirm"];

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  branch: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

const BRANCHES = [
  {
    id: "kalighat",
    name: "Main Clinic — Kalighat",
    area: "South Kolkata",
    address: "82A Rash Behari Avenue, Next to Kalighat Metro Gate No. 4, Kolkata – 700029",
    landmark: "Next to Kalighat Metro Gate 4",
    metro: "Kalighat Metro",
    mapsLink: "https://maps.google.com/?q=82A+Rash+Behari+Avenue+Kolkata+700029",
    badge: "Flagship",
    badgeColor: "linear-gradient(135deg, #B07A68, #C4A46B)",
  },
  {
    id: "saltlake",
    name: "Salt Lake Branch — Bidhannagar",
    area: "North-East Kolkata",
    address: "No 2, BB 97, Salt Lake Rd, near City Centre 1, BB Block, Sector 1, Bidhannagar, Kolkata – 700064",
    landmark: "Near City Centre 1, BB Block",
    metro: "City Centre Area",
    mapsLink: "https://maps.app.goo.gl/N1woETzc6gFcToYa8",
    badge: "Branch",
    badgeColor: "linear-gradient(135deg, #C4A46B, #B07A68)",
  },
];

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM",  "3:00 PM",  "4:00 PM",
  "5:00 PM",  "6:00 PM",  "7:00 PM",
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/* ── Beautiful custom calendar component ── */
function CalendarPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (date: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDay = (day: number) => {
    const d = new Date(year, month, day);
    if (d < today) return; // block past dates
    const iso = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    onChange(iso);
  };

  const selectedDay = value
    ? (() => {
        const [y, m, d] = value.split("-").map(Number);
        return y === year && m - 1 === month ? d : null;
      })()
    : null;

  // Build calendar grid
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1.5px solid rgba(176,122,104,0.25)",
        background: "rgba(255,253,250,0.95)",
        boxShadow: "0 8px 32px rgba(176,122,104,0.1)",
      }}
    >
      {/* Month navigation header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(176,122,104,0.12)" }}
      >
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(176,122,104,0.08)",
            border: "1px solid rgba(176,122,104,0.2)",
            color: "#B07A68",
          }}
        >
          <ChevronLeft size={15} />
        </button>

        <div className="text-center">
          <p
            className="font-serif font-bold text-base"
            style={{ color: "#2C1A12" }}
          >
            {MONTHS[month]}
          </p>
          <p className="text-xs font-medium" style={{ color: "#9A7060" }}>
            {year}
          </p>
        </div>

        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(176,122,104,0.08)",
            border: "1px solid rgba(176,122,104,0.2)",
            color: "#B07A68",
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 px-3 pt-3 pb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold tracking-wider pb-2"
            style={{ color: "#9A7060" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 px-3 pb-4 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const cellDate = new Date(year, month, day);
          cellDate.setHours(0, 0, 0, 0);
          const isPast     = cellDate < today;
          const isToday    = cellDate.getTime() === today.getTime();
          const isSelected = day === selectedDay;
          const isSunday   = cellDate.getDay() === 0;

          return (
            <button
              key={day}
              onClick={() => !isPast && selectDay(day)}
              disabled={isPast}
              style={{
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.78rem",
                fontWeight: isSelected ? "700" : "500",
                fontFamily: "'Montserrat', sans-serif",
                cursor: isPast ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                background: isSelected
                  ? "linear-gradient(135deg, #B07A68, #C4A46B)"
                  : isToday
                  ? "rgba(176,122,104,0.12)"
                  : "transparent",
                color: isSelected
                  ? "#FDF8F3"
                  : isPast
                  ? "#D4B8AA"
                  : isToday
                  ? "#B07A68"
                  : isSunday
                  ? "#C4A46B"
                  : "#2C1A12",
                border: isToday && !isSelected
                  ? "1.5px solid rgba(176,122,104,0.4)"
                  : "1.5px solid transparent",
                boxShadow: isSelected
                  ? "0 4px 14px rgba(176,122,104,0.35)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isPast && !isSelected) {
                  (e.target as HTMLButtonElement).style.background = "rgba(176,122,104,0.1)";
                  (e.target as HTMLButtonElement).style.borderColor = "rgba(176,122,104,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isPast && !isSelected) {
                  (e.target as HTMLButtonElement).style.background = "transparent";
                  (e.target as HTMLButtonElement).style.borderColor = "transparent";
                }
              }}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected date display */}
      {value && (
        <div
          className="mx-4 mb-4 px-4 py-2.5 rounded-lg flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, rgba(176,122,104,0.08), rgba(196,164,107,0.06))",
            border: "1px solid rgba(176,122,104,0.18)",
          }}
        >
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #B07A68, #C4A46B)" }}
          />
          <p className="text-xs font-semibold" style={{ color: "#B07A68" }}>
            Selected:{" "}
            {new Date(value + "T00:00:00").toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export default function BookingSection() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    branch: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // Fetch booked slots whenever branch or date changes
  const fetchBookedSlots = async (branch: string, date: string) => {
    if (!branch || !date) return;
    setSlotsLoading(true);
    try {
      const res = await fetch(`/api/slots?branch=${branch}&date=${date}`);
      const data = await res.json();
      setBookedSlots(data.bookedSlots || []);
    } catch {
      setBookedSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  };

  const updateWithSlotCheck = (field: keyof FormData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    if (field === "branch" || field === "preferredDate") {
      const branch = field === "branch" ? value : formData.branch;
      const date = field === "preferredDate" ? value : formData.preferredDate;
      if (branch && date) fetchBookedSlots(branch, date);
    }
  };

  const allServices = CLINIC_CONFIG.services.flatMap((s) =>
    s.treatments.map((t) => ({ label: t.name, category: s.category }))
  );

  const canNext = () => {
    if (step === 0) return formData.name.trim() && formData.phone.trim();
    if (step === 1) return !!formData.service;
    if (step === 2) return !!formData.branch;
    if (step === 3) return !!formData.preferredDate && !!formData.preferredTime;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Booking failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-28 bg-graphite relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #B07A68, transparent)", filter: "blur(100px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="gold-divider-short" />
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-medium">
              Appointments
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Begin Your{" "}
            <span className="gold-text italic">Transformation</span>
          </h2>
          <p className="text-off-white/60 leading-relaxed mb-10 text-[15px]">
            Book a premium consultation with Dr. Dolly Gupta. Each session is
            personalized — your skin, your goals, your pace.
          </p>

          {/* Consultation fee card */}
          <div className="glass-card rounded-2xl p-7 mb-8">
            <p className="text-xs text-muted tracking-wider uppercase mb-2">
              Consultation Fee
            </p>
            <div className="font-serif text-4xl font-bold gold-text mb-2">
              {CLINIC_CONFIG.consultationFee}
            </div>
            <p className="text-off-white/50 text-sm leading-relaxed">
              {CLINIC_CONFIG.consultationNote}
            </p>
          </div>


        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {success ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card rounded-2xl p-12 text-center"
            >
              <CheckCircle size={60} className="text-accent mx-auto mb-6" />
              <h3 className="font-serif text-2xl font-bold mb-3 text-off-white">
                Booking Confirmed!
              </h3>
              <p className="text-off-white/60 text-sm leading-relaxed mb-6">
                Thank you, {formData.name}. We&apos;ll confirm your appointment via WhatsApp/call
                within 2 hours.
              </p>
              <button
                onClick={() => { setSuccess(false); setStep(0); setFormData({ name:"",phone:"",email:"",service:"",branch:"",preferredDate:"",preferredTime:"",message:"" }); }}
                className="btn-gold px-8 py-3 rounded-sm text-sm"
              >
                Book Another
              </button>
            </motion.div>
          ) : (
            <div className="glass-card rounded-2xl p-8">
              {/* Progress Steps */}
              <div className="flex items-center gap-2 mb-8">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                        i < step
                          ? "bg-accent text-primary"
                          : i === step
                          ? "border-2 border-accent text-accent"
                          : "border border-muted/30 text-muted"
                      }`}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-[10px] tracking-wide hidden sm:block whitespace-nowrap ${
                        i === step ? "text-accent" : "text-muted"
                      }`}
                    >
                      {s}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-px transition-all duration-500 ${
                          i < step ? "bg-accent" : "bg-muted/20"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 0: Personal Info */}
                  {step === 0 && (
                    <div className="space-y-4">
                      <h3 className="font-serif text-xl font-bold text-off-white mb-6">
                        Personal Information
                      </h3>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type="text"
                          placeholder="Your Full Name *"
                          value={formData.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="form-input w-full pl-11 pr-4 py-3.5 rounded-lg text-sm"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type="tel"
                          placeholder="WhatsApp / Phone Number *"
                          value={formData.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className="form-input w-full pl-11 pr-4 py-3.5 rounded-lg text-sm"
                          required
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Email Address (optional)"
                          value={formData.email}
                          onChange={(e) => update("email", e.target.value)}
                          className="form-input w-full px-4 py-3.5 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 1: Service */}
                  {step === 1 && (
                    <div>
                      <h3 className="font-serif text-xl font-bold text-off-white mb-6">
                        Select Your Treatment
                      </h3>
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-2 custom-scroll">
                        {CLINIC_CONFIG.services.map((svc) => (
                          <div key={svc.id}>
                            <p className="text-[10px] tracking-[0.2em] text-muted/60 uppercase font-medium mb-2 mt-4 first:mt-0">
                              {svc.category}
                            </p>
                            {svc.treatments.map((t) => (
                              <button
                                key={t.name}
                                onClick={() => update("service", t.name)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm mb-1.5 transition-all duration-200 flex justify-between items-center ${
                                  formData.service === t.name
                                    ? "bg-accent/15 border border-accent/40 text-off-white"
                                    : "border border-accent/08 text-off-white/60 hover:border-accent/25 hover:text-off-white/80"
                                }`}
                              >
                                <span>{t.name}</span>
                                <span className="text-xs text-accent/70">{t.price}</span>
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Branch Selection */}
                  {step === 2 && (
                    <div>
                      <h3 className="font-serif text-xl font-bold text-off-white mb-2">
                        Choose Your Branch
                      </h3>
                      <p className="text-xs text-muted mb-6">
                        Select the clinic location most convenient for you
                      </p>

                      <div className="space-y-4">
                        {BRANCHES.map((branch) => {
                          const isSelected = formData.branch === branch.id;
                          return (
                            <button
                              key={branch.id}
                              onClick={() => updateWithSlotCheck("branch", branch.id)}
                              className="w-full text-left transition-all duration-300"
                              style={{
                                borderRadius: "14px",
                                border: isSelected
                                  ? "2px solid #B07A68"
                                  : "1.5px solid rgba(176,122,104,0.18)",
                                background: isSelected
                                  ? "linear-gradient(135deg, rgba(176,122,104,0.1), rgba(196,164,107,0.06))"
                                  : "rgba(255,253,250,0.6)",
                                boxShadow: isSelected
                                  ? "0 8px 28px rgba(176,122,104,0.15)"
                                  : "0 2px 8px rgba(176,122,104,0.05)",
                                padding: "0",
                                overflow: "hidden",
                              }}
                            >
                              {/* Card top bar */}
                              <div
                                className="flex items-center justify-between px-5 py-3"
                                style={{
                                  borderBottom: isSelected
                                    ? "1px solid rgba(176,122,104,0.2)"
                                    : "1px solid rgba(176,122,104,0.1)",
                                  background: isSelected
                                    ? "linear-gradient(135deg, rgba(176,122,104,0.12), rgba(196,164,107,0.08))"
                                    : "rgba(176,122,104,0.04)",
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  {/* Selection circle */}
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50%",
                                      border: isSelected
                                        ? "none"
                                        : "2px solid rgba(176,122,104,0.35)",
                                      background: isSelected
                                        ? "linear-gradient(135deg, #B07A68, #C4A46B)"
                                        : "transparent",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexShrink: 0,
                                      transition: "all 0.2s ease",
                                    }}
                                  >
                                    {isSelected && (
                                      <span style={{ color: "#FDF8F3", fontSize: "11px", fontWeight: "bold" }}>✓</span>
                                    )}
                                  </div>
                                  <div>
                                    <p
                                      className="font-semibold text-sm"
                                      style={{ color: isSelected ? "#B07A68" : "#2C1A12" }}
                                    >
                                      {branch.name}
                                    </p>
                                    <p className="text-xs" style={{ color: "#9A7060" }}>
                                      {branch.area}
                                    </p>
                                  </div>
                                </div>

                                {/* Badge */}
                                <span
                                  className="text-[10px] font-bold tracking-wider px-3 py-1 rounded-full"
                                  style={{
                                    background: branch.badgeColor,
                                    color: "#FDF8F3",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {branch.badge}
                                </span>
                              </div>

                              {/* Card body */}
                              <div className="px-5 py-4 space-y-2">
                                {/* Address */}
                                <div className="flex items-start gap-2.5">
                                  <span style={{ fontSize: "13px", marginTop: "1px", flexShrink: 0 }}>📍</span>
                                  <p
                                    className="text-xs leading-relaxed"
                                    style={{ color: "#2C1A12", opacity: 0.72 }}
                                  >
                                    {branch.address}
                                  </p>
                                </div>

                                {/* Landmark & Metro */}
                                <div className="flex items-center gap-4 pt-1">
                                  <div className="flex items-center gap-1.5">
                                    <span style={{ fontSize: "11px" }}>🏙️</span>
                                    <span className="text-[11px]" style={{ color: "#9A7060" }}>
                                      {branch.landmark}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span style={{ fontSize: "11px" }}>🚇</span>
                                    <span className="text-[11px]" style={{ color: "#9A7060" }}>
                                      {branch.metro}
                                    </span>
                                  </div>
                                </div>

                                {/* Directions link */}
                                <a
                                  href={branch.mapsLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold transition-colors"
                                  style={{ color: "#B07A68", marginTop: "4px" }}
                                >
                                  View on Google Maps →
                                </a>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Date & Time */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <h3 className="font-serif text-xl font-bold text-off-white mb-2">
                        Preferred Date & Time
                      </h3>

                      {/* Calendar */}
                      <CalendarPicker
                        value={formData.preferredDate}
                        onChange={(date) => updateWithSlotCheck("preferredDate", date)}
                      />

                      {/* Time Slots */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs text-muted tracking-wider uppercase">
                            Available Time Slots
                          </p>
                          {slotsLoading && (
                            <p className="text-xs text-accent animate-pulse">
                              Checking availability...
                            </p>
                          )}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-accent opacity-80" />
                            <span className="text-[10px] text-muted">Available</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-muted opacity-30" />
                            <span className="text-[10px] text-muted">Already Booked</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const isBooked = bookedSlots.includes(slot);
                            const isSelected = formData.preferredTime === slot;
                            return (
                              <button
                                key={slot}
                                onClick={() => !isBooked && update("preferredTime", slot)}
                                disabled={isBooked}
                                title={isBooked ? "Already booked" : "Click to select"}
                                className="py-2.5 text-xs rounded-lg border transition-all duration-200 relative"
                                style={{
                                  cursor: isBooked ? "not-allowed" : "pointer",
                                  background: isSelected
                                    ? "rgba(176,122,104,0.15)"
                                    : isBooked
                                    ? "rgba(0,0,0,0.03)"
                                    : "transparent",
                                  borderColor: isSelected
                                    ? "#B07A68"
                                    : isBooked
                                    ? "rgba(176,122,104,0.1)"
                                    : "rgba(176,122,104,0.2)",
                                  color: isSelected
                                    ? "#B07A68"
                                    : isBooked
                                    ? "#C8B0A8"
                                    : "#2C1A12",
                                  fontWeight: isSelected ? "600" : "400",
                                  opacity: isBooked ? 0.5 : 1,
                                  textDecoration: isBooked ? "line-through" : "none",
                                }}
                              >
                                {slot}
                                {isBooked && (
                                  <span
                                    className="absolute -top-1.5 -right-1.5 text-[8px] font-bold px-1 py-0.5 rounded-full"
                                    style={{
                                      background: "rgba(176,122,104,0.15)",
                                      color: "#B07A68",
                                    }}
                                  >
                                    Full
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* No date selected warning */}
                        {!formData.preferredDate && (
                          <p className="text-xs text-muted mt-3 text-center italic">
                            Please select a date first to see available slots
                          </p>
                        )}
                      </div>

                      <textarea
                        placeholder="Any specific concerns or questions? (optional)"
                        value={formData.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={3}
                        className="form-input w-full px-4 py-3 rounded-lg text-sm resize-none"
                      />
                    </div>
                  )}

                  {/* Step 4: Confirm */}
                  {step === 4 && (
                    <div>
                      <h3 className="font-serif text-xl font-bold text-off-white mb-6">
                        Review & Confirm
                      </h3>
                      <div className="space-y-3 mb-8">
                        {[
                          { label: "Name",      value: formData.name },
                          { label: "Phone",     value: formData.phone },
                          { label: "Email",     value: formData.email || "Not provided" },
                          { label: "Treatment", value: formData.service },
                          { label: "Branch",    value: BRANCHES.find(b => b.id === formData.branch)?.name || formData.branch },
                          { label: "Date",      value: formData.preferredDate
                              ? new Date(formData.preferredDate + "T00:00:00").toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" })
                              : "" },
                          { label: "Time",      value: formData.preferredTime },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex justify-between py-3 border-b border-accent/08">
                            <span className="text-xs text-muted uppercase tracking-wide">{label}</span>
                            <span className="text-sm text-off-white/80 font-medium text-right max-w-[60%]">{value}</span>
                          </div>
                        ))}
                      </div>
                      {formData.message && (
                        <div className="glass-card rounded-lg p-4 mb-6">
                          <p className="text-xs text-muted mb-1">Message</p>
                          <p className="text-sm text-off-white/70">{formData.message}</p>
                        </div>
                      )}
                      {error && (
                        <p className="text-red-400 text-sm mb-4">{error}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex gap-3 mt-8">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="btn-outline-gold flex items-center gap-2 px-5 py-3 rounded-sm text-sm"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    onClick={() => canNext() && setStep((s) => s + 1)}
                    disabled={!canNext()}
                    className={`btn-gold flex items-center gap-2 px-6 py-3 rounded-sm text-sm flex-1 justify-center ${
                      !canNext() ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  >
                    Next <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-gold flex items-center gap-2 px-6 py-3 rounded-sm text-sm flex-1 justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} />
                        Confirm Booking
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
