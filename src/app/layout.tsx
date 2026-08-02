import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WiW Speak — Window in World | Acessibilidade em Libras",
    template: "%s | WiW Speak",
  },
  description:
    "Plataforma de tecnologia assistiva com IA para tradução de Libras, ensino e acessibilidade comunicacional para pessoas com deficiência auditiva e não verbais.",
  keywords: [
    "Libras",
    "acessibilidade",
    "deficiência auditiva",
    "língua de sinais",
    "tradução",
    "IA",
    "tecnologia assistiva",
    "WiW Speak",
    "Window in World",
    "comunicação alternativa",
    "inclusão",
    "educação",
  ],
  authors: [{ name: "WiW Speak", url: "https://wiwspeak.com" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "WiW Speak",
    title: "WiW Speak — Window in World | Acessibilidade em Libras",
    description:
      "Tecnologia vestível com IA para tradução de Libras e acessibilidade comunicacional.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "WiW Speak Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WiW Speak — Window in World",
    description: "Plataforma de acessibilidade em Libras com IA e tecnologia vestível.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>

        {/* Ambient Glow Background */}
        <div className="ambient-glow" aria-hidden="true">
          <div className="glow-orb glow-orb-1" />
          <div className="glow-orb glow-orb-2" />
          <div className="glow-orb glow-orb-3" />
        </div>

        {children}

        {/* VLibras Widget — Governo Federal */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <div vw class="enabled">
                <div vw-access-button class="active"></div>
                <div vw-plugin-wrapper>
                  <div class="vw-plugin-top-wrapper"></div>
                </div>
              </div>
              <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
              <script>
                document.addEventListener('DOMContentLoaded', function() {
                  if (window.VLibras) {
                    new window.VLibras.Widget('https://vlibras.gov.br/app');
                  }
                });
              </script>
            `,
          }}
        />
      </body>
    </html>
  );
}
