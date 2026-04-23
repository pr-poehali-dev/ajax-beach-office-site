import Icon from "@/components/ui/icon";
import { AnimSection, GoldDivider } from "@/components/shared/AnimSection";
import { LOGO_URL, HERO_IMG, COAST_IMG, navLinks, services } from "@/data/siteData";

interface NavProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (href: string) => void;
}

export function Nav({ scrolled, menuOpen, setMenuOpen, scrollTo }: NavProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#071829]/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollTo("#hero")} className="flex items-center justify-center bg-white/20 backdrop-blur-md rounded-3xl p-3" style={{boxShadow: "0 0 24px 12px rgba(255,255,255,0.12)"}}>
          <img src={LOGO_URL} alt="Аякс на берегу" className="h-28 w-auto object-contain" />
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-white/80 hover:text-[#C9A84C] transition-colors text-sm tracking-wide">
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("#contacts")}
          className="hidden lg:flex items-center gap-2 bg-[#C9A84C] hover:bg-[#9A7A2E] text-[#0D2644] font-semibold px-5 py-2.5 text-sm tracking-wide transition-all hover:scale-105"
        >
          Консультация
        </button>

        <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#071829]/98 backdrop-blur-md border-t border-[#C9A84C]/20 px-6 py-4">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="block w-full text-left text-white/80 hover:text-[#C9A84C] py-3 border-b border-white/10 text-sm tracking-wide">
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contacts")}
            className="mt-4 w-full bg-[#C9A84C] text-[#0D2644] font-semibold py-3 text-sm tracking-wide">
            Бесплатная консультация
          </button>
        </div>
      )}
    </nav>
  );
}

