"use client";

import { useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import {
  COLETIVAS,
  COLETIVA_COLORS,
  DIAS_SACRAMENTA,
  DIAS_TELEGRAFO,
  GRADE_SACRAMENTA,
  GRADE_TELEGRAFO,
  type GradeRow,
} from "@/lib/coletivas";
import Reveal from "@/components/ui/Reveal";

function GradeTable({ dias, rows }: { dias: string[]; rows: GradeRow[] }) {
  return (
    <table className="w-full border-collapse text-[0.78rem]">
      <thead>
        <tr>
          <th className="px-2 py-[0.7rem] pl-3 text-left text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white/50 bg-white/[0.06]">
            Horário
          </th>
          {dias.map((d) => (
            <th
              key={d}
              className="px-2 py-[0.7rem] text-center text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white/50 bg-white/[0.06]"
            >
              {d}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.horario} className="hover:[&>td]:bg-white/[0.03]">
            <td className="whitespace-nowrap border-b border-white/[0.04] py-[0.55rem] pl-3 pr-2 text-left font-heading text-base text-[var(--red-glow)]">
              {row.horario}
            </td>
            {row.cells.map((cell, i) => (
              <td
                key={i}
                className="border-b border-white/[0.04] px-1.5 py-[0.55rem] text-center text-[0.72rem] font-semibold tracking-[0.03em] text-white/85"
                style={cell ? { color: COLETIVA_COLORS[cell].text } : undefined}
              >
                {cell ? COLETIVAS.find((c) => c.slug === cell)?.nome : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ColetivasSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState<"telegrafo" | "sacramenta">("telegrafo");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="bg-[var(--blue)] px-8 py-24">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
            <span className="block h-0.5 w-5 bg-[var(--red)]" />
            Mais de 70 aulas por mês
          </div>
          <h2 className="font-heading mb-12 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[0.02em]">
            Aulas coletivas
          </h2>
        </Reveal>

        <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
          {COLETIVAS.map((c, i) => {
            const color = COLETIVA_COLORS[c.slug];
            const Icon = c.icon;
            return (
              <Reveal key={c.slug} delay={i * 50} y={16}>
                <div
                  className="group h-full cursor-pointer rounded-[14px] border px-4 py-[1.4rem] text-center shadow-black/10 transition-all hover:-translate-y-1.5 hover:shadow-[0_16px_34px_rgba(0,0,0,0.35)]"
                  style={{ background: color.bg, borderColor: color.border }}
                >
                  <Icon
                    className="mx-auto mb-2 h-8 w-8 transition-transform duration-300 group-hover:scale-125"
                    style={{ color: color.text }}
                  />
                  <div className="font-heading text-[1.1rem] tracking-[0.06em]">{c.nome}</div>
                  <div className="mt-1 text-[0.72rem] leading-snug text-white/50">{c.desc}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <button
            onClick={() => setModalOpen(true)}
            className="mx-auto flex items-center gap-2 rounded-lg bg-[var(--red)] px-10 py-4 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--red-dark)] hover:shadow-[0_10px_30px_rgba(204,55,56,0.35)] active:scale-95"
          >
            Ver grade completa de horários
          </button>
        </Reveal>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="animate-modal-in flex max-h-[90vh] w-full max-w-[900px] flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0D1F3C] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-8 py-6">
              <div className="font-heading text-[1.8rem] tracking-[0.04em]">Grade de Horários</div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-2xl leading-none text-white/50 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2 px-8 pt-5">
              {(["telegrafo", "sacramenta"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex items-center gap-1.5 rounded-lg border-[1.5px] px-5 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.08em] transition-all ${
                    tab === t
                      ? "border-[var(--red)] bg-[var(--red)] text-white"
                      : "border-white/15 bg-transparent text-white/50"
                  }`}
                >
                  <MapPinIcon className="h-4 w-4" />
                  {t === "telegrafo" ? "Telégrafo" : "Sacramenta"}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-8 pt-6">
              {tab === "telegrafo" ? (
                <GradeTable dias={DIAS_TELEGRAFO} rows={GRADE_TELEGRAFO} />
              ) : (
                <GradeTable dias={DIAS_SACRAMENTA} rows={GRADE_SACRAMENTA} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
