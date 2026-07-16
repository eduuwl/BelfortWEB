"use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import type { ComponentType, ReactNode, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

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
        className={`flex-1 rounded-lg border-[1.5px] py-2.5 text-[0.85rem] font-semibold transition-all active:scale-95 ${
          value === true
            ? "scale-[1.02] border-[var(--red)] bg-[#FEF3F2] text-[var(--red-dark)] shadow-[0_4px_14px_rgba(204,55,56,0.15)]"
            : "border-[var(--gray-light)] bg-white hover:border-[var(--red)]/40"
        }`}
      >
        Sim
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex-1 rounded-lg border-[1.5px] py-2.5 text-[0.85rem] font-semibold transition-all active:scale-95 ${
          value === false
            ? "scale-[1.02] border-[#16A34A] bg-[#F0FDF4] text-[#166534] shadow-[0_4px_14px_rgba(22,163,74,0.15)]"
            : "border-[var(--gray-light)] bg-white hover:border-[#16A34A]/40"
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
  icon: Icon,
  label,
  selected,
  onClick,
}: {
  icon: IconType;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 px-3 py-4 text-center transition-all active:scale-95 ${
        selected
          ? "-translate-y-0.5 border-[var(--blue)] bg-[var(--blue)] text-white shadow-[0_10px_24px_rgba(13,31,60,0.25)]"
          : "border-[var(--gray-light)] bg-white hover:-translate-y-0.5 hover:border-[var(--blue-light)] hover:bg-[#EEF3FC] hover:shadow-[0_8px_20px_rgba(37,99,212,0.12)]"
      }`}
    >
      <Icon
        className={`mx-auto mb-1.5 h-7 w-7 transition-transform duration-300 ${selected ? "scale-110 text-white/70" : "text-[var(--blue-light)]"}`}
      />
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
      className={`rounded-lg border-[1.5px] py-2.5 text-[0.82rem] font-semibold transition-all active:scale-95 ${
        selected
          ? "-translate-y-0.5 border-[var(--red)] bg-[var(--red)] text-white shadow-[0_8px_20px_rgba(204,55,56,0.3)]"
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
      className={`rounded-lg border-[1.5px] px-2 py-2.5 text-center text-[0.82rem] font-semibold transition-all active:scale-95 ${
        selected
          ? "-translate-y-0.5 border-[var(--red)] bg-[var(--red)] text-white shadow-[0_8px_20px_rgba(204,55,56,0.3)]"
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
      className={`mb-2 flex cursor-pointer items-center justify-between rounded-xl border-2 px-[1.1rem] py-4 transition-all active:scale-[0.98] ${
        selected
          ? "-translate-y-0.5 border-[var(--blue)] bg-[#EEF3FC] shadow-[0_10px_24px_rgba(13,31,60,0.14)]"
          : "border-[var(--gray-light)] hover:-translate-y-0.5 hover:border-[var(--blue-light)] hover:shadow-[0_8px_18px_rgba(37,99,212,0.1)]"
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
      className="w-full rounded-xl bg-[var(--red)] py-4 text-base font-semibold tracking-[0.02em] text-white transition-all enabled:hover:-translate-y-px enabled:hover:bg-[var(--red-dark)] enabled:hover:shadow-[0_10px_28px_rgba(204,55,56,0.35)] enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
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
      className="group mb-5 flex items-center gap-1 text-[0.85rem] text-[var(--gray)] transition-colors hover:text-[var(--blue)]"
    >
      <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span> Voltar
    </button>
  );
}

export function BtnWhatsapp({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 text-base font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#1da851] hover:shadow-[0_10px_28px_rgba(37,211,102,0.35)] active:scale-[0.98]"
    >
      <ChatBubbleLeftRightIcon className="h-5 w-5" />
      Falar com a Recepção
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
    <div className="animate-fade-in-step fixed inset-0 z-[999] flex items-center justify-center bg-[rgba(26,58,107,0.5)] backdrop-blur-[2px]">
      <div className="animate-spin-slow h-12 w-12 rounded-full border-[3px] border-white/30 border-t-white" />
    </div>
  );
}
