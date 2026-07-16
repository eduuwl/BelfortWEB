export interface UnidadeInfo {
  num: string;
  nome: string;
  bairroLabel: string;
  bairroNome: string;
  logradouro: string;
  cidade: string;
  estado: string;
  horario: string;
  modalidades: string;
  whats: string;
  telefone: string;
}

export const UNIDADES: UnidadeInfo[] = [
  {
    num: "01",
    nome: "Belfort Telégrafo",
    bairroLabel: "Bairro do Telégrafo",
    bairroNome: "Telégrafo",
    logradouro: "Av. Sen. Lemos, 1752",
    cidade: "Belém",
    estado: "PA",
    horario: "Seg a Sex: 6h–22h · Sáb: 8h–16h",
    modalidades: "Musculação · Cross Training · +70 aulas coletivas/mês",
    whats: "https://wa.me/5591984862479",
    telefone: "+5591984862479",
  },
  {
    num: "02",
    nome: "Belfort Sacramenta",
    bairroLabel: "Bairro da Sacramenta",
    bairroNome: "Sacramenta",
    logradouro: "Av. Sen. Lemos, 2831",
    cidade: "Belém",
    estado: "PA",
    horario: "Seg a Sex: 6h–22h · Sáb: 8h–16h",
    modalidades: "Musculação · +70 aulas coletivas/mês",
    whats: "https://wa.me/559133515384",
    telefone: "+559133515384",
  },
];
