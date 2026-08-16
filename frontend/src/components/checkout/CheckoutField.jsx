function CheckoutField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
  required = true,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-semibold tracking-[0.5px] text-[#555850]"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`h-[46px] w-full border bg-white px-4 text-sm text-[#25251f] outline-none transition placeholder:text-[#aaa9a2]
          ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-[#d5d3cb] focus:border-[#7c8067]"
          }
        `}
      />

      {error && (
        <p className="mt-1.5 text-[11px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default CheckoutField;