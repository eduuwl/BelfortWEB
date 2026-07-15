export const HORARIOS_MUSC = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
];

export const HORARIOS_CROSS = ['06:00', '12:30', '18:30', '19:30', 'Padrão'];

export const DIAS_SEMANA = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const DIAS_CONSECUTIVOS: Record<string, string[]> = {
  Segunda: ['Segunda', 'Terça', 'Quarta'],
  Terça: ['Terça', 'Quarta', 'Quinta'],
  Quarta: ['Quarta', 'Quinta', 'Sexta'],
  Quinta: ['Quinta', 'Sexta', 'Segunda'],
  Sexta: ['Sexta', 'Segunda', 'Terça'],
};
