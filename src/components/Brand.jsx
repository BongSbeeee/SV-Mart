import { useState } from "react";
import { BRANDS, TEXT } from "./data";
import { useLang, useNav } from "./Store";

/* One brand tile: tries public/images/brands/<name>.png, else shows the name */
const BrandTile = ({ name, active, onClick }) => {
  const [failed, setFailed] = useState(false);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-shrink-0 h-14 min-w-[6.5rem] px-4 rounded-xl flex items-center justify-center
                  border transition-colors text-sm font-semibold
                  ${active
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-orange-400"}`}
    >
      {failed ? (
        name
      ) : (
        <img
          src={`/images/brands/${slug}.png`}
          alt={name}
          onError={() => setFailed(true)}
          className="max-h-8 w-auto object-contain"
        />
      )}
    </button>
  );
};

const Brand = () => {
  const [lang] = useLang();
  const [page, setPage] = useNav();
  const t = TEXT[lang];

  return (
    <section>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{t.brands}</h2>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {BRANDS.map((b) => (
          <BrandTile
            key={b}
            name={b}
            active={page === `brand:${b}`}
            onClick={() => setPage(`brand:${b}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default Brand;