import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingSection from "@/components/sections/BookingSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/chatbot/ChatBot";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </main>
  );
}
