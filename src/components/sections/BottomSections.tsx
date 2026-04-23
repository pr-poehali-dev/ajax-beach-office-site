import { useState } from "react";
import Icon from "@/components/ui/icon";
import { AnimSection, GoldDivider } from "@/components/shared/AnimSection";
import { LOGO_URL, navLinks, objects, reviews, faqs } from "@/data/siteData";

export function ObjectsSection() {
  return (
    <section id="objects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimSection>
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] tracking-[0.25em] text-xs uppercase mb-3">Каталог</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-[#0D2644] font-light">
              Актуальные объекты
            </h2>
            <GoldDivider />
            <p className="text-[#0D2644]/60 max-w-lg mx-auto text-sm mt-2">Тщательно отобранные объекты у моря. </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {objects.map((obj, i) => (
              <div key={i} className="group relative overflow-hidden bg-white border border-[#C9A84C]/15 hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden h-60">
                  <img src={obj.img} alt={obj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2644]/60 to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#C9A84C] text-[#0D2644] text-xs font-semibold px-3 py-1 tracking-wide">
                    {obj.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl text-[#0D2644] font-semibold mb-2">{obj.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#0D2644]/50 text-sm">
                      <Icon name="Maximize2" size={14} />
                      {obj.area}
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl text-[#C9A84C] font-semibold">{obj.price}</div>
                  </div>
                  {obj.href ? (
                    <a href={obj.href} target="_blank" rel="noopener noreferrer"
                      className="mt-4 block w-full border border-[#0D2644]/20 hover:border-[#C9A84C] hover:text-[#C9A84C] text-[#0D2644]/70 py-2.5 text-sm tracking-wide transition-all text-center">
                      Подробнее
                    </a>
                  ) : (
                    <button className="mt-4 w-full border border-[#0D2644]/20 hover:border-[#C9A84C] hover:text-[#C9A84C] text-[#0D2644]/70 py-2.5 text-sm tracking-wide transition-all">
                      Подробнее
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-[#0D2644] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimSection>
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] tracking-[0.25em] text-xs uppercase mb-3">Клиенты о нас</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-white font-light">Отзывы</h2>
            <GoldDivider />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 hover:border-[#C9A84C]/40 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} className="text-[#C9A84C] text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-[#C9A84C]/70 border border-[#C9A84C]/30 px-2 py-0.5">{r.deal}</span>
                </div>
                <p className="text-white/80 leading-relaxed mb-6 text-base flex-1" style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 400 }}>
                  «{r.text}»
                </p>
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] font-semibold text-lg shrink-0">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Golos Text', sans-serif" }}>{r.name}</div>
                      <div className="text-white/40 text-xs">{r.city}</div>
                    </div>
                  </div>
                  <div className="text-white/30 text-xs">Менеджер: <span className="text-[#C9A84C]/70">{r.agent}</span></div>
                </div>
              </div>
            ))}
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

export function FaqSection({ openFaq, setOpenFaq }: { openFaq: number | null; setOpenFaq: (v: number | null) => void }) {
  return (
    <section id="faq" className="py-24 bg-[#F5F0E8]">
      <div className="max-w-3xl mx-auto px-6">
        <AnimSection>
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] tracking-[0.25em] text-xs uppercase mb-3">Вопросы и ответы</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-[#0D2644] font-light">
              Частые вопросы
            </h2>
            <GoldDivider />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#C9A84C]/20 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#C9A84C]/5 transition-colors"
                >
                  <span className="font-medium text-[#0D2644] pr-4 text-sm">{faq.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-[#C9A84C] shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[#0D2644]/65 text-sm leading-relaxed border-t border-[#C9A84C]/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0D2644] via-[#1A3A5C] to-[#2B7FA3] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[#C9A84C]" style={{ animation: "floatAnim 4s ease-in-out infinite" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#C9A84C]" />
      </div>
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-white font-light mb-4">
          Найдём ваше жильё <em className="italic text-[#C9A84C]">у моря</em>
        </h2>
        <p className="text-white/70 mb-8 text-lg">Бесплатная консультация без обязательств. Расскажите о своих пожеланиях — мы предложим лучшие варианты.</p>
        <button onClick={() => document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-[#C9A84C] hover:bg-[#9A7A2E] text-[#0D2644] font-semibold px-10 py-4 text-sm tracking-wide transition-all hover:scale-105">
          Получить консультацию
        </button>
      </div>
    </section>
  );
}

export function ContactsSection() {
  return (
    <section id="contacts" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimSection>
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] tracking-[0.25em] text-xs uppercase mb-3">Свяжитесь с нами</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-[#0D2644] font-light">Контакты</h2>
            <GoldDivider />
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl text-[#0D2644] mb-6">Оставьте заявку</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Ваше имя"
                  className="w-full border border-[#0D2644]/20 px-5 py-3.5 text-sm text-[#0D2644] placeholder-[#0D2644]/40 focus:outline-none focus:border-[#C9A84C] transition-colors bg-[#F5F0E8]" />
                <input type="tel" placeholder="Телефон"
                  className="w-full border border-[#0D2644]/20 px-5 py-3.5 text-sm text-[#0D2644] placeholder-[#0D2644]/40 focus:outline-none focus:border-[#C9A84C] transition-colors bg-[#F5F0E8]" />
                <input type="email" placeholder="Email"
                  className="w-full border border-[#0D2644]/20 px-5 py-3.5 text-sm text-[#0D2644] placeholder-[#0D2644]/40 focus:outline-none focus:border-[#C9A84C] transition-colors bg-[#F5F0E8]" />
                <textarea placeholder="Расскажите о своих пожеланиях..." rows={4}
                  className="w-full border border-[#0D2644]/20 px-5 py-3.5 text-sm text-[#0D2644] placeholder-[#0D2644]/40 focus:outline-none focus:border-[#C9A84C] transition-colors bg-[#F5F0E8] resize-none" />
                <button className="w-full bg-[#C9A84C] hover:bg-[#9A7A2E] text-[#0D2644] font-semibold py-4 text-sm tracking-wide transition-all hover:scale-[1.01]">
                  Отправить заявку
                </button>
                <p className="text-[#0D2644]/40 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl text-[#0D2644] mb-6">Наши контакты</h3>
              <div className="space-y-6">
                {[
                  { icon: "Phone", title: "Телефон", lines: ["8 906 187 60 57"] },
                  { icon: "MapPin", title: "Адрес", lines: ["Краснодарский край, г. Анапа,", "пр. Революции, 3"] },
                  { icon: "Clock", title: "Режим работы", lines: ["Пн–Пт: 09:00–18:00", "Сб: 10:00–16:00"] },
                ].map(({ icon, title, lines }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-11 h-11 bg-[#0D2644] flex items-center justify-center shrink-0">
                      <Icon name={icon} size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <div className="text-[#C9A84C]/80 text-xs tracking-widest uppercase mb-1">{title}</div>
                      {lines.map((l) => <div key={l} className="text-[#0D2644] text-sm">{l}</div>)}
                    </div>
                  </div>
                ))}
                <div className="pt-4 flex gap-3">
                  <a
                    href="https://vk.com/club237868623"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="ВКонтакте"
                    className="w-10 h-10 border border-[#0D2644]/20 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 flex items-center justify-center transition-all"
                  >
                    <span className="text-[#0D2644] font-bold text-xs leading-none tracking-tight">VK</span>
                  </a>
                  <a
                    href="https://www.instagram.com/ayax_bereg?igsh=MWo5MWdrNDNtYnJhOQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="w-10 h-10 border border-[#0D2644]/20 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 flex items-center justify-center transition-all"
                  >
                    <Icon name="Instagram" size={16} className="text-[#0D2644]" />
                  </a>
                  <a
                    href="https://max.ru/u/f9LHodD0cOJOYPMwe3_teri4WprcK9P3mUZ1Xz17H45WFxUlG5bcwVA8h8g"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="MAX"
                    className="w-10 h-10 border border-[#0D2644]/20 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 flex items-center justify-center transition-all"
                  >
                    <span className="text-[#0D2644] font-bold text-xs leading-none">MAX</span>
                  </a>
                  <a
                    href="tel:+79061876057"
                    title="Позвонить"
                    className="w-10 h-10 border border-[#0D2644]/20 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 flex items-center justify-center transition-all"
                  >
                    <Icon name="Phone" size={16} className="text-[#0D2644]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

export function Footer({ scrollTo }: { scrollTo: (href: string) => void }) {
  return (
    <footer className="bg-[#071829] py-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center justify-center bg-white/20 backdrop-blur-md rounded-3xl p-3" style={{boxShadow: "0 0 24px 12px rgba(255,255,255,0.12)"}}>
            <img src={LOGO_URL} alt="Аякс на берегу" className="h-28 w-auto object-contain" />
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-white/50 hover:text-[#C9A84C] text-xs tracking-wide transition-colors">
                {l.label}
              </button>
            ))}
          </div>
          <div className="text-white/30 text-xs text-center">
            © 2024 Аякс на берегу<br />
            <span className="text-white/20">Все права защищены</span>
          </div>
        </div>
      </div>
    </footer>
  );
}