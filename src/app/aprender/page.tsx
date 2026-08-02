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
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 20h16" />
        <path d="M6 16l6-12 6 12" />
        <path d="M8 12h8" />
      </svg>
    ),
    color: "#0066FF",
    items: "26 letras",
  },
  {
    title: "Palavras & Frases",
    description: "Vocabulário essencial organizado por categorias: cumprimentos, saúde, educação, cotidiano e família.",
    href: "/aprender/palavras",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "#06B6D4",
    items: "28+ palavras",
  },
  {
    title: "Modo Prática",
    description: "Pratique os gestos com a câmera em tempo real. O sistema verifica se você está fazendo o sinal correto.",
    href: "/aprender/pratica",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
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
                  <div className="card-icon" style={{ margin: "0 auto var(--space-4)", color: mod.color, background: `${mod.color}15`, borderColor: `${mod.color}33` }}>
                    {mod.icon}
                  </div>
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
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: "Empatia",
                  desc: "Compreender a realidade de pessoas com deficiência auditiva."
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  ),
                  title: "Pensamento Crítico",
                  desc: "Comunicação não-verbal exercita raciocínio e criatividade."
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 11V6a2 2 0 0 0-4 0v5" />
                      <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                      <path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                    </svg>
                  ),
                  title: "Coordenação Motora",
                  desc: "Gestos estimulam motricidade fina e consciência espacial."
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                  title: "Inclusão Social",
                  desc: "Quebrar barreiras comunicacionais na sociedade."
                },
              ].map((b) => (
                <div key={b.title} className="card" style={{ textAlign: "center" }}>
                  <div className="card-icon" style={{ margin: "0 auto var(--space-4)" }}>
                    {b.icon}
                  </div>
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
