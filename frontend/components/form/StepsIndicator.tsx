export default function StepsIndicator({ total, current }: { total: number; current: number }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mb-8 flex items-center">
      {steps.map((step) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-semibold transition-all duration-300 ${
              step < current
                ? "bg-[var(--red)] text-white"
                : step === current
                  ? "scale-[1.15] bg-[var(--blue)] text-white shadow-[0_4px_14px_rgba(13,31,60,0.35)]"
                  : "bg-[var(--gray-light)] text-[var(--gray)]"
            }`}
          >
            {step}
          </div>
          {step < total && (
            <div
              className={`h-0.5 flex-1 transition-colors duration-500 ${
                step < current ? "bg-[var(--red)]" : "bg-[var(--gray-light)]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
