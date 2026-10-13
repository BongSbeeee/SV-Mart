import { TEXT } from "./data";
import { useLang, useNav } from "./Store";
import Picture from "./Picture";

const SpecialOffer = () => {
  const [lang] = useLang();
  const [, setPage] = useNav();
  const t = TEXT[lang];

  return (
    <section
      className="relative overflow-hidden p-5 rounded-2xl text-white
                 bg-gradient-to-br from-amber-400 to-orange-600"
    >
      <h2 className="font-extrabold text-lg">{t.offerTitle}</h2>
      <p className="font-bold">{t.offerSub}</p>
      <p className="text-xs opacity-90">{t.offerNote}</p>
      <button
        type="button"
        onClick={() => setPage("all")}
        className="mt-3 px-4 py-1.5 rounded-md bg-orange-700/80 hover:bg-orange-700
                   text-xs font-semibold transition-colors"
      >
        {t.shopNow} <i className="fas fa-arrow-right text-[10px]"></i>
      </button>
      <div className="absolute right-3 bottom-2 h-20 flex items-end" aria-hidden="true">
        <Picture src="/images/offer.png" emoji="🥤🍿" alt="" className="h-full w-auto text-5xl select-none" />
      </div>
    </section>
  );
};

export default SpecialOffer;