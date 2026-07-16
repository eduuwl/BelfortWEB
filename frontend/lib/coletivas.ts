import {
  ArrowUpCircleIcon,
  FireIcon,
  HandRaisedIcon,
  HeartIcon,
  MusicalNoteIcon,
  RocketLaunchIcon,
  SparklesIcon,
  Squares2X2Icon,
  StarIcon,
  BoltIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import type { IconType } from "@/components/form/FormControls";

export type ColetivaSlug =
  | "fitdance"
  | "pilates"
  | "boxe"
  | "muaythai"
  | "ritmos"
  | "ritbox"
  | "funcional"
  | "danca"
  | "corrida"
  | "jump"
  | "powermix";

export interface Coletiva {
  slug: ColetivaSlug;
  icon: IconType;
  nome: string;
  desc: string;
}

export const COLETIVAS: Coletiva[] = [
  { slug: "fitdance", icon: MusicalNoteIcon, nome: "Fit Dance", desc: "Dança fitness divertida e queima calorias" },
  { slug: "pilates", icon: SparklesIcon, nome: "Pilates de Solo", desc: "Fortalecimento e flexibilidade" },
  { slug: "boxe", icon: HandRaisedIcon, nome: "Boxe", desc: "Técnica, condicionamento e autodefesa" },
  { slug: "muaythai", icon: FireIcon, nome: "Muay Thai", desc: "Arte marcial completa e eficiente" },
  { slug: "ritmos", icon: StarIcon, nome: "Ritmos", desc: "Aeróbico com ritmos e muita energia" },
  { slug: "ritbox", icon: BoltIcon, nome: "Ritbox", desc: "Boxe com ritmo e intensidade" },
  { slug: "funcional", icon: TrophyIcon, nome: "Funcional", desc: "Treino completo com o peso do corpo" },
  { slug: "danca", icon: HeartIcon, nome: "Dança de Salão", desc: "Elegância, ritmo e socialização" },
  { slug: "corrida", icon: RocketLaunchIcon, nome: "Corrida de Rua", desc: "Preparação para provas e condicionamento" },
  { slug: "jump", icon: ArrowUpCircleIcon, nome: "Jump", desc: "Mini trampolim para queimar calorias" },
  { slug: "powermix", icon: Squares2X2Icon, nome: "Power Mix", desc: "Combinação de musculação e cardio" },
];

export const COLETIVA_COLORS: Record<ColetivaSlug, { bg: string; border: string; text: string }> = {
  fitdance: { bg: "rgba(236,72,153,0.15)", border: "rgba(236,72,153,0.3)", text: "#EC4899" },
  pilates: { bg: "rgba(37,99,212,0.15)", border: "rgba(37,99,212,0.3)", text: "#2563D4" },
  boxe: { bg: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.3)", text: "#06B6D4" },
  muaythai: { bg: "rgba(234,179,8,0.15)", border: "rgba(234,179,8,0.3)", text: "#EAB308" },
  ritmos: { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)", text: "#EF4444" },
  ritbox: { bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.3)", text: "#8B5CF6" },
  funcional: { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)", text: "#22C55E" },
  danca: { bg: "rgba(249,115,22,0.15)", border: "rgba(249,115,22,0.3)", text: "#F97316" },
  corrida: { bg: "rgba(251,146,60,0.15)", border: "rgba(251,146,60,0.3)", text: "#FB923C" },
  jump: { bg: "rgba(20,184,166,0.15)", border: "rgba(20,184,166,0.3)", text: "#14B8A6" },
  powermix: { bg: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.3)", text: "#A855F7" },
};

export interface GradeRow {
  horario: string;
  cells: (ColetivaSlug | null)[];
}

export const DIAS_TELEGRAFO = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
export const DIAS_SACRAMENTA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

export const GRADE_TELEGRAFO: GradeRow[] = [
  { horario: "07:00", cells: [null, "pilates", null, "pilates", null, null] },
  { horario: "08:00", cells: ["ritbox", null, "ritmos", null, "ritmos", null] },
  { horario: "08:30", cells: [null, "ritmos", null, "ritmos", null, null] },
  { horario: "09:00", cells: [null, null, "boxe", null, "boxe", "boxe"] },
  { horario: "09:30", cells: [null, "pilates", null, "pilates", null, null] },
  { horario: "16:00", cells: [null, "fitdance", null, "fitdance", null, null] },
  { horario: "17:00", cells: [null, "powermix", null, "ritbox", null, null] },
  { horario: "18:30", cells: ["pilates", null, "pilates", null, "muaythai", null] },
  { horario: "19:00", cells: [null, "muaythai", null, "muaythai", null, null] },
  { horario: "19:30", cells: ["fitdance", null, "fitdance", null, "fitdance", null] },
  { horario: "20:00", cells: ["corrida", "funcional", null, "funcional", null, null] },
  { horario: "20:40", cells: ["danca", null, "danca", null, null, null] },
];

export const GRADE_SACRAMENTA: GradeRow[] = [
  { horario: "07:30", cells: [null, null, "pilates", null, "pilates"] },
  { horario: "08:00", cells: [null, "boxe", null, "ritbox", null] },
  { horario: "08:30", cells: [null, null, "fitdance", null, "fitdance"] },
  { horario: "09:00", cells: [null, null, null, "boxe", null] },
  { horario: "16:00", cells: ["muaythai", null, "muaythai", null, "muaythai"] },
  { horario: "18:20", cells: ["fitdance", null, "jump", null, "ritmos"] },
  { horario: "19:00", cells: [null, "ritbox", null, "ritmos", null] },
  { horario: "19:30", cells: ["danca", null, "danca", null, "muaythai"] },
  { horario: "20:00", cells: [null, "boxe", null, "boxe", null] },
  { horario: "20:30", cells: ["muaythai", null, "muaythai", null, null] },
];
