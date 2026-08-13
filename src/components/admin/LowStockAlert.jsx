import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api";

export default function LowStockAlert() {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const getLowStock = async () => {
      try {
        const response = await axios.get(`${API}/menu`, {
          params: {
            available: false,
          },
        });

        setLowStock(response.data?.data || []);
      } catch (err) {
        console.error("Error getting unavailable menu:", err);
      }
    };

    getLowStock();
  }, []);

  return (
    <section className="rounded-lg border border-[#d7d8d0] bg-[#f5f4ef] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-playfair text-lg text-[#405047]">
          Low Stock Alert
        </h2>

        <span className="text-xs font-semibold text-red-500">
          {lowStock.length} unavailable
        </span>
      </div>

      {lowStock.length > 0 ? (
        <div className="space-y-3">
          {lowStock.map((item) => (
            <div
              key={item._id || item.id}
              className="flex items-center justify-between rounded-md bg-white px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-[#405047]">
                  {item.name}
                </p>

                <p className="mt-1 text-xs text-[#8a8f8b]">No stock</p>
              </div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-semibold text-red-600">
                Unavailable
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-4 text-xs text-[#6d756f]">No low stock items.</p>
      )}

      <Link
        to="/menu-management"
        className="mt-5 flex h-11 w-full items-center justify-center bg-[#263c32] text-center text-xs font-semibold text-white transition hover:bg-[#162b22]"
      >
        Manage Menu
      </Link>
    </section>
  );
}
