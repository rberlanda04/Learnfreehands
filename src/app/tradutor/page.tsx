import type { Metadata } from "next";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TradutorApp from "@/components/tradutor/TradutorApp";

export const metadata: Metadata = {
  title: "Tradutor IA de Libras em Tempo Real",
  description:
    "Reconhecimento de gestos de Libras em tempo real usando câmera, MediaPipe e Inteligência Artificial. Tradução bidirecional: Libras → Voz e Voz → Texto.",
};

export default function TradutorPage() {
  return (
    <>
      <AccessibilityBar />
      <Header />
      <main id="main-content">
        <TradutorApp />
      </main>
      <Footer />
    </>
  );
}
