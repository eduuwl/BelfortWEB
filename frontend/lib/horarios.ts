export interface HorarioSlot {
  value: string;
  label: string;
  somenteSabado?: boolean;
}

function gerarSlots(inicioHora: number, fimHora: number, passoMinutos: number): HorarioSlot[] {
  const slots: HorarioSlot[] = [];
  for (let mins = inicioHora * 60; mins <= fimHora * 60; mins += passoMinutos) {
    const h = Math.floor(mins / 60).toString().padStart(2, '0');
    const m = (mins % 60).toString().padStart(2, '0');
    const label = `${h}:${m}`;
    slots.push({ value: label, label });
  }
  return slots;
}

// Musculação tem horário livre das 6h às 22h (seg a sex). Aos sábados a academia fecha às
// 16h — ver horarioValidoNoSabado no CortesiaForm, que filtra o dia "Sábado" de acordo.
export const HORARIOS_MUSC: HorarioSlot[] = gerarSlots(6, 22, 30);

// Cross Training tem aulas em horários fixos. A de 10h só acontece aos sábados.
export const HORARIOS_CROSS: HorarioSlot[] = [
  { value: '06:00', label: '06:00 – 07:00' },
  { value: '07:00', label: '07:00 – 08:00' },
  { value: '08:00', label: '08:00 – 09:00' },
  { value: '10:00', label: '10:00 – 11:00 (Sáb)', somenteSabado: true },
  { value: '18:30', label: '18:30 – 19:30' },
  { value: '19:30', label: '19:30 – 20:30' },
  { value: '20:30', label: '20:30 – 21:30' },
];

// Funcional Kids tem uma única turma fixa, só na unidade Telégrafo.
export const HORARIOS_KIDS: HorarioSlot[] = [{ value: '17:00', label: '17:00 – 18:00 (Seg, Qua e Sex)' }];

export const DIAS_KIDS = ['Segunda', 'Quarta', 'Sexta'];

export const DIAS_SEMANA = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const DIAS_CONSECUTIVOS: Record<string, string[]> = {
  Segunda: ['Segunda', 'Terça', 'Quarta'],
  Terça: ['Terça', 'Quarta', 'Quinta'],
  Quarta: ['Quarta', 'Quinta', 'Sexta'],
  Quinta: ['Quinta', 'Sexta', 'Segunda'],
  Sexta: ['Sexta', 'Segunda', 'Terça'],
};
