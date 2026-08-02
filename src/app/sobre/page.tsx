import type { Metadata } from "next";
import Link from "next/link";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sobre o Projeto WiW Speak",
  description: "Conheça a startup WiW Speak (Window in World), a equipe, a missão de acessibilidade, e o dispositivo vestível tradutor de Libras.",
};

const teamMembers = [
  { name: "Rogério Berlanda", role: "Fundador & Tech Lead", linkedin: "https://www.linkedin.com/in/rogerio-berlanda-643b45161" },
  { name: "Enzo T.", role: "Co-Fundador & Design", linkedin: "#" },
  { name: "Henrique V.", role: "Engenharia de Hardware", linkedin: "#" },
  { name: "Bruno P.", role: "Pesquisa & Validação", linkedin: "#" },
];

const timeline = [
  { phase: "Fase 1", title: "Pesquisa e Validação", status: "concluído", desc: "Pesquisa de campo, análise de mercado e entrevistas com a comunidade surda." },
  { phase: "Fase 2", title: "Protótipo de Software", status: "em progresso", desc: "Plataforma web com IA para reconhecimento de gestos via câmera." },
  { phase: "Fase 3", title: "Desenvolvimento do Wearable", status: "planejado", desc: "Hardware vestível com sensores IMU para captura de gestos das mãos." },
  { phase: "Fase 4", title: "Integração e Testes", status: "planejado", desc: "Conexão hardware ↔ software, testes com usuários reais." },
  { phase: "Fase 5", title: "Lançamento MVP", status: "planejado", desc: "Lançamento do produto mínimo viável para primeiros usuários." },
];

export default function SobrePage() {
  return (
    <>
      <AccessibilityBar />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="section">
          <div className="section-header">
            <span className="section-tag">Sobre Nós</span>
            <h1 className="section-title">WiW Speak — Window in World</h1>
            <p className="section-subtitle">
              Uma startup HealthTech/EdTech que combina tecnologia vestível e Inteligência Artificial para
              transformar a acessibilidade comunicacional de pessoas com deficiência auditiva e não verbais.
            </p>
          </div>

          {/* Mission / Vision / Values */}
          <div className="grid-3" style={{ marginBottom: "var(--space-16)" }}>
            <div className="card" style={{ textAlign: "center", borderColor: "rgba(0,102,255,0.3)" }}>
              <div className="card-icon" style={{ margin: "0 auto var(--space-4)", color: "var(--brand-primary-light)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="card-title">Missão</h3>
              <p className="card-description">
                Desenvolver tecnologia assistiva inteligente que elimina barreiras comunicacionais,
                promovendo autonomia e inclusão social.
              </p>
            </div>
            <div className="card" style={{ textAlign: "center", borderColor: "rgba(6,182,212,0.3)" }}>
              <div className="card-icon" style={{ margin: "0 auto var(--space-4)", color: "var(--brand-cyan)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="card-title">Visão</h3>
              <p className="card-description">
                Um mundo onde a comunicação é universal — onde tecnologia vestível torna a
                língua de sinais compreensível por qualquer pessoa, em qualquer lugar.
              </p>
            </div>
            <div className="card" style={{ textAlign: "center", borderColor: "rgba(139,92,246,0.3)" }}>
              <div className="card-icon" style={{ margin: "0 auto var(--space-4)", color: "#8B5CF6" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a6 6 0 0 0-6 6c0 2.22 1.21 4.15 3 5.19V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.81A6.002 6.002 0 0 0 18 8a6 6 0 0 0-6-6z" />
                  <line x1="9" y1="21" x2="15" y2="21" />
                </svg>
              </div>
              <h3 className="card-title">Valores</h3>
              <p className="card-description">
                Acessibilidade como direito fundamental, inovação com propósito social,
                empatia no design e transparência na pesquisa.
              </p>
            </div>
          </div>

          {/* Problem */}
          <div className="quote-container" style={{ marginBottom: "var(--space-16)" }}>
            <span className="section-tag">O Problema</span>
            <p className="quote-text" style={{ marginTop: "var(--space-4)" }}>
              No Brasil, mais de 10 milhões de pessoas possuem algum grau de deficiência auditiva e 2,3 milhões
              são não verbais. A falta de fluência em Libras pela população geral cria barreiras diárias em
              hospitais, escolas, comércios e ambientes de trabalho. Intérpretes são escassos e caros,
              e a tecnologia atual não resolve o problema em tempo real.
            </p>
          </div>

          {/* Team */}
          <div style={{ marginBottom: "var(--space-16)" }}>
            <div className="section-header">
              <span className="section-tag">Equipe Fundadora</span>
              <h2 className="section-title" style={{ fontSize: "var(--font-size-3xl)" }}>
                Quem Faz Acontecer
              </h2>
            </div>

            <div className="grid-4">
              {teamMembers.map((m) => (
                <div key={m.name} className="card" style={{ textAlign: "center" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "var(--radius-full)",
                    background: "var(--brand-gradient)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "var(--font-size-2xl)", fontWeight: 800,
                    color: "#ffffff", margin: "0 auto var(--space-4)",
                  }}>
                    {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <h4 className="card-title" style={{ fontSize: "var(--font-size-base)" }}>{m.name}</h4>
                  <p style={{ color: "var(--text-accent)", fontSize: "var(--font-size-sm)", fontWeight: 600 }}>{m.role}</p>
                  {m.linkedin !== "#" && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ justifyContent: "center", marginTop: "var(--space-2)" }}>
                      LinkedIn →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <div className="section-header">
              <span className="section-tag">Roadmap</span>
              <h2 className="section-title" style={{ fontSize: "var(--font-size-3xl)" }}>
                Cronograma do Projeto
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", maxWidth: 700, margin: "0 auto" }}>
              {timeline.map((t) => (
                <div key={t.phase} className="card" style={{
                  display: "flex", gap: "var(--space-4)", alignItems: "flex-start",
                  padding: "var(--space-5)",
                  borderColor: t.status === "concluído" ? "rgba(16,185,129,0.3)" : t.status === "em progresso" ? "rgba(0,102,255,0.3)" : "var(--border-default)",
                }}>
                  <div style={{
                    minWidth: 48, height: 48, borderRadius: "var(--radius-full)",
                    background: t.status === "concluído" ? "rgba(16,185,129,0.2)" : t.status === "em progresso" ? "rgba(0,102,255,0.2)" : "rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: t.status === "concluído" ? "var(--color-success)" : t.status === "em progresso" ? "var(--brand-primary-light)" : "var(--text-muted)",
                    fontWeight: 800, fontSize: "var(--font-size-sm)",
                    border: `1px solid ${t.status === "concluído" ? "rgba(16,185,129,0.4)" : t.status === "em progresso" ? "rgba(0,102,255,0.4)" : "var(--border-subtle)"}`,
                  }}>
                    {t.status === "concluído" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : t.status === "em progresso" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
                      <span className="font-mono" style={{ fontSize: "var(--font-size-xs)", color: "var(--text-accent)" }}>{t.phase}</span>
                      <span className={`badge ${t.status === "concluído" ? "badge-success" : ""}`} style={{ fontSize: "10px" }}>
                        {t.status === "concluído" ? "Concluído" : t.status === "em progresso" ? "Em Progresso" : "Planejado"}
                      </span>
                    </div>
                    <h4 style={{ fontWeight: 700, marginBottom: "var(--space-1)" }}>{t.title}</h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "var(--space-16)" }}>
            <Link href="/contato" className="btn btn-primary btn-lg">
              Entre em Contato →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
