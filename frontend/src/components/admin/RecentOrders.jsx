const getCustomerName = (order) => {
  return (
    order.user?.name ||
    order.customer?.name ||
    order.customerName ||
    order.user?.email ||
    order.email ||
    "Guest"
  );
};

const getItems = (order) => {
  if (Array.isArray(order.items)) {
    return order.items
      .map(
        (item) =>
          `${item.quantity || 1}x ${
            item.name || item.menuItem?.name || item.product?.name || "Item"
          }`,
      )
      .join(", ");
  }

  return order.items || "Order items";
};

const getTotal = (order) => {
  const total =
    Number(order.total) ||
    0;

  return `$${total.toFixed(2)}`;
};

export default function RecentOrders({ orders = [] }) {
  const recentOrders = orders.slice(0, 6);

  return (
    <section className="overflow-hidden rounded-lg border border-[#deded5] bg-white">
      <div className="flex h-[68px] items-center justify-between border-b border-[#deded5] px-6">
        <h2 className="font-playfair text-xl font-semibold text-[#304038]">
          Recent Orders
        </h2>

        <button className="text-xs font-semibold text-[#59645d] hover:text-[#263c32]">
          View All →
        </button>
      </div>

      {recentOrders.length === 0 ? (
        <div className="flex h-[250px] items-center justify-center text-sm text-[#737b75]">
          No orders yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-[#deded5] bg-[#f7f6f1] text-[10px] font-semibold uppercase tracking-wide text-[#656d67]">
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Items</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => {
                const status = order.status?.toLowerCase() || "pending";

                return (
                  <tr
                    key={order._id || order.id}
                    className="border-b border-[#e5e5df] last:border-0 hover:bg-[#fafaf7]"
                  >
                    <td className="px-5 py-5 text-sm font-semibold text-[#3e4842]">
                      #{String(order._id || order.id || "").slice(-6)}
                    </td>

                    <td className="px-5 py-5 text-sm text-[#454d48]">
                      {getCustomerName(order)}
                    </td>

                    <td className="max-w-[220px] px-5 py-5 text-sm text-[#68706b]">
                      {getItems(order)}
                    </td>

                    <td className="px-5 py-5 text-sm font-semibold text-[#465049]">
                      {getTotal(order)}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex rounded px-3 py-1.5 text-[10px] font-semibold capitalize ${
                          status === "completed"
                            ? "bg-[#d8e97b] text-[#596535]"
                            : status === "preparing"
                              ? "bg-[#59675b] text-white"
                              : status === "cancelled"
                                ? "bg-red-100 text-red-600"
                                : "bg-[#ececdf] text-[#59635d]"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
