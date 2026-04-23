import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/b3e10892-e0a3-42a8-85c3-b960743e4a19/bucket/ba24c586-555c-4dee-89b3-b5627406e1ca.png";
const HERO_IMG = "https://cdn.poehali.dev/projects/b3e10892-e0a3-42a8-85c3-b960743e4a19/bucket/df7edfb7-e45e-416d-84e3-261e63641bb5.jpg";
const COAST_IMG = "https://cdn.poehali.dev/projects/b3e10892-e0a3-42a8-85c3-b960743e4a19/bucket/6f1aa1d4-26ec-4267-9fbd-113d903ccb2e.jpg";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Наш офис", href: "#office" },
  { label: "Услуги", href: "#services" },
  { label: "Объекты", href: "#objects" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const services = [
  { icon: "Home", title: "Покупка недвижимости", desc: "Подберём идеальный объект у моря под ваш бюджет и пожелания. Сопроводим на всех этапах сделки." },
  { icon: "TrendingUp", title: "Продажа недвижимости", desc: "Оценим вашу недвижимость по рыночной стоимости и найдём покупателя в кратчайшие сроки." },
  { icon: "Key", title: "Аренда", desc: "Поможем арендовать или сдать жильё у моря на длительный срок." },
  { icon: "FileText", title: "Юридическое сопровождение", desc: "Полное юридическое сопровождение сделки. Проверка документов и чистоты объекта." },
  { icon: "BarChart2", title: "Инвестиционный консалтинг", desc: "Поможем выбрать ликвидные объекты для инвестиций с максимальной доходностью." },
  { icon: "Landmark", title: "Ипотека и рассрочка", desc: "Поможем оформить ипотеку в ведущих банках на выгодных условиях." },
];

const objects = [
  { title: "Апартаменты в «Имеретинской Ривьере»", area: "87 м²", price: "18 500 000 ₽", tag: "Новостройка", img: HERO_IMG },
  { title: "Вилла с видом на море в Хосте", area: "240 м²", price: "45 000 000 ₽", tag: "Готов к заселению", img: COAST_IMG },
  { title: "Студия в «Сочи Парк Отель»", area: "42 м²", price: "8 200 000 ₽", tag: "Инвестиция", img: HERO_IMG },
  { title: "Таунхаус в Адлере у набережной", area: "160 м²", price: "22 000 000 ₽", tag: "Эксклюзив", img: COAST_IMG },
];

const reviews = [
  { name: "Сергей Малинин", city: "Краснодар", agent: "Вадим", deal: "Покупка", text: "Давно хотели купить квартиру в Анапе у моря, но не знали, с чего начать. Вадим из «Аякса» провёл нас по всем объектам, объяснил все нюансы и помог выбрать отличный вариант. Сделка прошла чисто и в срок. Огромное спасибо!", rating: 5 },
  { name: "Ольга Кириченко", city: "Ростов-на-Дону", agent: "Лариса", deal: "Продажа", text: "Продавала квартиру в Анапе — думала, это займёт полгода. Лариса нашла покупателя за три недели! Всё оформила сама, я приехала только на подписание. Профессионально и без нервов.", rating: 5 },
  { name: "Дмитрий Фролов", city: "Москва", agent: "Григорий", deal: "Покупка", text: "Покупали дом в Анапе дистанционно — живём в Москве. Григорий показывал объекты по видеосвязи, всё проверил юридически. Через месяц стали собственниками. Рекомендую агентство всем, кто покупает из другого города.", rating: 5 },
];

const faqs = [
  { q: "Сколько времени занимает покупка недвижимости?", a: "Обычно от 2 до 6 недель: 1-2 недели на подбор объекта, 1-3 недели на юридическую проверку и оформление сделки. Мы сопровождаем вас на каждом этапе." },
  { q: "Как проверить юридическую чистоту объекта?", a: "Наши юристы проверяют выписку из ЕГРН, историю переходов права собственности, отсутствие обременений и задолженностей, законность перепланировок." },
  { q: "Можно ли купить недвижимость дистанционно?", a: "Да, мы работаем с покупателями из любой точки России. Оформляем сделки через электронную регистрацию или по нотариальной доверенности." },
  { q: "Какова комиссия агентства?", a: "Стандартная комиссия агентства составляет 3% от суммы сделки. Первая консультация — бесплатно." },
  { q: "Как правильно оценить стоимость моей недвижимости?", a: "Мы проводим бесплатную рыночную оценку на основе анализа аналогичных объектов, местоположения, состояния и ликвидности. Звоните — приедем и оценим." },
  { q: "Помогаете ли вы с ипотекой?", a: "Да, мы сотрудничаем с ведущими банками и помогаем получить одобрение на выгодных условиях. Также возможна рассрочка от застройщиков-партнёров." },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]" />
      <div className="w-2 h-2 rotate-45 bg-[#C9A84C]" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]" />
    </div>
  );
}

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

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#071829]/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("#hero")} className="flex items-center">
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

      {/* HERO */}
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

      {/* ABOUT */}
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

      {/* OFFICE */}
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

      {/* SERVICES */}
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

      {/* OBJECTS */}
      <section id="objects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="text-center mb-14">
              <p className="text-[#C9A84C] tracking-[0.25em] text-xs uppercase mb-3">Каталог</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl text-[#0D2644] font-light">
                Актуальные объекты
              </h2>
              <GoldDivider />
              <p className="text-[#0D2644]/60 max-w-lg mx-auto text-sm mt-2">
                Тщательно отобранные объекты у моря. Полная юридическая проверка перед показом.
              </p>
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
                    <button className="mt-4 w-full border border-[#0D2644]/20 hover:border-[#C9A84C] hover:text-[#C9A84C] text-[#0D2644]/70 py-2.5 text-sm tracking-wide transition-all">
                      Подробнее
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="border-2 border-[#0D2644] hover:bg-[#0D2644] hover:text-white text-[#0D2644] px-10 py-3.5 tracking-wide transition-all text-sm font-semibold">
                Смотреть все объекты
              </button>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* REVIEWS */}
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
                  <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-white/80 leading-relaxed mb-6 text-lg italic flex-1">
                    «{r.text}»
                  </p>
                  <div className="border-t border-white/10 pt-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="w-9 h-9 bg-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] font-semibold text-lg shrink-0">
                        {r.name[0]}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{r.name}</div>
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

      {/* FAQ */}
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

      {/* CTA BANNER */}
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

      {/* CONTACTS */}
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

      {/* FOOTER */}
      <footer className="bg-[#071829] py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <img src={LOGO_URL} alt="Аякс на берегу" className="h-26 w-auto object-contain rounded-none" />
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

      <style>{`
        @keyframes fadeInSlow { from { opacity: 0; } to { opacity: 1; } }
        @keyframes waveAnim { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-20px); } }
        @keyframes floatAnim { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>
    </div>
  );
}