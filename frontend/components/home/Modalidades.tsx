const MODALIDADES = [
  {
    icon: "🏋️",
    nome: "Musculação",
    desc: "Treino com pesos para ganho de massa, emagrecimento e condicionamento. Horário livre para você treinar no seu ritmo, de segunda a sábado.",
    horarios: ["Seg–Sex · 07h–17h", "Sáb · 09h–14h", "Horário livre"],
  },
  {
    icon: "⚡",
    nome: "Cross Training",
    desc: "Treino funcional de alta intensidade com aulas em grupo. 3 aulas consecutivas na aula de cortesia para você sentir a energia da turma.",
    horarios: ["06:00", "07:00", "08:00", "10:00 (Sáb)", "18:30", "19:30", "20:30"],
  },
];

export default function Modalidades() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
        <span className="block h-0.5 w-5 bg-[var(--red)]" />
        O que oferecemos
      </div>
      <h2 className="font-heading mb-12 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[0.02em]">
        Nossas
        <br />
        modalidades
      </h2>

      <div className="grid grid-cols-1 gap-[1.5px] overflow-hidden rounded-[20px] bg-white/[0.06] md:grid-cols-2">
        {MODALIDADES.map((m) => (
          <div
            key={m.nome}
            className="group relative overflow-hidden bg-[var(--blue-mid)] px-10 py-12 transition-colors hover:bg-[var(--blue-light)]"
          >
            <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--red)] transition-transform duration-[400ms] group-hover:scale-x-100" />
            <div className="mb-5 text-5xl">{m.icon}</div>
            <div className="font-heading mb-3 text-[2.2rem] tracking-[0.04em]">{m.nome}</div>
            <p className="max-w-[340px] text-[0.9rem] leading-[1.7] text-white/55">{m.desc}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {m.horarios.map((h) => (
                <span
                  key={h}
                  className="rounded bg-white/[0.08] px-[10px] py-1 text-[0.72rem] font-semibold tracking-[0.06em] text-white/70"
                >
                  {h}
                </span>
              ))}
            </div>
            <a
              href="/cortesia"
              className="mt-8 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[var(--red-glow)] transition-[gap] hover:gap-2.5"
            >
              Agendar aula grátis →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
