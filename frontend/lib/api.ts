const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface MatriculaPayload {
  nome: string;
  nascimento: string;
  email: string;
  cpf: string;
  endereco: string;
  whatsapp: string;
  instagram: string;
  limitacao: string;
  modalidade: string;
  unidade: string;
  horario: string;
  cref: string;
  plano: string;
  aceite: string;
}

export interface CortesiaPayload {
  nome: string;
  whatsapp: string;
  email: string;
  cpf: string;
  modalidade: string;
  horario: string;
  dia: string;
  datasAula: string;
  limitacao: string;
}

export type SubmitResult = { ok: true } | { ok: false; status: number; message: string };

const MENSAGEM_ERRO_PADRAO = 'Não conseguimos processar sua solicitação agora. Tente novamente em instantes.';

async function post(path: string, payload: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { ok: true };

    const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
    return { ok: false, status: res.status, message: message ?? MENSAGEM_ERRO_PADRAO };
  } catch {
    return { ok: false, status: 0, message: 'Falha de conexão. Verifique sua internet e tente novamente.' };
  }
}

export function submitMatricula(payload: MatriculaPayload) {
  return post('/matricula', payload);
}

export function submitCortesia(payload: CortesiaPayload) {
  return post('/cortesia', payload);
}
