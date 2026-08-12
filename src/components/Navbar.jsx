import { useState } from "react";
import { Link } from "react-router-dom";
import { LuLeaf, LuMenu, LuX } from "react-icons/lu";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinkStyle =
        "relative font-poppins text-white hover:text-lime-300 transition-colors duration-300 " +
        "after:content-[''] after:absolute after:left-0 after:-bottom-1 " +
        "after:h-[2px] after:w-0 after:bg-lime-300 " +
        "after:transition-all after:duration-300 " +
        "hover:after:w-full";

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
                    </Link>

                </div>

                <Link
                    to="/menu"
                    className="hidden md:block bg-lime-300 text-green-900 px-4 py-2 rounded-md font-poppins font-semibold hover:bg-lime-400 transition-all duration-300"
                >
                    Order Now
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white text-3xl hover:text-lime-300 transition-colors duration-300"
                >
                    {isOpen ? <LuX /> : <LuMenu />}
                </button>

            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ${isOpen ? "max-h-96 opacity-100 mt-5" : "max-h-0 opacity-0"
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
                    </Link>

                    <Link
                        to="/menu"
                        onClick={() => setIsOpen(false)}
                        className="bg-lime-300 text-green-900 px-6 py-2 rounded-md hover:bg-lime-400 transition-all duration-300"
                    >
                        Order Now
                    </Link>

                </div>
            </div>

        </nav>
    );
}

export default Navbar;