import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserLayout({ user, setUser }) {
    return (
        <>
            <Navbar user={user} setUser={setUser} />

            <Outlet />

            <Footer />
        </>
    );
}

export default UserLayout;