"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StepsIndicator from "@/components/form/StepsIndicator";
import {
  BtnBack,
  BtnPrimary,
  BtnWhatsapp,
  DiaButton,
  FieldInput,
  HorarioButton,
  HorarioGrid,
  LoadingOverlay,
  OptionButton,
  OptionGrid,
  ResumoItem,
  StepDesc,
  StepTitle,
  ToggleRow,
} from "@/components/form/FormControls";
import {
  FormCard,
  FormHero,
  FormPage,
  FormWrap,
  SuccessIcon,
  SuccessMsg,
  SuccessTitle,
} from "@/components/form/FormShell";
import { cpfValido, maskCPF, maskPhone } from "@/lib/validators";
import { DIAS_CONSECUTIVOS, DIAS_SEMANA, HORARIOS_CROSS, HORARIOS_MUSC } from "@/lib/horarios";
import { submitCortesia } from "@/lib/api";
import type { Modalidade } from "@/lib/planos";

type Step = 1 | 2 | 3 | 4 | 5 | "sucesso";

interface FormState {
  modalidade: Modalidade | null;
  nome: string;
  whatsapp: string;
  cpf: string;
  limitacao: boolean | null;
  limitacaoDesc: string;
  horario: string | null;
  dia: string | null;
}

const INITIAL_STATE: FormState = {
  modalidade: null,
  nome: "",
  whatsapp: "",
  cpf: "",
  limitacao: null,
  limitacaoDesc: "",
  horario: null,
  dia: null,
};

const WHATSAPP_NUMERO = "5591984862479";

