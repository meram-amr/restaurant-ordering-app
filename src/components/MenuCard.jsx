import { useCart } from "../context/CartContext";

function MenuCard({ item }) {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    console.log("ADD TO CART:", item);
    addToCart(item);
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
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-[10px] leading-[1.35] text-[#77766f]">
          {item.description}
        </p>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-3 w-full rounded-md bg-[#081D14] py-2.5 text-xs font-semibold text-white transition duration-200 hover:bg-[#123b29]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default MenuCard;