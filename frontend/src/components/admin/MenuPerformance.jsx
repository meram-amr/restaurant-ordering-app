export default function MenuPerformance({ menu = [], orders = [] }) {
  const performance = menu
    .map((menuItem) => {
      let count = 0;

      orders.forEach((order) => {
        if (!Array.isArray(order.items)) return;

        order.items.forEach((item) => {
          const itemId = item.menuItemId;
          const menuId = menuItem.id;

          if (itemId && menuId && String(itemId) === String(menuId)) {
            count += Number(item.quantity) || 1;
          }
        });
      });

      return {
        id: menuItem.id,
        name: menuItem.name || "Unnamed Item",
        orders: count,
      };
    })
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5);

  const max = Math.max(...performance.map((item) => item.orders), 1);


  return (
    <section className="rounded-lg border border-[#deded5] bg-white p-6">
      <h2 className="mb-6 font-playfair text-xl font-semibold text-[#304038]">
        Menu Performance
      </h2>

      {performance.length === 0 ? (
        <div className="py-8 text-center text-sm text-[#737b75]">
          No menu data available.
        </div>
      ) : (
        <div className="space-y-5">
          {performance.map((item) => (
            <div key={item.id}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="truncate text-sm font-semibold text-[#38453e]">
                  {item.name}
                </span>

                <span className="shrink-0 text-xs text-[#626b65]">
                  {item.orders} orders
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#e7e8e0]">
                <div
                  className="h-full rounded-full bg-[#59675b]"
                  style={{
                    width: `${(item.orders / max) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
