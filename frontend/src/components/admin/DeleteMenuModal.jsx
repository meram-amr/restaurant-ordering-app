import { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { deleteMenuItem } from "../../api/menu";

import { useAuth } from "../../context/useAuth";

function DeleteMenuModal({ item, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useAuth();

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      await deleteMenuItem(item.id, token);

      onDeleted(item.id);
      onClose();
    } catch (err) {
      console.error("Delete error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete this menu item."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-[470px] rounded-md border border-[#dcdcd6] bg-white p-7 shadow-xl">

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
          <IoWarning
            size={25}
            strokeWidth={2}
            className="text-red-600"
          />
        </div>

        <h2 className="mt-4 text-center font-playfair text-2xl text-[#292923]">
          Delete Menu Item
        </h2>

        <p className="mx-auto mt-3 max-w-[360px] text-center text-xs leading-5 text-[#666861]">
          Are you sure you want to delete this item? This
          action cannot be undone and will remove it from all
          menus immediately.
        </p>

        <div className="mt-5 flex gap-3 rounded-md border border-[#d8d8d2] bg-[#f3f3ef] p-2">

          <img
            src={item.image}
            alt={item.name}
            className="h-[55px] w-[55px] shrink-0 object-cover"
          />

          <div className="min-w-0">

            <h3 className="font-playfair text-base text-[#292923]">
              {item.name}
            </h3>

            <p className="mt-0.5 line-clamp-2 text-[10px] text-[#666861]">
              {item.description}
            </p>

            <p className="mt-0.5 text-xs font-semibold text-[#292923]">
              {Number(item.price).toFixed(2)} EGP
            </p>

          </div>
        </div>

        {error && (
          <p className="mt-4 text-center text-xs text-red-500">
            {error}
          </p>
        )}

        <div className="mt-5 flex gap-3">

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-[#c91414] py-3 text-[10px] font-semibold tracking-wide text-white transition hover:bg-[#a91010] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Yes, Delete Item"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border border-[#777] bg-white py-3 text-[10px] font-semibold tracking-wide text-[#333] transition hover:bg-[#f3f3ef] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Keep Item
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteMenuModal;