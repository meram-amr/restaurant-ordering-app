import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

function AboutHero() {
  return (
    <section className="overflow-hidden bg-[#06251b]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-10 lg:py-28">

        <div>
          <div className="mb-5 flex items-center gap-2">
            <Leaf
              size={20}
              className="text-lime-300"
            />

            <span className="font-poppins text-xs font-semibold uppercase tracking-[3px] text-lime-300">
              About AVERO
            </span>
          </div>

          <h1 className="font-playfair text-5xl leading-tight text-white md:text-6xl">
            Where Flavor
            <br />
            Meets Elegance
          </h1>

          <p className="mt-6 max-w-lg font-poppins text-sm leading-7 text-gray-300">
            AVERO is more than a restaurant. It is a place where
            carefully crafted dishes, fresh ingredients, and warm
            hospitality come together to create memorable moments.
          </p>

          <Link
            to="/menu"
            className="mt-8 inline-flex rounded-md bg-lime-300 px-6 py-3 font-poppins text-sm font-semibold text-green-950 transition hover:bg-lime-400"
          >
            Explore Our Menu
          </Link>
        </div>

        <div className="overflow-hidden">
          <img
            src="https://i.pinimg.com/originals/5c/60/e2/5c60e21e8c205aefb8740f8889c4f40b.jpg?utm_source=chatgpt.com"
            alt="AVERO restaurant food"
            className="h-[430px] w-full object-cover md:h-[500px]"
          />
        </div>

      </div>
    </section>
  );
}

export default AboutHero;