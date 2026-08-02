"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LIBRAS_ALPHABET } from "@/lib/data/libras-alphabet";

const supportedLetters = LIBRAS_ALPHABET.filter((s) => s.supported);

export default function PraticaPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);

  const currentSign = supportedLetters[currentIndex];

  const options = useMemo(() => {
    const correct = currentSign.letter!;
    const others = supportedLetters
      .filter((s) => s.letter !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((s) => s.letter!);
    return [...others, correct].sort(() => Math.random() - 0.5);
  }, [currentIndex]);

  const handleAnswer = (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    setShowAnswer(true);
    setTotal((p) => p + 1);
    if (answer === currentSign.letter) {
      setScore((p) => p + 1);
      setStreak((p) => p + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    setCurrentIndex((p) => (p + 1) % supportedLetters.length);
  };

  const resetQuiz = () => {
    setScore(0);
    setTotal(0);
    setStreak(0);
    setCurrentIndex(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <>
      <AccessibilityBar />
      <Header />
      <main id="main-content">
        <section className="section" style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="section-header">
            <span className="section-tag">Módulo 3 • Quiz Interativo</span>
            <h1 className="section-title">Modo Prática</h1>
            <p className="section-subtitle">
              Teste seu conhecimento do alfabeto Libras! Leia a descrição do gesto e identifique a letra correta.
            </p>
          </div>

          {/* Score Bar */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "var(--space-8)",
            marginBottom: "var(--space-8)", flexWrap: "wrap",
          }}>
            <div style={{ textAlign: "center" }}>
              <div className="font-mono" style={{ fontSize: "var(--font-size-3xl)", fontWeight: 800, color: "var(--color-success)" }}>{score}</div>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-muted)" }}>Acertos</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="font-mono" style={{ fontSize: "var(--font-size-3xl)", fontWeight: 800, color: "var(--text-accent)" }}>{total}</div>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-muted)" }}>Total</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="font-mono" style={{ fontSize: "var(--font-size-3xl)", fontWeight: 800, color: "var(--brand-primary-light)" }}>{accuracy}%</div>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-muted)" }}>Precisão</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="font-mono" style={{ fontSize: "var(--font-size-3xl)", fontWeight: 800, color: "var(--color-warning)", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
                </svg>
                {streak}
              </div>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-muted)" }}>Streak</div>
            </div>
          </div>

          {/* Quiz Card */}
          <div className="card" style={{ textAlign: "center", padding: "var(--space-10)" }}>
            <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", marginBottom: "var(--space-4)" }}>
              Pergunta {total + 1} • Letra {currentIndex + 1} de {supportedLetters.length}
            </div>

            <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: 700, marginBottom: "var(--space-4)", color: "var(--text-accent)" }}>
              Qual letra corresponde a este gesto?
            </h2>

            <div style={{
              background: "rgba(0,102,255,0.08)", borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)", margin: "0 auto var(--space-6)",
              maxWidth: 500, border: "1px solid rgba(0,102,255,0.15)",
            }}>
              <p style={{ fontSize: "var(--font-size-lg)", color: "var(--text-primary)", lineHeight: 1.7, fontWeight: 600 }}>
                &ldquo;{currentSign.description}&rdquo;
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)", marginTop: "var(--space-3)", lineHeight: 1.7 }}>
                {currentSign.instruction}
              </p>
            </div>

            {/* Options */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)",
              maxWidth: 400, margin: "0 auto var(--space-6)",
            }}>
              {options.map((opt) => {
                const isCorrect = opt === currentSign.letter;
                const isSelected = opt === selectedAnswer;
                let bg = "rgba(255,255,255,0.05)";
                let border = "var(--border-default)";
                let color = "var(--text-primary)";
                if (showAnswer) {
                  if (isCorrect) { bg = "rgba(16,185,129,0.2)"; border = "var(--color-success)"; color = "var(--color-success)"; }
                  else if (isSelected) { bg = "rgba(239,68,68,0.2)"; border = "var(--color-danger)"; color = "var(--color-danger)"; }
                }
                return (
                  <button key={opt} onClick={() => handleAnswer(opt)} disabled={showAnswer} style={{
                    padding: "var(--space-4)", borderRadius: "var(--radius-lg)",
                    background: bg, border: `2px solid ${border}`, color,
                    fontSize: "var(--font-size-2xl)", fontWeight: 800, cursor: showAnswer ? "default" : "pointer",
                    transition: "all var(--transition-fast)", fontFamily: "var(--font-sans)",
                  }}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showAnswer && (
              <div style={{ marginBottom: "var(--space-4)" }}>
                {selectedAnswer === currentSign.letter ? (
                  <p style={{ color: "var(--color-success)", fontWeight: 700, fontSize: "var(--font-size-lg)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Correto! A letra é {currentSign.letter}.
                  </p>
                ) : (
                  <p style={{ color: "var(--color-danger)", fontWeight: 700, fontSize: "var(--font-size-lg)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Incorreto. A resposta era <strong style={{ color: "var(--color-success)" }}>{currentSign.letter}</strong>.
                  </p>
                )}
                {currentSign.tips && (
                  <p style={{ color: "var(--text-muted)", fontSize: "var(--font-size-sm)", marginTop: "var(--space-2)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a6 6 0 0 0-6 6c0 2.22 1.21 4.15 3 5.19V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.81A6.002 6.002 0 0 0 18 8a6 6 0 0 0-6-6z" />
                      <line x1="9" y1="21" x2="15" y2="21" />
                    </svg>
                    <span>{currentSign.tips}</span>
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center" }}>
              {showAnswer && (
                <button className="btn btn-primary" onClick={nextQuestion}>
                  Próxima Pergunta →
                </button>
              )}
              <button className="btn btn-secondary" onClick={resetQuiz}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6" />
                  <path d="M1 20v-6h6" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
                Recomeçar
              </button>
            </div>
          </div>

          {/* Links */}
          <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
            <Link href="/tradutor" className="btn btn-outline btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              Praticar com Câmera no Tradutor IA
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
