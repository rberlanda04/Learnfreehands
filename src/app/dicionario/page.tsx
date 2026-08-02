"use client";

import { useState } from "react";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LIBRAS_ALPHABET } from "@/lib/data/libras-alphabet";
import { LIBRAS_WORDS, WORD_CATEGORIES } from "@/lib/data/libras-words";

const allSigns = [...LIBRAS_ALPHABET, ...LIBRAS_WORDS];

const categoryIcons: Record<string, React.ReactNode> = {
  hand: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 11V6a2 2 0 0 0-4 0v5" />
      <path d="M14 10V4a2 2 0 0 0-4 0v6" />
      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),
  health: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  alert: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  book: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  home: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  users: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export default function DicionarioPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  const filtered = allSigns.filter((s) => {
    const text = (s.letter || s.word || "").toLowerCase();
    const desc = s.description.toLowerCase();
    const matchesQuery = !query || text.includes(query.toLowerCase()) || desc.includes(query.toLowerCase());
    const matchesCat = selectedCategory === "todas" || s.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <>
      <AccessibilityBar />
      <Header />
      <main id="main-content">
        <section className="section">
          <div className="section-header">
            <span className="section-tag">Referência Completa</span>
            <h1 className="section-title">Dicionário de Libras</h1>
            <p className="section-subtitle">
              Busque por letras, palavras ou frases em Libras. Cada entrada inclui descrição detalhada do gesto.
            </p>
          </div>

          {/* Search & Filters */}
          <div style={{
            display: "flex", gap: "var(--space-4)", marginBottom: "var(--space-8)",
            flexWrap: "wrap", alignItems: "center",
          }}>
            <div style={{ flex: "1 1 300px", position: "relative" }}>
              <input
                type="text"
                placeholder="Buscar sinal... (ex: obrigado, letra A, mãe)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar sinal no dicionário"
                style={{
                  width: "100%", padding: "var(--space-3) var(--space-4) var(--space-3) var(--space-10)",
                  background: "var(--bg-input)", border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-lg)", color: "var(--text-primary)",
                  fontSize: "var(--font-size-base)", fontFamily: "var(--font-sans)",
                  outline: "none", transition: "border-color var(--transition-fast)",
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--brand-primary)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border-default)"; }}
              />
              <span style={{ position: "absolute", left: "var(--space-3)", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>

            <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
              <button
                className={`btn btn-sm ${selectedCategory === "todas" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setSelectedCategory("todas")}
              >
                Todas
              </button>
              <button
                className={`btn btn-sm ${selectedCategory === "alfabeto" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setSelectedCategory("alfabeto")}
                style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 20h16" />
                  <path d="M6 16l6-12 6 12" />
                  <path d="M8 12h8" />
                </svg>
                Alfabeto
              </button>
              {WORD_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`btn btn-sm ${selectedCategory === cat.id ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  {categoryIcons[cat.icon] || null}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div style={{ marginBottom: "var(--space-4)", color: "var(--text-muted)", fontSize: "var(--font-size-sm)" }}>
            {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"} encontrados
          </div>

          {/* Results Grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "var(--space-4)",
          }}>
            {filtered.map((sign) => (
              <div key={sign.id} className="card" style={{ padding: "var(--space-5)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
                  <div style={{
                    minWidth: 44, height: 44, borderRadius: "var(--radius-md)",
                    background: sign.letter ? "rgba(0,102,255,0.15)" : "rgba(6,182,212,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: sign.letter ? "var(--font-size-xl)" : "var(--font-size-sm)",
                    fontWeight: 800,
                    color: sign.letter ? "var(--brand-primary-light)" : "var(--brand-cyan)",
                    border: `1px solid ${sign.letter ? "rgba(0,102,255,0.3)" : "rgba(6,182,212,0.3)"}`,
                  }}>
                    {sign.letter ? (
                      sign.letter
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "var(--font-size-base)", fontWeight: 700, color: "var(--text-primary)" }}>
                      {sign.letter ? `Letra ${sign.letter}` : sign.word}
                    </h3>
                    <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)" }}>
                      {sign.description}
                    </span>
                  </div>
                </div>

                <p style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: 1.7 }}>
                  {sign.instruction}
                </p>

                {sign.tips && (
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--font-size-xs)", marginTop: "var(--space-2)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary-light)" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <path d="M12 2a6 6 0 0 0-6 6c0 2.22 1.21 4.15 3 5.19V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.81A6.002 6.002 0 0 0 18 8a6 6 0 0 0-6-6z" />
                      <line x1="9" y1="21" x2="15" y2="21" />
                    </svg>
                    <span>{sign.tips}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "var(--space-16)", color: "var(--text-muted)" }}>
              <div style={{ margin: "0 auto var(--space-4)", display: "inline-flex", padding: "16px", borderRadius: "var(--radius-full)", background: "rgba(255,255,255,0.05)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p>Nenhum sinal encontrado para &ldquo;{query}&rdquo;.</p>
              <p style={{ fontSize: "var(--font-size-sm)", marginTop: "var(--space-2)" }}>
                Tente um termo diferente ou selecione outra categoria.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
