import { useState, useEffect } from "react";
import { useLang, useCart, useSearch } from "./Store";
import CartDrawer from "./CartDrawer";
import logo from "../assets/SV_Mart.png"; // path: src/assets/SV_Mart.png (use "../assets/..." if Header is in a subfolder)

const TEXT = {
  en: {
    search: "Search for products, brands, or categories...",
    cart: "Shopping cart",
    items: "items",
    language: "Language",
    darkMode: "Dark mode",
    darkOn: "Switch to light mode",
    darkOff: "Switch to dark mode",
  },
  km: {
    search: "ស្វែងរកផលិតផល ម៉ាក ឬប្រភេទ...",
    cart: "កន្ត្រកទំនិញ",
    items: "ទំនិញ",
    language: "ភាសា",
    darkMode: "របៀបងងឹត",
    darkOn: "ប្តូរទៅរបៀបភ្លឺ",
    darkOff: "ប្តូរទៅរបៀបងងឹត",
  },
};

const Header = () => {
  const [lang, setLang] = useLang();
  const { count, openCart } = useCart();
  const [query, setQuery] = useSearch();

  /* ---------- Dark / light ---------- */
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
    } catch (_) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";
    try { localStorage.setItem("theme", darkMode ? "dark" : "light"); } catch (_) {}
  }, [darkMode]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  /* ---------- Cart badge bump (runs only when the count changes) ---------- */
  const [bump, setBump] = useState(false);
  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const id = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(id);
  }, [count]);

  const t = TEXT[lang];

  const searchBox = `w-full pl-11 pr-4 py-2.5 rounded-full text-sm
    bg-slate-100 dark:bg-gray-700
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-400
    border border-transparent dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors`;

  return (
    <>
      {/* Defines the badge animation so it works without extra CSS files */}
      <style>{`
        @keyframes cart-bump { 0%,100% { transform: scale(1); } 50% { transform: scale(1.35); } }
        .cart-bump { animation: cart-bump 300ms ease-out; }
        @media (prefers-reduced-motion: reduce) { .cart-bump { animation: none; } }
      `}</style>

      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900
                         border-b border-gray-200 dark:border-gray-700
                         shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3 md:gap-6">

            {/* ---------- LEFT: LOGO ---------- */}
            <a href="/" className="flex-shrink-0 flex items-center" aria-label="SV Mart home">
              <img
                src={logo}
                alt="SV Mart"
                className="flex items-center justify-between h-24 gap-3 md:gap-6"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <span className="hidden text-xl font-bold text-orange-500">SV Mart</span>
            </a>

            {/* ---------- CENTER: SEARCH (desktop) ---------- */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="hidden md:block flex-1 max-w-2xl"
              role="search"
            >
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2
                              text-gray-400 text-sm pointer-events-none"></i>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.search}
                  aria-label={t.search}
                  className={searchBox}
                />
              </div>
            </form>

            {/* ---------- RIGHT ---------- */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

              {/* Language (now visible on mobile too) */}
              <div className="relative">
                <i className="fas fa-globe absolute left-3 top-1/2 -translate-y-1/2
                              text-xs text-gray-500 dark:text-gray-400 pointer-events-none"></i>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  aria-label={t.language}
                  className="appearance-none cursor-pointer rounded-full
                             py-1.5 pl-8 pr-7 text-sm
                             bg-slate-100 dark:bg-gray-700
                             text-gray-700 dark:text-gray-100
                             border border-transparent dark:border-gray-600
                             focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="en">English</option>
                  <option value="km">ខ្មែរ</option>
                </select>
                <i className="fas fa-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2
                              text-[10px] text-gray-500 dark:text-gray-400 pointer-events-none"></i>
              </div>

              {/* CART: opens the drawer */}
              <button
                type="button"
                onClick={openCart}
                aria-label={`${t.cart}, ${count} ${t.items}`}
                className="relative p-2 rounded-full
                           text-gray-600 dark:text-gray-300
                           hover:text-orange-500 dark:hover:text-orange-400
                           focus:outline-none focus:ring-2 focus:ring-orange-400
                           transition-colors"
              >
                <i className="fas fa-shopping-cart text-lg sm:text-xl"></i>
                {count > 0 && (
                  <span
                    className={`absolute -top-0.5 -right-0.5
                      min-w-[1.1rem] h-[1.1rem] px-1
                      inline-flex items-center justify-center rounded-full
                      bg-orange-500 text-white text-[10px] font-bold
                      ${bump ? "cart-bump" : ""}`}
                  >
                    {count}
                  </span>
                )}
              </button>

              {/* Dark / light toggle */}
              <button
                type="button"
                role="switch"
                aria-checked={darkMode}
                aria-label={t.darkMode}
                title={darkMode ? t.darkOn : t.darkOff}
                onClick={() => setDarkMode((v) => !v)}
                className="relative flex-shrink-0 w-14 h-7 rounded-full
                           bg-gray-200 dark:bg-gray-700
                           border border-gray-300 dark:border-gray-600
                           transition-colors duration-300
                           focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full
                              bg-white dark:bg-gray-900 shadow
                              flex items-center justify-center
                              transition-transform duration-300 ease-out
                              ${darkMode ? "translate-x-7" : "translate-x-0"}`}
                >
                  <i className={`fas ${
                    darkMode ? "fa-moon text-indigo-400" : "fa-sun text-amber-500"
                  } text-xs`}></i>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ---------- MOBILE SEARCH ---------- */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2
                          text-gray-400 text-sm pointer-events-none"></i>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              aria-label={t.search}
              className={searchBox}
            />
          </div>
        </div>
      </header>

      {/* Drawer reads its own state from the store, so no props needed */}
      <CartDrawer />
    </>
  );
};

export default Header;