import type { Metadata } from "next";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import WhatsFloat from "@/components/home/WhatsFloat";
import InstagramFeed from "@/components/gallery/InstagramFeed";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Confira as últimas fotos e vídeos da Academia Belfort direto do nosso Instagram.",
};

export default function GaleriaPage() {
  return (
    <div className="theme-home overflow-x-hidden bg-[var(--blue)] text-white">
      <Nav />

      <section className="px-8 pb-24 pt-40">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <div className="mb-3 flex items-center justify-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
              <span className="block h-0.5 w-5 bg-[var(--red)]" />
              Do dia a dia da academia
              <span className="block h-0.5 w-5 bg-[var(--red)]" />
            </div>
            <h1 className="font-heading mb-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[0.02em]">
              Galeria
            </h1>
            <p className="mx-auto mb-12 max-w-[520px] text-[0.95rem] leading-relaxed text-white/60">
              As fotos e vídeos mais recentes direto do nosso Instagram{" "}
              <a
                href="https://www.instagram.com/academiabelfort/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[var(--red-glow)] hover:underline"
              >
                @academiabelfort
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={100}>
            <InstagramFeed />
          </Reveal>

          <Reveal delay={150}>
            <a
              href="https://www.instagram.com/academiabelfort/"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[var(--red)] px-8 py-4 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--red-dark)] hover:shadow-[0_10px_30px_rgba(204,55,56,0.35)] active:scale-95"
            >
              Seguir no Instagram
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
      <WhatsFloat />
    </div>
  );
}
