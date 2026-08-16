import { LuChefHat } from "react-icons/lu";
import { Link } from "react-router-dom";

function EmptyOrders() {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-10 text-center">

            <LuChefHat
                size={50}
                className="mx-auto text-green-950"
            />

            <h2 className="text-xl font-bold text-green-950 mt-4 font-playfair">
                No orders yet
            </h2>

            <p className="text-gray-500 mt-2 font-poppins">
                Start ordering your favorite meals!
            </p>

            <Link
                to="/menu"
                className="inline-block mt-5 bg-green-950 text-lime-200 px-6 py-2.5 rounded-lg font-poppins hover:bg-green-900 transition"
            >
                Explore Menu
            </Link>

        </div>
    );
}

export default EmptyOrders;