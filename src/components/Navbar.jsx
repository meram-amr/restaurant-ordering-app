import { useState } from "react";
import { Link } from "react-router-dom";
import { LuLeaf, LuMenu, LuX } from "react-icons/lu";
import { useCart } from "../context/CartContext";

function Navbar({ user, setUser, isAdmin = false, setSidebarOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const { cartCount } = useCart();

  const isAdminloged = localStorage.getItem("role") === "admin";

  const navLinkStyle =
    "relative font-poppins text-white hover:text-lime-300 transition-colors duration-300 " +
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 " +
    "after:h-[2px] after:w-0 after:bg-lime-300 " +
    "after:transition-all after:duration-300 " +
    "hover:after:w-full";

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setUser(null);
    setIsOpen(false);

    window.location.href = "/login";
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="z-50 bg-[#081D14] px-5 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <Link to="/" onClick={closeMobileMenu}>
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
        </Link>

        {isAdmin ? (
          <div className="hidden items-center space-x-6 font-poppins text-lg font-semibold text-white md:flex">
            <Link to="/" className={navLinkStyle}>
              Home
            </Link>

            <Link to="/admin/dashboard" className={navLinkStyle}>
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="hidden items-center space-x-6 font-poppins text-lg font-semibold text-white md:flex">
            <Link to="/" className={navLinkStyle}>
              Home
            </Link>

            <Link to="/menu" className={navLinkStyle}>
              Menu
            </Link>

            <Link to="/about" className={navLinkStyle}>
              About
            </Link>

            {!isAdminloged && (
              <>
                <Link to="/orders" className={navLinkStyle}>
                  My Orders
                </Link>

                <Link to="/cart" className={navLinkStyle}>
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-1 text-lime-300">({cartCount})</span>
                  )}
                </Link>
              </>
            )}
            {isAdminloged && (
              <Link to="/admin/dashboard" className={navLinkStyle}>
                Dashboard
              </Link>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={handleLogout}
              className="hidden rounded-md bg-lime-300 px-4 py-2 font-poppins font-semibold text-green-900 transition-all duration-300 hover:bg-lime-400 md:block"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-md bg-lime-300 px-4 py-2 font-poppins font-semibold text-green-900 transition-all duration-300 hover:bg-lime-400 md:block"
            >
              Log In
            </Link>
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
            <Link to="/" onClick={closeMobileMenu} className={navLinkStyle}>
              Home
            </Link>

            <Link to="/menu" onClick={closeMobileMenu} className={navLinkStyle}>
              Menu
            </Link>

            <Link
              to="/about"
              onClick={closeMobileMenu}
              className={navLinkStyle}
            >
              About
            </Link>

            <Link
              to="/orders"
              onClick={closeMobileMenu}
              className={navLinkStyle}
            >
              My Orders
            </Link>

            <Link to="/cart" onClick={closeMobileMenu} className={navLinkStyle}>
              Cart
              {cartCount > 0 && (
                <span className="ml-1 text-lime-300">({cartCount})</span>
              )}
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="rounded-md bg-lime-300 px-6 py-2 text-green-900 transition-all duration-300 hover:bg-lime-400"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="rounded-md bg-lime-300 px-6 py-2 text-green-900 transition-all duration-300 hover:bg-lime-400"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
