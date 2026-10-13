import { useEffect } from "react";
import { useLang, useCart } from "./Store";
import Picture from "./Picture";

const TEXT = {
  en: {
    title: "Your Cart",
    close: "Close cart",
    empty: "Your cart is empty.",
    total: "Total",
    clear: "Clear",
    checkout: "Checkout",
    remove: "Remove item",
    more: "Increase quantity",
    less: "Decrease quantity",
  },
  km: {
    title: "កន្ត្រករបស់អ្នក",
    close: "បិទកន្ត្រក",
    empty: "កន្ត្រករបស់អ្នកទទេ។",
    total: "សរុប",
    clear: "សម្អាត",
    checkout: "ទូទាត់",
    remove: "ដកទំនិញចេញ",
    more: "បន្ថែមចំនួន",
    less: "បន្ថយចំនួន",
  },
};

const CartDrawer = () => {
  const [lang] = useLang();
  const { items, count, total, isOpen, closeCart, setQuantity, removeFromCart, clearCart } =
    useCart();
  const t = TEXT[lang];

  // Close on Escape + lock page scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeCart]);

  // TODO: connect to your checkout page / order flow
  const handleCheckout = () => {};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50" onClick={closeCart}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        className="absolute right-0 top-0 h-full w-full max-w-sm flex flex-col
                   bg-white dark:bg-gray-900 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
            <i className="fas fa-shopping-cart text-orange-500" aria-hidden="true"></i>
            {t.title} ({count})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label={t.close}
            className="w-8 h-8 rounded-full text-gray-500 dark:text-gray-400
                       hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-gray-500 dark:text-gray-300">{t.empty}</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => {
                const name = item[lang] ?? item.name;
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-2xl
                               bg-slate-100 dark:bg-gray-800
                               border border-gray-200 dark:border-gray-700"
                  >
                    <div className="h-16 w-16 flex-shrink-0 rounded-xl flex items-center justify-center
                                    bg-white dark:bg-gray-700 overflow-hidden">
                      <Picture
                        src={item.image}
                        emoji={item.emoji}
                        alt={name}
                        className="max-h-full max-w-full text-3xl"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {name}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                        <i className="fas fa-weight-hanging text-orange-500 mr-1" aria-hidden="true"></i>
                        {item.size}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-orange-500">
                        <i className="fas fa-tag text-xs mr-1" aria-hidden="true"></i>
                        ${item.price.toFixed(2)} &times; {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        aria-label={t.less}
                        className="w-7 h-7 rounded-full text-xs
                                   bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                                   hover:bg-gray-300 dark:hover:bg-gray-600
                                   focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        aria-label={t.more}
                        className="w-7 h-7 rounded-full text-xs bg-orange-500 hover:bg-orange-600 text-white
                                   focus:outline-none focus:ring-2 focus:ring-orange-300"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={t.remove}
                        className="ml-1 w-7 h-7 rounded-full text-xs text-gray-400
                                   hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                <i className="fas fa-receipt" aria-hidden="true"></i>
                {t.total}:
              </span>
              <span className="text-lg font-extrabold text-orange-500">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-[1fr_1.6fr] gap-3">
              <button
                type="button"
                onClick={clearCart}
                className="py-2.5 rounded-xl text-sm font-semibold
                           bg-slate-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100
                           hover:bg-slate-300 dark:hover:bg-gray-600
                           focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <i className="fas fa-broom mr-2" aria-hidden="true"></i>
                {t.clear}
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="py-2.5 rounded-xl text-sm font-semibold text-white
                           bg-orange-500 hover:bg-orange-600
                           focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <i className="fas fa-credit-card mr-2" aria-hidden="true"></i>
                {t.checkout}
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;