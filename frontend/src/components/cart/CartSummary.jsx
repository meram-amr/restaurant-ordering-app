import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function CartSummary() {
  const { subtotal, cart } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    navigate("/checkout");
  };

  return (
    <aside className="h-fit bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <h2 className="font-serif text-2xl text-[#25251f]">
        Order Summary
      </h2>

      <div className="my-6 border-t border-[#e3e1d9]" />

      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>

        <span>
          ${Number(subtotal).toFixed(2)}
        </span>
      </div>

      <div className="my-5 border-t border-[#e3e1d9]" />

      <div className="flex items-center justify-between">
        <span className="font-serif text-xl text-[#25251f]">
          Total
        </span>

        <span className="text-lg font-bold text-[#25251f]">
          ${Number(subtotal).toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        className="mt-6 w-full bg-[#081D14] py-3 text-xs font-semibold text-white transition hover:bg-[#123b29] active:scale-[0.99]"
      >
        Proceed to Checkout →
      </button>
    </aside>
  );
}

export default CartSummary;