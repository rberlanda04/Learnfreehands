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
              🤖 Tradutor IA de Libras
            </Link>
            <Link href="/aprender" className="footer-link">
              📚 Aprender Libras
            </Link>
            <Link href="/dicionario" className="footer-link">
              📖 Dicionário de Sinais
            </Link>
            <Link href="/pesquisa" className="footer-link">
              📋 Pesquisa de Viabilidade
            </Link>
            <Link href="/sobre" className="footer-link">
              ℹ️ Sobre o Projeto
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
              ✉️ Entre em Contato
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
