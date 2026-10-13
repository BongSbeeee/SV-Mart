import { TEXT } from "./data";
import { useLang } from "./Store";
import ProductCard from "./Productcard";

/* A titled grid of products.
   Props: title, products (array), onViewAll (optional → shows "View All") */
const CategoryProduct = ({ title, products, onViewAll }) => {
  const [lang] = useLang();
  const t = TEXT[lang];

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-medium text-orange-500 hover:underline"
          >
            {t.viewAll} <i className="fas fa-angle-right"></i>
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.noResults}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryProduct;