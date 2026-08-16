function OurStory() {
  return (
    <section className="bg-[#f8f8f4] mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">

      <div className="grid items-center gap-12 md:grid-cols-2">

        <div className="overflow-hidden">
          <img
            src="https://static.wixstatic.com/media/d71744_1d327fe3ea604e8fa8579b35e1567d30~mv2.jpeg/v1/fit/w_820%2Ch_820%2Cq_90/d71744_1d327fe3ea604e8fa8579b35e1567d30~mv2.jpeg?utm_source=chatgpt.com"
            alt="Restaurant interior"
            className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div>
          <p className="font-playfair text-sm italic text-[#7c8067]">
            Our Story
          </p>

          <h2 className="mt-2 font-playfair text-4xl text-[#203229] md:text-5xl">
            Made with passion,
            <br />
            served with heart.
          </h2>

          <div className="mt-6 space-y-4 font-poppins text-sm leading-7 text-[#6d736e]">
            <p>
              AVERO was created from a simple idea: great food should
              feel special without ever feeling complicated.
            </p>

            <p>
              From the first ingredient to the final plate, we focus
              on thoughtful preparation, balanced flavors, and
              beautiful presentation.
            </p>

            <p>
              Whether you are joining us for a casual meal or a
              special occasion, we want every visit to feel like
              something worth remembering.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default OurStory;