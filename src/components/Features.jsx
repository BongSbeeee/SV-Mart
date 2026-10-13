import { useLang } from "./Store";

/* NOT used on the home page any more.
   Ready to drop into your Cart page / "Added to cart" popup later:
     import Features from "./Features";   →   <Features />                  */
const FEATURES = [
  { icon: "fa-shipping-fast", en: ["Fast Delivery", "Get your order quickly"], km: ["ដឹកជញ្ជូនលឿន", "ទទួលបានការកម្មង់យ៉ាងឆាប់រហ័ស"] },
  { icon: "fa-credit-card", en: ["Safe Payment", "Multiple payment methods"], km: ["ទូទាត់សុវត្ថិភាព", "វិធីសាស្ត្រទូទាត់ច្រើន"] },
  { icon: "fa-mouse-pointer", en: ["Easy to Order", "No login required"], km: ["កម្មង់ងាយស្រួល", "មិនចាំបាច់ចូលគណនី"] },
  { icon: "fa-store", en: ["Pick Up at Store", "Available at our branches"], km: ["មកយកនៅហាង", "មាននៅគ្រប់សាខា"] },
];

const Features = () => {
  const [lang] = useLang();
  return (
    <section className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {FEATURES.map((f) => (
        <div
          key={f.icon}
          className="flex items-center gap-3 p-3 rounded-xl
                     bg-white dark:bg-gray-800
                     border border-gray-200 dark:border-gray-700"
        >
          <span className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center
                           bg-orange-100 dark:bg-orange-500/15 text-orange-500">
            <i className={`fas ${f.icon}`}></i>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{f[lang][0]}</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{f[lang][1]}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;