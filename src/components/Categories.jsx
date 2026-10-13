import { CATEGORIES, TEXT } from "./data";
import { useLang, useNav } from "./Store";
import Picture from "./Picture";

/* Right-side category panel. Each tile opens that category. */
const Categories = () => {
  const [lang] = useLang();
  const [page, setPage] = useNav();
  const t = TEXT[lang];

  return (
    <section
      className="p-4 rounded-2xl bg-white dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-gray-900 dark:text-white">{t.categories}</h2>
        <button
          type="button"
          onClick={() => setPage("all")}
          className="text-xs font-medium text-orange-500 hover:underline"
        >
          {t.viewAll} <i className="fas fa-angle-right"></i>
        </button>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setPage(c.id)}
            className={`flex flex-col items-center gap-1 py-3 rounded-xl border transition-colors
                        bg-slate-50 dark:bg-gray-900
                        ${page === c.id
                          ? "border-orange-500"
                          : "border-gray-200 dark:border-gray-700 hover:border-orange-400"}`}
          >
            <Picture
              src={c.img || `/images/categories/${c.id}.png`}
              emoji={c.emoji}
              alt=""
              className="h-12 w-12 text-3xl flex items-center justify-center"
            />
            <span className="text-[11px] font-medium text-gray-700 dark:text-gray-200 text-center px-1">
              {c[lang]}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;