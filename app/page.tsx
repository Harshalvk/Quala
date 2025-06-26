import Bento from "./_components/Bento";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto p-3">
      <Navbar />
      <Hero />
      <Bento />
      <Footer />
    </section>
  );
}
