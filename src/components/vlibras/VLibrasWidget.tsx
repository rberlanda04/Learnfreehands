"use client";

import { useEffect, useRef } from "react";

export default function VLibrasWidget() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.dataset.mounted) return;
    host.dataset.mounted = "true";

    const root = document.createElement("div");
    root.innerHTML = `
      <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    `;
    host.appendChild(root);

    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      const Widget = window.VLibras?.Widget;
      if (Widget) {
        new Widget("https://vlibras.gov.br/app");
      }
      window.__vlibrasPlaySign = (glosa: string) => {
        try {
          window.plugin?.translate?.(glosa);
        } catch (e) {
          console.log("VLibras play:", e);
        }
      };
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete (window as unknown as { __vlibrasPlaySign?: (glosa: string) => void }).__vlibrasPlaySign;
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" />;
}