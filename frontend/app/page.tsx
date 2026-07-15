import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import ColetivasSection from "@/components/home/ColetivasSection";
import Modalidades from "@/components/home/Modalidades";
import Planos from "@/components/home/Planos";
import Unidades from "@/components/home/Unidades";
import CtaBanner from "@/components/home/CtaBanner";
import Footer from "@/components/home/Footer";
import WhatsFloat from "@/components/home/WhatsFloat";

export default function Home() {
  return (
    <div className="theme-home overflow-x-hidden bg-[var(--blue)] text-white">
      <Nav />
      <Hero />
      <section id="modalidades" className="bg-[var(--blue)] px-8 py-24">
        <ColetivasSection />
        <Modalidades />
      </section>
      <Planos />
      <Unidades />
      <CtaBanner />
      <Footer />
      <WhatsFloat />
    </div>
  );
}