export default function CortesiaForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const step1Ok = form.modalidade !== null;

  const step2Ok =
    form.nome.trim().length >= 3 &&
    form.nome.trim().includes(" ") &&
    form.whatsapp.replace(/\D/g, "").length >= 10 &&
    cpfValido(form.cpf) &&
    form.limitacao !== null;

  const horarios = form.modalidade === "musculacao" ? HORARIOS_MUSC : HORARIOS_CROSS;
  const step3Ok = form.horario !== null;
  const step4Ok = form.dia !== null;

  const diasConsecutivos = form.modalidade === "cross" && form.dia ? DIAS_CONSECUTIVOS[form.dia] ?? [] : [];
  const diasStr = form.modalidade === "cross" ? diasConsecutivos.join(", ") : (form.dia ?? "");

  function selectDia(d: string) {
    update("dia", d);
  }

  async function handleSubmit() {
    if (!form.modalidade || !form.horario || !form.dia) return;
    setLoading(true);
    setSubmitError(false);

    const ok = await submitCortesia({
      nome: form.nome.trim(),
      whatsapp: form.whatsapp.trim(),
      cpf: form.cpf.trim(),
      modalidade: form.modalidade === "musculacao" ? "Musculação" : "Cross Training",
      horario: form.horario,
      dia: diasStr,
      limitacao: form.limitacao ? form.limitacaoDesc.trim() || "Sim" : "Não",
    });

    setLoading(false);

    if (!ok) {
      setSubmitError(true);
      return;
    }

    setStep("sucesso");
  }

  const whatsMsg = encodeURIComponent(
    `Olá! Acabei de agendar minha aula de cortesia de ${
      form.modalidade === "musculacao" ? "Musculação" : "Cross Training"
    } na Academia Belfort para ${diasStr} às ${form.horario}. Nome: ${form.nome.trim()}`,
  );

  return (
    <FormPage bgClassName="bg-[var(--blue)]">
      <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between bg-[rgba(13,31,60,0.95)] px-6 py-4 backdrop-blur-md">
        <Link href="/">
          <Image src="/images/logo.png" alt="Academia Belfort" width={1005} height={334} className="h-8 w-auto" />
        </Link>
        <Link href="/" className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white/70">
          ← Página inicial
        </Link>
      </nav>

      <FormHero
        subtitle="Sua jornada começa aqui"
        tag="Aula de Cortesia Gratuita"
        heroBgClassName="bg-[var(--red-dark)] pb-20 pt-20"
        tagBgClassName="bg-[var(--blue)]"
      />

      <FormWrap>
        <FormCard>
          {step !== "sucesso" && <StepsIndicator total={5} current={step as number} />}

          {step === 1 && (
            <div className="animate-fade-in-step">
              <StepTitle>Escolha a modalidade</StepTitle>
              <StepDesc>Qual aula de cortesia você quer experimentar?</StepDesc>

              <OptionGrid>
                <OptionButton icon="🏋️" label="Musculação" selected={form.modalidade === "musculacao"} onClick={() => update("modalidade", "musculacao")} />
                <OptionButton icon="⚡" label="Cross Training" selected={form.modalidade === "cross"} onClick={() => update("modalidade", "cross")} />
              </OptionGrid>

              <BtnPrimary disabled={!step1Ok} onClick={() => setStep(2)}>
                Continuar
              </BtnPrimary>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-step">
              <BtnBack onClick={() => setStep(1)} />
              <StepTitle>Seus dados</StepTitle>
              <StepDesc>Precisamos de algumas informações para confirmar seu agendamento.</StepDesc>

              <FieldInput label="Nome completo" value={form.nome} onChange={(v) => update("nome", v)} placeholder="Ex: João Silva" />
              <FieldInput label="WhatsApp (com DDD)" value={form.whatsapp} onChange={(v) => update("whatsapp", maskPhone(v))} placeholder="Ex: 91988776655" />
              <FieldInput label="CPF" value={form.cpf} onChange={(v) => update("cpf", maskCPF(v))} placeholder="000.000.000-00" maxLength={14} />

              <div className="mb-1">
                <label className="mb-1.5 block text-[0.8rem] font-semibold uppercase tracking-[0.04em] text-[var(--blue)]">
                  Possui alguma limitação física?
                </label>
                <ToggleRow value={form.limitacao} onChange={(v) => update("limitacao", v)} />
                {form.limitacao && (
                  <textarea
                    value={form.limitacaoDesc}
                    onChange={(e) => update("limitacaoDesc", e.target.value)}
                    placeholder="Descreva brevemente sua limitação..."
                    className="h-20 w-full resize-none rounded-[10px] border-[1.5px] border-[var(--gray-light)] bg-white px-4 py-3 text-[0.95rem] text-[var(--text)] outline-none transition-all focus:border-[var(--blue-light)]"
                  />
                )}
              </div>

              <div className="mt-4">
                <BtnPrimary disabled={!step2Ok} onClick={() => setStep(3)}>
                  Continuar
                </BtnPrimary>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-step">
              <BtnBack onClick={() => setStep(2)} />
              <StepTitle>Escolha o horário</StepTitle>
              <StepDesc>
                {form.modalidade === "musculacao"
                  ? "Seg a Sex: 07h–17h · Sábado: 09h–14h"
                  : "Horários disponíveis para Cross Training"}
              </StepDesc>

              <HorarioGrid>
                {horarios.map((h) => (
                  <HorarioButton key={h} label={h} selected={form.horario === h} onClick={() => update("horario", h)} />
                ))}
              </HorarioGrid>

              <BtnPrimary disabled={!step3Ok} onClick={() => setStep(4)}>
                Continuar
              </BtnPrimary>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in-step">
              <BtnBack onClick={() => setStep(3)} />
              <StepTitle>Escolha o dia</StepTitle>
              <StepDesc>
                {form.modalidade === "cross"
                  ? "Escolha o primeiro dia — suas 3 aulas consecutivas serão definidas automaticamente."
                  : "Escolha o melhor dia para sua aula experimental."}
              </StepDesc>

              <div className="mb-5 grid grid-cols-3 gap-2">
                {form.modalidade === "cross"
                  ? Object.keys(DIAS_CONSECUTIVOS).map((d) => (
                      <DiaButton
                        key={d}
                        label={d}
                        sub={DIAS_CONSECUTIVOS[d].join(" · ")}
                        selected={form.dia === d}
                        onClick={() => selectDia(d)}
                      />
                    ))
                  : DIAS_SEMANA.map((d) => (
                      <DiaButton key={d} label={d} selected={form.dia === d} onClick={() => selectDia(d)} />
                    ))}
              </div>

              <BtnPrimary disabled={!step4Ok} onClick={() => setStep(5)}>
                Continuar
              </BtnPrimary>
            </div>
          )}

          {step === 5 && (
            <div className="animate-fade-in-step">
              <BtnBack onClick={() => setStep(4)} />
              <StepTitle>Confirme seu agendamento</StepTitle>
              <StepDesc>Revise os dados antes de finalizar.</StepDesc>

              <div className="mb-6">
                <ResumoItem label="Modalidade" value={form.modalidade === "musculacao" ? "🏋️ Musculação" : "⚡ Cross Training"} />
                <ResumoItem label="Nome" value={form.nome.trim()} />
                <ResumoItem label="WhatsApp" value={form.whatsapp} />
                <ResumoItem label="CPF" value={form.cpf} />
                <ResumoItem label="Horário" value={form.horario} />
                <ResumoItem label="Dia(s)" value={diasStr} />
                {form.limitacao && (
                  <ResumoItem label="Limitação" value={<span className="text-[var(--red)]">{form.limitacaoDesc || "Sim"}</span>} />
                )}
              </div>

              {submitError && (
                <p className="mb-4 text-center text-[0.82rem] text-[var(--red)]">
                  Não conseguimos confirmar seu agendamento agora. Tente novamente em instantes.
                </p>
              )}

              <BtnPrimary onClick={handleSubmit}>Confirmar agendamento ✓</BtnPrimary>
            </div>
          )}

          {step === "sucesso" && (
            <div className="py-4 text-center">
              <SuccessIcon />
              <SuccessTitle>Agendado!</SuccessTitle>
              <SuccessMsg>
                Olá {form.nome.trim().split(" ")[0]}! Sua aula de{" "}
                {form.modalidade === "musculacao" ? "Musculação" : "Cross Training"} foi agendada com sucesso.
              </SuccessMsg>

              <div className="mb-6 rounded-xl bg-[var(--off-white)] p-5 text-left">
                {form.modalidade === "cross" ? (
                  <>
                    <p className="mb-1 text-[0.82rem] text-[var(--gray)]">Seus 3 dias de treino:</p>
                    <strong className="text-[0.95rem] text-[var(--blue)]">{diasConsecutivos.join(" · ")}</strong>
                    <br />
                    <span className="text-[0.8rem] text-[var(--gray)]">Horário: {form.horario}</span>
                  </>
                ) : (
                  <p className="text-[0.82rem] text-[var(--gray)]">
                    Data e horário: <strong className="text-[0.95rem] text-[var(--blue)]">{form.dia} às {form.horario}</strong>
                  </p>
                )}
              </div>

              <div className="mb-6 rounded-xl bg-[#FEF3F2] p-4 text-center text-[0.82rem] leading-relaxed text-[var(--red-dark)]">
                ⚠️ Tolerância de até <strong>10 minutos</strong> de atraso. Após esse tempo, sua vaga pode ser
                perdida.
              </div>

              <BtnWhatsapp href={`https://wa.me/${WHATSAPP_NUMERO}?text=${whatsMsg}`} />
            </div>
          )}
        </FormCard>
      </FormWrap>

      <LoadingOverlay show={loading} />
    </FormPage>
  );
}
