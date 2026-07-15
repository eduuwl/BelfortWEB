export type Modalidade = 'musculacao' | 'cross';
export type Unidade = 'telegrafo' | 'sacramenta';

export interface Plano {
  id: string;
  nome: string;
  detalhe: string;
  preco: string;
  parcela: string;
}

export const PLANOS: Record<Modalidade, Record<Unidade, Plano[]>> = {
  musculacao: {
    telegrafo: [
      { id: 'musc_mensal', nome: 'Mensal', detalhe: 'Pagamento único', preco: 'R$ 110,00', parcela: '' },
      { id: 'musc_trim', nome: 'Trimestral', detalhe: '3 meses', preco: 'R$ 315,00', parcela: '3x de R$ 105,00' },
      { id: 'musc_sem', nome: 'Semestral', detalhe: '6 meses', preco: 'R$ 600,00', parcela: '6x de R$ 100,00' },
    ],
    sacramenta: [
      {
        id: 'musc_mensal_sac',
        nome: 'Mensal',
        detalhe: 'Musculação + mais de 70 aulas coletivas por mês',
        preco: 'R$ 100,00',
        parcela: '',
      },
    ],
  },
  cross: {
    telegrafo: [
      { id: 'cross_mensal', nome: 'Mensal', detalhe: 'Pagamento único', preco: 'R$ 190,00', parcela: '' },
      { id: 'cross_trim', nome: 'Trimestral', detalhe: '3 meses', preco: 'R$ 510,00', parcela: '3x de R$ 170,00' },
      { id: 'cross_sem', nome: 'Semestral', detalhe: '6 meses', preco: 'R$ 900,00', parcela: '6x de R$ 150,00' },
    ],
    sacramenta: [
      { id: 'cross_mensal', nome: 'Mensal', detalhe: 'Pagamento único', preco: 'R$ 190,00', parcela: '' },
      { id: 'cross_trim', nome: 'Trimestral', detalhe: '3 meses', preco: 'R$ 510,00', parcela: '3x de R$ 170,00' },
      { id: 'cross_sem', nome: 'Semestral', detalhe: '6 meses', preco: 'R$ 900,00', parcela: '6x de R$ 150,00' },
    ],
  },
};

export const HORARIOS_CROSS_MATRICULA = ['06:00', '07:00', '08:00', '10:00', '18:30', '19:30', '20:30'];
