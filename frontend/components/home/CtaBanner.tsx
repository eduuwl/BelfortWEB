import Reveal from "@/components/ui/Reveal";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-[var(--red)] px-8 py-20 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 65%)",
        }}
      />
      <span className="font-heading pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[20rem] tracking-[0.04em] text-black/[0.08]">
        BELFORT
      </span>

      <Reveal className="relative">
        <h2 className="font-heading mb-4 text-[clamp(2.5rem,6vw,5rem)] tracking-[0.03em]">
          Comece hoje.
          <br />
          Sem desculpas.
        </h2>
        <p className="mb-10 text-base text-white/75">
          Agende sua aula de cortesia gratuita e venha sentir a diferença.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/cortesia"
            className="rounded-lg bg-white px-8 py-4 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-[var(--red)] transition-all hover:-translate-y-0.5 hover:bg-[var(--cream)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] active:scale-95"
          >
            Agendar aula grátis
          </a>
          <a
            href="/matricula"
            className="rounded-lg border-[1.5px] border-white/50 px-8 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.06em] text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10 active:scale-95"
          >
            Fazer pré-cadastro
          </a>
        </div>
      </Reveal>
    </section>
  );
}
