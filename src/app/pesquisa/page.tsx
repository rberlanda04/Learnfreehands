import type { Metadata } from "next";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pesquisa de Viabilidade",
  description: "Participe da pesquisa de viabilidade do projeto WiW Speak. Sua opinião ajuda a moldar o futuro da acessibilidade comunicacional.",
};

export default function PesquisaPage() {
  return (
    <>
      <AccessibilityBar />
      <Header />
      <main id="main-content">
        <section className="section" style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="section-header">
            <span className="section-tag">Engajamento & Validação</span>
            <h1 className="section-title">Pesquisa de Viabilidade</h1>
            <p className="section-subtitle">
              Sua participação é fundamental para validar e aprimorar nossa solução.
              Cada resposta nos ajuda a entender as necessidades reais da comunidade.
            </p>
          </div>

          {/* Survey Card */}
          <div className="card" style={{
            textAlign: "center", padding: "var(--space-10)",
            borderColor: "rgba(0,102,255,0.3)",
            background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(0,102,255,0.1) 100%)",
          }}>
            <div style={{ fontSize: "var(--font-size-5xl)", marginBottom: "var(--space-4)" }}>📋</div>
            <h2 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 800, marginBottom: "var(--space-3)" }}>
              Pesquisa de Campo WiW Speak
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)", lineHeight: 1.7 }}>
              Este questionário leva aproximadamente 5 minutos. As respostas são anônimas e usadas
              exclusivamente para fins de pesquisa e desenvolvimento do projeto.
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "var(--space-4)", marginBottom: "var(--space-8)", textAlign: "left",
            }}>
              {[
                { emoji: "👤", title: "Perfil do Respondente", desc: "Dados demográficos e relação com acessibilidade." },
                { emoji: "🔧", title: "Necessidades Atuais", desc: "Principais barreiras enfrentadas na comunicação." },
                { emoji: "💡", title: "Solução Proposta", desc: "Avaliação do dispositivo vestível e da plataforma." },
                { emoji: "📊", title: "Viabilidade", desc: "Disposição para uso e feedback sobre funcionalidades." },
              ].map((s) => (
                <div key={s.title} style={{
                  padding: "var(--space-4)", borderRadius: "var(--radius-md)",
                  background: "rgba(0,0,0,0.2)", border: "1px solid var(--border-subtle)",
                }}>
                  <div style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-2)" }}>{s.emoji}</div>
                  <h4 style={{ fontWeight: 700, fontSize: "var(--font-size-sm)", marginBottom: "var(--space-1)" }}>{s.title}</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--font-size-xs)" }}>{s.desc}</p>
                </div>
              ))}
            </div>

            <a
              href="https://forms.cloud.microsoft/r/MPvG0qDDEw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{ fontSize: "var(--font-size-lg)" }}
            >
              📋 Responder Pesquisa Agora
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <p style={{ color: "var(--text-muted)", fontSize: "var(--font-size-xs)", marginTop: "var(--space-4)" }}>
              Abrirá em nova aba • Microsoft Forms • Anônimo
            </p>
          </div>

          {/* Why */}
          <div style={{ marginTop: "var(--space-12)" }}>
            <h2 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 800, textAlign: "center", marginBottom: "var(--space-8)" }}>
              Por que sua opinião importa?
            </h2>
            <div className="grid-3">
              {[
                { num: "01", title: "Validação de Mercado", desc: "Confirmamos se a solução atende necessidades reais." },
                { num: "02", title: "Priorização de Funcionalidades", desc: "Desenvolvemos o que mais importa primeiro." },
                { num: "03", title: "Impacto Social", desc: "Cada resposta direciona recursos para onde fazem diferença." },
              ].map((r) => (
                <div key={r.num} className="card" style={{ textAlign: "center" }}>
                  <div className="font-mono" style={{ fontSize: "var(--font-size-3xl)", fontWeight: 800, color: "var(--brand-primary-light)", marginBottom: "var(--space-3)" }}>
                    {r.num}
                  </div>
                  <h4 className="card-title" style={{ fontSize: "var(--font-size-base)" }}>{r.title}</h4>
                  <p className="card-description" style={{ fontSize: "var(--font-size-sm)" }}>{r.desc}</p>
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
