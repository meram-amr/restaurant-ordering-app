function OrderSummary({ cart, subtotal }) {
  return (
    <aside className="h-fit border border-[#e2e0d8] bg-white p-6">
      <h2 className="font-serif text-2xl text-[#25251f]">
        Order Summary
      </h2>

      <div className="my-5 border-t border-[#e5e3dc]" />

      <div className="max-h-[280px] space-y-4 overflow-y-auto pr-1">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 shrink-0 object-cover"
              />

              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-[#25251f]">
                  {item.name}
                </p>

                <p className="mt-1 text-[11px] text-[#88877f]">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            <span className="shrink-0 text-xs font-semibold text-[#25251f]">
              $
              {(
                Number(item.price) * item.quantity
              ).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="my-5 border-t border-[#e5e3dc]" />

      <div className="flex items-center justify-between text-sm text-[#77766f]">
        <span>Subtotal</span>

        <span className="font-medium text-[#25251f]">
          ${Number(subtotal).toFixed(2)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-[#77766f]">
        <span>Delivery</span>

        <span className="text-[#25251f]">
          Free
        </span>
      </div>

      <div className="my-5 border-t border-[#e5e3dc]" />

      <div className="flex items-center justify-between">
        <span className="font-serif text-xl text-[#25251f]">
          Total
        </span>

        <span className="text-lg font-bold text-[#25251f]">
          ${Number(subtotal).toFixed(2)}
        </span>
      </div>
    </aside>
  );
}

export default OrderSummary;