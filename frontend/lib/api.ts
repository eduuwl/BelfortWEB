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
  plano: string;
  aceite: string;
}

export interface CortesiaPayload {
  nome: string;
  whatsapp: string;
  cpf: string;
  modalidade: string;
  horario: string;
  dia: string;
  limitacao: string;
}

async function post(path: string, payload: unknown): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function submitMatricula(payload: MatriculaPayload) {
  return post('/matricula', payload);
}

export function submitCortesia(payload: CortesiaPayload) {
  return post('/cortesia', payload);
}
