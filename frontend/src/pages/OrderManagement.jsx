import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import {
    Eye,
    Check,
    X,
    Clock,
    PackageCheck,
    Ban,
    Loader2,
} from "lucide-react";

import {
    getAllOrders,
    updateOrderStatus,
} from "../api/orders";

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    const { token } = useAuth();

    // =========================
    // GET ALL ORDERS
    // =========================

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAllOrders(token);

            setOrders(response.data || []);
        } catch (err) {
            console.error("Failed to fetch orders:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load orders."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const handleStatusChange = async (orderId, status) => {
        try {
            setUpdatingId(orderId);

            const response = await updateOrderStatus(
                orderId,
                status,
                token
            );

            const updatedOrder = response.data;

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? {
                            ...order,
                            ...updatedOrder,
                        }
                        : order
                )
            );

            setSelectedOrder((prev) =>
                prev && prev.id === orderId
                    ? {
                        ...prev,
                        ...updatedOrder,
                    }
                    : prev
            );
        } catch (err) {
            console.error("Failed to update order:", err);

            alert(
                err.response?.data?.message ||
                "Failed to update order status."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "completed":
                return "bg-green-100 text-green-700";

            case "cancelled":
                return "bg-red-100 text-red-600";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock size={13} />;

            case "completed":
                return <PackageCheck size={13} />;

            case "cancelled":
                return <Ban size={13} />;

            default:
                return null;
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f7f6f1] px-5 py-10">
                <div className="flex min-h-[400px] items-center justify-center">
                    <Loader2
                        className="animate-spin text-[#526044]"
                        size={28}
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7f6f1] px-5 py-8 md:px-8 lg:px-10">


            <div className="mb-8">


                <h1 className="font-playfair text-4xl text-[#203229] lg:text-5xl">
                    Orders Management
                </h1>

                <p className="mt-2 text-sm text-[#6d736e] lg:text-base">
                    View and manage customer orders.
                </p>

            </div>


            {/* ================= ERROR ================= */}

            {error && (
                <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}


            {/* ================= EMPTY ================= */}

            {!error && orders.length === 0 && (
                <div className="rounded-lg border border-[#deddd7] bg-white p-12 text-center">

                    <p className="font-serif text-lg text-[#44453f]">
                        No orders yet.
                    </p>

                    <p className="mt-2 text-sm text-[#85867e]">
                        Customer orders will appear here.
                    </p>

                </div>
            )}


            {/* ================= ORDERS TABLE ================= */}

            {orders.length > 0 && (
                <div className="overflow-hidden rounded-lg border border-[#deddd7] bg-white shadow-sm">

                    {/* Desktop Table */}

                    <div className="hidden overflow-x-auto md:block">

                        <table className="w-full">

                            <thead className="border-b border-[#deddd7] bg-[#efeee9]">

                                <tr>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#666b63]">
                                        Customer
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#666b63]">
                                        Order
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#666b63]">
                                        Total
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#666b63]">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#666b63]">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {orders.map((order) => (

                                    <tr
                                        key={order.id}
                                        className="border-b border-[#eeeeea] last:border-0 hover:bg-[#fafaf7]"
                                    >

                                        {/* CUSTOMER */}

                                        <td className="px-5 py-5">

                                            <div>

                                                <p className="text-sm font-semibold text-[#30372f]">
                                                    {order.user?.name || "Unknown User"}
                                                </p>

                                                <p className="mt-1 text-xs text-[#858780]">
                                                    {order.user?.email || "No email"}
                                                </p>

                                            </div>

                                        </td>


                                        {/* ORDER */}

                                        <td className="px-5 py-5">

                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-left"
                                            >

                                                <p className="text-sm font-semibold text-[#3d473e] hover:text-[#71843f]">
                                                    {order.items?.length || 0} item
                                                    {order.items?.length === 1 ? "" : "s"}
                                                </p>

                                                <p className="mt-1 text-[11px] text-[#999b94]">
                                                    #{order.id}
                                                </p>

                                            </button>

                                        </td>


                                        {/* TOTAL */}

                                        <td className="px-5 py-5">

                                            <span className="text-sm font-semibold text-[#30372f]">
                                                {order.total} EGP
                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td className="px-5 py-5">

                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                                                    order.status
                                                )}`}
                                            >

                                                {getStatusIcon(order.status)}

                                                {order.status}

                                            </span>

                                        </td>


                                        {/* ACTION */}

                                        <td className="px-5 py-5">

                                            <div className="flex items-center justify-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        setSelectedOrder(order)
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#d8d9d2] text-[#555d57] transition hover:bg-[#efeee9]"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>


                                                {order.status === "pending" && (
                                                    <>
                                                        <button
                                                            disabled={
                                                                updatingId === order.id
                                                            }
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    order.id,
                                                                    "completed"
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-md bg-[#d7e87b] text-[#526044] transition hover:bg-[#c7d86a] disabled:opacity-50"
                                                            title="Accept Order"
                                                        >
                                                            {updatingId === order.id ? (
                                                                <Loader2
                                                                    size={15}
                                                                    className="animate-spin"
                                                                />
                                                            ) : (
                                                                <Check size={16} />
                                                            )}
                                                        </button>


                                                        <button
                                                            disabled={
                                                                updatingId === order.id
                                                            }
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    order.id,
                                                                    "rejected"
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-md bg-red-100 text-red-600 transition hover:bg-red-200 disabled:opacity-50"
                                                            title="Reject Order"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </>
                                                )}

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    {/* ================= MOBILE CARDS ================= */}

                    <div className="divide-y divide-[#eeeeea] md:hidden">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="p-5"
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <p className="text-sm font-semibold text-[#30372f]">
                                            {order.user?.name || "Unknown User"}
                                        </p>

                                        <p className="mt-1 text-xs text-[#858780]">
                                            {order.user?.email || "No email"}
                                        </p>

                                    </div>


                                    <span
                                        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${getStatusStyle(
                                            order.status
                                        )}`}
                                    >

                                        {getStatusIcon(order.status)}

                                        {order.status}

                                    </span>

                                </div>


                                <div className="mt-4 flex items-center justify-between">

                                    <div>

                                        <p className="text-xs text-[#858780]">
                                            {order.items?.length || 0} items
                                        </p>

                                        <p className="mt-1 text-base font-semibold text-[#30372f]">
                                            {order.total} EGP
                                        </p>

                                    </div>


                                    <div className="flex gap-2">

                                        <button
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                            className="flex h-9 items-center gap-2 rounded-md border border-[#d8d9d2] px-3 text-xs font-semibold text-[#555d57]"
                                        >
                                            <Eye size={15} />
                                            View
                                        </button>


                                        {order.status === "pending" && (
                                            <>
                                                <button
                                                    disabled={
                                                        updatingId === order.id
                                                    }
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            order.id,
                                                            "completed"
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-md bg-[#d7e87b] text-[#526044]"
                                                >
                                                    <Check size={16} />
                                                </button>

                                                <button
                                                    disabled={
                                                        updatingId === order.id
                                                    }
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            order.id,
                                                            "rejected"
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-md bg-red-100 text-red-600"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </>
                                        )}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            )}


            {/* ================= DETAILS MODAL ================= */}

            {selectedOrder && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setSelectedOrder(null)}
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-lg bg-[#f7f6f1] shadow-2xl"
                    >

                        {/* MODAL HEADER */}

                        <div className="flex items-start justify-between border-b border-[#deddd7] px-6 py-5">

                            <div>

                                <p className="font-serif text-xl text-[#293128]">
                                    Order Details
                                </p>

                                <p className="mt-1 text-[11px] text-[#898b83]">
                                    #{selectedOrder.id}
                                </p>

                            </div>


                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="flex h-8 w-8 items-center justify-center rounded-md text-[#666b63] hover:bg-[#e7e6df]"
                            >
                                <X size={18} />
                            </button>

                        </div>


                        {/* CUSTOMER */}

                        <div className="border-b border-[#deddd7] px-6 py-5">

                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#858780]">
                                Customer
                            </p>

                            <p className="text-sm font-semibold text-[#30372f]">
                                {selectedOrder.user?.name || "Unknown User"}
                            </p>

                            <p className="mt-1 text-xs text-[#858780]">
                                {selectedOrder.user?.email || "No email"}
                            </p>

                        </div>


                        {/* ITEMS */}

                        <div className="px-6 py-5">

                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-[#858780]">
                                Order Items
                            </p>


                            <div className="space-y-3">

                                {selectedOrder.items?.map((item, index) => (

                                    <div
                                        key={`${item.menuItemId}-${index}`}
                                        className="flex items-center justify-between gap-4 border-b border-[#e5e5df] pb-3 last:border-0"
                                    >

                                        <div>

                                            <p className="text-sm font-semibold text-[#343b35]">
                                                {item.name}
                                            </p>

                                            <p className="mt-1 text-xs text-[#858780]">
                                                {item.quantity} × {item.price} EGP
                                            </p>

                                        </div>


                                        <p className="text-sm font-semibold text-[#343b35]">
                                            {item.lineTotal} EGP
                                        </p>

                                    </div>

                                ))}

                            </div>


                            {/* TOTAL */}

                            <div className="mt-5 flex items-center justify-between border-t border-[#cfd0c8] pt-4">

                                <span className="font-serif text-lg text-[#343b35]">
                                    Total
                                </span>

                                <span className="text-xl font-semibold text-[#30372f]">
                                    {selectedOrder.total} EGP
                                </span>

                            </div>

                        </div>


                        {/* STATUS + ACTIONS */}

                        <div className="border-t border-[#deddd7] px-6 py-5">

                            <div className="mb-5 flex items-center justify-between">

                                <span className="text-xs font-semibold text-[#666b63]">
                                    Current Status
                                </span>

                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                                        selectedOrder.status
                                    )}`}
                                >

                                    {getStatusIcon(selectedOrder.status)}

                                    {selectedOrder.status}

                                </span>

                            </div>


                            {selectedOrder.status === "pending" && (

                                <div className="flex gap-3">

                                    <button
                                        disabled={
                                            updatingId === selectedOrder.id
                                        }
                                        onClick={() =>
                                            handleStatusChange(
                                                selectedOrder.id,
                                                "completed"
                                            )
                                        }
                                        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#163528] py-3 text-sm font-semibold text-white transition hover:bg-[#244b3b] disabled:opacity-50"
                                    >

                                        {updatingId === selectedOrder.id ? (
                                            <Loader2
                                                size={16}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <Check size={16} />
                                        )}

                                        Accept Order

                                    </button>


                                    <button
                                        disabled={
                                            updatingId === selectedOrder.id
                                        }
                                        onClick={() =>
                                            handleStatusChange(
                                                selectedOrder.id,
                                                "cancelled"
                                            )
                                        }
                                        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-red-100 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-200 disabled:opacity-50"
                                    >

                                        <X size={16} />

                                        Reject Order

                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}

export default OrderManagement;