import { useState } from "react";
import { Link } from "react-router-dom";
import { LuLeaf, LuMenu, LuX } from "react-icons/lu";
import { useCart } from "../context/CartContext";

function Navbar({
  user,
  setUser,
  isAdmin = false,
  setSidebarOpen
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { cartCount } = useCart();

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
    window.location.href = "/login";

  };

  return (
    <nav className="bg-[#081D14] z-50 px-5 py-4 shadow-lg">

      <div className="flex justify-between items-center">

        <Link to="/" onClick={() => setIsOpen(false)}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <LuLeaf className="text-lime-300 text-xl mr-2" />

              <h1 className="text-2xl font-bold text-white font-playfair tracking-widest">
                AVERO
              </h1>
            </div>

            <p className="text-sm text-lime-300 font-poppins">
              Where Flavor Meets Elegance
            </p>
          </div>
        </Link>


        {!isAdmin && (
          <>
            <div className="hidden md:flex items-center space-x-6 text-white text-lg font-poppins font-semibold">

              <Link to="/" className={navLinkStyle}>
                Home
              </Link>

              <Link to="/menu" className={navLinkStyle}>
                Menu
              </Link>

              <Link to="/about" className={navLinkStyle}>
                About
              </Link>

              <Link to="/orders" className={navLinkStyle}>
                My Orders
              </Link>

              <Link to="/cart" className={navLinkStyle}>
                Cart
                {cartCount > 0 && (
                  <span className="ml-1 text-lime-300">
                    ({cartCount})
                  </span>
                )}
              </Link>

            </div>
          </>
        )}
        {isAdmin && (
          <>
            <div className="hidden md:flex items-center space-x-6 text-white text-lg font-poppins font-semibold">

              <Link to="/" className={navLinkStyle}>
                Home
              </Link>

            

              <Link to="/admin/dashboard" className={navLinkStyle}>
                Dashboard
              </Link>

             

            </div>
          </>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="hidden md:block rounded-md bg-lime-300 px-4 py-2 font-poppins font-semibold text-green-900 transition-all duration-300 hover:bg-lime-400"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="hidden md:block rounded-md bg-lime-300 px-4 py-2 font-poppins font-semibold text-green-900 transition-all duration-300 hover:bg-lime-400"
          >
            Log In
          </Link>
        )}

        {isAdmin ? (
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
          >
            <LuMenu size={24} />
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-3xl hover:text-lime-300 transition-colors duration-300"
          >
            {isOpen ? <LuX /> : <LuMenu />}
          </button>
        )}

      </div>


      {!isAdmin && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${isOpen
            ? "max-h-96 opacity-100 mt-5"
            : "max-h-0 opacity-0"
            }`}
        >

          <div className="flex flex-col items-center gap-5 pb-4 font-poppins font-semibold">

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              Home
            </Link>

            <Link
              to="/menu"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              Menu
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              About
            </Link>

            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              My Orders
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              Cart
              {cartCount > 0 && (
                <span className="ml-1 text-lime-300">
                  ({cartCount})
                </span>
              )}
            </Link>

            {user && (
              <button
                onClick={handleLogout}
                className="bg-lime-300 text-green-900 px-6 py-2 rounded-md hover:bg-lime-400 transition-all duration-300"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}

    </nav>
  );
}

export default Navbar;