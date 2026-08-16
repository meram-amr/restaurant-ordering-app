import AboutHero from "../components/about/AboutHero";
import OurStory from "../components/about/OurStory";
import OurPhilosophy from "../components/about/OurPhilosophy";
import AveroExperience from "../components/about/AveroExperience";

function About() {
  return (
    <main className="min-h-screen bg-[#f7f6f1]">
      <AboutHero />
      <OurStory />
      <OurPhilosophy />
      <AveroExperience />
    </main>
  );
}

export default About;