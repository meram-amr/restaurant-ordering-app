import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { getMenu, getunavailableMenu } from "../api/menu";
import CreateMenuModal from "../components/admin/CreateMenuModal";
import EditMenuModal from "../components/admin/EditMenuModal";
import DeleteMenuModal from "../components/admin/DeleteMenuModal";

function MenuManagement() {
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [menu, setMenu] = useState([]);
  const [unavailableMenu, setUnavailableMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError("");

      const menuResponse = await getMenu();
      const falseMenuResponse = await getunavailableMenu();

      setMenu(menuResponse.data || []);
      setUnavailableMenu(falseMenuResponse.data || []);
    } catch (err) {
      console.error("Menu error:", err);

      setError(err.response?.data?.message || "Unable to load menu.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreated = (newItem) => {
    if (newItem.available) {
      setMenu((prevMenu) => [...prevMenu, newItem]);
    } else {
      setUnavailableMenu((prevMenu) => [...prevMenu, newItem]);
    }
  };

  const handleUpdated = (updatedItem) => {
    setMenu((prevMenu) =>
      prevMenu.filter((item) => item.id !== updatedItem.id),
    );

    setUnavailableMenu((prevMenu) =>
      prevMenu.filter((item) => item.id !== updatedItem.id),
    );

    if (updatedItem.available) {
      setMenu((prevMenu) => [...prevMenu, updatedItem]);
    } else {
      setUnavailableMenu((prevMenu) => [...prevMenu, updatedItem]);
    }

    setEditItem(null);
  };

  const handleDeleted = (id) => {
  setMenu((prevMenu) =>
    prevMenu.filter((item) => item.id !== id)
  );

  setUnavailableMenu((prevMenu) =>
    prevMenu.filter((item) => item.id !== id)
  );

  setDeleteItem(null);
};

  const filterMenu = (items) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const filteredMenu = filterMenu(menu);
  const filteredUnavailableMenu = filterMenu(unavailableMenu);

  const MenuCard = ({ item }) => (
    <div
      key={item.id}
      className="overflow-hidden rounded-xl border border-[#deded5] bg-white shadow-sm"
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex justify-between gap-3">
          <div>
            <h2 className="font-playfair text-xl font-semibold text-[#203229]">
              {item.name}
            </h2>

            <p className="mt-1 text-sm capitalize text-gray-500">
              {item.category}
            </p>
          </div>

          <span className="whitespace-nowrap font-semibold text-[#203229]">
            {Number(item.price).toFixed(2)} EGP
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-500">{item.description}</p>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => setEditItem(item)}
            className="flex-1 rounded-md bg-[#163528] py-2.5 text-sm font-semibold text-white transition hover:bg-[#244b3b]"
          >
            Edit
          </button>

          <button
            onClick={() => setDeleteItem(item)}
            className="flex-1 rounded-md border border-red-200 bg-white py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f7f6f1] px-5 py-8 md:px-8 lg:px-10">
      <div>
        <h1 className="font-playfair text-4xl text-[#203229] lg:text-5xl">
          Menu Management
        </h1>

        <p className="mt-2 text-sm text-[#6d736e] lg:text-base">
          Manage your restaurant menu items.
        </p>
      </div>

      <div className="flex flex-col my-8 gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex h-11 w-full items-center rounded-md border border-[#deded5] bg-white px-4 md:w-64">
          <Search size={17} className="text-[#8c918c]" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu..."
            className="ml-3 w-full bg-transparent text-sm outline-none"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-md bg-[#163528] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244b3b]"
        >
          <Plus size={18} />
          Add Menu Item
        </button>
      </div>

      {
        error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )
      }

      {
        loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#d7e87b] border-t-[#163528]" />
          </div>
        ) : (
          <>
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-playfair text-2xl font-semibold text-[#203229]">
                  Available Menu
                </h2>

                <span className="rounded-full bg-[#d7e87b] px-3 py-1 text-xs font-semibold text-[#344333]">
                  {filteredMenu.length} items
                </span>
              </div>

              {filteredMenu.length === 0 ? (
                <div className="rounded-xl border border-[#deded5] bg-white py-12 text-center">
                  <p className="text-sm text-gray-500">
                    No available menu items found.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredMenu.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </section>

            <div className="my-12 flex items-center gap-5">
              <div className="h-px flex-1 bg-[#d4d5cd]" />

              <span className="text-xs font-semibold uppercase tracking-[2px] text-[#858b85]">
                Unavailable
              </span>

              <div className="h-px flex-1 bg-[#d4d5cd]" />
            </div>

            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-playfair text-2xl font-semibold text-[#203229]">
                  Unavailable Menu
                </h2>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                  {filteredUnavailableMenu.length} items
                </span>
              </div>

              {filteredUnavailableMenu.length === 0 ? (
                <div className="rounded-xl border border-[#deded5] bg-white py-12 text-center">
                  <p className="text-sm text-gray-500">
                    No unavailable menu items.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredUnavailableMenu.map((item) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-48 w-full object-cover opacity-60"
                      />

                      <div className="p-5">
                        <div className="flex justify-between gap-3">
                          <div>
                            <h2 className="font-playfair text-xl font-semibold text-[#203229]">
                              {item.name}
                            </h2>

                            <p className="mt-1 text-sm capitalize text-gray-500">
                              {item.category}
                            </p>
                          </div>

                          <span className="whitespace-nowrap font-semibold text-[#203229]">
                            {Number(item.price).toFixed(2)} EGP
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-gray-500">
                          {item.description}
                        </p>

                        <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-center text-xs font-semibold text-red-600">
                          Currently Unavailable
                        </div>

                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => setEditItem(item)}
                            className="flex-1 rounded-md bg-[#163528] py-2.5 text-sm font-semibold text-white transition hover:bg-[#244b3b]"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => setDeleteItem(item)}
                            className="flex-1 rounded-md border border-red-200 bg-white py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )
      }

      {showModal && (
        <CreateMenuModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )
      }

      {
        editItem && (
          <EditMenuModal
            key={editItem.id}
            item={editItem}
            onClose={() => setEditItem(null)}
            onUpdated={handleUpdated}
          />
        )
      }
      {
        deleteItem && (
          <DeleteMenuModal
            item={deleteItem}
            onClose={() => setDeleteItem(null)}
            onDeleted={handleDeleted}
          />
        )
      }
    </main>);
}

export default MenuManagement;
