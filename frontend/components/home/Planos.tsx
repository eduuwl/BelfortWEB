"use client";

import { Fragment, useState } from "react";
import { AcademicCapIcon, BoltIcon, FaceSmileIcon, FireIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import Reveal from "@/components/ui/Reveal";
import type { IconType } from "@/components/form/FormControls";

interface PlanoCard {
  nome: string;
  periodo: string;
  preco: string;
  parcela: string;
  features: string[];
  destaque?: boolean;
}

interface Grupo {
  icon: IconType;
  label: string;
  planos: PlanoCard[];
}

const PRIME: PlanoCard = {
  nome: "Belfort Prime",
  periodo: "Mensal · 2 unidades",
  preco: "120",
  parcela: "à vista",
  features: ["Acesso à musculação", "Treine em Telégrafo e Sacramenta", "Horário livre", "Seg a Sábado"],
};

const TELEGRAFO: Grupo[] = [
  {
    icon: FireIcon,
    label: "Musculação",
    planos: [
      {
        nome: "Mensal",
        periodo: "Pagamento único",
        preco: "110",
        parcela: "à vista",
        features: ["Acesso à musculação", "Horário livre", "Seg a Sábado"],
      },
      {
        nome: "Trimestral",
        periodo: "3 meses",
        preco: "315",
        parcela: "ou 3x de R$ 105,00",
        features: ["Acesso à musculação", "Horário livre", "Seg a Sábado", "Melhor custo-benefício"],
        destaque: true,
      },
      {
        nome: "Semestral",
        periodo: "6 meses",
        preco: "600",
        parcela: "ou 6x de R$ 100,00",
        features: ["Acesso à musculação", "Horário livre", "Seg a Sábado", "Maior economia"],
      },
      PRIME,
    ],
  },
  {
    icon: BoltIcon,
    label: "Cross Training",
    planos: [
      {
        nome: "Mensal",
        periodo: "Pagamento único",
        preco: "190",
        parcela: "à vista",
        features: ["Aulas em grupo", "Todos os horários", "Seg a Sábado"],
      },
      {
        nome: "Trimestral",
        periodo: "3 meses",
        preco: "510",
        parcela: "ou 3x de R$ 170,00",
        features: ["Aulas em grupo", "Todos os horários", "Seg a Sábado", "Melhor custo-benefício"],
        destaque: true,
      },
      {
        nome: "Semestral",
        periodo: "6 meses",
        preco: "900",
        parcela: "ou 6x de R$ 150,00",
        features: ["Aulas em grupo", "Todos os horários", "Seg a Sábado", "Maior economia"],
      },
    ],
  },
  {
    icon: FaceSmileIcon,
    label: "Funcional Kids",
    planos: [
      {
        nome: "Mensal",
        periodo: "Seg, Qua e Sex · 17h",
        preco: "120",
        parcela: "à vista",
        features: ["Turma exclusiva kids", "Unidade Telégrafo", "Acompanhamento especializado"],
      },
    ],
  },
  {
    icon: AcademicCapIcon,
    label: "Personal Trainer",
    planos: [
      {
        nome: "Mensal",
        periodo: "Taxa de acesso",
        preco: "50",
        parcela: "à vista",
        features: ["Traga seu personal trainer", "CREF obrigatório", "Válido nas 2 unidades"],
      },
    ],
  },
];

const SACRAMENTA: Grupo[] = [
  {
    icon: FireIcon,
    label: "Musculação",
    planos: [
      {
        nome: "Mensal",
        periodo: "Pagamento único",
        preco: "100",
        parcela: "à vista",
        features: ["Acesso à musculação", "Horário livre", "+70 aulas coletivas/mês", "Seg a Sábado"],
        destaque: true,
      },
      PRIME,
    ],
  },
  {
    icon: AcademicCapIcon,
    label: "Personal Trainer",
    planos: [
      {
        nome: "Mensal",
        periodo: "Taxa de acesso",
        preco: "50",
        parcela: "à vista",
        features: ["Traga seu personal trainer", "CREF obrigatório", "Válido nas 2 unidades"],
      },
    ],
  },
];

function Card({ plano }: { plano: PlanoCard }) {
  return (
    <div
      className={`relative rounded-2xl border-[1.5px] p-8 px-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] ${
        plano.destaque
          ? "border-[var(--red)] bg-[var(--blue)] text-white shadow-[0_20px_50px_rgba(204,55,56,0.22)] hover:shadow-[0_26px_60px_rgba(204,55,56,0.32)]"
          : "border-[var(--gray-light)] bg-white hover:border-[var(--blue)] hover:shadow-[0_20px_45px_rgba(13,31,60,0.15)]"
      }`}
    >
      {plano.destaque && (
        <span className="absolute -top-3 right-5 animate-pulse rounded bg-[var(--red)] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
          Mais popular
        </span>
      )}
      <div className={`font-heading mb-1 text-[1.6rem] tracking-[0.06em] ${plano.destaque ? "text-white" : "text-[var(--blue)]"}`}>
        {plano.nome}
      </div>
      <div className={`mb-6 text-[0.75rem] uppercase tracking-[0.08em] ${plano.destaque ? "text-white/50" : "text-[var(--gray)]"}`}>
        {plano.periodo}
      </div>
      <div className={`font-heading text-[3.5rem] leading-none tracking-[0.02em] ${plano.destaque ? "text-white" : "text-[var(--blue)]"}`}>
        <span className="mr-0.5 align-super font-sans text-[1.1rem] font-medium">R$</span>
        {plano.preco}
      </div>
      <div className={`mb-6 mt-1 text-[0.78rem] ${plano.destaque ? "text-white/50" : "text-[var(--gray)]"}`}>
        {plano.parcela}
      </div>
      <div className={`my-6 h-px ${plano.destaque ? "bg-white/[0.12]" : "bg-[var(--gray-light)]"}`} />
      <ul className="mb-7 flex flex-col gap-2">
        {plano.features.map((f) => (
          <li
            key={f}
            className={`flex items-center gap-2 text-[0.85rem] before:font-bold before:text-[var(--red)] before:content-['✓'] ${
              plano.destaque ? "text-white/80" : "text-[var(--text)]"
            }`}
          >
            {f}
          </li>
        ))}
      </ul>
      <a
        href="/matricula"
        className={`block w-full rounded-[10px] py-[0.85rem] text-center text-[0.85rem] font-bold uppercase tracking-[0.06em] transition-all active:scale-95 ${
          plano.destaque
            ? "bg-[var(--red)] text-white hover:bg-[var(--red-dark)]"
            : "bg-[var(--blue)] text-white hover:bg-[var(--blue-light)]"
        }`}
      >
        Fazer pré-cadastro
      </a>
    </div>
  );
}

export default function Planos() {
  const [unidade, setUnidade] = useState<"telegrafo" | "sacramenta">("telegrafo");
  const grupos = unidade === "telegrafo" ? TELEGRAFO : SACRAMENTA;

  return (
    <section id="planos" className="bg-[var(--cream)] px-8 py-24 text-[var(--text)]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-3 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
            <span className="block h-0.5 w-5 bg-[var(--red)]" />
            Investimento
          </div>
          <h2 className="font-heading mb-10 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[0.02em] text-[var(--blue)]">
            Escolha seu
            <br />
            plano
          </h2>

          <div className="mb-10 flex gap-2">
            {(["telegrafo", "sacramenta"] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnidade(u)}
                className={`rounded-lg border-[1.5px] px-6 py-[0.6rem] text-[0.85rem] font-semibold uppercase tracking-[0.06em] transition-all active:scale-95 ${
                  unidade === u
                    ? "border-[var(--blue)] bg-[var(--blue)] text-white"
                    : "border-[var(--gray-light)] bg-transparent text-[var(--gray)] hover:border-[var(--blue)] hover:text-[var(--blue)]"
                }`}
              >
                {u === "telegrafo" ? "Telégrafo" : "Sacramenta"}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {grupos.map((grupo, gi) => (
            <Fragment key={grupo.label}>
              <div className={`col-span-full mb-2 ${gi > 0 ? "mt-6 border-t border-[var(--gray-light)] pt-6" : ""}`}>
                <span className="flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[var(--gray)]">
                  <grupo.icon className="h-3.5 w-3.5" />
                  {grupo.label}
                </span>
              </div>
              {grupo.planos.map((p, pi) => (
                <Reveal key={p.nome} delay={pi * 80}>
                  <Card plano={p} />
                </Reveal>
              ))}
            </Fragment>
          ))}
        </div>

        {unidade === "sacramenta" && (
          <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[0.8rem] text-[var(--gray)]">
            <InformationCircleIcon className="h-4 w-4 shrink-0" />
            A unidade Sacramenta não oferece Cross Training nem Funcional Kids.
          </p>
        )}
      </div>
    </section>
  );
}
