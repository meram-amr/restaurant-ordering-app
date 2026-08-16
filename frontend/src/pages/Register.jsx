import { LuLeaf } from "react-icons/lu";
import registerImage from "../assets/register.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/auth";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            navigate("/login");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto my-6 md:my-10 px-4">
            <div className="bg-green-950 text-white shadow-lg rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6">

                <div className="w-full md:w-1/2">
                    <img
                        src={registerImage}
                        alt="Avero Restaurant"
                        className="w-full h-64 sm:h-80 md:h-[600px] object-cover rounded-lg"
                    />
                </div>

                <div className="w-full md:flex-1 flex flex-col items-center text-center justify-center py-4 md:py-8">

                    <div className="flex items-center mb-4">
                        <LuLeaf className="text-lime-300 text-xl mr-2" />

                        <h1 className="text-2xl font-bold text-white font-playfair tracking-widest">
                            AVERO
                        </h1>
                    </div>

                    <span className="text-lime-200 font-poppins text-lg">
                        JOIN US
                    </span>

                    <p className="text-lime-200 font-poppins text-sm md:text-base mt-2 px-2">
                        Create your account to start ordering delicious meals!
                    </p>

                    <div className="w-full max-w-sm text-black">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3 mt-5"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2"
                            />

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2"
                            />

                            {error && (
                                <p className="text-red-400 text-sm font-poppins">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-lime-200 mt-3 text-green-950 font-bold py-3 px-4 rounded-lg hover:bg-lime-300 transition duration-200 disabled:opacity-50"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Register"}
                            </button>
                        </form>

                        <p className="mt-5 text-sm font-poppins text-gray-300">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-lime-200 underline font-semibold hover:text-lime-300 transition-colors duration-300"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;