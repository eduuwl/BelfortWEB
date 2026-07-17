"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#modalidades", label: "Modalidades" },
  { href: "/#planos", label: "Planos" },
  { href: "/#unidades", label: "Unidades" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-8 py-[1.2rem] transition-all duration-[400ms] ${
          scrolled
            ? "bg-[rgba(13,31,60,0.95)] backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/20"
            : ""
        }`}
      >
        <Link href="/" className="transition-transform hover:scale-105">
          <Image
            src="/images/logo.png"
            alt="Academia Belfort"
            width={1005}
            height={334}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group relative text-[0.82rem] font-medium tracking-[0.1em] uppercase text-white/70 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[var(--red-glow)] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/galeria"
              className="group relative text-[0.82rem] font-medium tracking-[0.1em] uppercase text-white/70 transition-colors hover:text-white"
            >
              Galeria
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[var(--red-glow)] transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
          <li>
            <Link
              href="/matricula"
              className="rounded-md bg-[var(--red)] px-[1.2rem] py-2 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--red-dark)] hover:shadow-[0_6px_20px_rgba(204,55,56,0.4)] active:scale-95"
            >
              Cadastre-se
            </Link>
          </li>
        </ul>

        <div
          className={`md:hidden cursor-pointer flex-col gap-[5px] p-1 ${menuOpen ? "hidden" : "flex"}`}
          onClick={() => setMenuOpen(true)}
        >
          <span className="block h-0.5 w-6 rounded bg-white" />
          <span className="block h-0.5 w-6 rounded bg-white" />
          <span className="block h-0.5 w-6 rounded bg-white" />
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[99] flex-col items-center justify-center gap-8 bg-[var(--blue)] ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <span
          className="absolute right-8 top-6 cursor-pointer text-3xl text-white"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </span>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-heading text-[2.5rem] tracking-[0.06em] text-white transition-colors hover:text-[var(--red)]"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/galeria"
          onClick={() => setMenuOpen(false)}
          className="font-heading text-[2.5rem] tracking-[0.06em] text-white transition-colors hover:text-[var(--red)]"
        >
          Galeria
        </Link>
        <Link
          href="/cortesia"
          onClick={() => setMenuOpen(false)}
          className="font-heading text-[2.5rem] tracking-[0.06em] text-[var(--red)]"
        >
          Aula Grátis
        </Link>
      </div>
    </>
  );
}
