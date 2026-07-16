"use client";

import { useState } from "react";
import { FAQ } from "@/lib/faq";
import Reveal from "@/components/ui/Reveal";

export default function Faq() {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--blue)] px-8 py-24">
      <div className="mx-auto max-w-[800px]">
        <Reveal>
          <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
            <span className="block h-0.5 w-5 bg-[var(--red)]" />
            Dúvidas frequentes
          </div>
          <h2 className="font-heading mb-12 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[0.02em]">
            Perguntas frequentes
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {FAQ.map((item, i) => {
            const isOpen = aberto === i;
            return (
              <Reveal key={item.pergunta} delay={i * 40}>
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--blue-mid)]">
                  <button
                    type="button"
                    onClick={() => setAberto(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-heading text-[1.1rem] tracking-[0.02em] text-white">{item.pergunta}</span>
                    <span
                      className={`shrink-0 text-xl text-[var(--red-glow)] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[0.9rem] leading-relaxed text-white/60">{item.resposta}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
