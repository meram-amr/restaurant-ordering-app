import { Leaf, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
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

          <p className="font-poppins text-8xl font-semibold tracking-tight text-[#d7e87b] sm:text-9xl">
            404
          </p>

          <h2 className="mt-4 font-playfair text-4xl text-[#203229] sm:text-5xl">
            Page Not Found
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#6d756f] sm:text-base">
            Sorry, the page you're looking for doesn't exist or may have been
            moved somewhere else.
          </p>

          <Link
            to="/"
            className="mt-9 inline-flex items-center gap-2 rounded-md bg-[#163528] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#244b3b]"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
