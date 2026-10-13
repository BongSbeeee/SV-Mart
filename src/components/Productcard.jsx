import { useState } from "react";
import { TEXT } from "./data";
import { useLang, useCart } from "./Store";
import Picture from "./Picture";

const ProductCard = ({ product: p }) => {
  const [lang] = useLang();
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const t = TEXT[lang];

  return (
    <article
      className="relative flex flex-col p-3 rounded-xl
                 bg-white dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700
                 hover:shadow-md transition-shadow"
    >
      <button
        type="button"
        onClick={() => setLiked((v) => !v)}
        aria-pressed={liked}
        aria-label="Favorite"
        className="absolute top-2 right-2 text-sm"
      >
        <i className={`${liked ? "fas text-orange-500" : "far text-gray-400"} fa-heart`}></i>
      </button>

      <div className="h-32 flex items-center justify-center">
        <Picture
          src={p.img || `/images/products/${p.id}.png`}
          emoji={p.emoji}
          alt={p[lang]}
          className="h-full w-auto max-w-full text-7xl"
        />
      </div>

      <h3 className="mt-2 text-xs font-medium text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2rem]">
        {p[lang]}
      </h3>
      <p className="text-[11px] text-gray-500 dark:text-gray-400">{p.size}</p>
      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">${p.price.toFixed(2)}</p>

      <button
        type="button"
        onClick={() => addToCart(p)}
        className="mt-2 w-full py-1.5 rounded-md bg-orange-500 hover:bg-orange-600
                   text-white text-xs font-semibold transition-colors
                   focus:outline-none focus:ring-2 focus:ring-orange-300"
      >
        {t.addToCart}
      </button>
    </article>
  );
};

export default ProductCard;