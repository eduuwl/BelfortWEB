import { AcademicCapIcon, BoltIcon, FaceSmileIcon, FireIcon } from "@heroicons/react/24/solid";
import Reveal from "@/components/ui/Reveal";
import type { IconType } from "@/components/form/FormControls";

const MODALIDADES: {
  icon: IconType;
  nome: string;
  desc: string;
  horarios: string[];
  cta: { label: string; href: string };
}[] = [
  {
    icon: FireIcon,
    nome: "Musculação",
    desc: "Treino com pesos para ganho de massa, emagrecimento e condicionamento. Horário livre para você treinar no seu ritmo, todos os dias.",
    horarios: ["Seg a Sex · 6h–22h", "Sáb · 8h–16h", "Horário livre"],
    cta: { label: "Agendar aula grátis →", href: "/cortesia" },
  },
  {
    icon: BoltIcon,
    nome: "Cross Training",
    desc: "Treino funcional de alta intensidade com aulas em grupo. 3 aulas consecutivas na aula de cortesia para você sentir a energia da turma.",
    horarios: ["06:00", "07:00", "08:00", "10:00 (Sáb)", "18:30", "19:30", "20:30"],
    cta: { label: "Agendar aula grátis →", href: "/cortesia" },
  },
  {
    icon: FaceSmileIcon,
    nome: "Funcional Kids",
    desc: "Treino funcional pensado pra criançada, com muita energia e segurança. Turma única, só na unidade Telégrafo.",
    horarios: ["Seg, Qua e Sex · 17h", "Unidade Telégrafo"],
    cta: { label: "Agendar aula grátis →", href: "/cortesia" },
  },
  {
    icon: AcademicCapIcon,
    nome: "Personal Trainer",
    desc: "Já tem seu personal trainer? Ele pode te acompanhar aqui na Belfort mediante uma taxa de acesso, com CREF cadastrado.",
    horarios: ["Horário combinado", "CREF obrigatório"],
    cta: { label: "Fazer pré-cadastro →", href: "/matricula" },
  },
];

export default function Modalidades() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <Reveal>
        <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
          <span className="block h-0.5 w-5 bg-[var(--red)]" />
          O que oferecemos
        </div>
        <h2 className="font-heading mb-12 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[0.02em]">
          Nossas
          <br />
          modalidades
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-[1.5px] overflow-hidden rounded-[20px] bg-white/[0.06] md:grid-cols-2">
        {MODALIDADES.map((m, i) => (
          <Reveal key={m.nome} delay={i * 100} className="h-full">
            <div className="group relative h-full overflow-hidden bg-[var(--blue-mid)] px-10 py-12 transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:bg-[var(--blue-light)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
              <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--red)] transition-transform duration-[400ms] group-hover:scale-x-100" />
              <m.icon className="mb-5 h-12 w-12 text-[var(--red-glow)] transition-transform duration-300 group-hover:scale-110" />
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
                href={m.cta.href}
                className="mt-8 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[var(--red-glow)] transition-[gap] hover:gap-2.5"
              >
                {m.cta.label}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
