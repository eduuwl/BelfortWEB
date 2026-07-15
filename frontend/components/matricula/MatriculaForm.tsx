"use client";

import { useState } from "react";
import StepsIndicator from "@/components/form/StepsIndicator";
import FormNav from "@/components/form/FormNav";
import {
  BtnBack,
  BtnPrimary,
  BtnWhatsapp,
  FieldInput,
  FieldLabel,
  FieldTextarea,
  HorarioButton,
  HorarioGrid,
  OptionButton,
  OptionGrid,
  PlanoSelectCard,
  ResumoItem,
  StepDesc,
  StepTitle,
  ToggleRow,
  LoadingOverlay,
} from "@/components/form/FormControls";
import {
  CheckboxLabel,
  FormCard,
  FormHero,
  FormPage,
  FormWrap,
  SuccessBox,
  SuccessIcon,
  SuccessMsg,
  SuccessTitle,
  TermoBox,
} from "@/components/form/FormShell";
import { cpfValido, formatDate, isValidEmail, maskCPF, maskPhone } from "@/lib/validators";
import { HORARIOS_CROSS_MATRICULA, PLANOS, type Modalidade, type Unidade } from "@/lib/planos";
import { submitMatricula } from "@/lib/api";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | "sucesso";

interface FormState {
  nome: string;
  nascimento: string;
  email: string;
  cpf: string;
  endereco: string;
  whatsapp: string;
  instagram: string;
  limitacao: boolean | null;
  limitacaoDesc: string;
  modalidade: Modalidade | null;
  unidade: Unidade | null;
  horario: string | null;
  planoId: string | null;
  aceite: boolean;
}

const INITIAL_STATE: FormState = {
  nome: "",
  nascimento: "",
  email: "",
  cpf: "",
  endereco: "",
  whatsapp: "",
  instagram: "",
  limitacao: null,
  limitacaoDesc: "",
  modalidade: null,
  unidade: null,
  horario: null,
  planoId: null,
  aceite: false,
};

const WHATSAPP_NUMERO = "5591984862479";

