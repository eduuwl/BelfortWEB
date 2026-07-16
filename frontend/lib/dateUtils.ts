const DIAS_SEMANA_INDEX: Record<string, number> = {
  Domingo: 0,
  Segunda: 1,
  Terça: 2,
  Quarta: 3,
  Quinta: 4,
  Sexta: 5,
  Sábado: 6,
};

export function formatarDataBr(data: Date): string {
  return data.toLocaleDateString('pt-BR', { timeZone: 'America/Belem' });
}

/** Próxima data (estritamente depois de hoje) que cai no dia da semana informado. */
export function proximaData(diaSemana: string, hoje = new Date()): Date {
  const alvo = DIAS_SEMANA_INDEX[diaSemana];
  const data = new Date(hoje);
  data.setHours(0, 0, 0, 0);
  do {
    data.setDate(data.getDate() + 1);
  } while (data.getDay() !== alvo);
  return data;
}

/**
 * Datas (dd/mm/aaaa) de cada dia da semana em `diasSemana`, em ordem.
 * Cada data é calculada a partir da anterior (não sempre a partir de hoje), pra respeitar
 * sequências que pulam o fim de semana (ex: Quinta, Sexta, Segunda).
 */
export function proximasDatas(diasSemana: string[], hoje = new Date()): string[] {
  const datas: Date[] = [];
  let referencia = hoje;
  for (const dia of diasSemana) {
    const data = proximaData(dia, referencia);
    datas.push(data);
    referencia = data;
  }
  return datas.map(formatarDataBr);
}
