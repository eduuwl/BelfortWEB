"use client";

import { useEffect, useRef } from "react";

const MAX_AGE_MS = 24 * 60 * 60 * 1000;

interface Persisted<T> {
  savedAt: number;
  data: T;
}

/**
 * Salva `data` no localStorage a cada mudança e, no primeiro render, restaura o que foi
 * salvo (se não estiver expirado) via `onRestore`. Usado para não perder o progresso do
 * formulário se a pessoa fechar a aba ou atualizar a página no meio do preenchimento.
 */
export function useFormPersistence<T>(key: string, data: T, onRestore: (data: T) => void) {
  // A primeira chamada do efeito de persistência (no mount) precisa ser ignorada: ela roda
  // antes do re-render disparado pela restauração abaixo, e gravaria o estado inicial vazio
  // por cima do que acabou de ser lido do localStorage.
  const skipNextPersist = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Persisted<T>;
      if (Date.now() - parsed.savedAt > MAX_AGE_MS) {
        localStorage.removeItem(key);
        return;
      }
      onRestore(parsed.data);
    } catch {
      localStorage.removeItem(key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      return;
    }
    try {
      const payload: Persisted<T> = { savedAt: Date.now(), data };
      localStorage.setItem(key, JSON.stringify(payload));
    } catch {
      // localStorage indisponível (modo privado, quota cheia etc.) — segue sem persistir.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}

export function clearFormPersistence(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignora
  }
}
