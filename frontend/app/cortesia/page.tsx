import type { Metadata } from "next";
import CortesiaForm from "@/components/cortesia/CortesiaForm";

export const metadata: Metadata = {
  title: "Aula de Cortesia Gratuita",
  description:
    "Agende sua aula de cortesia gratuita de Musculação ou Cross Training na Academia Belfort em Belém.",
};

export default function CortesiaPage() {
  return (
    <div className="theme-cortesia">
      <CortesiaForm />
    </div>
  );
}
