"use client";

import { useState, useEffect } from "react";

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(16);

  const toggleContrast = () => {
    document.body.classList.toggle("high-contrast");
  };

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const next = Math.max(12, Math.min(22, prev + delta));
      document.documentElement.style.setProperty(
        "--font-size-base",
        `${next}px`
      );
      return next;
    });
  };

  useEffect(() => {
    // Restore preference from localStorage
    const saved = localStorage.getItem("wiw-high-contrast");
    if (saved === "true") {
      document.body.classList.add("high-contrast");
    }
    const savedSize = localStorage.getItem("wiw-font-size");
    if (savedSize) {
      const size = parseInt(savedSize, 10);
      setFontSize(size);
      document.documentElement.style.setProperty(
        "--font-size-base",
        `${size}px`
      );
    }
  }, []);

  const handleContrastToggle = () => {
    toggleContrast();
    const isHigh = document.body.classList.contains("high-contrast");
    localStorage.setItem("wiw-high-contrast", String(isHigh));
  };

  const handleFontChange = (delta: number) => {
    changeFontSize(delta);
    localStorage.setItem("wiw-font-size", String(fontSize + delta));
  };

  return (
    <div className="accessibility-bar" role="toolbar" aria-label="Ferramentas de acessibilidade">
      <span className="accessibility-bar-label">♿ Acessibilidade:</span>

      <button
        className="accessibility-btn"
        onClick={handleContrastToggle}
        title="Alternar Modo Alto Contraste"
        aria-label="Alternar modo alto contraste"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1 0-16v16z" />
        </svg>
        Alto Contraste
      </button>

      <button
        className="accessibility-btn"
        onClick={() => handleFontChange(1)}
        title="Aumentar tamanho da fonte"
        aria-label="Aumentar tamanho da fonte"
      >
        A+
      </button>

      <button
        className="accessibility-btn"
        onClick={() => handleFontChange(-1)}
        title="Diminuir tamanho da fonte"
        aria-label="Diminuir tamanho da fonte"
      >
        A−
      </button>
    </div>
  );
}
