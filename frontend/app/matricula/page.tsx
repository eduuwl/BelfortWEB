import type { Metadata } from "next";
import MatriculaForm from "@/components/matricula/MatriculaForm";

export const metadata: Metadata = {
  title: "Academia Belfort — Pré-Cadastro",
};

export default function MatriculaPage() {
  return (
    <div className="theme-matricula">
      <MatriculaForm />
    </div>
  );
}
