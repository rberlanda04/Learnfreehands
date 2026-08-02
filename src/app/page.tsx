import Link from "next/link";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <AccessibilityBar />
      <Header />

      <main id="main-content">
        {/* ── HERO SECTION ── */}
        <section className="hero" id="sobre">
          <div>
            <div className="badge" style={{ marginBottom: "var(--space-5)" }}>
              <span className="badge-dot" />
              <span>HealthTech & EdTech • Acessibilidade</span>
            </div>

            <h1 className="hero-title">
              Uma <span className="gradient-text">janela para o mundo</span> através da comunicação.
            </h1>

            <p className="hero-subtitle">
              A <strong>WiW Speak</strong> (Window in World) combina dispositivos vestíveis com
              Inteligência Artificial para traduzir gestos da Libras em voz e texto em tempo real,
              dando autonomia para pessoas com deficiência auditiva e pessoas não verbais.
            </p>

            <div className="hero-actions">
              <Link href="/tradutor" className="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                Abrir Tradutor em Tempo Real
              </Link>
              <Link href="/aprender" className="btn btn-outline btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Aprender Libras
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-5)" }}>
              <span className="font-mono" style={{ color: "var(--text-accent)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>
                {"// PLATAFORMA WIW SPEAK"}
              </span>
              <span className="badge badge-success" style={{ fontSize: "var(--font-size-xs)" }}>
                <span className="badge-dot" style={{ background: "var(--color-success)", boxShadow: "0 0 10px var(--color-success)" }} />
                ONLINE
              </span>
            </div>

            <h3 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-4)", fontWeight: 800 }}>
              Solução Assistiva Inteligente
            </h3>

            <p style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-base)", marginBottom: "var(--space-6)", lineHeight: 1.7 }}>
              Desenvolvido por uma equipe dedicada que busca solucionar problemas de acessibilidade na
              comunicação em ambientes de saúde, ensino e corporativos.
            </p>

            <div style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-5)",
              marginBottom: "var(--space-5)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
                <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 700, color: "var(--brand-primary-light)" }}>
                  SISTEMA DE TRADUÇÃO IA
                </span>
                <span className="font-mono" style={{ fontSize: "var(--font-size-xs)", color: "var(--color-success)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  30 FPS / MediaPipe
                </span>
              </div>
              <p style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-4)" }}>
                Experimente agora a detecção de gestos e voz pelo navegador usando sua webcam.
              </p>
              <Link href="/tradutor" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Iniciar Câmera e Traduzir
              </Link>
            </div>

            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.12)",
              paddingTop: "var(--space-4)",
              fontSize: "var(--font-size-sm)",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--brand-primary-light)">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" />
              </svg>
              Protótipo Funcional • 13 letras suportadas • Expansão para A-Z em andamento
            </div>
          </div>
        </section>

        {/* ── MÉTRICAS DE IMPACTO ── */}
        <section className="metrics-section" aria-label="Métricas de impacto social">
          <div className="metrics-grid">
            <div className="metric-box">
              <div className="metric-num">10M+</div>
              <div className="metric-desc">Pessoas com Deficiência Auditiva no Brasil</div>
            </div>
            <div className="metric-box">
              <div className="metric-num">2.3M</div>
              <div className="metric-desc">Pessoas Não Verbais que Precisam de CAA</div>
            </div>
            <div className="metric-box">
              <div className="metric-num">100%</div>
              <div className="metric-desc">Foco em Inclusão e Autonomia</div>
            </div>
            <div className="metric-box">
              <div className="metric-num">2-Way</div>
              <div className="metric-desc">Comunicação Bidirecional em Tempo Real</div>
            </div>
          </div>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <section className="section" id="tecnologia" aria-labelledby="tech-title">
          <div className="section-header">
            <span className="section-tag">Engenharia & Acessibilidade</span>
            <h2 className="section-title" id="tech-title">Como o WiW Speak Funciona</h2>
            <p className="section-subtitle">
              Combinamos hardware vestível, inteligência artificial e software acessível para criar uma
              ponte de comunicação bidirecional.
            </p>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="card-title">Dispositivo Vestível Inteligente</h3>
              <p className="card-description">
                Relógio/pulseira central acoplado a anéis flexíveis dotados de sensores de movimento
                (acelerômetro e giroscópio) para captura precisa de microgestos e orientação espacial das mãos.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3 className="card-title">Inteligência Artificial Direcional</h3>
              <p className="card-description">
                Tradução em dois sentidos: converte os gestos do usuário em áudio e texto, e capta a fala de
                ouvintes transformando-a em texto direto na tela do relógio ou aplicação web.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="card-title">Plataforma Educacional</h3>
              <p className="card-description">
                Ecossistema completo de ensino de Libras com cursos interativos, prática com câmera,
                dicionário de sinais e quiz gamificado para aprendizado progressivo.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="card-title">Acessibilidade como Pilar</h3>
              <p className="card-description">
                Integração com VLibras (Governo Federal), modo alto contraste, controle de fonte,
                navegação por teclado, ARIA completo e conformidade WCAG 2.1 AA.
              </p>
            </div>
          </div>
        </section>

        {/* ── MÓDULO EDUCACIONAL INTERATIVO ── */}
        <section className="section" id="fomento">
          <div className="libras-interactive">
            <span className="section-tag">Fomento à Inclusão</span>
            <h2 className="section-title" style={{ marginBottom: "var(--space-3)" }}>
              Incentivo e Aprendizado de Libras
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 650, margin: "0 auto", fontSize: "var(--font-size-lg)" }}>
              Além do hardware, o projeto engloba um ecossistema educacional completo. Libras não é apenas uma
              linguagem — é empatia, coordenação motora, pensamento crítico e comunicação alternativa.
            </p>

            <div className="interactive-display">
              <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: 800, color: "var(--brand-primary-light)" }}>
                &quot;Obrigado(a)&quot;
              </div>
              <p style={{ color: "var(--text-secondary)", marginTop: "var(--space-4)", fontSize: "var(--font-size-base)", lineHeight: 1.7 }}>
                Toque a ponta dos dedos na testa e depois mova a mão para a frente em direção à outra pessoa.
              </p>
            </div>

            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap", marginTop: "var(--space-4)" }}>
              <Link href="/aprender" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Começar a Aprender Libras
              </Link>
              <Link href="/tradutor" className="btn btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                Praticar com Câmera no Tradutor IA
              </Link>
            </div>
          </div>
        </section>

        {/* ── CITAÇÃO ── */}
        <div className="quote-container">
          <p className="quote-text">
            &quot;A falta de fluência na língua de sinais e a ausência de recursos para a comunicação não
            verbal geram barreiras profundas. Nossos dispositivos dão voz e autonomia para transformar a
            acessibilidade em larga escala.&quot;
          </p>
          <span className="font-mono" style={{ color: "var(--text-accent)", fontSize: "var(--font-size-sm)", fontWeight: 600 }}>
            — Equipe WiW Speak • Window in World
          </span>
        </div>

        {/* ── APLICAÇÕES ── */}
        <section className="section" id="aplicacoes" aria-labelledby="apps-title">
          <div className="section-header">
            <span className="section-tag">Transformação Social</span>
            <h2 className="section-title" id="apps-title">Aplicações do Projeto</h2>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="card-title">Pessoas com Deficiência Auditiva</h3>
              <p className="card-description">
                Tradução instantânea de Libras para áudio e texto, convertendo a fala de ouvintes em texto
                na tela do dispositivo, garantindo autonomia plena no dia a dia.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="card-title">Pessoas Não Verbais</h3>
              <p className="card-description">
                Ferramenta de Comunicação Alternativa e Ampliada (CAA) que permite a sintetização de voz
                instantânea através de gestos pré-configurados ou adaptados.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="card-title">Atendimento em Saúde</h3>
              <p className="card-description">
                Comunicação precisa em consultas, triagens e emergências sem intermediários entre
                profissionais de saúde e pacientes.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                </svg>
              </div>
              <h3 className="card-title">Inclusão Educacional</h3>
              <p className="card-description">
                Interação direta de alunos em salas de aula com professores e colegas, promovendo
                inclusão escolar real e desenvolvimento de soft skills.
              </p>
            </div>
          </div>
        </section>

        {/* ── BENEFÍCIOS EDUCACIONAIS ── */}
        <section className="section" aria-labelledby="benefits-title">
          <div className="section-header">
            <span className="section-tag">Além da Comunicação</span>
            <h2 className="section-title" id="benefits-title">Por que Todos Devem Aprender Libras</h2>
            <p className="section-subtitle">
              Libras não é apenas uma linguagem para surdos — é uma ferramenta educacional que desenvolve
              habilidades cognitivas e sociais essenciais.
            </p>
          </div>

          <div className="grid-3">
            <div className="card" style={{ textAlign: "center" }}>
              <div className="card-icon" style={{ margin: "0 auto var(--space-4)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="card-title">Empatia</h3>
              <p className="card-description">
                Aprender a se comunicar de formas diferentes desenvolve empatia e compreensão pela realidade de outras pessoas.
              </p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div className="card-icon" style={{ margin: "0 auto var(--space-4)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 11V6a2 2 0 0 0-4 0v5" />
                  <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                  <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                  <path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>
              <h3 className="card-title">Coordenação Motora</h3>
              <p className="card-description">
                Os gestos de Libras estimulam a coordenação motora fina e a consciência espacial do corpo.
              </p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <div className="card-icon" style={{ margin: "0 auto var(--space-4)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h3 className="card-title">Pensamento Crítico</h3>
              <p className="card-description">
                Comunicar-se de formas não verbais exercita o raciocínio, a criatividade e o pensamento crítico.
              </p>
            </div>
          </div>
        </section>

        {/* ── PESQUISA E ENGAJAMENTO ── */}
        <section className="section" id="pesquisa" aria-labelledby="research-title">
          <div className="section-header">
            <span className="section-tag">Engajamento & Validação</span>
            <h2 className="section-title" id="research-title">Ajude a Moldar o Futuro</h2>
          </div>

          <div className="grid-2">
            <div className="card" style={{ borderColor: "rgba(56, 189, 248, 0.4)", background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(13, 148, 136, 0.15) 100%)" }}>
              <div className="card-icon" style={{ background: "rgba(56, 189, 248, 0.15)", borderColor: "rgba(56, 189, 248, 0.4)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary-light)" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3 className="card-title">Pesquisa de Campo & Viabilidade</h3>
              <p className="card-description" style={{ marginBottom: "var(--space-6)" }}>
                Sua opinião é fundamental! Participe da nossa pesquisa para nos ajudar a entender as demandas
                de acessibilidade e avaliar a viabilidade do projeto.
              </p>
              <a
                href="https://forms.cloud.microsoft/r/MPvG0qDDEw"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                Responder Pesquisa
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            <div className="card" style={{ borderColor: "rgba(225, 48, 108, 0.4)", background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(225, 48, 108, 0.1) 100%)" }}>
              <div className="card-icon" style={{ background: "rgba(225, 48, 108, 0.15)", borderColor: "rgba(225, 48, 108, 0.4)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <h3 className="card-title">Siga no Instagram</h3>
              <p className="card-description" style={{ marginBottom: "var(--space-6)" }}>
                Acompanhe a jornada da nossa startup! Publicamos avanços do projeto, testes do protótipo de IA
                e bastidores do desenvolvimento.
              </p>
              <a
                href="https://www.instagram.com/freehandstartup"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ borderColor: "#e1306c", color: "#f472b6" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                @freehandstartup no Instagram
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
