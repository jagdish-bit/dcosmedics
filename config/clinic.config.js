/**
 * D'CosMedics Clinic - Master Configuration File
 * ================================================
 * All text, colors, contact info, services, and branding
 * are centralized here. Edit this file to customize for any client.
 *
 * OWNERSHIP TRANSFER: Replace all API keys in .env.local with client's keys.
 */

export const CLINIC_CONFIG = {
  // ─── Brand Identity ───────────────────────────────────────────────────────
  name: "D'CosMedics",
  fullName: "D'CosMedics Clinic",
  tagline: "Redefining Beauty through Clinical Excellence.",
  subTagline:
    "Kolkata's most advanced Skin, Hair, Cosmetic Surgery & Anti-Aging clinic — where science meets serenity.",
  ctaButton: "Book a Premium Consultation",

  // ─── Colors (edit to rebrand for another client) ──────────────────────────
  colors: {
    primary:      "#FDF8F3",   // Warm ivory cream — main background
    accent:       "#B07A68",   // Copper rose gold — buttons & highlights
    accentLight:  "#C9907A",   // Lighter copper — hover states
    offWhite:     "#2C1A12",   // Deep warm espresso — body text
    graphite:     "#F5EDE5",   // Soft blush — secondary sections
    muted:        "#9A7060",   // Dusty copper — muted text
    petal:        "#EDD5C5",   // Pale petal — card borders
    gold:         "#C4A46B",   // Warm gold — shimmer accents
  },

  // ─── Contact & Location ───────────────────────────────────────────────────
  contact: {
    phone: "+91 8100524497",
    whatsapp: "+9170444 44001",
    email: "hello@dcosmedics.in",

    // ── Branch 1 — Main Clinic ──────────────────────────
    address: "82A Rash Behari Avenue, Next to Kalighat Metro Gate No. 4, Kolkata – 700029",
    mapEmbed: "https://www.google.com/maps?q=82A+Rash+Behari+Avenue+Kolkata&output=embed",

    // ── Branch 2 — Add your second location here ────────
    address2: "No 2, BB 97, Salt Lake Rd, near Tank, near City Centre 1, BB Block, Sector 1, Bidhannagar, Kolkata, West Bengal 700064",
    mapEmbed2: "https://www.google.com/maps/place/DCOSMEDICS+Skin,Hair+and+Wellness+Clinic.Saltlake+Branch./@22.5898565,88.3990007,17z/data=!4m14!1m7!3m6!1s0x3a027759fab9a799:0xacc6cca6f92acc7b!2sDCOSMEDICS+Skin,Hair+and+Wellness+Clinic.Saltlake+Branch.!8m2!3d22.5898516!4d88.4015756!16s%2Fg%2F11mz402vlr!3m5!1s0x3a027759fab9a799:0xacc6cca6f92acc7b!8m2!3d22.5898516!4d88.4015756!16s%2Fg%2F11mz402vlr?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D",

    hours: {
      weekdays: "Mon – Sat: 10:00 AM – 8:00 PM",
      sunday: "Sunday: 11:00 AM – 4:00 PM",
    },
  },

  // ─── Doctor Profile ───────────────────────────────────────────────────────
  doctor: {
    name: "Dr. Dolly Gupta",
    title: "Founder & Chief Dermatologist",
    credentials: [
      "MBBS",
      "MD – Dermatology",
      "Fellowship in Cosmetic Surgery",
      "Certified Trichologist (USA)",
    ],
    experience: "19+",
    experienceLabel: "Years of Clinical Excellence",
    bio: `Dr. Dolly Gupta is one of Kolkata's most celebrated dermatologists and cosmetic surgeons. With over 19 years of transforming lives through evidence-based aesthetics, she brings a uniquely holistic vision to modern dermatology — integrating advanced clinical techniques with the healing power of mindfulness and meditation.

Her philosophy: true beauty begins with skin health, and skin health begins with inner balance. This rare integration of Western medical science and Eastern wellness philosophy defines every treatment at D'CosMedics.`,
    philosophy:
      "True beauty begins with skin health, and skin health begins with inner balance.",
    stats: [
      { value: "19+", label: "Years Experience" },
      { value: "15,000+", label: "Patients Treated" },
      { value: "98%", label: "Satisfaction Rate" },
      { value: "4", label: "International Certifications" },
    ],
  },

  // ─── Services ─────────────────────────────────────────────────────────────
  services: [
    {
      id: "dermatology",
      icon: "Sparkles",
      category: "Dermatology",
      headline: "Flawless Skin, Clinically Perfected",
      description:
        "Evidence-based treatments for every skin concern — from stubborn acne to deep pigmentation.",
      treatments: [
        { name: "Acne & Acne Scar Treatment", price: "From ₹2,500" },
        { name: "Pigmentation & Melasma", price: "From ₹3,000" },
        { name: "Scar Revision Therapy", price: "From ₹4,000" },
        { name: "Chemical Peels", price: "From ₹1,800" },
        { name: "Eczema & Psoriasis Care", price: "Consultation" },
        { name: "Skin Brightening Program", price: "From ₹5,000" },
      ],
    },
    {
      id: "hair",
      icon: "Wind",
      category: "Hair Restoration",
      headline: "Reclaim Every Strand",
      description:
        "Cutting-edge hair transplant surgery and restoration science for permanent, natural results.",
      treatments: [
        { name: "FUE Hair Transplant", price: "From ₹40,000" },
        { name: "FUT Hair Transplant", price: "From ₹35,000" },
        { name: "PRP Hair Therapy", price: "From ₹6,000" },
        { name: "Hair Fall Treatment", price: "From ₹2,000" },
        { name: "Scalp Micropigmentation", price: "From ₹15,000" },
        { name: "Beard & Eyebrow Transplant", price: "From ₹25,000" },
      ],
    },
    {
      id: "laser",
      icon: "Zap",
      category: "Laser Treatments",
      headline: "Precision. Power. Perfection.",
      description:
        "State-of-the-art laser technology for hair removal, skin resurfacing, and tattoo removal.",
      treatments: [
        { name: "Permanent Laser Hair Reduction", price: "From ₹2,000/session" },
        { name: "Tattoo Removal", price: "From ₹3,500/session" },
        { name: "Laser Skin Resurfacing", price: "From ₹8,000" },
        { name: "Q-Switch Laser Toning", price: "From ₹4,000" },
        { name: "Fractional CO2 Laser", price: "From ₹12,000" },
        { name: "Vascular Lesion Removal", price: "Consultation" },
      ],
    },
    {
      id: "aesthetics",
      icon: "Star",
      category: "Aesthetic Medicine",
      headline: "Anti-Aging. Redefined.",
      description:
        "Bespoke aesthetic treatments for facial harmony, volume restoration, and youthful radiance.",
      treatments: [
        { name: "Botox & Dysport", price: "From ₹8,000" },
        { name: "Dermal Fillers", price: "From ₹15,000" },
        { name: "Lip Augmentation", price: "From ₹12,000" },
        { name: "Thread Lift", price: "From ₹20,000" },
        { name: "Skin Tightening (HIFU/RF)", price: "From ₹18,000" },
        { name: "Vampire Facial (PRP)", price: "From ₹7,000" },
      ],
    },
  ],

  // ─── Consultation Fee ─────────────────────────────────────────────────────
  consultationFee: "₹1,000",
  consultationNote:
    "Consultation fee is adjustable against treatment costs at the clinic's discretion.",

  // ─── Testimonials ─────────────────────────────────────────────────────────
  testimonials: [
    {
      id: 1,
      name: "Priya Chakraborty",
      location: "Salt Lake, Kolkata",
      treatment: "FUE Hair Transplant",
      rating: 5,
      review:
        "I was skeptical at first, but Dr. Dolly's calm confidence made me trust the process completely. Six months later, I have a full head of natural hair. The results are beyond anything I imagined. D'CosMedics is truly world-class.",
      avatar: "PC",
    },
    {
      id: 2,
      name: "Rohit Singhania",
      location: "Park Street, Kolkata",
      treatment: "Acne Scar Treatment",
      rating: 5,
      review:
        "Years of acne scars erased in just four sessions. The staff is incredibly professional, the clinic feels luxurious, and Dr. Gupta explains every step. I wish I had come here sooner. My confidence is completely restored.",
      avatar: "RS",
    },
    {
      id: 3,
      name: "Ananya Bose",
      location: "Ballygunge, Kolkata",
      treatment: "Botox & Fillers",
      rating: 5,
      review:
        "Absolutely natural results — no one could tell I had anything done, they just said I looked refreshed and glowing. Dr. Dolly has an artist's eye. The clinic is an oasis of calm in busy Kolkata.",
      avatar: "AB",
    },
    {
      id: 4,
      name: "Suresh Mehta",
      location: "Howrah",
      treatment: "Laser Hair Reduction",
      rating: 5,
      review:
        "Permanent freedom from shaving after 8 sessions. The laser tech at D'CosMedics is far superior to other clinics I visited. Very fairly priced for the quality delivered. Highly recommended.",
      avatar: "SM",
    },
    {
      id: 5,
      name: "Tanvi Roy",
      location: "New Town, Kolkata",
      treatment: "Skin Brightening Program",
      rating: 5,
      review:
        "My pigmentation issues that I had for a decade are 90% gone after the custom program Dr. Dolly designed for me. The meditation sessions she recommends alongside treatment are a unique touch that I absolutely love.",
      avatar: "TR",
    },
    {
      id: 6,
      name: "Debashish Pal",
      location: "Behala, Kolkata",
      treatment: "PRP Hair Therapy",
      rating: 5,
      review:
        "Three PRP sessions and my hairline stopped receding — new growth is visible. The doctor's holistic approach, combining scalp health with overall wellness, is what sets this clinic apart from ordinary hair clinics.",
      avatar: "DP",
    },
  ],

  // ─── Chatbot Knowledge Base ────────────────────────────────────────────────
  chatbotSystemPrompt: `You are the "Smart Skin Assistant" for D'CosMedics Clinic — a luxury dermatology and hair transplant center in Kolkata, India. Your role is to be warm, professional, and knowledgeable, like a concierge at a five-star medical spa.

KEY CLINIC INFO:
- Clinic: D'CosMedics, 82A Rash Behari Avenue, Kolkata 700029 (next to Kalighat Metro Gate 4)
- Doctor: Dr. Dolly Gupta — MBBS, MD Dermatology, Fellowship in Cosmetic Surgery, Certified Trichologist (USA), 19+ years experience
- USP: Integrates clinical excellence with mindfulness/meditation philosophy
- Consultation Fee: ₹1,000 (adjustable against treatment)
- Hours: Mon–Sat 10am–8pm, Sunday 11am–4pm

SERVICES & APPROXIMATE PRICING:
Dermatology: Acne treatment (₹2,500+), Pigmentation (₹3,000+), Scar treatment (₹4,000+), Chemical Peels (₹1,800+)
Hair: FUE Transplant (₹40,000+), FUT Transplant (₹35,000+), PRP (₹6,000+), Hair Fall (₹2,000+)
Laser: Hair Reduction (₹2,000/session+), Tattoo Removal (₹3,500/session+), CO2 Laser (₹12,000+)
Aesthetics: Botox (₹8,000+), Fillers (₹15,000+), Lip Augmentation (₹12,000+), Thread Lift (₹20,000+), HIFU (₹18,000+)

PERSONALITY: Be warm, reassuring, and concise. Use "Dr. Dolly" or "Dr. Gupta" naturally. Always encourage booking a consultation for specific medical advice. Never give definitive medical diagnoses. Prices are approximate — always note final pricing is assessed at consultation. Respond in 2-4 sentences max unless a detailed list is needed.`,

  // ─── Why Choose Us ────────────────────────────────────────────────────────
  whyUs: [
    {
      icon: "Award",
      title: "19+ Years of Mastery",
      desc: "Dr. Gupta's two decades of experience translate to outcomes other clinics simply cannot match.",
    },
    {
      icon: "Microscope",
      title: "Certified Technology",
      desc: "FDA-approved lasers and internationally certified protocols for every procedure.",
    },
    {
      icon: "Heart",
      title: "Holistic Philosophy",
      desc: "The only Kolkata clinic integrating meditation and mindfulness into aesthetic medicine.",
    },
    {
      icon: "Shield",
      title: "Safety First",
      desc: "Sterile, NABH-compliant facility with zero-compromise safety standards.",
    },
    {
      icon: "Users",
      title: "15,000+ Happy Patients",
      desc: "A reputation built entirely on patient satisfaction and word-of-mouth trust.",
    },
    {
      icon: "MapPin",
      title: "Prime Location",
      desc: "Minutes from Kalighat Metro — easily accessible from all of Kolkata and beyond.",
    },
  ],
};

export default CLINIC_CONFIG;