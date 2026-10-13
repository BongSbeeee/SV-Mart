import { useSyncExternalStore } from "react";

/* Small shared store: language, cart, current page, search text.
   Any component can read/change these without passing props. */

const listeners = new Set();

const readLang = () => {
  try {
    return localStorage.getItem("lang") || "en";
  } catch (_) {
    return "en";
  }
};

let state = {
  lang: readLang(),
  items: [],        // [{ id, name, km, image, emoji, size, price, quantity }]
  cartOpen: false,
  page: "home",
  query: "",
};

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => state;

const update = (patch) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

/* ---------- actions ---------- */
const setLang = (lang) => {
  try {
    localStorage.setItem("lang", lang);
  } catch (_) {}
  update({ lang });
};

const setPage = (page) => {
  update({ page, query: "" }); // going to a page clears the search
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (_) {}
};
const setQuery = (query) => update({ query });

/* Cart: pass the whole product object, e.g. addToCart(p) */
const addToCart = (product) => {
  if (!product || product.id == null) return;
  const items = [...state.items];
  const i = items.findIndex((x) => x.id === product.id);
  if (i >= 0) {
    items[i] = { ...items[i], quantity: items[i].quantity + 1 };
  } else {
    items.push({
      id: product.id,
      name: product.en,
      km: product.km,
      image: product.img || `/images/products/${product.id}.png`,
      emoji: product.emoji,
      size: product.size,
      price: product.price,
      quantity: 1,
    });
  }
  update({ items });
};

const setQuantity = (id, quantity) => {
  const items =
    quantity <= 0
      ? state.items.filter((x) => x.id !== id)
      : state.items.map((x) => (x.id === id ? { ...x, quantity } : x));
  update({ items });
};
const removeFromCart = (id) =>
  update({ items: state.items.filter((x) => x.id !== id) });
const clearCart = () => update({ items: [] });
const openCart = () => update({ cartOpen: true });
const closeCart = () => update({ cartOpen: false });

/* ---------- hooks ---------- */
export const useLang = () => [useSyncExternalStore(subscribe, getSnapshot).lang, setLang];

/* Returns one object:
   { items, count, total, isOpen, addToCart, setQuantity, removeFromCart, clearCart, openCart, closeCart } */
export const useCart = () => {
  const s = useSyncExternalStore(subscribe, getSnapshot);
  return {
    items: s.items,
    count: s.items.reduce((n, x) => n + x.quantity, 0),
    total: s.items.reduce((n, x) => n + x.price * x.quantity, 0),
    isOpen: s.cartOpen,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
  };
};

/* page: "home" | "all" | "new" | a category id | "brand:<name>" */
export const useNav = () => [useSyncExternalStore(subscribe, getSnapshot).page, setPage];
export const useSearch = () => [useSyncExternalStore(subscribe, getSnapshot).query, setQuery];