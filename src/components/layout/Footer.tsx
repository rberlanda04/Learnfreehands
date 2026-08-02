import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div>
          <h3 className="footer-title">WiW Speak</h3>
          <p className="footer-text">
            <strong>Window in World</strong> — Tecnologia assistiva vestível e
            Inteligência Artificial para tradução de Libras, acessibilidade
            comunicacional e inclusão de pessoas com deficiência auditiva e não
            verbais.
          </p>
          <p className="footer-text" style={{ marginTop: "var(--space-3)" }}>
            Uma startup HealthTech/EdTech que busca transformar a acessibilidade
            através da tecnologia.
          </p>
        </div>

        <div>
          <h3 className="footer-title">Plataforma</h3>
          <div className="footer-links">
            <Link href="/tradutor" className="footer-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" y1="16" x2="8" y2="16" />
                <line x1="16" y1="16" x2="16" y2="16" />
              </svg>
              Tradutor IA de Libras
            </Link>
            <Link href="/aprender" className="footer-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Aprender Libras
            </Link>
            <Link href="/dicionario" className="footer-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Dicionário de Sinais
            </Link>
            <Link href="/pesquisa" className="footer-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              Pesquisa de Viabilidade
            </Link>
            <Link href="/sobre" className="footer-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Sobre o Projeto
            </Link>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Equipe & Contato</h3>
          <p className="footer-text" style={{ marginBottom: "var(--space-3)" }}>
            Equipe Fundadora: Rogério B., Enzo T., Henrique V., Bruno P.
          </p>
          <div className="footer-links">
            <a
              href="https://www.instagram.com/freehandstartup"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="Seguir no Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram (@freehandstartup)
            </a>
            <a
              href="https://www.linkedin.com/in/rogerio-berlanda-643b45161"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="LinkedIn de Rogério Berlanda"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              Rogério Berlanda (LinkedIn)
            </a>
            <Link href="/contato" className="footer-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Entre em Contato
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} WiW Speak — Window in World. Todos os direitos reservados.</div>
        <div>Acessibilidade, Inclusão Social e Tecnologia Assistiva</div>
      </div>
    </footer>
  );
}
