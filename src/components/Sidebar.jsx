import { NAV } from "./data";
import { useLang, useNav } from "./Store";

/* Left menu. Every item changes the page shown in HomePage.jsx.
   Desktop = vertical list, mobile = scrollable row. */
const Sidebar = () => {
  const [lang] = useLang();
  const [page, setPage] = useNav();

  return (
    <nav
      aria-label="Main"
      className="lg:w-56 lg:flex-shrink-0 lg:sticky lg:top-16 lg:self-start
                 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto
                 bg-white dark:bg-gray-900
                 lg:border-r border-b lg:border-b-0 border-gray-200 dark:border-gray-800
                 p-3 transition-colors duration-300"
    >
      <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
        {NAV.map((item) => {
          const on = page === item.id;
          return (
            <li key={item.id} className="flex-shrink-0">
              <button
                type="button"
                onClick={() => setPage(item.id)}
                aria-current={on ? "page" : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                            whitespace-nowrap transition-colors
                            ${on
                              ? "bg-orange-500 text-white font-semibold shadow"
                              : "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800"}`}
              >
                <i className={`fas ${item.icon} w-4 text-center`}></i>
                {item[lang]}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;