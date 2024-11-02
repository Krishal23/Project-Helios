// Home.js
import CallToAction from "./HomeComponents/CallToAction.jsx";
import Features from "./HomeComponents/Features.jsx";
import Hero from "./HomeComponents/Hero.jsx";
import Testimonials from "./HomeComponents/Testimonials.jsx";


function Home() {
  return (
    <div>
      <Hero />
      <Features/>
      <Testimonials/>
      <CallToAction/>
    </div>
  );
}

export default Home;
