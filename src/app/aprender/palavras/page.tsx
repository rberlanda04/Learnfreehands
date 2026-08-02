import type { Metadata } from "next";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LIBRAS_WORDS, WORD_CATEGORIES } from "@/lib/data/libras-words";

export const metadata: Metadata = {
  title: "Vocabulário e Frases em Libras",
  description: "Vocabulário essencial de Libras organizado por categorias: cumprimentos, saúde, emergência, educação, cotidiano e família.",
};

const categoryIcons: Record<string, React.ReactNode> = {
  hand: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 11V6a2 2 0 0 0-4 0v5" />
      <path d="M14 10V4a2 2 0 0 0-4 0v6" />
      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),
  health: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  alert: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  book: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  users: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
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
                  <span style={{ color: "var(--brand-primary-light)", display: "inline-flex", alignItems: "center" }}>
                    {categoryIcons[cat.icon] || null}
                  </span>
                  {cat.label}
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
