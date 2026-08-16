import {
    LuClock3,
    LuCheck,
    LuChefHat,
    LuX,
} from "react-icons/lu";

function OrderStatus({ status }) {

    const statusConfig = {
        pending: {
            className: "bg-yellow-100 text-yellow-700",
            icon: <LuClock3 size={16} />,
        },

        preparing: {
            className: "bg-blue-100 text-blue-700",
            icon: <LuChefHat size={16} />,
        },

        completed: {
            className: "bg-green-100 text-green-700",
            icon: <LuCheck size={16} />,
        },

        cancelled: {
            className: "bg-red-100 text-red-700",
            icon: <LuX size={16} />,
        },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full w-fit text-sm font-poppins capitalize ${config.className}`}
        >
            {config.icon}
            {status}
        </div>
    );
}

export default OrderStatus;