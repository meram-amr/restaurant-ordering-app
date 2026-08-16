import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f6f1] px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center py-24 text-center">

          <p className="font-serif text-sm italic text-[#7c8067]">
            Your Selection
          </p>

          <h1 className="mt-2 font-serif text-4xl text-[#123b29]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 max-w-md text-sm text-[#77766f]">
            Looks like you haven't added anything to your cart yet.
            Explore our menu and discover something delicious.
          </p>

          <Link
            to="/menu"
            className="mt-8 flex items-center justify-center gap-2 bg-[#081D14] text-lime-300 border border-green-950 text-green-950 px-5 py-2.5 rounded-lg font-poppins hover:text-lime-200 transition"
          >
            Browse Menu
            <ArrowRight size={15} />
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f6f1] px-5 py-10 md:px-8 lg:py-14">

      <div className="mx-auto max-w-6xl">

        <div className="mb-10">

          <p className="font-serif text-sm italic text-[#7c8067]">
            Your Selection
          </p>

          <h1 className="mt-1 font-serif text-4xl text-[#123b29]">
            Your Cart
          </h1>

          <p className="mt-2 text-sm text-[#77766f]">
            Review your items before proceeding to checkout.
          </p>

        </div>


        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_350px]">

          <section className="space-y-4">

            {cart.map((item) => {

              const price = Number(item.price) || 0;

              const itemTotal =
                price * item.quantity;

              return (
                <article
                  key={item.id}
                  className="flex gap-4 border border-[#e2e0d8] bg-white p-4 sm:p-5"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 shrink-0 object-cover sm:h-28 sm:w-28"
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-between">

                    <div>

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <h2 className="font-serif text-lg leading-tight text-[#25251f]">
                            {item.name}
                          </h2>

                          <p className="mt-1 text-xs text-[#77766f]">
                            {price.toFixed(2)} EGP each
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="shrink-0 text-[#999990] transition hover:text-red-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      <div className="flex items-center border border-[#d8d6ce]">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="flex h-8 w-8 items-center justify-center text-[#555850] transition hover:bg-[#f3f2ec]"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>


                        <span className="flex h-8 w-9 items-center justify-center border-x border-[#d8d6ce] text-xs font-medium text-[#25251f]">
                          {item.quantity}
                        </span>


                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="flex h-8 w-8 items-center justify-center text-[#555850] transition hover:bg-[#f3f2ec]"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>

                      </div>

                      <span className="text-sm font-semibold text-[#25251f]">
                        {itemTotal.toFixed(2)} EGP
                      </span>

                    </div>

                  </div>

                </article>
              );
            })}

          </section>

          <aside className="h-fit border border-[#e2e0d8] bg-white p-6">

            <h2 className="font-serif text-2xl text-[#123b29]">
              Order Summary
            </h2>


            <div className="my-6 border-t border-[#e5e3dc]" />


            <div className="flex items-center justify-between text-sm text-[#77766f]">
              <span>Subtotal</span>

              <span className="font-medium text-[#25251f]">
                {Number(subtotal).toFixed(2)} EGP
              </span>
            </div>


            <div className="mt-4 flex items-center justify-between text-sm text-[#77766f]">
              <span>Delivery</span>

              <span className="text-[#25251f]">
                Free
              </span>
            </div>


            <div className="my-6 border-t border-[#e5e3dc]" />


            <div className="flex items-center justify-between">

              <span className="font-serif text-xl text-[#25251f]">
                Total
              </span>

              <span className="text-lg font-bold text-[#25251f]">
                {Number(subtotal).toFixed(2)} EGP
              </span>

            </div>


            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="mt-7 flex w-full items-center justify-center gap-2 bg-[#081D14] py-3.5 text-xs font-semibold text-white transition hover:bg-[#123b29] active:scale-[0.99]"
            >
              Proceed to Checkout
              <ArrowRight size={15} />
            </button>


            <Link
              to="/menu"
              className="mt-4 block text-center text-xs text-[#77766f] underline underline-offset-4 transition hover:text-[#25251f]"
            >
              Continue Shopping
            </Link>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Cart;