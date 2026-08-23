import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuLeaf, LuMenu, LuX } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/useAuth";

function Navbar({ isAdmin = false, setSidebarOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { role, isAuthenticated, logout } = useAuth();

  const navNavLinkStyle = ({ isActive }) =>
    `relative font-poppins transition-colors duration-300 ${
      isActive ? "text-lime-300" : "text-white hover:text-lime-300"
    }
  after:content-['']
  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:bg-lime-300
  after:transition-all
  after:duration-300
  ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="z-50 bg-[#081D14] px-5 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <NavLink to="/" onClick={closeMobileMenu}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <LuLeaf className="mr-2 text-xl text-lime-300" />
              <h1 className="font-playfair text-2xl font-bold tracking-widest text-white">
                AVERO
              </h1>
            </div>
            <p className="font-poppins text-sm text-lime-300">
              Where Flavor Meets Elegance
            </p>
          </div>
        </NavLink>

        {isAdmin ? (
          <div className="hidden items-center space-x-6 font-poppins text-lg font-semibold text-white md:flex">
            <NavLink to="/" className={navNavLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/admin/dashboard" className={navNavLinkStyle}>
              Dashboard
            </NavLink>
          </div>
        ) : (
          <div className="hidden items-center space-x-6 font-poppins text-lg font-semibold text-white md:flex">
            <NavLink to="/" className={navNavLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/menu" className={navNavLinkStyle}>
              Menu
            </NavLink>
            <NavLink to="/about" className={navNavLinkStyle}>
              About
            </NavLink>

            {role === "admin" && (
              <NavLink to="/admin/dashboard" className={navNavLinkStyle}>
                Dashboard
              </NavLink>
            )}

            <NavLink to="/orders" className={navNavLinkStyle}>
              My Orders
            </NavLink>

            <NavLink to="/cart" className={navNavLinkStyle}>
              Cart
              {cartCount > 0 && (
                <span className="ml-1 text-lime-300">({cartCount})</span>
              )}
            </NavLink>
          </div>
        )}

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden rounded-md bg-lime-300 px-4 py-2 font-poppins font-semibold text-green-900 transition-all duration-300 hover:bg-lime-400 md:block"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="hidden rounded-md bg-lime-300 px-4 py-2 font-poppins font-semibold text-green-900 transition-all duration-300 hover:bg-lime-400 md:block"
            >
              Log In
            </NavLink>
          )}

          {isAdmin ? (
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10 lg:hidden"
            >
              <LuMenu size={24} />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-3xl text-white transition-colors duration-300 hover:text-lime-300 md:hidden"
            >
              {isOpen ? <LuX /> : <LuMenu />}
            </button>
          )}
        </div>
      </div>

      {!isAdmin && (
        <div
          className={`overflow-hidden transition-all duration-500 md:hidden ${
            isOpen ? "mt-5 max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-5 pb-4 font-poppins font-semibold">
            <NavLink to="/" onClick={closeMobileMenu} className={navNavLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/menu" onClick={closeMobileMenu} className={navNavLinkStyle}>
              Menu
            </NavLink>
            <NavLink to="/about" onClick={closeMobileMenu} className={navNavLinkStyle}>
              About
            </NavLink>
            <NavLink to="/orders" onClick={closeMobileMenu} className={navNavLinkStyle}>
              My Orders
            </NavLink>
            <NavLink to="/cart" onClick={closeMobileMenu} className={navNavLinkStyle}>
              Cart
              {cartCount > 0 && (
                <span className="ml-1 text-lime-300">({cartCount})</span>
              )}
            </NavLink>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="rounded-md bg-lime-300 px-6 py-2 text-green-900 transition-all duration-300 hover:bg-lime-400"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className="rounded-md bg-lime-300 px-6 py-2 text-green-900 transition-all duration-300 hover:bg-lime-400"
              >
                Log In
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;