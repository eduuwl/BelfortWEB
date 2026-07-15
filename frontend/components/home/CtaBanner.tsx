export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-[var(--red)] px-8 py-20 text-center">
      <span className="font-heading pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[20rem] tracking-[0.04em] text-black/[0.08]">
        BELFORT
      </span>

      <h2 className="font-heading relative mb-4 text-[clamp(2.5rem,6vw,5rem)] tracking-[0.03em]">
        Comece hoje.
        <br />
        Sem desculpas.
      </h2>
      <p className="relative mb-10 text-base text-white/75">
        Agende sua aula de cortesia gratuita e venha sentir a diferença.
      </p>
      <div className="relative flex flex-wrap justify-center gap-4">
        <a
          href="/cortesia"
          className="rounded-lg bg-white px-8 py-4 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-[var(--red)] transition-all hover:-translate-y-0.5 hover:bg-[var(--cream)]"
        >
          Agendar aula grátis
        </a>
        <a
          href="/matricula"
          className="rounded-lg border-[1.5px] border-white/50 px-8 py-4 text-[0.9rem] font-semibold uppercase tracking-[0.06em] text-white transition-all hover:border-white hover:bg-white/10"
        >
          Fazer pré-cadastro
        </a>
      </div>
    </section>
  );
}
