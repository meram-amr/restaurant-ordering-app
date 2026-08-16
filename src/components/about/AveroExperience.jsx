import { Sparkles } from "lucide-react";

function AveroExperience() {
  return (
    <section className="bg-[#f8f8f4] mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">

      <div className="grid items-center gap-12 md:grid-cols-2">

        <div>

          <div className="mb-5 flex items-center gap-2">
            <Sparkles
              size={18}
              className="text-[#aebe62]"
            />

            <span className="font-poppins text-xs font-semibold uppercase tracking-[2px] text-[#7c8067]">
              The AVERO Experience
            </span>
          </div>

          <h2 className="font-playfair text-4xl leading-tight text-[#203229] md:text-5xl">
            More than a meal.
            <br />
            It's an experience.
          </h2>

          <p className="mt-6 font-poppins text-sm leading-7 text-[#6d736e]">
            At AVERO, we care about the moments around the table just
            as much as the food on it. Our atmosphere, service, and
            menu are designed to work together and make every visit
            feel effortless.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5">

            <div className="border-l-2 border-lime-300 pl-4">
              <p className="font-playfair text-2xl text-[#203229]">
                Fresh
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Ingredients
              </p>
            </div>

            <div className="border-l-2 border-lime-300 pl-4">
              <p className="font-playfair text-2xl text-[#203229]">
                Crafted
              </p>

              <p className="mt-1 text-xs text-gray-500">
                With Care
              </p>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <img
            src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=700&q=80"
            alt="AVERO dining"
            className="h-[250px] w-full object-cover"
          />

          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80"
            alt="AVERO dish"
            className="mt-10 h-[250px] w-full object-cover"
          />

        </div>

      </div>
    </section>
  );
}

export default AveroExperience;