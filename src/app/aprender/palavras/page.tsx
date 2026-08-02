import type { Metadata } from "next";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LIBRAS_WORDS, WORD_CATEGORIES } from "@/lib/data/libras-words";

export const metadata: Metadata = {
  title: "Vocabulário e Frases em Libras",
  description: "Vocabulário essencial de Libras organizado por categorias: cumprimentos, saúde, emergência, educação, cotidiano e família.",
};

export default function PalavrasPage() {
  return (
    <>
      <AccessibilityBar />
      <Header />
      <main id="main-content">
        <section className="section">
          <div className="section-header">
            <span className="section-tag">Módulo 2 • Vocabulário</span>
            <h1 className="section-title">Palavras e Frases em Libras</h1>
            <p className="section-subtitle">
              Aprenda palavras essenciais organizadas por categorias do dia a dia.
            </p>
          </div>

          {WORD_CATEGORIES.map((cat) => {
            const words = LIBRAS_WORDS.filter((w) => w.category === cat.id);
            return (
              <div key={cat.id} style={{ marginBottom: "var(--space-12)" }}>
                <h2 style={{
                  fontSize: "var(--font-size-2xl)", fontWeight: 800,
                  marginBottom: "var(--space-6)", display: "flex", alignItems: "center",
                  gap: "var(--space-3)",
                }}>
                  <span>{cat.emoji}</span> {cat.label}
                  <span className="badge" style={{ fontSize: "var(--font-size-xs)" }}>{cat.count} sinais</span>
                </h2>

                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "var(--space-4)",
                }}>
                  {words.map((w) => (
                    <div key={w.id} className="card" style={{ padding: "var(--space-6)" }}>
                      <h3 className="card-title" style={{ fontSize: "var(--font-size-lg)", marginBottom: "var(--space-2)" }}>
                        {w.word}
                      </h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "var(--font-size-xs)", marginBottom: "var(--space-3)" }}>
                        {w.description}
                      </p>
                      <div style={{
                        background: "rgba(0,102,255,0.08)", borderRadius: "var(--radius-md)",
                        padding: "var(--space-3)", border: "1px solid rgba(0,102,255,0.15)",
                      }}>
                        <p style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: 1.7 }}>
                          {w.instruction}
                        </p>
                      </div>
                      <div style={{ marginTop: "var(--space-3)" }}>
                        <span className="badge" style={{
                          fontSize: "var(--font-size-xs)",
                          background: w.difficulty === "iniciante" ? "rgba(16,185,129,0.15)" : w.difficulty === "intermediario" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                          borderColor: w.difficulty === "iniciante" ? "rgba(16,185,129,0.4)" : w.difficulty === "intermediario" ? "rgba(245,158,11,0.4)" : "rgba(239,68,68,0.4)",
                          color: w.difficulty === "iniciante" ? "var(--color-success)" : w.difficulty === "intermediario" ? "var(--color-warning)" : "var(--color-danger)",
                        }}>
                          {w.difficulty === "iniciante" ? "Fácil" : w.difficulty === "intermediario" ? "Médio" : "Difícil"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
