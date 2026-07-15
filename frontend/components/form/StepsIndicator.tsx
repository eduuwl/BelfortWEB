export default function StepsIndicator({ total, current }: { total: number; current: number }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mb-8 flex items-center">
      {steps.map((step) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-semibold transition-colors ${
              step < current
                ? "bg-[var(--red)] text-white"
                : step === current
                  ? "bg-[var(--blue)] text-white"
                  : "bg-[var(--gray-light)] text-[var(--gray)]"
            }`}
          >
            {step}
          </div>
          {step < total && (
            <div
              className={`h-0.5 flex-1 transition-colors ${
                step < current ? "bg-[var(--red)]" : "bg-[var(--gray-light)]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