export default function MatriculaForm() {
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

  const step1Ok =
    form.nome.trim().length >= 3 &&
    form.nome.trim().includes(" ") &&
    form.nascimento !== "" &&
    isValidEmail(form.email.trim()) &&
    cpfValido(form.cpf) &&
    form.endereco.trim().length >= 5 &&
    form.whatsapp.replace(/\D/g, "").length >= 10;

  const step2Ok = form.limitacao !== null;

  const bloqueadoCrossSacramenta = form.unidade === "sacramenta" && form.modalidade === "cross";
  const step3Ok = Boolean(form.modalidade && form.unidade) && !bloqueadoCrossSacramenta;

  const horarioOk = form.modalidade === "musculacao" || form.horario !== null;
  const step4Ok = horarioOk && form.planoId !== null;

  const planosDisponiveis =
    form.modalidade && form.unidade ? PLANOS[form.modalidade][form.unidade] : [];
  const planoSelecionado = planosDisponiveis.find((p) => p.id === form.planoId) ?? null;

  function selectModalidade(m: Modalidade) {
    setForm((f) => ({ ...f, modalidade: m, horario: null, planoId: null }));
  }

  function selectUnidade(u: Unidade) {
    setForm((f) => {
      const next = { ...f, unidade: u };
      if (u === "sacramenta" && f.modalidade === "cross") {
        next.modalidade = null;
        next.planoId = null;
      }
      return next;
    });
  }

  function goStep4() {
    setForm((f) => ({ ...f, planoId: null }));
    goTo(4);
  }

  async function handleSubmit() {
    if (!planoSelecionado || !form.modalidade || !form.unidade) return;
    setLoading(true);
    setSubmitError(false);

    const ok = await submitMatricula({
      nome: form.nome.trim(),
      nascimento: formatDate(form.nascimento),
      email: form.email.trim(),
      cpf: form.cpf.trim(),
      endereco: form.endereco.trim(),
      whatsapp: form.whatsapp.trim(),
      instagram: form.instagram.trim() || "-",
      limitacao: form.limitacao ? form.limitacaoDesc.trim() || "Sim" : "Não",
      modalidade: form.modalidade === "musculacao" ? "Musculação" : "Cross Training",
      unidade: form.unidade === "telegrafo" ? "Telégrafo" : "Sacramenta",
      horario: form.horario ?? "Livre",
      plano: `${planoSelecionado.nome} — ${planoSelecionado.preco}`,
      aceite: "Sim",
    });

    setLoading(false);

    if (!ok) {
      setSubmitError(true);
      return;
    }

    goTo("sucesso");
  }

  const whatsMsg = planoSelecionado
    ? encodeURIComponent(
        `Olá! Acabei de realizar meu pré-cadastro na Academia Belfort. Nome: ${form.nome.trim()} | Modalidade: ${
          form.modalidade === "musculacao" ? "Musculação" : "Cross Training"
        } | Plano: ${planoSelecionado.nome} | Unidade: ${form.unidade === "telegrafo" ? "Telégrafo" : "Sacramenta"}`,
      )
    : "";

  return (
    <FormPage bgClassName="bg-[var(--red)]">
      <FormNav />
      <FormHero
        subtitle="Faça parte da família Belfort"
        tag="Pré-Cadastro"
        heroBgClassName="bg-[var(--blue)] pb-20 pt-20"
        tagBgClassName="bg-[var(--red)]"
      />

      <FormWrap>
        <FormCard>
          {step !== "sucesso" && <StepsIndicator total={6} current={step as number} />}

          {step === 1 && (
            <div className={stepAnim}>
              <StepTitle>Dados pessoais</StepTitle>
              <StepDesc>Vamos começar com suas informações básicas.</StepDesc>

              <FieldInput label="Nome completo *" value={form.nome} onChange={(v) => update("nome", v)} placeholder="Ex: João Silva" />
              <FieldInput label="Data de nascimento *" type="date" value={form.nascimento} onChange={(v) => update("nascimento", v)} />
              <FieldInput label="E-mail *" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="seu@email.com" />
              <FieldInput label="CPF *" value={form.cpf} onChange={(v) => update("cpf", maskCPF(v))} placeholder="000.000.000-00" maxLength={14} />
              <FieldInput label="Endereço *" value={form.endereco} onChange={(v) => update("endereco", v)} placeholder="Rua, número, bairro" />
              <FieldInput label="WhatsApp *" value={form.whatsapp} onChange={(v) => update("whatsapp", maskPhone(v))} placeholder="91988776655" />
              <FieldInput
                label="Instagram"
                hint={<span className="font-normal normal-case text-[var(--gray)]">(opcional)</span>}
                value={form.instagram}
                onChange={(v) => update("instagram", v)}
                placeholder="@seuperfil"
              />

              <BtnPrimary disabled={!step1Ok} onClick={() => goTo(2)}>
                Continuar →
              </BtnPrimary>
            </div>
          )}

          {step === 2 && (
            <div className={stepAnim}>
              <BtnBack onClick={() => goTo(1)} />
              <StepTitle>Saúde</StepTitle>
              <StepDesc>Possui alguma limitação física que devemos saber?</StepDesc>

              <ToggleRow value={form.limitacao} onChange={(v) => update("limitacao", v)} />
              {form.limitacao && (
                <div className="mb-4">
                  <FieldTextarea
                    value={form.limitacaoDesc}
                    onChange={(v) => update("limitacaoDesc", v)}
                    placeholder="Descreva brevemente sua limitação..."
                  />
                </div>
              )}

              <BtnPrimary disabled={!step2Ok} onClick={() => goTo(3)}>
                Continuar →
              </BtnPrimary>
            </div>
          )}

          {step === 3 && (
            <div className={stepAnim}>
              <BtnBack onClick={() => goTo(2)} />
              <StepTitle>Modalidade</StepTitle>
              <StepDesc>O que você quer praticar e onde?</StepDesc>

              <FieldLabel>Modalidade *</FieldLabel>
              <OptionGrid>
                <OptionButton icon="🏋️" label="Musculação" selected={form.modalidade === "musculacao"} onClick={() => selectModalidade("musculacao")} />
                <OptionButton icon="⚡" label="Cross Training" selected={form.modalidade === "cross"} onClick={() => selectModalidade("cross")} />
              </OptionGrid>

              <FieldLabel>Unidade *</FieldLabel>
              <OptionGrid>
                <OptionButton icon="📍" label="Telégrafo" selected={form.unidade === "telegrafo"} onClick={() => selectUnidade("telegrafo")} />
                <OptionButton icon="📍" label="Sacramenta" selected={form.unidade === "sacramenta"} onClick={() => selectUnidade("sacramenta")} />
              </OptionGrid>

              {bloqueadoCrossSacramenta && (
                <div className="mb-4 rounded-[10px] border-[1.5px] border-[var(--red)] bg-[#FEF3F2] p-4 text-[0.83rem] leading-relaxed text-[var(--red-dark)]">
                  ⚠️ <strong>Cross Training</strong> não está disponível na unidade Sacramenta. Por favor, selecione
                  Musculação ou escolha a unidade Telégrafo.
                </div>
              )}

              <BtnPrimary disabled={!step3Ok} onClick={goStep4}>
                Continuar →
              </BtnPrimary>
            </div>
          )}

          {step === 4 && (
            <div className={stepAnim}>
              <BtnBack onClick={() => goTo(3)} />
              <StepTitle>Horário &amp; Plano</StepTitle>
              <StepDesc>
                {form.modalidade === "cross"
                  ? "Escolha seu horário preferido e o plano desejado."
                  : "Musculação tem horário livre. Escolha seu plano."}
              </StepDesc>

              {form.modalidade === "cross" && (
                <>
                  <FieldLabel>Escolha seu horário *</FieldLabel>
                  <HorarioGrid>
                    {HORARIOS_CROSS_MATRICULA.map((h) => (
                      <HorarioButton key={h} label={h} selected={form.horario === h} onClick={() => update("horario", h)} />
                    ))}
                  </HorarioGrid>
                </>
              )}

              <FieldLabel>Escolha seu plano *</FieldLabel>
              <div className="mb-5">
                {planosDisponiveis.map((p) => (
                  <PlanoSelectCard
                    key={p.id}
                    nome={p.nome}
                    detalhe={p.detalhe}
                    preco={p.preco}
                    parcela={p.parcela}
                    selected={form.planoId === p.id}
                    onClick={() => update("planoId", p.id)}
                  />
                ))}
              </div>

              <BtnPrimary disabled={!step4Ok} onClick={() => goTo(5)}>
                Continuar →
              </BtnPrimary>
            </div>
          )}

          {step === 5 && (
            <div className={stepAnim}>
              <BtnBack onClick={() => goTo(4)} />
              <StepTitle>Termo de adesão</StepTitle>
              <StepDesc>Leia o termo antes de continuar.</StepDesc>

              <TermoBox pdfHref="/termo-adesao.pdf">
                <p>
                  Ao realizar o pré-cadastro na <strong>Academia Belfort</strong>, o aluno declara estar ciente e de
                  acordo com as seguintes condições:
                </p>
                <p>
                  <strong>1. Responsabilidade médica:</strong> O aluno declara estar em boas condições de saúde para a
                  prática de atividades físicas, eximindo a academia de responsabilidades decorrentes de problemas de
                  saúde preexistentes não informados.
                </p>
                <p>
                  <strong>2. Pagamento:</strong> O pagamento deverá ser realizado conforme o plano escolhido. O não
                  pagamento nas datas previstas pode resultar na suspensão do acesso.
                </p>
                <p>
                  <strong>3. Regras de convivência:</strong> O aluno se compromete a respeitar os equipamentos,
                  funcionários e demais alunos da academia.
                </p>
                <p>
                  <strong>4. Cancelamento:</strong> Cancelamentos devem ser solicitados com 30 dias de antecedência.
                </p>
                <p>
                  <strong>5. Uso de imagem:</strong> A academia poderá utilizar imagens do aluno captadas nas
                  dependências para fins de divulgação, salvo manifestação contrária expressa.
                </p>
                <p>
                  <strong>6. LGPD:</strong> Os dados fornecidos serão utilizados exclusivamente para fins de gestão do
                  cadastro e comunicação com o aluno, conforme a Lei Geral de Proteção de Dados.
                </p>
              </TermoBox>

              <CheckboxLabel checked={form.aceite} onChange={(v) => update("aceite", v)}>
                Li e aceito os termos de adesão da Academia Belfort
              </CheckboxLabel>

              <BtnPrimary disabled={!form.aceite} onClick={() => goTo(6)}>
                Continuar →
              </BtnPrimary>
            </div>
          )}

          {step === 6 && planoSelecionado && (
            <div className={stepAnim}>
              <BtnBack onClick={() => goTo(5)} />
              <StepTitle>Confirme seus dados</StepTitle>
              <StepDesc>Revise tudo antes de finalizar o pré-cadastro.</StepDesc>

              <div className="mb-6">
                <ResumoItem label="Nome" value={form.nome.trim()} />
                <ResumoItem label="Nascimento" value={formatDate(form.nascimento)} />
                <ResumoItem label="E-mail" value={form.email.trim()} />
                <ResumoItem label="CPF" value={form.cpf} />
                <ResumoItem label="Endereço" value={form.endereco.trim()} />
                <ResumoItem label="WhatsApp" value={form.whatsapp} />
                {form.instagram && <ResumoItem label="Instagram" value={form.instagram} />}
                <ResumoItem label="Limitação" value={form.limitacao ? form.limitacaoDesc.trim() || "Sim" : "Não"} />
                <ResumoItem label="Modalidade" value={form.modalidade === "musculacao" ? "🏋️ Musculação" : "⚡ Cross Training"} />
                <ResumoItem label="Unidade" value={form.unidade === "telegrafo" ? "Telégrafo" : "Sacramenta"} />
                {form.modalidade === "cross" && <ResumoItem label="Horário" value={form.horario} />}
                <ResumoItem label="Plano" value={`${planoSelecionado.nome} — ${planoSelecionado.preco}`} />
              </div>

              {submitError && (
                <p className="mb-4 text-center text-[0.82rem] text-[var(--red)]">
                  Não conseguimos enviar seu pré-cadastro agora. Tente novamente em instantes.
                </p>
              )}

              <BtnPrimary onClick={handleSubmit}>Finalizar pré-cadastro ✓</BtnPrimary>
            </div>
          )}

          {step === "sucesso" && planoSelecionado && (
            <div className={`${stepAnim} py-4 text-center`}>
              <SuccessIcon />
              <SuccessTitle>Pré-cadastro realizado!</SuccessTitle>
              <SuccessMsg>Olá {form.nome.trim().split(" ")[0]}! Seu pré-cadastro foi realizado com sucesso.</SuccessMsg>
              <SuccessBox>
                <strong>{form.modalidade === "musculacao" ? "Musculação" : "Cross Training"}</strong> ·{" "}
                {form.unidade === "telegrafo" ? "Telégrafo" : "Sacramenta"}
                <br />
                Plano: {planoSelecionado.nome}
                <br />
                {form.modalidade === "cross" ? `Horário: ${form.horario}` : "Horário: Livre"}
              </SuccessBox>
              <div className="mb-6 rounded-xl bg-[#EEF3FC] p-4 text-center text-[0.82rem] leading-relaxed text-[var(--blue)]">
                Nossa equipe entrará em contato pelo WhatsApp para confirmar sua matrícula e informar os próximos
                passos.
              </div>
              <BtnWhatsapp href={`https://wa.me/${WHATSAPP_NUMERO}?text=${whatsMsg}`} />
            </div>
          )}
        </FormCard>
      </FormWrap>

      <div className="pb-4 text-center text-[0.75rem] text-white/50">Academia Belfort © 2026</div>
      <LoadingOverlay show={loading} />
    </FormPage>
  );
}
