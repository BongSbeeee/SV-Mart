/* ------------------------------------------------------------------
   ALL DATA IN ONE PLACE
   - Replace emoji with real PNGs by filling the `img` field
     (put images in public/images/products/...)
------------------------------------------------------------------ */

export const TEXT = {
  en: {
    shopNow: "Shop Now",
    popular: "Popular Products",
    categories: "Categories",
    viewAll: "View All",
    addToCart: "Add to Cart",
    brands: "Shop by Brand",
    searchResults: "Search results",
    noResults: "No products found.",
    offerTitle: "Special Offer",
    offerSub: "Up to 30% OFF",
    offerNote: "on selected items",
    prev: "Previous slide",
    next: "Next slide",
  },
  km: {
    shopNow: "ទិញឥឡូវនេះ",
    popular: "ផលិតផលពេញនិយម",
    categories: "ប្រភេទ",
    viewAll: "មើលទាំងអស់",
    addToCart: "ដាក់ក្នុងកន្ត្រក",
    brands: "ទិញតាមម៉ាក",
    searchResults: "លទ្ធផលស្វែងរក",
    noResults: "រកមិនឃើញផលិតផលទេ។",
    offerTitle: "ការផ្តល់ជូនពិសេស",
    offerSub: "បញ្ចុះតម្លៃរហូតដល់ 30%",
    offerNote: "លើទំនិញដែលបានជ្រើសរើស",
    prev: "ស្លាយមុន",
    next: "ស្លាយបន្ទាប់",
  },
};

/* Left sidebar. `id` is also the page name (category ids match CATEGORIES). */
export const NAV = [
  { id: "home", icon: "fa-home", en: "Home", km: "ទំព័រដើម" },
  { id: "all", icon: "fa-th-large", en: "All Categories", km: "ប្រភេទទាំងអស់" },
  { id: "snacks", icon: "fa-hamburger", en: "Food & Snacks", km: "អាហារ និងនំ" },
  { id: "drinks", icon: "fa-wine-bottle", en: "Beverages", km: "ភេសជ្ជៈ" },
  { id: "frozen", icon: "fa-snowflake", en: "Fresh & Frozen", km: "ស្រស់ និងកក" },
  { id: "instant", icon: "fa-utensils", en: "Instant Food", km: "អាហាររហ័ស" },
  { id: "care", icon: "fa-pump-soap", en: "Personal Care", km: "ថែទាំខ្លួន" },
  { id: "house", icon: "fa-couch", en: "Household", km: "ប្រើប្រាស់ក្នុងផ្ទះ" },
  { id: "new", icon: "fa-star", en: "New Arrivals", km: "ទំនិញថ្មី" },
];

/* Right-side category panel + sections on the "All Categories" page */
export const CATEGORIES = [
  { id: "snacks", emoji: "🍿", en: "Snacks", km: "នំ" },
  { id: "drinks", emoji: "🥤", en: "Beverages", km: "ភេសជ្ជៈ" },
  { id: "instant", emoji: "🍜", en: "Instant Food", km: "អាហាររហ័ស" },
  { id: "frozen", emoji: "❄️", en: "Fresh & Frozen", km: "ស្រស់ និងកក" },
  { id: "care", emoji: "🧴", en: "Personal Care", km: "ថែទាំខ្លួន" },
  { id: "house", emoji: "🏠", en: "Household", km: "ប្រើប្រាស់ក្នុងផ្ទះ" },
];

