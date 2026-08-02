import type { Metadata } from "next";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LIBRAS_ALPHABET } from "@/lib/data/libras-alphabet";

export const metadata: Metadata = {
  title: "Alfabeto de Libras A-Z",
  description: "Aprenda as 26 letras do alfabeto de Libras com instruções detalhadas, passo a passo e dicas práticas.",
};

export default function AlfabetoPage() {
  return (
    <>
      <AccessibilityBar />
      <Header />
      <main id="main-content">
        <section className="section">
          <div className="section-header">
            <span className="section-tag">Módulo 1 • Alfabeto</span>
            <h1 className="section-title">Alfabeto de Libras — A a Z</h1>
            <p className="section-subtitle">
              Cada letra vem com a descrição do gesto, instrução passo a passo e dicas para melhorar a execução.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "var(--space-6)",
          }}>
            {LIBRAS_ALPHABET.map((sign) => (
              <div key={sign.id} className="card" style={{
                borderColor: sign.supported ? "rgba(0, 102, 255, 0.3)" : "var(--border-default)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-4)" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "var(--radius-lg)",
                    background: sign.supported ? "rgba(0,102,255,0.15)" : "rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "var(--font-size-3xl)", fontWeight: 800,
                    color: sign.supported ? "var(--brand-primary-light)" : "var(--text-muted)",
                    border: `1px solid ${sign.supported ? "rgba(0,102,255,0.3)" : "var(--border-subtle)"}`,
                  }}>
                    {sign.letter}
                  </div>

                  <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                    <span className={`badge ${sign.supported ? "badge-success" : ""}`} style={{ fontSize: "var(--font-size-xs)" }}>
                      {sign.supported ? "✅ IA Suportada" : "🚧 Em Desenvolvimento"}
                    </span>
                    <span className="badge" style={{
                      fontSize: "var(--font-size-xs)",
                      background: sign.difficulty === "iniciante" ? "rgba(16,185,129,0.15)" :
                        sign.difficulty === "intermediario" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                      borderColor: sign.difficulty === "iniciante" ? "rgba(16,185,129,0.4)" :
                        sign.difficulty === "intermediario" ? "rgba(245,158,11,0.4)" : "rgba(239,68,68,0.4)",
                      color: sign.difficulty === "iniciante" ? "var(--color-success)" :
                        sign.difficulty === "intermediario" ? "var(--color-warning)" : "var(--color-danger)",
                    }}>
                      {sign.difficulty === "iniciante" ? "Fácil" : sign.difficulty === "intermediario" ? "Médio" : "Difícil"}
                    </span>
                  </div>
                </div>

                <h3 className="card-title" style={{ fontSize: "var(--font-size-lg)" }}>
                  Letra {sign.letter} — {sign.description}
                </h3>

                <div style={{
                  background: "rgba(0,102,255,0.08)", borderRadius: "var(--radius-md)",
                  padding: "var(--space-4)", marginTop: "var(--space-3)",
                  border: "1px solid rgba(0,102,255,0.15)",
                }}>
                  <div style={{ fontSize: "var(--font-size-xs)", fontWeight: 700, color: "var(--brand-primary-light)", marginBottom: "var(--space-2)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Como fazer:
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: 1.7 }}>
                    {sign.instruction}
                  </p>
                </div>

                {sign.tips && (
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--font-size-sm)", marginTop: "var(--space-3)", fontStyle: "italic" }}>
                    💡 {sign.tips}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
