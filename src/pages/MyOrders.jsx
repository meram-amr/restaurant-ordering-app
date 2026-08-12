import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orders";

import OrderCard from "../components/OrderCard";
import EmptyOrders from "../components/EmptyOrders";

function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await getMyOrders(token);

            setOrders(response.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load your orders."
            );

        } finally {

            setLoading(false);

        }
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">

                <p className="text-green-950 font-poppins">
                    Loading your orders...
                </p>

            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">

                <p className="text-red-500 font-poppins">
                    {error}
                </p>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">

            <div className="max-w-6xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-3xl md:text-4xl font-bold font-playfair text-green-950">
                        My Orders
                    </h1>

                    <p className="mt-2 text-gray-500 font-poppins">
                        Track and manage your recent orders
                    </p>

                </div>


                {orders.length === 0 ? (

                    <EmptyOrders />

                ) : (

                    <div className="space-y-5">

                        {orders.map((order) => (

                            <OrderCard
                                key={order.id}
                                order={order}
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default MyOrders;