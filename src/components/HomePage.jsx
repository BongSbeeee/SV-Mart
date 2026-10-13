import { NAV, CATEGORIES, PRODUCTS, TEXT } from "./data";
import { useLang, useNav, useSearch } from "./Store";
import Sidebar from "./Sidebar";
import Slideshow from "./Slideshow";
import Brand from "./Brand";
import CategoryProduct from "./Categoryproduct";
import Categories from "./Categories";
import SpecialOffer from "./Specialoffer";

/* Chooses what to show in the middle column, based on the left menu / search. */
const HomePage = () => {
  const [lang] = useLang();
  const [page, setPage] = useNav();
  const [query] = useSearch();
  const t = TEXT[lang];
  const q = query.trim();

  let content;

  if (q) {
    // Search box has text → show matching products
    const key = q.toLowerCase();
    const results = PRODUCTS.filter(
      (p) =>
        p.en.toLowerCase().includes(key) ||
        p.km.includes(q) ||
        p.brand.toLowerCase().includes(key)
    );
    content = <CategoryProduct title={`${t.searchResults}: "${q}"`} products={results} />;
  } else if (page === "home") {
    content = (
      <>
        <Slideshow />
        <Brand />
        <CategoryProduct
          title={t.popular}
          products={PRODUCTS.filter((p) => p.popular)}
          onViewAll={() => setPage("all")}
        />
      </>
    );
  } else if (page === "all") {
    content = CATEGORIES.map((c) => (
      <CategoryProduct
        key={c.id}
        title={c[lang]}
        products={PRODUCTS.filter((p) => p.category === c.id)}
        onViewAll={() => setPage(c.id)}
      />
    ));
  } else if (page === "new") {
    content = (
      <CategoryProduct
        title={NAV.find((n) => n.id === "new")[lang]}
        products={PRODUCTS.filter((p) => p.isNew)}
      />
    );
  } else if (page.startsWith("brand:")) {
    const brand = page.slice("brand:".length);
    content = (
      <>
        <Brand />
        <CategoryProduct title={brand} products={PRODUCTS.filter((p) => p.brand === brand)} />
      </>
    );
  } else {
    // a single category: snacks, drinks, frozen, ...
    const nav = NAV.find((n) => n.id === page);
    content = (
      <CategoryProduct
        title={nav ? nav[lang] : ""}
        products={PRODUCTS.filter((p) => p.category === page)}
      />
    );
  }

  return (
    <div className="lg:flex bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 min-w-0 p-4 lg:p-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6 min-w-0">{content}</div>

          <aside className="space-y-5">
            <Categories />
            <SpecialOffer />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HomePage;