function CheckoutItem({ item }) {
  return (
    <div className="flex items-center gap-4 border border-[#e3e1d9] bg-white p-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-20 w-20 shrink-0 object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-lg text-[#25251f]">
          {item.name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Quantity: {item.quantity}
        </p>
      </div>

      <span className="text-sm font-semibold">
        {(item.price * item.quantity).toFixed(2)} EGP
      </span>
    </div>
  );
}

export default CheckoutItem;