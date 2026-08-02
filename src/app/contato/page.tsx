import type { Metadata } from "next";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a equipe WiW Speak para parcerias, dúvidas, sugestões ou colaboração em acessibilidade e Libras.",
};

const contacts = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "E-mail",
    value: "contato@wiwspeak.com",
    href: "mailto:contato@wiwspeak.com",
    desc: "Para dúvidas, parcerias e propostas comerciais.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    title: "Instagram",
    value: "@freehandstartup",
    href: "https://www.instagram.com/freehandstartup",
    desc: "Acompanhe nosso progresso e bastidores.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    title: "LinkedIn",
    value: "Rogério Berlanda",
    href: "https://www.linkedin.com/in/rogerio-berlanda-643b45161",
    desc: "Conecte-se profissionalmente.",
  },
];

const partnerTypes = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: "Instituições de Ensino",
    desc: "Escolas, universidades e centros de formação em Libras."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Organizações de Saúde",
    desc: "Hospitais e clínicas que atendem pacientes com deficiência auditiva."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "ONGs e Associações",
    desc: "Organizações voltadas para inclusão e acessibilidade."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Investidores e Aceleradoras",
    desc: "Capital para escalar o impacto social da tecnologia."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55A2 2 0 0 0 6.51 23.5h10.98a2 2 0 0 0 1.79-2.95l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
    title: "Pesquisadores",
    desc: "Colaboração acadêmica em IA, wearables e linguística de sinais."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <line x1="8" y1="6" x2="8.01" y2="6" />
        <line x1="12" y1="6" x2="12.01" y2="6" />
        <line x1="16" y1="6" x2="16.01" y2="6" />
        <line x1="8" y1="10" x2="8.01" y2="10" />
        <line x1="12" y1="10" x2="12.01" y2="10" />
        <line x1="16" y1="10" x2="16.01" y2="10" />
        <line x1="8" y1="14" x2="8.01" y2="14" />
        <line x1="12" y1="14" x2="12.01" y2="14" />
        <line x1="16" y1="14" x2="16.01" y2="14" />
      </svg>
    ),
    title: "Empresas",
    desc: "Implementação de acessibilidade no ambiente corporativo."
  },
];

export default function ContatoPage() {
  return (
    <>
      <AccessibilityBar />
      <Header />
      <main id="main-content">
        <section className="section">
          <div className="section-header">
            <span className="section-tag">Fale Conosco</span>
            <h1 className="section-title">Entre em Contato</h1>
            <p className="section-subtitle">
              Estamos abertos a parcerias, colaborações, feedback e qualquer forma de contribuição
              para tornar a acessibilidade uma realidade.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid-3" style={{ marginBottom: "var(--space-16)" }}>
            {contacts.map((c) => (
              <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div className="card" style={{ textAlign: "center", cursor: "pointer", height: "100%" }}>
                  <div className="card-icon" style={{ margin: "0 auto var(--space-4)" }}>{c.icon}</div>
                  <h3 className="card-title">{c.title}</h3>
                  <p style={{ color: "var(--text-accent)", fontWeight: 700, fontSize: "var(--font-size-base)", marginBottom: "var(--space-2)" }}>
                    {c.value}
                  </p>
                  <p className="card-description" style={{ fontSize: "var(--font-size-sm)" }}>{c.desc}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Partners */}
          <div>
            <div className="section-header">
              <span className="section-tag">Parcerias</span>
              <h2 className="section-title" style={{ fontSize: "var(--font-size-3xl)" }}>
                Quem Buscamos como Parceiros
              </h2>
              <p className="section-subtitle">
                Acreditamos que a mudança acontece em rede. Estamos buscando parceiros que compartilhem
                nossa visão de acessibilidade e inclusão.
              </p>
            </div>

            <div className="grid-3">
              {partnerTypes.map((p) => (
                <div key={p.title} className="card" style={{ textAlign: "center" }}>
                  <div className="card-icon" style={{ margin: "0 auto var(--space-4)" }}>{p.icon}</div>
                  <h4 className="card-title" style={{ fontSize: "var(--font-size-base)" }}>{p.title}</h4>
                  <p className="card-description" style={{ fontSize: "var(--font-size-sm)" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
