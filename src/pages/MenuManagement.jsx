import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { getMenu } from "../api/menu";
import CreateMenuModal from "../components/admin/CreateMenuModal";

function MenuManagement() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getMenu();

            setMenu(response.data || []);
        } catch (err) {
            console.error("Menu error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load menu."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCreated = (newItem) => {
        setMenu((prevMenu) => [
            ...prevMenu,
            newItem,
        ]);
    };

    const filteredMenu = menu.filter((item) =>
        item.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f7f6f1] text-[#24352d] p-6">

            <div className="mx-auto max-w-[1250px] lg:px-10 lg:py-10">

                <div className="mb-10 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                    <div>
                        <h1 className="font-playfair text-4xl text-[#203229] lg:text-5xl">
                            Menu Management
                        </h1>

                        <p className="mt-2 text-sm text-[#6d736e] lg:text-base">
                            Manage your restaurant menu items.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

                        <div className="h-11 w-full md:w-64 items-center rounded-md border border-[#deded5] bg-white px-4 flex">

                            <Search
                                size={17}
                                className="text-[#8c918c]"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search menu..."
                                className="ml-3 w-full bg-transparent text-sm outline-none"
                            />

                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center gap-2 rounded-md bg-[#163528] px-5 py-3 text-sm font-semibold text-white hover:bg-[#244b3b] transition"
                        >
                            <Plus size={18} />
                            Add Menu Item
                        </button>

                    </div>
                </div>

                {error && (
                    <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {loading ? (

                    <div className="flex justify-center py-20">

                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#d7e87b] border-t-[#163528]" />

                    </div>

                ) : filteredMenu.length === 0 ? (

                    <div className="rounded-xl border border-[#deded5] bg-white py-16 text-center">

                        <p className="font-playfair text-xl text-[#203229]">
                            No menu items found
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Try another search or add a new menu item.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredMenu.map((item) => (

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
                                            ${Number(item.price).toFixed(2)}
                                        </span>

                                    </div>

                                    <p className="mt-3 text-sm text-gray-500">
                                        {item.description}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {showModal && (
                <CreateMenuModal
                    onClose={() => setShowModal(false)}
                    onCreated={handleCreated}
                />
            )}

        </div>
    );
}

export default MenuManagement;