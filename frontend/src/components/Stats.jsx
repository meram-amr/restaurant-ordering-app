import { BsForkKnife } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineMenuBook } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";

const stats = [
  {
    icon: BsForkKnife,
    number: "12+",
    text: "Years of Experience",
  },
  {
    icon: FaUsers,
    number: "25K+",
    text: "Happy Customers",
  },
  {
    icon: MdOutlineMenuBook,
    number: "150+",
    text: "Menu Items",
  },
  {
    icon: CiLocationOn,
    number: "5",
    text: "Locations",
  },
  {
    icon: FaRegStar,
    number: "4.8",
    text: "Average Rating",
  },
];

function Stats() {
  return (
    <section className="bg-white py-8 mb-10 border border-[#E0DFC9]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<div
								key={index}
								className="flex items-center justify-center gap-3"
							>
								<Icon
									size={20}
									className="text-[#163f30]"
								/>
								<div>
									<h3 className="font-bold text-[#163f30] text-sm">
										{stat.number}
									</h3>
									<p className="text-[10px] text-gray-500">
										{stat.text}
									</p>
								</div>
							</div>
						);
					})}
        </div>
      </div>
    </section>
  );
}

export default Stats;