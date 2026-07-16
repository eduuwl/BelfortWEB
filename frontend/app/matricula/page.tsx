import type { Metadata } from "next";
import MatriculaForm from "@/components/matricula/MatriculaForm";

export const metadata: Metadata = {
  title: "Pré-Cadastro",
  description:
    "Faça seu pré-cadastro na Academia Belfort — escolha modalidade, unidade e plano em poucos passos.",
};

export default function MatriculaPage() {
  return (
    <div className="theme-matricula">
      <MatriculaForm />
    </div>
  );
}
