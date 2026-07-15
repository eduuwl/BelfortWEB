"use client";

import type { ReactNode } from "react";

export function StepTitle({ children }: { children: ReactNode }) {
  return (
    <div className="font-heading mb-1 text-[1.7rem] tracking-[0.03em] text-[var(--blue)]">
      {children}
    </div>
  );
}

export function StepDesc({ children }: { children: ReactNode }) {
  return <p className="mb-6 text-[0.85rem] leading-relaxed text-[var(--gray)]">{children}</p>;
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 text-[0.8rem] font-semibold uppercase tracking-[0.04em] text-[var(--blue)]">
      {children}
    </p>
  );
}

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  hint?: ReactNode;
}

export function FieldInput({ label, value, onChange, type = "text", placeholder, maxLength, hint }: FieldInputProps) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-[0.8rem] font-semibold uppercase tracking-[0.04em] text-[var(--blue)]">
        {label} {hint}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full rounded-[10px] border-[1.5px] border-[var(--gray-light)] bg-white px-4 py-3 text-[0.95rem] text-[var(--text)] outline-none transition-all focus:border-[var(--blue-light)] focus:shadow-[0_0_0_3px_rgba(37,99,212,0.1)]"
      />
    </div>
  );
}

export function FieldTextarea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-20 w-full resize-none rounded-[10px] border-[1.5px] border-[var(--gray-light)] bg-white px-4 py-3 text-[0.95rem] text-[var(--text)] outline-none transition-all focus:border-[var(--blue-light)] focus:shadow-[0_0_0_3px_rgba(37,99,212,0.1)]"
    />
  );
}

export function ToggleRow({ value, onChange }: { value: boolean | null; onChange: (value: boolean) => void }) {
  return (
    <div className="mb-4 flex gap-2">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex-1 rounded-lg border-[1.5px] py-2.5 text-[0.85rem] font-semibold transition-colors ${
          value === true
            ? "border-[var(--red)] bg-[#FEF3F2] text-[var(--red-dark)]"
            : "border-[var(--gray-light)] bg-white"
        }`}
      >
        Sim
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex-1 rounded-lg border-[1.5px] py-2.5 text-[0.85rem] font-semibold transition-colors ${
          value === false
            ? "border-[#16A34A] bg-[#F0FDF4] text-[#166534]"
            : "border-[var(--gray-light)] bg-white"
        }`}
      >
        Não
      </button>
    </div>
  );
}

export function OptionGrid({ children }: { children: ReactNode }) {
  return <div className="mb-5 grid grid-cols-2 gap-2.5">{children}</div>;
}

export function OptionButton({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 px-3 py-4 text-center transition-all ${
        selected
          ? "border-[var(--blue)] bg-[var(--blue)] text-white"
          : "border-[var(--gray-light)] bg-white hover:border-[var(--blue-light)] hover:bg-[#EEF3FC]"
      }`}
    >
      <span className={`mb-1.5 block text-2xl ${selected ? "text-white/70" : "text-[var(--blue-light)]"}`}>
        {icon}
      </span>
      <span className="block text-[0.85rem] font-semibold">{label}</span>
    </button>
  );
}

export function HorarioGrid({ children }: { children: ReactNode }) {
  return <div className="mb-5 grid grid-cols-3 gap-2">{children}</div>;
}

export function HorarioButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border-[1.5px] py-2.5 text-[0.82rem] font-semibold transition-colors ${
        selected
          ? "border-[var(--red)] bg-[var(--red)] text-white"
          : "border-[var(--gray-light)] bg-white text-[var(--text)] hover:border-[var(--red)] hover:text-[var(--red)]"
      }`}
    >
      {label}
    </button>
  );
}

export function DiaButton({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border-[1.5px] px-2 py-2.5 text-center text-[0.82rem] font-semibold transition-colors ${
        selected
          ? "border-[var(--red)] bg-[var(--red)] text-white"
          : "border-[var(--gray-light)] bg-white text-[var(--text)] hover:border-[var(--red)] hover:text-[var(--red)]"
      }`}
    >
      {label}
      {sub && <span className="mt-0.5 block text-[0.7rem] font-normal opacity-75">{sub}</span>}
    </button>
  );
}

export function PlanoSelectCard({
  nome,
  detalhe,
  preco,
  parcela,
  selected,
  onClick,
}: {
  nome: string;
  detalhe: string;
  preco: string;
  parcela?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`mb-2 flex cursor-pointer items-center justify-between rounded-xl border-2 px-[1.1rem] py-4 transition-all ${
        selected ? "border-[var(--blue)] bg-[#EEF3FC]" : "border-[var(--gray-light)] hover:border-[var(--blue-light)]"
      }`}
    >
      <div>
        <div className="text-[0.9rem] font-semibold text-[var(--text)]">{nome}</div>
        <div className="mt-0.5 text-[0.75rem] text-[var(--gray)]">{detalhe}</div>
      </div>
      <div className="text-right">
        <div className="text-base font-semibold text-[var(--blue)]">{preco}</div>
        {parcela && <div className="text-[0.72rem] text-[var(--gray)]">{parcela}</div>}
      </div>
    </div>
  );
}

export function ResumoItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-2 border-b border-[var(--gray-light)] py-[0.65rem] text-[0.88rem] last:border-b-0">
      <span className="whitespace-nowrap text-[0.78rem] text-[var(--gray)]">{label}</span>
      <span className="text-right font-semibold text-[var(--blue)]">{value}</span>
    </div>
  );
}

export function BtnPrimary({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl bg-[var(--red)] py-4 text-base font-semibold tracking-[0.02em] text-white transition-all enabled:hover:-translate-y-px enabled:hover:bg-[var(--red-dark)] disabled:cursor-not-allowed disabled:opacity-45"
    >
      {children}
    </button>
  );
}

export function BtnBack({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-5 flex items-center gap-1 text-[0.85rem] text-[var(--gray)] transition-colors hover:text-[var(--blue)]"
    >
      ← Voltar
    </button>
  );
}

export function BtnWhatsapp({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 text-base font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#1da851]"
    >
      💬 Falar com a Recepção
    </a>
  );
}

export function AvisoBox({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mb-6 rounded-xl p-4 text-center text-[0.82rem] leading-relaxed ${className ?? "bg-[#EEF3FC] text-[var(--blue)]"}`}>
      {children}
    </div>
  );
}

export function LoadingOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[rgba(26,58,107,0.5)]">
      <div className="animate-spin-slow h-12 w-12 rounded-full border-[3px] border-white/30 border-t-white" />
    </div>
  );
}
