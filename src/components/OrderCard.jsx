import { LuArrowLeft } from "react-icons/lu";
import OrderStatus from "./OrderStatus";

function OrderCard({ order }) {

    return (
        <div className="bg-white rounded-xl shadow-sm border p-5 md:p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                <div>
                    <p className="text-sm text-gray-400 font-poppins">
                        Order ID
                    </p>

                    <h2 className="font-bold text-green-950 font-poppins">
                        #{order.id}
                    </h2>
                </div>

                <OrderStatus status={order.status} />

            </div>


            <div className="border-t border-b py-4 space-y-4">

                {order.items.map((item) => (

                    <div
                        key={item.menuItemId}
                        className="flex justify-between items-center gap-4"
                    >

                        <div>
                            <p className="font-semibold text-gray-800 font-poppins">
                                {item.name}
                            </p>

                            <p className="text-sm text-gray-400">
                                {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                        </div>

                        <p className="font-semibold text-green-950">
                            ${item.lineTotal.toFixed(2)}
                        </p>

                    </div>

                ))}

            </div>


            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">

                <div>
                    <p className="text-sm text-gray-400">
                        Total
                    </p>

                    <p className="text-xl font-bold text-green-950">
                        ${order.total.toFixed(2)}
                    </p>
                </div>


                <button
                    className="flex items-center justify-center gap-2 border border-green-950 text-green-950 px-5 py-2.5 rounded-lg font-poppins hover:bg-green-950 hover:text-lime-200 transition"
                >
                    View Details

                    <LuArrowLeft
                        className="rotate-180"
                        size={17}
                    />
                </button>

            </div>

        </div>
    );
}

export default OrderCard;