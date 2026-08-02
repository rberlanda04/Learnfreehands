"use client";

import { useCallback, useEffect, useState } from "react";
import type { LibrasSign } from "@/types/lesson";

interface VLibrasPlayerModalProps {
  sign: LibrasSign | null;
  onClose: () => void;
}

export default function VLibrasPlayerModal({ sign, onClose }: VLibrasPlayerModalProps) {
  const [playingAvatar, setPlayingAvatar] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const playInVLibrasWidget = useCallback(() => {
    if (!sign) return;
    setPlayingAvatar(true);
    const glosa = sign.vlibrasGlosa || sign.word?.toUpperCase() || sign.letter?.toUpperCase() || "SINAL";
    try {
      const playSign = window.__vlibrasPlaySign;
      if (playSign) {
        playSign(glosa);
      } else {
        const accessBtn = document.querySelector(".vw-access-button") as HTMLElement;
        accessBtn?.click();
      }
    } catch (e) {
      console.log("VLibras trigger:", e);
    }
    setTimeout(() => setPlayingAvatar(false), 2000);
  }, [sign]);

  useEffect(() => {
    if (!sign) return;
    const t = setTimeout(() => playInVLibrasWidget(), 350);
    return () => clearTimeout(t);
  }, [sign, playInVLibrasWidget]);

  if (!sign) return null;

  const glosa = sign.vlibrasGlosa || sign.word?.toUpperCase() || sign.letter?.toUpperCase() || "SINAL";
  const title = sign.letter ? `Letra ${sign.letter}` : sign.word;

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580 }}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <span className="badge" style={{ background: "rgba(0,102,255,0.15)", borderColor: "rgba(0,102,255,0.4)" }}>
              WikiLibras • Base de Dados Oficial
            </span>
            <h3 style={{ margin: 0, fontSize: "var(--font-size-xl)", fontWeight: 800 }}>{title}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {/* Glosa Header */}
          <div style={{
            background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(0,102,255,0.15) 100%)",
            border: "1px solid rgba(0,102,255,0.3)", borderRadius: "var(--radius-lg)",
            padding: "var(--space-5)", marginBottom: "var(--space-5)", textAlign: "center",
          }}>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
              Glosa Gramatical VLibras
            </span>
            <div className="font-mono" style={{ fontSize: "var(--font-size-3xl)", fontWeight: 800, color: "var(--brand-primary-light)", margin: "var(--space-2) 0" }}>
              [{glosa}]
            </div>
            <span className="badge badge-success" style={{ fontSize: "var(--font-size-xs)" }}>
              Dicionário WikiLibras (13.000+ Sinais)
            </span>
          </div>

          {/* Demonstration Illustration & Hand Shape */}
          <div style={{
            background: "var(--bg-input)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-lg)", padding: "var(--space-5)",
            marginBottom: "var(--space-5)", display: "flex", gap: "var(--space-4)",
            alignItems: "center", flexWrap: "wrap",
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "var(--radius-md)",
              background: "rgba(0,102,255,0.15)", border: "1px solid rgba(0,102,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "var(--font-size-3xl)", fontWeight: 800, color: "var(--brand-primary-light)",
              flexShrink: 0,
            }}>
              {sign.letter || (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 11V6a2 2 0 0 0-4 0v5" />
                  <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                  <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                  <path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <h4 style={{ fontWeight: 700, fontSize: "var(--font-size-base)", marginBottom: "var(--space-1)" }}>
                Configuração de Mão
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: 1.6 }}>
                {sign.handShape || sign.description}
              </p>
            </div>
          </div>

          {/* Instructions & Movement */}
          <div style={{ marginBottom: "var(--space-5)" }}>
            <h4 style={{ fontWeight: 700, fontSize: "var(--font-size-sm)", color: "var(--text-accent)", marginBottom: "var(--space-2)" }}>
              Execução e Movimento:
            </h4>
            <p style={{ color: "var(--text-primary)", fontSize: "var(--font-size-sm)", lineHeight: 1.7, background: "rgba(255,255,255,0.03)", padding: "var(--space-4)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              {sign.instruction}
            </p>
          </div>

          {sign.tips && (
            <div style={{ marginBottom: "var(--space-6)", display: "flex", alignItems: "flex-start", gap: "var(--space-2)", color: "var(--text-muted)", fontSize: "var(--font-size-xs)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary-light)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M12 2a6 6 0 0 0-6 6c0 2.22 1.21 4.15 3 5.19V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.81A6.002 6.002 0 0 0 18 8a6 6 0 0 0-6-6z" />
                <line x1="9" y1="21" x2="15" y2="21" />
              </svg>
              <span>{sign.tips}</span>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
            <button className="btn btn-primary" onClick={playInVLibrasWidget} style={{ flex: "1 1 auto", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {playingAvatar ? "Sinalizando no Avatar VLibras..." : "Sinalizar no Avatar 3D (VLibras)"}
            </button>

            <a
              href="https://wiki.vlibras.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: "var(--font-size-xs)" }}
            >
              Consultar WikiLibras Oficial
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
