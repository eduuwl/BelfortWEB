import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[var(--blue)]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(204,55,56,0.15) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(30,74,138,0.4) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(204,55,56,0.08) 100%)",
          clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-8 pt-20">
        <div className="animate-fade-up mb-6" style={{ animationDelay: "0.1s" }}>
          <Image
            src="/images/logo.png"
            alt="Academia Belfort"
            width={1005}
            height={334}
            className="w-[280px] h-auto"
          />
        </div>

        <div
          className="animate-fade-up mb-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--red-glow)]"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="block h-0.5 w-6 bg-[var(--red-glow)]" />
          Musculação &amp; Cross Training
        </div>

        <h1
          className="animate-fade-up font-heading text-[clamp(4.5rem,12vw,9rem)] leading-[0.88] tracking-[0.02em] text-white"
          style={{ animationDelay: "0.2s" }}
        >
          Seu corpo
          <br />
          <span className="block text-[var(--red)]">começa aqui.</span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-[480px] text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-white/55"
          style={{ animationDelay: "0.3s" }}
        >
          Musculação e Cross Training com estrutura de ponta, professores qualificados e duas
          unidades para você.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap gap-4"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="/cortesia"
            className="rounded-lg bg-[var(--red)] px-8 py-4 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_30px_rgba(204,55,56,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[var(--red-dark)] hover:shadow-[0_0_40px_rgba(204,55,56,0.6)]"
          >
            Agendar aula grátis
          </a>
          <a
            href="#planos"
            className="rounded-lg border-[1.5px] border-white/25 px-8 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.06em] text-white transition-all hover:border-white/60 hover:bg-white/[0.06]"
          >
            Ver planos
          </a>
        </div>

        <div
          className="animate-fade-up mt-16 flex flex-wrap gap-10"
          style={{ animationDelay: "0.5s" }}
        >
          <div>
            <div className="font-heading text-4xl leading-none text-white">
              2<span className="text-[var(--red)]">+</span>
            </div>
            <div className="mt-1 text-[0.75rem] uppercase tracking-[0.1em] text-white/45">
              Unidades
            </div>
          </div>
          <div>
            <div className="font-heading text-4xl leading-none text-white">
              100<span className="text-[var(--red)]">%</span>
            </div>
            <div className="mt-1 text-[0.75rem] uppercase tracking-[0.1em] text-white/45">
              Resultado
            </div>
          </div>
          <div>
            <div className="font-heading text-4xl leading-none text-white">
              6<span className="text-[var(--red)]">h</span>
            </div>
            <div className="mt-1 text-[0.75rem] uppercase tracking-[0.1em] text-white/45">
              Primeira aula às
            </div>
          </div>
        </div>
      </div>

      <div className="animate-bounce-scroll absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-40">
        <span className="text-[0.65rem] uppercase tracking-[0.15em]">scroll</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
