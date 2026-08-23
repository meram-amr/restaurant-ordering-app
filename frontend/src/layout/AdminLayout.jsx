import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import Navbar from "../components/Navbar";
import Sidebar from "../components/admin/Sidebar";
import Footer from "../components/Footer";
import { getMe } from "../api/auth";

function AdminLayout() {
  const navigate = useNavigate();

  const { token, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        setLoading(true);

        const response = await getMe(token);

        setUser(response.data);
      } catch (error) {
        console.error("Failed to get user:", error);

        logout();
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, navigate, logout]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f1]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#d7e87b] border-t-[#163528]" />

          <p className="mt-4 text-sm font-medium text-[#59635d]">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f1]">
      <Navbar
        user={user}
        isAdmin={true}
        setSidebarOpen={setSidebarOpen}
        setUser={setUser}
      />

      <div className="flex items-stretch">
        <Sidebar
          user={user}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <main className="min-w-0 flex-1 md:ml-[280px]">
          <Outlet />
        </main>
      </div>

      <div className="md:ml-[280px]">
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;