import { useEffect, useState } from "react";
import {
  Search,
  Bell,
  DollarSign,
  ClipboardList,
  Users,
  CalendarDays,
} from "lucide-react";
import StatCard from "../components/admin/StatCard";
import RecentOrders from "../components/admin/RecentOrders";
import MenuPerformance from "../components/admin/MenuPerformance";
import LowStockAlert from "../components/admin/LowStockAlert";
import { getAllOrders } from "../api/orders";
import { getMenu } from "../api/menu";


export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("loggedin");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const ordersResponse = await getAllOrders(token);
  
        setOrders(ordersResponse?.data || []);

        const menuResponse = await getMenu();

        setMenu(menuResponse?.data || []);
      } catch (err) {
        console.error("Dashboard error:", err);

        setError(
          err.response?.data?.message || "Unable to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalRevenue = orders.reduce((total, order) => {
    const amount = Number(order.total) || 0;

    return total + amount;
  }, 0);

  const uniqueCustomers = new Set(
    orders
      .map(
        (order) =>
          order.user?.id ||
          order.customer?.id ||
          order.userId ||
          order.customerId ||
          order.email,
      )
      .filter(Boolean),
  );

  const activeReservations = orders.filter(
    (order) =>
      order.status === "pending" ||
      order.status === "confirmed" ||
      order.status === "preparing",
  ).length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`,
      change: `${orders.length} orders`,
      icon: <DollarSign size={20} />,
    },
    {
      title: "Today's Orders",
      value: orders.length,
      change: "Total",
      icon: <ClipboardList size={20} />,
    },
    {
      title: "New Customers",
      value: uniqueCustomers.size,
      change: "Customers",
      icon: <Users size={20} />,
      dark: true,
    },
    {
      title: "Active Reservations",
      value: activeReservations,
      subtitle: "Active",
      icon: <CalendarDays size={20} />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f6f1]">
        <main className="flex flex-1 items-center justify-center p-10">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#d7e87b] border-t-[#163528]" />

            <p className="font-poppins text-sm text-[#69716b]">
              Loading dashboard...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f1] text-[#24352d]">
      <main className="flex-1 px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1250px]">
          <div className="mb-10 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h1 className="font-playfair text-4xl text-[#203229] lg:text-5xl">
                Dashboard Overview
              </h1>

              <p className="mt-2 text-sm text-[#6d736e] lg:text-base">
                Here's what's happening at Verdeo today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden h-11 w-64 items-center rounded-md border border-[#deded5] bg-white px-4 lg:flex">
                <Search size={17} className="text-[#8c918c]" />

                <input
                  placeholder="Search orders, guests..."
                  className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-[#999d98]"
                />
              </div>

              <button className="flex h-11 w-11 items-center justify-center rounded-md border border-[#deded5] bg-white text-[#59645d]">
                <Bell size={18} />
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                subtitle={stat.subtitle}
                icon={stat.icon}
                dark={stat.dark}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <RecentOrders orders={orders} />

            <div className="space-y-6">
              <MenuPerformance menu={menu} orders={orders} />

              <LowStockAlert menu={menu} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
