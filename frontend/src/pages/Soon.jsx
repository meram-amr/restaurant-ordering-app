import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
export default function Soon() {
  return (
    <div className="min-h-screen bg-[#f7f6f1] px-6 text-[#24352d]">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8 flex items-center justify-center gap-2">
            <Leaf size={30} className="-rotate-[25deg] text-[#b8d34f]" />

            <h1 className="font-playfair text-3xl font-bold tracking-[4px] text-[#26362e]">
              AVERO
            </h1>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="h-px w-20 bg-[#cfd4a3]" />
          </div>

          <p className="mb-4 font-poppins text-xs font-semibold uppercase tracking-[4px] text-[#8a918b]">
            Something Special Is Coming
          </p>

          <h2 className="font-playfair text-5xl font-medium leading-tight text-[#203229] sm:text-6xl lg:text-7xl">
            Coming Soon
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#6d756f] sm:text-base">
            We're preparing something delicious for you. Our new experience will
            be available very soon.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              to="/admin/dashboard"
              className="rounded-md bg-[#163528] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#244b3b]"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
