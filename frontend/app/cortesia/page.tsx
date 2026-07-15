import type { Metadata } from "next";
import CortesiaForm from "@/components/cortesia/CortesiaForm";

export const metadata: Metadata = {
  title: "Academia Belfort — Aula de Cortesia",
};

export default function CortesiaPage() {
  return (
    <div className="theme-cortesia">
      <CortesiaForm />
    </div>
  );
}
