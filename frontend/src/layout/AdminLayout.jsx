import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/admin/Sidebar";
import Footer from "../components/Footer";
import { getMe } from "../api/auth";

function AdminLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const token = useAuth("loggedin");

        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const response = await getMe(token);

        setUser(response.data);
      } catch (error) {
        console.error("Failed to get user:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load your account information.",
        );

        // Remove invalid login
        localStorage.removeItem("loggedin");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

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

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f1] px-5">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h2 className="font-playfair text-2xl font-semibold text-[#203229]">
            Something went wrong
          </h2>

          <p className="mt-3 text-sm text-red-600">{error}</p>

          <button
            onClick={() => navigate("/login", { replace: true })}
            className="mt-6 rounded-md bg-[#0b281d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163b2c]"
          >
            Go to Login
          </button>
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
        <Sidebar user={user} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

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
