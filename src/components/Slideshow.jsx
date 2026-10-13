import { useState, useEffect } from "react";
import { TEXT } from "./data";
import { useLang, useNav } from "./Store";
import Picture from "./Picture";

/* Banner slideshow. Edit SLIDES to change text / colors / destination.
   `go` = page opened by the button (all, new, drinks, ...).
   Optional banner image: public/images/slides/slide1.png ... */
const SLIDES = [
  {
    id: "s1",
    go: "all",
    img: "/images/slides/slide1.png",
    emoji: "🥔🥤🍜🧋",
    bg: "from-amber-100 via-orange-200 to-orange-300 dark:from-gray-900 dark:via-gray-800 dark:to-orange-950",
    en: { t1: "Good Food", t2: "Better Life", sub: "Fresh products • Great prices • Everyday" },
    km: { t1: "អាហារល្អ", t2: "ជីវិតកាន់តែប្រសើរ", sub: "ផលិតផលស្រស់ • តម្លៃសមរម្យ • រាល់ថ្ងៃ" },
  },
  {
    id: "s2",
    go: "drinks",
    img: "/images/slides/slide2.png",
    emoji: "🥤🧋💧",
    bg: "from-sky-100 via-cyan-100 to-sky-200 dark:from-gray-900 dark:via-slate-800 dark:to-sky-950",
    en: { t1: "Cold Drinks", t2: "Hot Deals", sub: "Beverages from $0.60" },
    km: { t1: "ភេសជ្ជៈត្រជាក់", t2: "តម្លៃពិសេស", sub: "ភេសជ្ជៈចាប់ពី $0.60" },
  },
  {
    id: "s3",
    go: "new",
    img: "/images/slides/slide3.png",
    emoji: "🍪🍦🍵",
    bg: "from-lime-100 via-green-100 to-emerald-200 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950",
    en: { t1: "Fresh Arrivals", t2: "Every Week", sub: "Be the first to try something new" },
    km: { t1: "ទំនិញថ្មីស្រស់", t2: "រាល់សប្តាហ៍", sub: "សាកល្បងមុនគេជាមួយទំនិញថ្មី" },
  },
];

const Slideshow = () => {
  const [lang] = useLang();
  const [, setPage] = useNav();
  const t = TEXT[lang];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Auto-play every 5s (stops on hover / focus, or if the user prefers less motion)
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [paused, reduceMotion]);

  const go = (n) => setIndex((n + SLIDES.length) % SLIDES.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative overflow-hidden rounded-2xl min-h-[230px] sm:min-h-[270px]
                 border border-orange-200/60 dark:border-gray-700"
    >
      {SLIDES.map((s, i) => {
        const active = i === index;
        const c = s[lang];
        return (
          <div
            key={s.id}
            aria-hidden={!active}
            className={`absolute inset-0 bg-gradient-to-r ${s.bg} p-6 sm:p-10
                        transition-opacity duration-500
                        ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="relative z-10 max-w-md">
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
                {c.t1}
                <br />
                <span className="text-orange-600 dark:text-orange-400">{c.t2}</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">{c.sub}</p>
              <button
                type="button"
                tabIndex={active ? 0 : -1}
                onClick={() => setPage(s.go)}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                           bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold
                           shadow transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                {t.shopNow} <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>

            <div className="absolute right-6 top-0 bottom-0 hidden sm:flex items-center">
              <Picture
                src={s.img}
                emoji={s.emoji}
                alt=""
                className="max-h-[85%] text-6xl lg:text-7xl tracking-widest"
              />
            </div>
          </div>
        );
      })}

      {/* Arrows */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label={t.prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full
                   bg-white/80 dark:bg-gray-900/70 text-gray-700 dark:text-gray-200
                   hover:bg-white dark:hover:bg-gray-900 shadow"
      >
        <i className="fas fa-chevron-left text-xs"></i>
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label={t.next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full
                   bg-white/80 dark:bg-gray-900/70 text-gray-700 dark:text-gray-200
                   hover:bg-white dark:hover:bg-gray-900 shadow"
      >
        <i className="fas fa-chevron-right text-xs"></i>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all
                        ${i === index ? "w-6 bg-orange-500" : "w-2 bg-gray-400/70 dark:bg-gray-500"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slideshow;