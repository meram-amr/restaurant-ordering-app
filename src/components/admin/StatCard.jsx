export default function StatCard({
  title,
  value,
  change,
  subtitle,
  icon,
  dark = false,
}) {
  return (
    <div
      className={`relative min-h-[125px] rounded-lg border p-6 ${
        dark
          ? "border-[#102b21] bg-[#0b281d] text-white"
          : "border-[#deded5] bg-white text-[#26352e]"
      }`}
    >
      <div className="flex items-start justify-between">
        <p className={`text-sm ${dark ? "text-[#9baa9f]" : "text-[#606861]"}`}>
          {title}
        </p>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-md ${
            dark ? "bg-[#18382c] text-[#b7c5bd]" : "bg-[#e8f2b7] text-[#6c783d]"
          }`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-playfair text-3xl">{value}</span>

        {change && (
          <span
            className={`text-xs font-semibold ${
              dark ? "text-[#d7e87b]" : "text-[#73813c]"
            }`}
          >
            {change}
          </span>
        )}

        {subtitle && <span className="text-xs text-[#626a64]">{subtitle}</span>}
      </div>
    </div>
  );
}
