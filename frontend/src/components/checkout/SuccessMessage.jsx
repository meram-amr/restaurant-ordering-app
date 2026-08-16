import { Link } from "react-router-dom";
import { Check } from "lucide-react";

function SuccessMessage({ orderId }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f6f1] px-5">
      <div className="w-full max-w-[500px] border border-[#e2e0d8] bg-white px-6 py-12 text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dce8a4]">
          <Check
            size={30}
            className="text-[#344333]"
          />
        </div>

        <p className="mt-6 font-serif text-sm italic text-[#7c8067]">
          Thank You
        </p>

        <h1 className="mt-1 font-serif text-3xl text-[#25251f]">
          Order Confirmed
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#77766f]">
          Your order has been placed successfully.
          We’ll start preparing it shortly.
        </p>

        {orderId && (
          <p className="mt-4 text-xs text-[#999890]">
            Order ID:{" "}
            <span className="font-medium text-[#555850]">
              {orderId}
            </span>
          </p>
        )}

        <Link
          to="/orders"
          className="mt-7 inline-flex bg-[#081D14] px-7 py-3 text-xs font-semibold text-white transition hover:bg-[#123b29]"
        >
          View My Orders
        </Link>

      </div>
    </div>
  );
}

export default SuccessMessage;