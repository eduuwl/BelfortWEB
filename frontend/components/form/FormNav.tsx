import Image from "next/image";
import Link from "next/link";

export default function FormNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-black/25 backdrop-blur-lg">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--red)]/70 to-transparent" />

      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Academia Belfort"
            width={1005}
            height={334}
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white/75 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          Site
        </Link>
      </div>
    </nav>
  );
}
