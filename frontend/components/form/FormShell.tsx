import Image from "next/image";
import { CheckCircleIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import type { ReactNode } from "react";

export function FormCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[20px] bg-white p-[1.75rem] shadow-[0_20px_60px_rgba(26,58,107,0.18)]">
      {children}
    </div>
  );
}

export function FormPage({ children, bgClassName }: { children: ReactNode; bgClassName: string }) {
  return <div className={`flex min-h-screen flex-col ${bgClassName}`}>{children}</div>;
}

export function FormHero({
  subtitle,
  tag,
  heroBgClassName,
  tagBgClassName,
}: {
  subtitle: string;
  tag: string;
  heroBgClassName: string;
  tagBgClassName: string;
}) {
  return (
    <div className={`relative overflow-hidden px-6 text-center ${heroBgClassName}`}>
      <span className="animate-breathe pointer-events-none absolute -right-20 -top-[60px] h-[320px] w-[320px] rounded-full bg-[var(--red)] opacity-[0.18]" />
      <span
        className="animate-breathe pointer-events-none absolute -bottom-20 -left-[60px] h-[260px] w-[260px] rounded-full bg-[var(--blue-light)] opacity-25"
        style={{ animationDelay: "1.2s" }}
      />
      <Image
        src="/images/logo.png"
        alt="Academia Belfort"
        width={1005}
        height={334}
        className="animate-fade-up relative z-[1] mx-auto h-auto w-[220px]"
      />
      <p
        className="animate-fade-up relative z-[1] mt-2 text-[0.85rem] font-medium uppercase tracking-[0.18em] text-white/60"
        style={{ animationDelay: "0.1s" }}
      >
        {subtitle}
      </p>
      <span
        className={`animate-fade-up relative z-[1] mt-6 inline-block rounded-full px-5 py-[0.45rem] text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-white ${tagBgClassName}`}
        style={{ animationDelay: "0.2s" }}
      >
        {tag}
      </span>
    </div>
  );
}

export function FormWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 mx-auto -mt-10 w-full max-w-[520px] flex-1 px-4 pb-16">
      {children}
    </div>
  );
}

export function SuccessIcon() {
  return (
    <div className="animate-success-pop mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--blue)] shadow-[0_10px_30px_rgba(13,31,60,0.35)]">
      <CheckCircleIcon className="h-9 w-9 text-white" />
    </div>
  );
}

export function SuccessTitle({ children }: { children: ReactNode }) {
  return <div className="font-heading text-2xl tracking-[0.04em] text-[var(--blue)]">{children}</div>;
}

export function SuccessMsg({ children }: { children: ReactNode }) {
  return <p className="mb-4 mt-2.5 text-[0.9rem] leading-relaxed text-[var(--gray)]">{children}</p>;
}

export function SuccessBox({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 rounded-xl bg-[var(--off-white)] p-5 text-left text-[0.85rem] leading-[1.8]">
      {children}
    </div>
  );
}

export function TermoBox({ children, pdfHref }: { children: ReactNode; pdfHref: string }) {
  return (
    <div className="mb-4 overflow-hidden rounded-xl border-[1.5px] border-[var(--gray-light)]">
      <div className="flex items-center justify-between bg-[var(--blue)] px-4 py-[0.7rem] text-[0.82rem] font-semibold text-white">
        <span className="flex items-center gap-1.5">
          <DocumentTextIcon className="h-4 w-4" />
          Termo de Adesão — Academia Belfort
        </span>
        <a
          href={pdfHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-white/30 px-2.5 py-1 text-[0.78rem] text-white/80 transition-colors hover:bg-white/[0.15]"
        >
          Abrir PDF ↗
        </a>
      </div>
      <div className="max-h-[200px] overflow-y-auto p-4 text-[0.82rem] leading-[1.7] text-[#444] [&>p]:mb-[0.7rem]">
        {children}
      </div>
    </div>
  );
}

export function CheckboxLabel({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className="mb-6 flex cursor-pointer items-start gap-2.5 text-[0.85rem] leading-snug text-[var(--text)]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-px h-[18px] w-[18px] shrink-0 accent-[var(--blue)]"
      />
      <span>{children}</span>
    </label>
  );
}
