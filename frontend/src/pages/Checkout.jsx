import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";

import CheckoutField from "../components/checkout/CheckoutField";
import OrderSummary from "../components/checkout/OrderSummary";
import SuccessMessage from "../components/checkout/SuccessMessage";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    subtotal,
    clearCart,
  } = useCart();

  const { token, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successOrder, setSuccessOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    switch (name) {
      case "name":
        if (!trimmedValue) {
          return "Full name is required.";
        }

        if (trimmedValue.length < 3) {
          return "Name must be at least 3 characters.";
        }

        return "";

      case "email":
        if (!trimmedValue) {
          return "Email is required.";
        }

        if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            trimmedValue
          )
        ) {
          return "Please enter a valid email address.";
        }

        return "";

      case "phone":
        if (!trimmedValue) {
          return "Phone number is required.";
        }

        if (!/^01[0125][0-9]{8}$/.test(trimmedValue)) {
          return "Enter a valid Egyptian phone number.";
        }

        return "";

      case "address":
        if (!trimmedValue) {
          return "Address is required.";
        }

        if (trimmedValue.length < 5) {
          return "Please enter a more complete address.";
        }

        return "";

      case "city":
        if (!trimmedValue) {
          return "City is required.";
        }

        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(
        field,
        formData[field]
      );

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    setTouched({
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      notes: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    if (cart.length === 0) {
      setServerError(
        "Your cart is empty. Please add items before checkout."
      );
      return;
    }

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await createOrder(
        orderData,
        token
      );

      setSuccessOrder(response.data);

      clearCart();

    } catch (err) {
      console.error("Checkout error:", err);

      if (err.response?.status === 401) {
        logout();

        navigate("/login");
        return;
      }

      setServerError(
        err.response?.data?.message ||
          "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (successOrder) {
    return (
      <SuccessMessage
        orderId={successOrder.id}
      />
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f6f1] px-5">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-[#25251f]">
            Your Cart is Empty
          </h1>
          <p className="mt-3 text-sm text-[#77766f]">
            Add some delicious items before checkout.
          </p>
          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="mt-6 bg-[#081D14] px-7 py-3 text-xs font-semibold text-white"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f6f1] px-5 py-10 md:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="font-serif text-sm italic text-[#7c8067]">
            Almost There
          </p>
          <h1 className="mt-1 font-serif text-4xl text-[#25251f]">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-[#77766f]">
            Complete your details to place your order.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_350px]">
            <section className="border border-[#e2e0d8] bg-white p-6 md:p-8">
              <h2 className="font-serif text-2xl text-[#25251f]">
                Customer Information
              </h2>
              <p className="mt-1 mb-7 text-xs text-[#88877f]">
                Please enter your contact information.
              </p>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <CheckoutField
                  label="FULL NAME"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.name
                      ? errors.name
                      : ""
                  }
                />
                <CheckoutField
                  label="EMAIL ADDRESS"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.email
                      ? errors.email
                      : ""
                  }
                />
                <CheckoutField
                  label="PHONE NUMBER"
                  name="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.phone
                      ? errors.phone
                      : ""
                  }
                />
                <CheckoutField
                  label="CITY"
                  name="city"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.city
                      ? errors.city
                      : ""
                  }
                />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="address"
                  className="mb-2 block text-[11px] font-semibold tracking-[0.5px] text-[#555850]"
                >
                  DELIVERY ADDRESS
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full delivery address"
                  rows={3}
                  className={`w-full resize-none border bg-white px-4 py-3 text-sm text-[#25251f] outline-none transition placeholder:text-[#aaa9a2]
                    ${
                      touched.address &&
                      errors.address
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#d5d3cb] focus:border-[#7c8067]"
                    }
                  `}
                />
                {touched.address &&
                  errors.address && (
                    <p className="mt-1.5 text-[11px] text-red-500">
                      {errors.address}
                    </p>
                  )}
              </div>
              <div className="mt-5">
                <label
                  htmlFor="notes"
                  className="mb-2 block text-[11px] font-semibold tracking-[0.5px] text-[#555850]"
                >
                  ORDER NOTES
                  <span className="ml-1 text-[#aaa9a2]">
                    (OPTIONAL)
                  </span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special requests?"
                  rows={3}
                  className="w-full resize-none border border-[#d5d3cb] bg-white px-4 py-3 text-sm text-[#25251f] outline-none transition placeholder:text-[#aaa9a2] focus:border-[#7c8067]"
                />
              </div>
              {serverError && (
                <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-xs leading-5 text-red-600">
                    {serverError}
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex h-[48px] w-full items-center justify-center bg-[#081D14] text-xs font-semibold text-white transition hover:bg-[#123b29] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>
            </section>
            <OrderSummary
              cart={cart}
              subtotal={subtotal}
            />
          </div>
        </form>
      </div>
    </main>
  );
}

export default Checkout;