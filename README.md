# D'CosMedics Clinic — Full-Stack Website

> Luxury medical aesthetics website for **D'CosMedics Clinic**, Kolkata.
> Built with Next.js 14, Tailwind CSS, Framer Motion, Supabase & AI chatbot.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# → Edit .env.local with your actual keys (see below)

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

---

## 📁 Project Structure

```
dcosmedics/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        ← AI chatbot endpoint
│   │   └── book/route.ts        ← Appointment booking endpoint
│   ├── globals.css              ← Design system & animations
│   ├── layout.tsx               ← Root layout + Google Fonts
│   └── page.tsx                 ← Main page (assembles all sections)
│
├── components/
│   ├── Navbar.tsx               ← Sticky nav with mobile menu
│   ├── Footer.tsx               ← Footer with links
│   ├── chatbot/
│   │   └── ChatBot.tsx          ← Floating AI chatbot widget
│   └── sections/
│       ├── HeroSection.tsx      ← Hero with CTA
│       ├── AboutSection.tsx     ← Doctor profile
│       ├── ServicesSection.tsx  ← Interactive service cards
│       ├── WhyUsSection.tsx     ← USP grid
│       ├── TestimonialsSection.tsx ← Carousel + video grid
│       ├── BookingSection.tsx   ← Multi-step appointment form
│       └── ContactSection.tsx   ← Map + contact details
│
├── config/
│   └── clinic.config.js         ← ⭐ MASTER CONFIG — edit all content here
│
├── .env.local.example           ← Environment variable template
├── vercel.json                  ← Vercel deployment config
└── README.md
```

---

## ⚙️ Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Purpose | Where to get |
|----------|---------|--------------|
| `OPENAI_API_KEY` | Powers AI chatbot (uses Anthropic Claude) | [console.anthropic.com](https://console.anthropic.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | Database for appointments | [supabase.com](https://supabase.com) → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key | Same as above |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (server-only) | Same as above |
| `RESEND_API_KEY` | Email notifications on new bookings | [resend.com](https://resend.com) |
| `CLINIC_NOTIFY_EMAIL` | Where booking alerts are sent | Clinic's email |

---

## 🗄️ Database Setup (Supabase)

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for booking form)
CREATE POLICY "Allow inserts" ON appointments
  FOR INSERT WITH CHECK (true);

-- Only authenticated staff can read
CREATE POLICY "Staff only reads" ON appointments
  FOR SELECT USING (auth.role() = 'authenticated');
```

---

## 🎨 Customization Guide

### Rebranding for Another Client

All content lives in **`config/clinic.config.js`**. To rebrand:

1. **Clinic info** → Update `name`, `fullName`, `tagline`, `contact`
2. **Colors** → Change `colors.primary`, `colors.accent` 
3. **Doctor** → Update `doctor` object
4. **Services** → Edit the `services` array
5. **Testimonials** → Update `testimonials` array
6. **Chatbot personality** → Edit `chatbotSystemPrompt`

### Replacing Placeholder Images

- **Doctor photo**: In `AboutSection.tsx` and `HeroSection.tsx`, replace the `<div>` placeholder with `<Image>` from `next/image`
- **Hero background**: Add a clinic interior photo to `/public/images/hero.jpg` and update `HeroSection.tsx`
- **Video testimonials**: Replace placeholder `<div>` blocks in `TestimonialsSection.tsx` with actual YouTube iframes

### Adding Real Doctor Photo

```tsx
// In HeroSection.tsx or AboutSection.tsx, replace the DG placeholder with:
import Image from "next/image";

<Image
  src="/images/dr-dolly-gupta.jpg"  // Place photo in /public/images/
  alt="Dr. Dolly Gupta"
  fill
  className="object-cover object-top"
/>
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Project Settings → Environment Variables
```

### Netlify

```bash
npm run build
# Upload the .next folder, set env vars in Netlify dashboard
```

### Self-hosted (VPS/cPanel)

```bash
npm run build
npm start  # Runs on port 3000
# Use nginx as reverse proxy
```

---

## 🔑 Ownership Transfer Checklist

When handing over to the client:

- [ ] Client creates their own [Anthropic account](https://console.anthropic.com) → get API key → update `OPENAI_API_KEY`
- [ ] Client creates [Supabase project](https://supabase.com) → run the SQL above → update all `SUPABASE_*` vars
- [ ] Client creates [Resend account](https://resend.com) → get API key → update `RESEND_API_KEY`
- [ ] Update `CLINIC_NOTIFY_EMAIL` to client's email
- [ ] Replace placeholder doctor photo with real photo
- [ ] Update Google Maps embed in `ContactSection.tsx`
- [ ] Update phone numbers in `clinic.config.js`
- [ ] Deploy to client's Vercel/Netlify account
- [ ] Point client's domain to the deployment
- [ ] Hand over `.env.local` securely (never commit to git)

---

## 🧩 Features

| Feature | Status | Tech |
|---------|--------|------|
| Responsive design | ✅ | Tailwind CSS |
| Scroll animations | ✅ | Framer Motion |
| Glassmorphism cards | ✅ | CSS backdrop-filter |
| Hero section | ✅ | Next.js + Framer Motion |
| Doctor profile | ✅ | React component |
| Interactive service cards | ✅ | Framer Motion accordion |
| Testimonials carousel | ✅ | Custom React carousel |
| Video testimonials grid | ✅ | Placeholder → swap with YouTube |
| Multi-step booking form | ✅ | React Hook Form + Supabase |
| Email notifications | ✅ | Resend API |
| AI chatbot | ✅ | Anthropic Claude API |
| Contact + Map | ✅ | Google Maps embed |
| Mobile navigation | ✅ | Framer Motion drawer |
| SEO metadata | ✅ | Next.js Metadata API |
| Master config file | ✅ | `clinic.config.js` |

---

## 📞 Support

For technical support or customization:
- Review `clinic.config.js` first — most content is there
- Check environment variables if booking/chat doesn't work
- Ensure Supabase table is created before testing bookings

---

*Built for D'CosMedics Clinic, Kolkata. Designed for clinical luxury.*
