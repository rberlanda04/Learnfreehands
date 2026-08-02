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
    icon: "📧",
    title: "E-mail",
    value: "contato@wiwspeak.com",
    href: "mailto:contato@wiwspeak.com",
    desc: "Para dúvidas, parcerias e propostas comerciais.",
  },
  {
    icon: "📸",
    title: "Instagram",
    value: "@freehandstartup",
    href: "https://www.instagram.com/freehandstartup",
    desc: "Acompanhe nosso progresso e bastidores.",
  },
  {
    icon: "💼",
    title: "LinkedIn",
    value: "Rogério Berlanda",
    href: "https://www.linkedin.com/in/rogerio-berlanda-643b45161",
    desc: "Conecte-se profissionalmente.",
  },
];

const partnerTypes = [
  { emoji: "🏫", title: "Instituições de Ensino", desc: "Escolas, universidades e centros de formação em Libras." },
  { emoji: "🏥", title: "Organizações de Saúde", desc: "Hospitais e clínicas que atendem pacientes com deficiência auditiva." },
  { emoji: "🤝", title: "ONGs e Associações", desc: "Organizações voltadas para inclusão e acessibilidade." },
  { emoji: "💰", title: "Investidores e Aceleradoras", desc: "Capital para escalar o impacto social da tecnologia." },
  { emoji: "🔬", title: "Pesquisadores", desc: "Colaboração acadêmica em IA, wearables e linguística de sinais." },
  { emoji: "🏢", title: "Empresas", desc: "Implementação de acessibilidade no ambiente corporativo." },
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
                  <div style={{ fontSize: "var(--font-size-4xl)", marginBottom: "var(--space-3)" }}>{c.icon}</div>
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
                  <div style={{ fontSize: "var(--font-size-3xl)", marginBottom: "var(--space-3)" }}>{p.emoji}</div>
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
