import { useEffect, useState } from "react";
import { getMenu } from "../api/menu";
import MenuCard from "../components/MenuCard";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "All",
    "Appetizer",
    "Main Course",
    "Dessert",
    "Beverage",
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          activeCategory === "All"
            ? await getMenu()
            : await getMenu(activeCategory);

        setMenu(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-[#f7f6f1]">
      <div className="mx-auto w-full max-w-[900px] px-6 py-10">
        <header className="text-center my-20">
          <p className="font-serif text-[15px] italic text-[#7c8067]">
            Our Menu
          </p>
          <h1 className="mt-[2px] font-serif text-[40px] font-normal leading-none text-[#25251f]">
            Culinary Offerings
          </h1>
          <div className="mt-3 flex justify-center gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  rounded-full
                  border
                  px-2.5
                  py-[3px]
                  font-sans
                  text-[10px]
                  leading-none
                  transition-all
                  duration-200
                  ${activeCategory === category
                    ? "border-[#4e5544] bg-[#4e5544] text-white"
                    : "border-[#bdbcb5] bg-transparent text-[#4c4c47] hover:bg-[#4e5544] hover:text-white"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </header>
        <div className="mt-8">
          {loading && (
            <div className="py-10 text-center">
              <p className="font-serif text-xs italic text-[#7c8067]">
                Loading menu...
              </p>
            </div>
          )}
          {error && (
            <div className="py-10 text-center">
              <p className="text-xs text-red-500">
                {error}
              </p>
            </div>
          )}
          {!loading && !error && (
            <>
              {(activeCategory === "All" ||
                activeCategory === "Appetizer") &&
                menu.some(
                  (item) => item.category === "Appetizer"
                ) && (
                  <MenuSection
                    title="Appetizers"
                    items={menu.filter(
                      (item) => item.category === "Appetizer"
                    )}
                  />
                )}
              {(activeCategory === "All" ||
                activeCategory === "Main Course") &&
                menu.some(
                  (item) => item.category === "Main Course"
                ) && (
                  <MenuSection
                    title="Main Courses"
                    items={menu.filter(
                      (item) => item.category === "Main Course"
                    )}
                  />
                )}
              {(activeCategory === "All" ||
                activeCategory === "Dessert") &&
                menu.some(
                  (item) => item.category === "Dessert"
                ) && (
                  <MenuSection
                    title="Desserts"
                    items={menu.filter(
                      (item) => item.category === "Dessert"
                    )}
                  />
                )}
              {(activeCategory === "All" ||
                activeCategory === "Beverage") &&
                menu.some(
                  (item) => item.category === "Beverage"
                ) && (
                  <MenuSection
                    title="Beverages"
                    items={menu.filter(
                      (item) => item.category === "Beverage"
                    )}
                  />
                )}
              {menu.length === 0 && (
                <p className="py-10 text-center text-xs text-[#77766f]">
                  No dishes available.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function MenuSection({ title, items }) {
  return (
    <section className="mb-8">
      <div className="mb-2 flex items-center border-b border-[#deddd7] pb-1">
        <h2 className="font-serif text-[20px] font-large text-[#292923]">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default Menu;