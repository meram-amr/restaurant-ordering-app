import { useState } from "react";
import { X } from "lucide-react";
import { updateMenuItem } from "../../api/menu";

function EditMenuModal({ item, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    image: item?.image || "",
    category: item?.category || "",
    description: item?.description || "",
    price: item?.price || "",
    available: item?.available ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("loggedin");

      const response = await updateMenuItem(
        item.id,
        {
          name: formData.name,
          image: formData.image,
          category: formData.category,
          description: formData.description,
          price: Number(formData.price),
          available: formData.available,
        },
        token,
      );

      onUpdated(response.data.data);
      onClose();
    } catch (err) {
      console.error("Update menu error:", err);

      setError(err.response?.data?.message || "Failed to update menu item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="font-playfair text-2xl text-[#203229]">
              Edit Menu Item
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Update your restaurant menu item.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Item Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-[#9fb052]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Image URL
              </label>

              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-[#9fb052]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-[#9fb052]"
              >
                <option value="">Select category</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
                className="w-full resize-none rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-[#9fb052]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Price
              </label>

              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-[#9fb052]"
              />
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm font-semibold text-gray-700">
                Available
              </span>
            </label>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t bg-white px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#0b281d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#163b2c] disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Menu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMenuModal;
