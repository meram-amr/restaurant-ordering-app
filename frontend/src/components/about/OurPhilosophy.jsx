import { Leaf, Utensils, Heart } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    text: "We believe quality starts with choosing fresh, carefully selected ingredients.",
  },
  {
    icon: Utensils,
    title: "Crafted With Care",
    text: "Every dish is prepared with attention to flavor, balance, and presentation.",
  },
  {
    icon: Heart,
    title: "Made For You",
    text: "We create a welcoming experience where every guest feels at home.",
  },
];

function OurPhilosophy() {
  return (
    <section className="bg-[#06251b] px-6 py-20 md:px-10 md:py-24">

      <div className="mx-auto max-w-6xl">

        <div className="mx-auto max-w-2xl text-center">

          <p className="font-playfair text-sm italic text-lime-300">
            What We Believe
          </p>

          <h2 className="mt-2 font-playfair text-4xl text-white md:text-5xl">
            Our Philosophy
          </h2>

          <p className="mt-5 font-poppins text-sm leading-7 text-gray-400">
            Every detail matters when creating an experience that
            people want to come back to.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="border border-white/10 bg-white/[0.03] p-8 text-center transition hover:bg-white/[0.06]"
              >

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-300">
                  <Icon
                    size={24}
                    className="text-[#203229]"
                  />
                </div>

                <h3 className="mt-6 font-playfair text-2xl text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 font-poppins text-xs leading-6 text-gray-400">
                  {feature.text}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default OurPhilosophy;