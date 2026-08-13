import {
  LayoutDashboard,
  Utensils,
  BookOpen,
  CalendarDays,
  Users,
  Settings,
  CircleHelp,
  LogOut,
  ExternalLink,
} from "lucide-react";

import { Link } from "react-router-dom";

const items = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Orders",
    icon: Utensils,
    path: "/orders",
  },
  {
    label: "Menu Management",
    icon: BookOpen,
    path: "/menu-management",
  },
  {
    label: "Reservations",
    icon: CalendarDays,
    path: "/reservations",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar({ user }) {
  const logout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-[#d8d9d2] bg-[#efeee9] lg:flex lg:min-h-screen lg:flex-col">
      <div className="px-8 py-7">
        <Link to="/" className="font-playfair text-[27px] text-[#26362e]">
          Verdeo Admin
        </Link>

        <p className="mt-1 text-[11px] tracking-[0.5px] text-[#727872]">
          Management Portal
        </p>
      </div>

      <nav className="px-5 pt-6">
        <div className="space-y-2">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex h-11 items-center gap-4 rounded-md px-4 text-sm font-semibold transition ${
                  index === 0
                    ? "bg-[#d7e87b] text-[#5b6838]"
                    : "text-[#555d57] hover:bg-[#e1e2d9]"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto px-5 pb-7">
        <div className="mb-6 border-t border-[#d0d1ca] pt-6">
          <Link
            to="/support"
            className="mb-5 flex items-center gap-4 px-3 text-sm font-semibold text-[#555d57]"
          >
            <CircleHelp size={18} />
            Support
          </Link>

          <button
            onClick={logout}
            className="flex w-full items-center gap-4 px-3 text-sm font-semibold text-[#555d57]"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <Link
          to="/"
          className="mb-7 flex h-10 items-center justify-center gap-2 bg-[#0b281d] text-[11px] tracking-wide text-white"
        >
          View Live Site
          <ExternalLink size={13} />
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d7e87b] text-[#344333]">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#38423c]">
              {user?.name || "Admin"}
            </p>

            <p className="text-[10px] text-[#777d78]">{user?.email || ""}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
