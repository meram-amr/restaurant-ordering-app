import { LuLeaf } from "react-icons/lu";
import { PiChefHatLight } from "react-icons/pi";
import { BsForkKnife } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { IoHeart } from "react-icons/io5";

const features = [
  {
    icon: <LuLeaf />,
    title: "Fresh Ingredients",
    text: "Only the freshest ingredients.",
  },
  {
    icon: <PiChefHatLight />,
    title: "Expert Chefs",
    text: "Crafted with passion and care.",
  },
  {
    icon: <BsForkKnife />,
    title: "Cozy Ambiance",
    text: "A perfect place to relax.",
  },
  {
    icon: <MdGroups />,
    title: "Great Prices",
    text: "Premium taste at fair prices.",
  },
  {
    icon: <IoHeart />,
    title: "Happy Customers",
    text: "Your satisfaction comes first.",
  },
];
function Features() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center"
            >
              <div className="w-10 h-10 flex items-center justify-center mb-3 text-[#163f30] text-xl">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-[#163f30]">
                {feature.title}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;