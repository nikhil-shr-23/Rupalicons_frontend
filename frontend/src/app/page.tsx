import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Projects from "../components/Projects";
import WhyChooseUs from "../components/WhyChooseUs";
import ProcessFlow from "../components/ProcessFlow";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <WhyChooseUs />
      <ProcessFlow />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
