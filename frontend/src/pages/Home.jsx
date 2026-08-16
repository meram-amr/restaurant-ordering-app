import Hero from "../components/Hero";
import Features from "../components/Features";
import PopularDishes from "../components/PopularDishes";
import CTA from "../components/CTA";
import Stats from "../components/Stats";

function Home() {
	return (
    <>
      <Hero />
      <Features />
      <PopularDishes />
      <CTA />
      <Stats />
    </> 
  );
}

export default Home;