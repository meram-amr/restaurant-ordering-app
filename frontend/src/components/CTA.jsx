function CTA() {
  return (
    <section className="bg-[#f8f8f4] px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#08291e] rounded-lg px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-[#b8c967] text-[10px] uppercase tracking-[3px]">
              Reserve Your Table
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-serif mt-2 max-w-md">
              Good Food Deserves
              <br />
              a Great Table
            </h2>
            <p className="text-gray-300 text-xs mt-3 max-w-md">
              Enjoy delicious food in a warm and welcoming
              atmosphere with the people you love.
            </p>
          </div>
          <button className="relative z-10 mt-6 md:mt-0 bg-[#c7d66b] text-[#08291e] px-6 py-3 rounded-md text-s font-bold hover:bg-[#d6e47e] transition">
            Find a Table
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;