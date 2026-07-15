const UNIDADES = [
  {
    num: "01",
    nome: "Belfort Telégrafo",
    bairro: "Bairro do Telégrafo",
    endereco: "Av. Sen. Lemos, 1752 - Telégrafo, Belém - PA",
    horario: (
      <>
        <strong className="text-white">Seg–Sex:</strong> 07h às 17h
        <br />
        <strong className="text-white">Sábado:</strong> 09h às 14h
      </>
    ),
    modalidades: "Musculação · Cross Training · +70 aulas coletivas/mês",
    whats: "https://wa.me/5591984862479",
  },
  {
    num: "02",
    nome: "Belfort Sacramenta",
    bairro: "Bairro da Sacramenta",
    endereco: "Av. Sen. Lemos, 2831 - Sacramenta, Belém - PA",
    horario: (
      <>
        <strong className="text-white">Seg–Sex:</strong> 07h às 17h
        <br />
        <strong className="text-white">Sábado:</strong> 09h às 14h
      </>
    ),
    modalidades: "Musculação · +70 aulas coletivas/mês",
    whats: "https://wa.me/559133515384",
  },
];

export default function Unidades() {
  return (
    <section id="unidades" className="bg-[var(--blue)] px-8 py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
          <span className="block h-0.5 w-5 bg-[var(--red)]" />
          Onde estamos
        </div>
        <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[0.02em]">
          Nossas unidades
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {UNIDADES.map((u) => (
            <div
              key={u.num}
              className="relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[var(--blue-mid)] p-10 transition-colors hover:border-[var(--red)]/40"
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-[var(--red)]" />
              <span className="font-heading absolute right-6 top-4 text-8xl leading-none tracking-[-0.02em] text-white/[0.04]">
                {u.num}
              </span>
              <div className="font-heading text-[2rem] tracking-[0.04em]">{u.nome}</div>
              <div className="mb-6 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--red-glow)]">
                {u.bairro}
              </div>

              <div className="mb-8 flex flex-col gap-2.5">
                <div className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-white/60">
                  <span>{u.endereco}</span>
                </div>
                <div className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-white/60">
                  <span className="mt-px shrink-0 text-base">🕐</span>
                  <div>{u.horario}</div>
                </div>
                <div className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-white/60">
                  <span className="mt-px shrink-0 text-base">⚡</span>
                  <span>{u.modalidades}</span>
                </div>
              </div>

              <a
                href={u.whats}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-[0.7rem] text-[0.82rem] font-bold uppercase tracking-[0.06em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#1da851]"
              >
                💬 WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
