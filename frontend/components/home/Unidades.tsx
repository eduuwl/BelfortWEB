import { BoltIcon, ChatBubbleLeftRightIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Reveal from "@/components/ui/Reveal";
import { UNIDADES } from "@/lib/unidades";

export default function Unidades() {
  return (
    <section id="unidades" className="bg-[var(--blue)] px-8 py-24">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
            <span className="block h-0.5 w-5 bg-[var(--red)]" />
            Onde estamos
          </div>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[0.02em]">
            Nossas unidades
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {UNIDADES.map((u, i) => (
            <Reveal key={u.num} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[var(--blue-mid)] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--red)]/40 hover:shadow-[0_24px_50px_rgba(0,0,0,0.35)]">
                <span className="absolute left-0 top-0 h-full w-1 bg-[var(--red)]" />
                <span className="font-heading absolute right-6 top-4 text-8xl leading-none tracking-[-0.02em] text-white/[0.04] transition-transform duration-500 group-hover:scale-110">
                  {u.num}
                </span>
                <div className="font-heading text-[2rem] tracking-[0.04em]">{u.nome}</div>
                <div className="mb-6 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--red-glow)]">
                  {u.bairroLabel}
                </div>

                <div className="mb-8 flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-white/60">
                    <MapPinIcon className="mt-px h-4 w-4 shrink-0" />
                    <span>
                      {u.logradouro} - {u.bairroNome}, {u.cidade} - {u.estado}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-white/60">
                    <ClockIcon className="mt-px h-4 w-4 shrink-0" />
                    <span>{u.horario}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[0.88rem] leading-snug text-white/60">
                    <BoltIcon className="mt-px h-4 w-4 shrink-0" />
                    <span>{u.modalidades}</span>
                  </div>
                </div>

                <a
                  href={u.whats}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-[0.7rem] text-[0.82rem] font-bold uppercase tracking-[0.06em] text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)] active:scale-95 hover:bg-[#1da851]"
                >
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
