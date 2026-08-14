import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/admin/Sidebar";
import Footer from "../components/Footer";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const user = {
        name: "Admin",
        email: "admin@example.com",
    };

    return (
        <div className="min-h-screen bg-[#f7f6f1]">

            {/* Navbar */}
            <Navbar
                user={user}
                isAdmin={true}
                setSidebarOpen={setSidebarOpen}
                setUser={() => { }}
            />

            {/* Sidebar + Content */}
            <div className="flex items-stretch">

                <Sidebar
                    user={user}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>

            </div>

            {/* Full Width Footer */}
            <Footer />

        </div>
    );
}

export default AdminLayout;