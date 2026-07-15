"use client";

import { useState } from "react";
import StepsIndicator from "@/components/form/StepsIndicator";
import FormNav from "@/components/form/FormNav";
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
  const [direction, setDirection] = useState<1 | -1>(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const stepAnim = direction === 1 ? "animate-step-fwd" : "animate-step-back";

  function goTo(next: Step) {
    setDirection(typeof step === "number" && typeof next === "number" && next < step ? -1 : 1);
    setStep(next);
  }

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
  const horarioSelecionado = horarios.find((h) => h.value === form.horario);
  const crossSomenteSabado = form.modalidade === "cross" && horarioSelecionado?.somenteSabado === true;
  const step3Ok = form.horario !== null;
  const step4Ok = form.dia !== null;

  const diasConsecutivos =
    form.modalidade === "cross" && form.dia
      ? crossSomenteSabado
        ? [form.dia]
        : DIAS_CONSECUTIVOS[form.dia] ?? []
      : [];
  const diasStr = form.modalidade === "cross" ? diasConsecutivos.join(", ") : (form.dia ?? "");
  const horarioLabel = horarioSelecionado?.label ?? form.horario ?? "";

  function selectDia(d: string) {
    update("dia", d);
  }

  function selectModalidade(m: Modalidade) {
    setForm((f) => ({ ...f, modalidade: m, horario: null, dia: null }));
  }

  function selectHorario(v: string) {
    setForm((f) => ({ ...f, horario: v, dia: null }));
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
      horario: horarioLabel,
      dia: diasStr,
      limitacao: form.limitacao ? form.limitacaoDesc.trim() || "Sim" : "Não",
    });

    setLoading(false);

    if (!ok) {
      setSubmitError(true);
      return;
    }

    goTo("sucesso");
  }

  const whatsMsg = encodeURIComponent(
    `Olá! Acabei de agendar minha aula de cortesia de ${
      form.modalidade === "musculacao" ? "Musculação" : "Cross Training"
    } na Academia Belfort para ${diasStr} às ${horarioLabel}. Nome: ${form.nome.trim()}`,
  );

  return (
    <FormPage bgClassName="bg-[var(--blue)]">
      <FormNav />

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
            <div className={stepAnim}>
              <StepTitle>Escolha a modalidade</StepTitle>
              <StepDesc>Qual aula de cortesia você quer experimentar?</StepDesc>

              <OptionGrid>
                <OptionButton icon="🏋️" label="Musculação" selected={form.modalidade === "musculacao"} onClick={() => selectModalidade("musculacao")} />
                <OptionButton icon="⚡" label="Cross Training" selected={form.modalidade === "cross"} onClick={() => selectModalidade("cross")} />
              </OptionGrid>

              <BtnPrimary disabled={!step1Ok} onClick={() => goTo(2)}>
                Continuar
              </BtnPrimary>
            </div>
          )}

          {step === 2 && (
            <div className={stepAnim}>
              <BtnBack onClick={() => goTo(1)} />
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
                <BtnPrimary disabled={!step2Ok} onClick={() => goTo(3)}>
                  Continuar
                </BtnPrimary>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={stepAnim}>
              <BtnBack onClick={() => goTo(2)} />
              <StepTitle>Escolha o horário</StepTitle>
              <StepDesc>
                {form.modalidade === "musculacao"
                  ? "Horário livre — funcionamos todos os dias das 6h às 22h."
                  : "Horários fixos das aulas de Cross Training."}
              </StepDesc>

              <HorarioGrid>
                {horarios.map((h) => (
                  <HorarioButton
                    key={h.value}
                    label={h.label}
                    selected={form.horario === h.value}
                    onClick={() => selectHorario(h.value)}
                  />
                ))}
              </HorarioGrid>

              <BtnPrimary disabled={!step3Ok} onClick={() => goTo(4)}>
                Continuar
              </BtnPrimary>
            </div>
          )}

          {step === 4 && (
            <div className={stepAnim}>
              <BtnBack onClick={() => goTo(3)} />
              <StepTitle>Escolha o dia</StepTitle>
              <StepDesc>
                {crossSomenteSabado
                  ? "Esse horário de Cross Training acontece apenas aos sábados."
                  : form.modalidade === "cross"
                    ? "Escolha o primeiro dia — suas 3 aulas consecutivas serão definidas automaticamente."
                    : "Escolha o melhor dia para sua aula experimental."}
              </StepDesc>

              <div className="mb-5 grid grid-cols-3 gap-2">
                {crossSomenteSabado ? (
                  <DiaButton label="Sábado" selected={form.dia === "Sábado"} onClick={() => selectDia("Sábado")} />
                ) : form.modalidade === "cross" ? (
                  Object.keys(DIAS_CONSECUTIVOS).map((d) => (
                    <DiaButton
                      key={d}
                      label={d}
                      sub={DIAS_CONSECUTIVOS[d].join(" · ")}
                      selected={form.dia === d}
                      onClick={() => selectDia(d)}
                    />
                  ))
                ) : (
                  DIAS_SEMANA.map((d) => (
                    <DiaButton key={d} label={d} selected={form.dia === d} onClick={() => selectDia(d)} />
                  ))
                )}
              </div>

              <BtnPrimary disabled={!step4Ok} onClick={() => goTo(5)}>
                Continuar
              </BtnPrimary>
            </div>
          )}

          {step === 5 && (
            <div className={stepAnim}>
              <BtnBack onClick={() => goTo(4)} />
              <StepTitle>Confirme seu agendamento</StepTitle>
              <StepDesc>Revise os dados antes de finalizar.</StepDesc>

              <div className="mb-6">
                <ResumoItem label="Modalidade" value={form.modalidade === "musculacao" ? "🏋️ Musculação" : "⚡ Cross Training"} />
                <ResumoItem label="Nome" value={form.nome.trim()} />
                <ResumoItem label="WhatsApp" value={form.whatsapp} />
                <ResumoItem label="CPF" value={form.cpf} />
                <ResumoItem label="Horário" value={horarioLabel} />
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
            <div className={`${stepAnim} py-4 text-center`}>
              <SuccessIcon />
              <SuccessTitle>Agendado!</SuccessTitle>
              <SuccessMsg>
                Olá {form.nome.trim().split(" ")[0]}! Sua aula de{" "}
                {form.modalidade === "musculacao" ? "Musculação" : "Cross Training"} foi agendada com sucesso.
              </SuccessMsg>

              <div className="mb-6 rounded-xl bg-[var(--off-white)] p-5 text-left">
                {form.modalidade === "cross" ? (
                  <>
                    <p className="mb-1 text-[0.82rem] text-[var(--gray)]">
                      {crossSomenteSabado ? "Seu dia de treino:" : "Seus 3 dias de treino:"}
                    </p>
                    <strong className="text-[0.95rem] text-[var(--blue)]">{diasConsecutivos.join(" · ")}</strong>
                    <br />
                    <span className="text-[0.8rem] text-[var(--gray)]">Horário: {horarioLabel}</span>
                  </>
                ) : (
                  <p className="text-[0.82rem] text-[var(--gray)]">
                    Data e horário: <strong className="text-[0.95rem] text-[var(--blue)]">{form.dia} às {horarioLabel}</strong>
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
