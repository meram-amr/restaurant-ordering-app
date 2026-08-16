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
            <span className="text-[#b7c96b] italic">
              Home
            </span>
          </h1>
          <p className="text-gray-300 text-sm leading-6 max-w-md mt-5">
            From fresh ingredients to unforgettable flavors,
            our dishes are made with love and served with
            a taste of home.
          </p>
          <div className="flex gap-3 mt-7">
            <button className="bg-[#c7d66b] text-[#06251b] font-bold px-5 py-3 rounded-md text-sm hover:bg-[#d6e47e] transition">
              Explore Our Menu
            </button>
            <button className="border border-lime-300 text-lime-300 font-bold px-5 py-3 rounded-md text-sm hover:bg-lime-300  hover:text-[#081D14] transition">
              Book a Table
            </button>
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