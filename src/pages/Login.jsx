import { useState } from "react";
import axios from "axios";
import { Mail, Lock, ArrowRight, Leaf } from "lucide-react";

const Field = ({
  label,
  icon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) => (
  <div className="mb-5">
    <label className="mb-2 block text-[10px] font-semibold tracking-[0.6px] text-[#5f605a]">
      {label}
    </label>

    <div className="flex h-[47px] w-full items-center border border-[#d1d2cc] bg-white">
      <span className="flex w-[44px] shrink-0 items-center justify-center text-[#858780]">
        {icon}
      </span>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="h-full w-full bg-transparent pr-4 text-[13px] text-[#33332f] outline-none placeholder:text-[#92938e]"
      />
    </div>
  </div>
);

export default function LoginPage({ submit }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      localStorage.setItem("loggedin", response.data.data.token);
      localStorage.setItem("role", response.data.data.user.role);

      setSuccess("Login successful!");
      submit();

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f3]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1240px] items-center justify-center px-8 py-12">
        <div className="grid w-full grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-[80px]">
          <div className="h-[540px] w-full overflow-hidden rounded-[3px] sm:h-[600px] md:h-[620px] lg:h-[650px]">
            <img
              src="/public/Pasted image  .png"
              alt="Grilled salmon with vegetables"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mx-auto w-full max-w-[420px]">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Leaf
                size={23}
                strokeWidth={1.5}
                className="-rotate-[25deg] text-[#b8c96b]"
              />

              <span className="font-serif text-[29px] text-[#344333]">
                Verdeo
              </span>
            </div>

            <h1 className="text-center font-serif text-[27px] font-medium text-[#292924]">
              Welcome Back
            </h1>

            <p className="mx-auto mt-3 mb-9 max-w-[410px] text-center text-[13px] leading-[1.55] text-[#686864]">
              Sign in to reserve tables, track orders, and
              <br className="hidden sm:block" />
              experience food that feels like home.
            </p>

            <form onSubmit={handleSubmit}>
              <Field
                label="EMAIL ADDRESS"
                icon={<Mail size={18} />}
                name="email"
                placeholder="you@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Field
                label="PASSWORD"
                icon={<Lock size={18} />}
                name="password"
                placeholder="••••••••"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />

              <div className="mb-6 flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-[11px] text-[#555850] underline underline-offset-2"
                >
                  Forgot Password?
                </a>
              </div>

              {error && (
                <p className="mb-4 text-center text-[11px] text-red-500">
                  {error}
                </p>
              )}

              {success && (
                <p className="mb-4 text-center text-[11px] text-green-600">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-[43px] w-full items-center justify-center gap-3 bg-[#c3d36b] text-[12px] font-semibold tracking-[0.2px] text-[#30352a] transition hover:bg-[#b5c75b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="mt-8 text-center text-[12px] text-[#777771]">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-[#343831] underline underline-offset-2"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