export function HeroSection({ scrollTo }: { scrollTo: (href: string) => void }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Недвижимость у моря" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071829]/80 via-[#071829]/50 to-[#071829]/90" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none" style={{ animation: "waveAnim 8s ease-in-out infinite" }}>
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="#F5F0E8" fillOpacity="0.06" />
          <path d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z" fill="#C9A84C" fillOpacity="0.05" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ animation: "fadeInSlow 1.2s ease-out forwards" }}>
        <p className="text-[#C9A84C] tracking-[0.3em] text-xs uppercase mb-4">Черноморское побережье</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4 leading-none">
          Недвижимость<br /><em className="italic text-[#C9A84C]">у моря</em>
        </h1>
        <GoldDivider />
        <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">Агентство «Аякс на берегу» — ваш надёжный партнёр в покупке, продаже и аренде недвижимости на Черноморском побережье</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollTo("#objects")}
            className="bg-[#C9A84C] hover:bg-[#9A7A2E] text-[#0D2644] font-semibold px-8 py-4 tracking-wide transition-all hover:scale-105 text-sm">
            Смотреть объекты
          </button>
          <button onClick={() => scrollTo("#contacts")}
            className="border border-white/40 hover:border-[#C9A84C] text-white hover:text-[#C9A84C] px-8 py-4 tracking-wide transition-all text-sm">
            Бесплатная консультация
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 z-10 hidden md:flex justify-center">
        <div className="flex items-end divide-x divide-white/20 bg-[#071829]/60 backdrop-blur-md border border-white/10 px-2">
          {[["27 лет", "На рынке", "text-2xl"], ["№1", "В Краснодарском крае", "text-4xl"]].map(([val, lbl, size]) => (
            <div key={lbl} className="px-8 py-4 text-center flex flex-col items-center justify-end">
              <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className={`${size} text-[#C9A84C] font-semibold leading-none`}>{val}</div>
              <div className="text-white/60 text-xs tracking-widest uppercase mt-1">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimSection>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C9A84C] tracking-[0.25em] text-xs uppercase mb-3">О компании</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-[#0D2644] font-light mb-2 leading-tight">
                27 лет помогаем найти<br /><em className="italic text-[#2B7FA3]">недвижимость у моря</em>
              </h2>
              <GoldDivider />
              <p className="text-[#0D2644]/70 leading-relaxed mb-5">Агентство «Аякс на берегу» — одно из ведущих агентств недвижимости Краснодарского края. Мы специализируемся на объектах в Анапе и Новороссийске, а также прилегающих районах.</p>
              <p className="text-[#0D2644]/80 font-medium mb-3">Сегодня «Аякс» — это:</p>
              <ul className="space-y-2 mb-8">
                {[
                  "27 лет успешной работы",
                  "более 30 000 объектов в базе",
                  "45 офисов-партнёров в 20 городах России",
                  "120 партнёров-застройщиков",
                  "60 зарубежных партнёров",
                  "800 специалистов по недвижимости",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#0D2644]/70 text-sm">
                    <span className="text-[#C9A84C] mt-0.5 shrink-0">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-3 gap-4">
                {[["27", "Лет опыта"], ["30 000+", "Объектов"], ["800", "Специалистов"]].map(([n, l]) => (
                  <div key={l} className="border border-[#C9A84C]/30 p-4 text-center bg-white">
                    <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl text-[#C9A84C] font-semibold">{n}</div>
                    <div className="text-[#0D2644]/60 text-xs tracking-wider uppercase mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={COAST_IMG} alt="Побережье" className="w-full h-80 lg:h-[480px] object-cover" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-[#C9A84C]/40" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#C9A84C]/40" />
              <div className="absolute bottom-6 right-6 bg-[#0D2644]/90 backdrop-blur-sm p-5 border-l-2 border-[#C9A84C]">
                <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl text-[#C9A84C] font-semibold">№1</div>
                <div className="text-white/80 text-xs tracking-wider uppercase mt-1">В Краснодарском крае</div>
              </div>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

export function OfficeSection() {
  return (
    <section id="office" className="py-24 bg-[#0D2644]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimSection>
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] tracking-[0.25em] text-xs uppercase mb-3">Наш офис</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-white font-light">
              Приходите в гости
            </h2>
            <GoldDivider />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { icon: "MapPin", label: "Адрес", val: "Краснодарский край, г. Анапа, пр. Революции, 3" },
                { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 09:00–18:00 / Сб: 10:00–16:00" },
                { icon: "Phone", label: "Телефон", val: "8 906 187 60 57" },
              ].map(({ icon, label, val }) => (
                <div key={label} className="flex gap-4 items-start border-b border-white/10 pb-5">
                  <div className="w-10 h-10 bg-[#C9A84C]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={icon} size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <div className="text-[#C9A84C]/80 text-xs tracking-widest uppercase mb-1">{label}</div>
                    <div className="text-white">{val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-64 lg:h-96 border border-white/10 overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.3161%2C44.8953&z=16&pt=37.3161%2C44.8953%2Cpm2rdm&text=%D0%90%D0%BD%D0%B0%D0%BF%D0%B0%2C+%D0%BF%D1%80.+%D0%A0%D0%B5%D0%B2%D0%BE%D0%BB%D1%8E%D1%86%D0%B8%D0%B8%2C+3"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                title="Карта офиса Аякс на берегу"
              />
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimSection>
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] tracking-[0.25em] text-xs uppercase mb-3">Что мы делаем</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-[#0D2644] font-light">
              Наши услуги
            </h2>
            <GoldDivider />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i}
                className="group bg-white border border-[#C9A84C]/15 p-8 hover:border-[#C9A84C]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#0D2644] flex items-center justify-center mb-5 group-hover:bg-[#C9A84C] transition-colors">
                  <Icon name={s.icon} size={20} className="text-[#C9A84C] group-hover:text-[#0D2644] transition-colors" />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl text-[#0D2644] font-semibold mb-3">{s.title}</h3>
                <p className="text-[#0D2644]/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </AnimSection>
      </div>
    </section>
  );
}
