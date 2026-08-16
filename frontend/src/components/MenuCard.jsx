import { useState } from "react";
import { useCart } from "../context/CartContext";

function MenuCard({ item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    console.log("ADD TO CART:", item);

    addToCart(item);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <article className="w-full">
      <div className="relative h-[250px] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="pt-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-[18px] leading-[1.2] text-[#25251f]">
            {item.name}
          </h3>

          <span className="whitespace-nowrap text-[10px] font-bold text-[#25251f]">
            {Number(item.price).toFixed(2)} EGP
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-[1.35] text-[#77766f]">
          {item.description}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-3 w-full rounded-md py-2.5 text-xs font-semibold transition duration-200 ${
            added
              ? "bg-lime-300 text-[#081D14]"
              : "bg-[#081D14] text-white hover:bg-[#123b29]"
          }`}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default MenuCard;