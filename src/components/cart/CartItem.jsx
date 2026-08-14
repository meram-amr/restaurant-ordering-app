import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const itemTotal =
    Number(item.price) * item.quantity;

  return (
    <article className="flex gap-4 border border-[#e3e1d9] bg-white p-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 shrink-0 object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-lg text-[#25251f]">
              {item.name}
            </h3>

            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="text-xs text-gray-400 transition hover:text-red-500"
              aria-label={`Remove ${item.name}`}
            >
              ✕
            </button>
          </div>

          <p className="mt-1 text-xs text-[#77766f]">
            ${Number(item.price).toFixed(2)} each
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-[#d8d6ce]">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center text-sm transition hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="flex h-8 w-8 items-center justify-center border-x border-[#d8d6ce] text-xs">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center text-sm transition hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <span className="text-sm font-semibold text-[#25251f]">
            ${itemTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default CartItem;