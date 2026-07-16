export type Modalidade = 'musculacao' | 'cross' | 'kids' | 'personal';
export type Unidade = 'telegrafo' | 'sacramenta';

export interface Plano {
  id: string;
  nome: string;
  detalhe: string;
  preco: string;
  parcela: string;
}

export const UNIDADES_POR_MODALIDADE: Record<Modalidade, Unidade[]> = {
  musculacao: ['telegrafo', 'sacramenta'],
  cross: ['telegrafo'],
  kids: ['telegrafo'],
  personal: ['telegrafo', 'sacramenta'],
};

const PRIME: Plano = {
  id: 'musc_prime',
  nome: 'Belfort Prime',
  detalhe: 'Acesso às duas unidades (Telégrafo e Sacramenta)',
  preco: 'R$ 120,00',
  parcela: '',
};

export const PLANOS: Record<Modalidade, Record<Unidade, Plano[]>> = {
  musculacao: {
    telegrafo: [
      { id: 'musc_mensal', nome: 'Mensal', detalhe: 'Pagamento único', preco: 'R$ 110,00', parcela: '' },
      { id: 'musc_trim', nome: 'Trimestral', detalhe: '3 meses', preco: 'R$ 315,00', parcela: '3x de R$ 105,00' },
      { id: 'musc_sem', nome: 'Semestral', detalhe: '6 meses', preco: 'R$ 600,00', parcela: '6x de R$ 100,00' },
      PRIME,
    ],
    sacramenta: [
      {
        id: 'musc_mensal_sac',
        nome: 'Mensal',
        detalhe: 'Musculação + mais de 70 aulas coletivas por mês',
        preco: 'R$ 100,00',
        parcela: '',
      },
      PRIME,
    ],
  },
  cross: {
    telegrafo: [
      { id: 'cross_mensal', nome: 'Mensal', detalhe: 'Pagamento único', preco: 'R$ 190,00', parcela: '' },
      { id: 'cross_trim', nome: 'Trimestral', detalhe: '3 meses', preco: 'R$ 510,00', parcela: '3x de R$ 170,00' },
      { id: 'cross_sem', nome: 'Semestral', detalhe: '6 meses', preco: 'R$ 900,00', parcela: '6x de R$ 150,00' },
    ],
    sacramenta: [],
  },
  kids: {
    telegrafo: [
      {
        id: 'kids_mensal',
        nome: 'Mensal',
        detalhe: 'Segunda, Quarta e Sexta às 17h',
        preco: 'R$ 120,00',
        parcela: '',
      },
    ],
    sacramenta: [],
  },
  personal: {
    telegrafo: [
      {
        id: 'personal_mensal',
        nome: 'Mensal',
        detalhe: 'Taxa de acesso para personal trainer externo',
        preco: 'R$ 50,00',
        parcela: '',
      },
    ],
    sacramenta: [
      {
        id: 'personal_mensal',
        nome: 'Mensal',
        detalhe: 'Taxa de acesso para personal trainer externo',
        preco: 'R$ 50,00',
        parcela: '',
      },
    ],
  },
};

export const HORARIOS_CROSS_MATRICULA = ['06:00', '07:00', '08:00', '10:00', '18:30', '19:30', '20:30'];
