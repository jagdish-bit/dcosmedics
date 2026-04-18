import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import CLINIC_CONFIG from "@/config/clinic.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${CLINIC_CONFIG.fullName} | Premium Dermatology & Hair Transplant, Kolkata`,
  description: `${CLINIC_CONFIG.subTagline} Led by Dr. Dolly Gupta with 19+ years of expertise. Book your consultation today.`,
  keywords:
    "dermatologist Kolkata, hair transplant Kolkata, FUE hair transplant, laser treatment Kolkata, acne scar treatment, Dr Dolly Gupta, D'CosMedics",
  authors: [{ name: "D'CosMedics Clinic" }],
  openGraph: {
    title: `${CLINIC_CONFIG.fullName} | Luxury Medical Aesthetics, Kolkata`,
    description: CLINIC_CONFIG.subTagline,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="bg-primary text-off-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
