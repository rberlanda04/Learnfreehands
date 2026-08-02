import type { Metadata } from "next";
import Link from "next/link";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Aprender Libras",
  description: "Plataforma educacional de Libras com cursos interativos, alfabeto completo, vocabulário por categorias e modo prática com câmera.",
};

const modules = [
  {
    title: "Alfabeto A-Z",
    description: "Aprenda todas as 26 letras do alfabeto de Libras com descrições detalhadas e instruções passo a passo.",
    href: "/aprender/alfabeto",
    emoji: "🔤",
    color: "#0066FF",
    items: "26 letras",
  },
  {
    title: "Palavras & Frases",
    description: "Vocabulário essencial organizado por categorias: cumprimentos, saúde, educação, cotidiano e família.",
    href: "/aprender/palavras",
    emoji: "💬",
    color: "#06B6D4",
    items: "28+ palavras",
  },
  {
    title: "Modo Prática",
    description: "Pratique os gestos com a câmera em tempo real. O sistema verifica se você está fazendo o sinal correto.",
    href: "/aprender/pratica",
    emoji: "🎯",
    color: "#8B5CF6",
    items: "Quiz interativo",
  },
];

export default function AprenderPage() {
  return (
    <>
      <AccessibilityBar />
      <Header />
      <main id="main-content">
        <section className="section">
          <div className="section-header">
            <span className="section-tag">Plataforma Educacional</span>
            <h1 className="section-title">Aprender Libras</h1>
            <p className="section-subtitle">
              Explore nossos módulos de ensino interativo. De letras a frases completas, aprenda no seu ritmo.
            </p>
          </div>

          <div className="grid-3">
            {modules.map((mod) => (
              <Link href={mod.href} key={mod.href} style={{ textDecoration: "none" }}>
                <div className="card" style={{ height: "100%", cursor: "pointer", textAlign: "center", borderColor: `${mod.color}33` }}>
                  <div style={{ fontSize: "var(--font-size-5xl)", marginBottom: "var(--space-4)" }}>{mod.emoji}</div>
                  <h3 className="card-title">{mod.title}</h3>
                  <p className="card-description">{mod.description}</p>
                  <div className="badge" style={{ marginTop: "var(--space-4)", background: `${mod.color}22`, borderColor: `${mod.color}55`, color: mod.color }}>
                    {mod.items}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Benefits Section */}
          <div style={{ marginTop: "var(--space-16)" }}>
            <div className="section-header">
              <span className="section-tag">Por que aprender?</span>
              <h2 className="section-title" style={{ fontSize: "var(--font-size-3xl)" }}>
                Benefícios Educacionais de Libras
              </h2>
            </div>

            <div className="grid-4">
              {[
                { emoji: "🤝", title: "Empatia", desc: "Compreender a realidade de pessoas com deficiência auditiva." },
                { emoji: "🧠", title: "Pensamento Crítico", desc: "Comunicação não-verbal exercita raciocínio e criatividade." },
                { emoji: "🖐️", title: "Coordenação Motora", desc: "Gestos estimulam motricidade fina e consciência espacial." },
                { emoji: "🌍", title: "Inclusão Social", desc: "Quebrar barreiras comunicacionais na sociedade." },
              ].map((b) => (
                <div key={b.title} className="card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "var(--font-size-3xl)", marginBottom: "var(--space-3)" }}>{b.emoji}</div>
                  <h4 className="card-title" style={{ fontSize: "var(--font-size-lg)" }}>{b.title}</h4>
                  <p className="card-description" style={{ fontSize: "var(--font-size-sm)" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
