import { NavLink } from "react-router-dom";
function Hero() {
  return (
    <section className="bg-[#06251b] text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[480px]">
        <div className="flex flex-col justify-center px-6 md:px-12 py-12">
          <p className="text-[#b7c96b] font-serif italic text-lg mb-3">
            Good Food. Great Mood.
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            Experience Food
            <br />
            That Feels Like
            <br />
            <span className="text-[#b7c96b] italic">Home</span>
          </h1>
          <p className="text-gray-300 text-sm leading-6 max-w-md mt-5">
            From fresh ingredients to unforgettable flavors, our dishes are made
            with love and served with a taste of home.
          </p>
          <div className="mt-7 flex gap-3">
            <NavLink
              to="/menu"
              className="rounded-md bg-[#c7d66b] px-5 py-3 text-sm font-bold text-[#06251b] transition hover:bg-[#d6e47e]"
            >
              Explore Our Menu
            </NavLink>

            <NavLink
              to="/orders"
              className="rounded-md border border-lime-300 px-5 py-3 text-sm font-bold text-lime-300 transition hover:bg-lime-300 hover:text-[#081D14]"
            >
              Book a Table
            </NavLink>
          </div>
        </div>
        <div className="flex items-center justify-center p-6">
          <img
            src="https://i.pinimg.com/736x/d0/7e/13/d07e1355c10427c1fff384df36bcfcc8.jpg"
            alt="Delicious food"
            className="w-[80%] h-[80%] object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
