import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMenu } from "../api/menu";

function PopularDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await getMenu();
        setDishes(response.data);
      } catch (error) {
        console.log(error);
        setError("Failed to load dishes");
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const popularDishes = dishes.slice(0, 4);
  return (
    <section className="bg-[#f8f8f4] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[#9baa4f] text-xs uppercase tracking-[3px]">
            Our Menu
          </p>
          <h2 className="text-3xl font-serif text-[#123629] mt-2">
            Popular Dishes
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            A few of our customers' favorites
          </p>
        </div>
        {loading && (
          <p className="text-center text-gray-500">
            Loading dishes...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[#163f30]">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-5">
                    {dish.description}
                  </p>
                  <p className="font-semibold text-[#163f30] mt-4">
                    {dish.price} EGP
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link
          to="/menu"
          className="inline-block bg-[#081D14] border border-lime-300 text-lime-300 font-bold px-5 py-3 rounded-md text-sm hover:bg-lime-300  hover:text-[#081D14] transition">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PopularDishes;