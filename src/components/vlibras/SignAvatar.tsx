"use client";

import { useCallback } from "react";
import { getSignMedia } from "@/lib/data/libras-media";
import type { LibrasSign } from "@/types/lesson";

interface SignAvatarProps {
  sign: LibrasSign;
  onShowDetails?: () => void;
}

export default function SignAvatar({ sign, onShowDetails }: SignAvatarProps) {
  const glosa = (sign.vlibrasGlosa || sign.letter?.toUpperCase() || sign.word?.toUpperCase() || "SINAL")!;
  const label = sign.letter ? `Letra ${sign.letter}` : sign.word;
  const media = getSignMedia(sign.id, sign.letter);

  const playWithAvatar = useCallback(() => {
    try {
      window.__vlibrasPlaySign?.(glosa);
    } catch (e) {
      console.log("VLibras play:", e);
    }
  }, [glosa]);

  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(0,102,255,0.18) 100%)",
        border: "1px solid rgba(0,102,255,0.3)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      {media ? (
        <div style={{ position: "relative" }}>
          {/* Reprodução da animação do dicionário (fonte desativada) */}
          <video
            src={media.video}
            poster={media.image}
            muted
            loop
            controls
            preload="metadata"
            style={{ width: "100%", height: 200, objectFit: "cover", display: "block", background: "#0f172a" }}
            aria-label={`Animação em Libras de ${label}`}
          />
          <span
            className="badge"
            style={{
              position: "absolute",
              top: "var(--space-2)",
              left: "var(--space-2)",
              background: "rgba(15,23,42,0.85)",
              borderColor: "rgba(0,102,255,0.4)",
            }}
          >
            Dicionário INES
          </span>
        </div>
      ) : null}

      <div style={{ textAlign: "center", padding: "var(--space-4)" }}>
        <div className="font-mono" style={{ fontSize: "var(--font-size-xl)", fontWeight: 800, color: "var(--brand-primary-light)", marginBottom: "var(--space-2)" }}>
          [{glosa}]
        </div>
        <div style={{ display: "flex", gap: "var(--space-2)", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn btn-sm"
            style={{ background: "rgba(0,102,255,0.2)", border: "1px solid rgba(0,102,255,0.5)", color: "var(--brand-primary-light)", justifyContent: "center" }}
            onClick={playWithAvatar}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Avatar 3D (VLibras)
          </button>
          {onShowDetails && (
            <button className="btn btn-outline btn-sm" onClick={onShowDetails} style={{ justifyContent: "center" }}>
              Detalhes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}