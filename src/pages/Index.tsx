import { useState, useEffect } from "react";
import { Nav, HeroSection, AboutSection, OfficeSection, ServicesSection } from "@/components/sections/TopSections";
import { ObjectsSection, ReviewsSection, FaqSection, CtaBanner, ContactsSection, Footer } from "@/components/sections/BottomSections";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif" }} className="bg-[#F5F0E8] text-[#0D2644] overflow-x-hidden">
      <Nav scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <AboutSection />
      <OfficeSection />
      <ServicesSection />
      <ObjectsSection />
      <ReviewsSection />
      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <CtaBanner />
      <ContactsSection />
      <Footer scrollTo={scrollTo} />

      <style>{`
        @keyframes fadeInSlow { from { opacity: 0; } to { opacity: 1; } }
        @keyframes waveAnim { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-20px); } }
        @keyframes floatAnim { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>
    </div>
  );
}
