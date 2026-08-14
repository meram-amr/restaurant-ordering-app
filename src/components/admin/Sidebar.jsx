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
  X,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";

const items = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Orders",
    icon: Utensils,
    path: "/admin/orders",
  },
  {
    label: "Menu Management",
    icon: BookOpen,
    path: "/admin/menu-management",
  },
  {
    label: "Reservations",
    icon: CalendarDays,
    path: "/admin/reservations",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function Sidebar({ user, isOpen, setIsOpen }) {

  const logout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
        z-50
        flex
        w-[280px]
        shrink-0
        flex-col
        border-r
        border-[#d8d9d2]
        bg-[#efeee9]
        transition-transform
        duration-300
        fixed
        left-0
        top-0
        h-screen

        ${isOpen ? "translate-x-0" : "-translate-x-full"}

        lg:static
        lg:h-auto
        lg:translate-x-0
      `}
      >


        <div className="flex items-start justify-between px-6 py-5">

          <div>
            <Link
              to="/"
              onClick={closeSidebar}
              className="font-playfair text-[27px] text-[#26362e]"
            >
              AVERO Admin
            </Link>

            <p className="mt-1 text-[11px] tracking-[0.5px] text-[#727872]">
              Management Portal
            </p>
          </div>

          <button
            onClick={closeSidebar}
            className="text-[#555d57] hover:text-[#26362e] lg:hidden"
          >
            <X size={22} />
          </button>

        </div>


        <nav className="px-3 pt-4">

          <div className="space-y-2">

            {items.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex h-11 items-center gap-4 rounded-md px-4 text-sm font-semibold transition ${isActive
                      ? "bg-[#d7e87b] text-[#5b6838]"
                      : "text-[#555d57] hover:bg-[#e1e2d9]"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );

            })}

          </div>

        </nav>


        <div className="mt-auto px-5 pb-7">

          <div className="mb-6 border-t border-[#d0d1ca] pt-6">

            <Link
              to="/support"
              onClick={closeSidebar}
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
            onClick={closeSidebar}
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

              <p className="text-[10px] text-[#777d78]">
                {user?.email || ""}
              </p>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}