/* popular: shows on Home.  isNew: shows in New Arrivals.  brand: for the Brand page */
export const PRODUCTS = [
  // Snacks
  { id: 1, category: "snacks", brand: "Lay's", popular: true, isNew: false, emoji: "🥔", img: "", en: "Lay's Classic Chips", km: "ដំឡូងបំពង Lay's", size: "50g", price: 1.25 },
  { id: 2, category: "snacks", brand: "Oreo", popular: false, isNew: true, emoji: "🍪", img: "", en: "Oreo Biscuits", km: "នំប៊ីស្គីអូរីអូ", size: "133g", price: 0.9 },
  { id: 3, category: "snacks", brand: "Pringles", popular: false, isNew: true, emoji: "🥫", img: "", en: "Pringles Original", km: "ព្រីងហ្គល់ ដើម", size: "107g", price: 2.1 },
  // Beverages
  { id: 4, category: "drinks", brand: "Coca-Cola", popular: true, isNew: false, emoji: "🥤", img: "", en: "Coca-Cola", km: "កូកា កូឡា", size: "330ml", price: 0.75 },
  { id: 5, category: "drinks", brand: "Pepsi", popular: false, isNew: false, emoji: "🥤", img: "", en: "Pepsi", km: "ប៉ិបស៊ី", size: "330ml", price: 0.75 },
  { id: 6, category: "drinks", brand: "", popular: true, isNew: false, emoji: "💧", img: "", en: "Bottled Water", km: "ទឹកបរិសុទ្ធ", size: "500ml", price: 0.6 },
  { id: 7, category: "drinks", brand: "", popular: true, isNew: false, emoji: "🥛", img: "", en: "Fresh Milk", km: "ទឹកដោះគោស្រស់", size: "1L", price: 1.8 },
  { id: 8, category: "drinks", brand: "Nescafé", popular: true, isNew: false, emoji: "☕", img: "", en: "Nescafé 3in1", km: "ណេសកាហ្វេ 3in1", size: "20g x 10", price: 3.2 },
  { id: 9, category: "drinks", brand: "", popular: false, isNew: true, emoji: "🍵", img: "", en: "Green Tea", km: "តែបៃតង", size: "500ml", price: 1.1 },
  // Instant food
  { id: 10, category: "instant", brand: "MAMA", popular: true, isNew: false, emoji: "🍲", img: "", en: "MAMA Instant Noodles (Chicken)", km: "មីម៉ាម៉ា (មាន់)", size: "60g", price: 0.85 },
  { id: 11, category: "instant", brand: "", popular: false, isNew: false, emoji: "🍜", img: "", en: "Cup Noodles", km: "មីកែវ", size: "70g", price: 1.2 },
  { id: 12, category: "instant", brand: "", popular: false, isNew: false, emoji: "🥣", img: "", en: "Instant Porridge", km: "បបរឆាប់រហ័ស", size: "45g", price: 0.95 },
  // Fresh & frozen
  { id: 13, category: "frozen", brand: "", popular: false, isNew: false, emoji: "🍗", img: "", en: "Frozen Chicken", km: "សាច់មាន់កក", size: "500g", price: 4.5 },
  { id: 14, category: "frozen", brand: "", popular: false, isNew: false, emoji: "🐟", img: "", en: "Frozen Fish", km: "ត្រីកក", size: "500g", price: 3.8 },
  { id: 15, category: "frozen", brand: "", popular: false, isNew: true, emoji: "🍦", img: "", en: "Ice Cream", km: "ការ៉េម", size: "450ml", price: 2.5 },
  // Personal care
  { id: 16, category: "care", brand: "", popular: false, isNew: false, emoji: "🧴", img: "", en: "Shampoo", km: "សាប៊ូកក់សក់", size: "340ml", price: 3.2 },
  { id: 17, category: "care", brand: "", popular: false, isNew: false, emoji: "🪥", img: "", en: "Toothpaste", km: "ថ្នាំដុសធ្មេញ", size: "120g", price: 1.8 },
  { id: 18, category: "care", brand: "", popular: false, isNew: true, emoji: "🧼", img: "", en: "Hand Soap", km: "សាប៊ូលាងដៃ", size: "250ml", price: 1.5 },
  // Household
  { id: 19, category: "house", brand: "", popular: false, isNew: false, emoji: "🧽", img: "", en: "Dish Soap", km: "ទឹកលាងចាន", size: "500ml", price: 1.4 },
  { id: 20, category: "house", brand: "", popular: false, isNew: false, emoji: "🧻", img: "", en: "Tissue Paper", km: "ក្រដាសជូតមាត់", size: "pack", price: 2.0 },
  { id: 21, category: "house", brand: "", popular: false, isNew: false, emoji: "🧺", img: "", en: "Laundry Detergent", km: "ម្សៅសាប៊ូបោកខោអាវ", size: "1kg", price: 5.5 },
];

/* Brand strip. Optional logos: public/images/brands/<name-in-lowercase>.png */
export const BRANDS = ["Coca-Cola", "Pepsi", "Lay's", "Pringles", "Oreo", "MAMA", "Nescafé"];