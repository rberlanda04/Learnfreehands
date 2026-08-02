"use client";

import { useState } from "react";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LIBRAS_ALPHABET } from "@/lib/data/libras-alphabet";
import { LIBRAS_WORDS, WORD_CATEGORIES } from "@/lib/data/libras-words";

const allSigns = [...LIBRAS_ALPHABET, ...LIBRAS_WORDS];

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
              <span style={{ position: "absolute", left: "var(--space-3)", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>🔍</span>
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
              >
                🔤 Alfabeto
              </button>
              {WORD_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`btn btn-sm ${selectedCategory === cat.id ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.emoji} {cat.label}
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
                    {sign.letter || "💬"}
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
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--font-size-xs)", marginTop: "var(--space-2)", fontStyle: "italic" }}>
                    💡 {sign.tips}
                  </p>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "var(--space-16)", color: "var(--text-muted)" }}>
              <div style={{ fontSize: "var(--font-size-4xl)", marginBottom: "var(--space-4)" }}>🔍</div>
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
