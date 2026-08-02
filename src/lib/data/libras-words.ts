/**
 * Vocabulário de palavras e frases comuns em Libras
 * WiW Speak — Window in World
 */

import type { LibrasSign } from "@/types/lesson";

export const LIBRAS_WORDS: LibrasSign[] = [
  // ── Cumprimentos ──
  {
    id: "palavra-obrigado",
    word: "Obrigado(a)",
    category: "cumprimentos",
    description: "Agradecimento",
    instruction: "Toque a ponta dos dedos na testa e depois mova a mão para a frente em direção à outra pessoa.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-por-favor",
    word: "Por Favor",
    category: "cumprimentos",
    description: "Pedido educado",
    instruction: "Junte as palmas das mãos em frente ao peito e faça um leve movimento circular ou para baixo.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-bom-dia",
    word: "Bom Dia",
    category: "cumprimentos",
    description: "Saudação matinal",
    instruction: "Toque a boca com os dedos juntos e depois abra a mão em direção ao céu, simulando o sol nascendo.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-boa-tarde",
    word: "Boa Tarde",
    category: "cumprimentos",
    description: "Saudação vespertina",
    instruction: "Faça o sinal de 'bom' (mão aberta tocando o queixo e movendo para frente) e depois o sinal de 'tarde' (mão indicando o sol no meio do céu).",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-boa-noite",
    word: "Boa Noite",
    category: "cumprimentos",
    description: "Saudação noturna",
    instruction: "Faça o sinal de 'bom' e depois o sinal de 'noite' (mão fechando sobre a outra mão, simulando escuridão).",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-oi",
    word: "Oi / Olá",
    category: "cumprimentos",
    description: "Saudação informal",
    instruction: "Acene a mão aberta com a palma virada para frente, movendo-a levemente de um lado para o outro.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-tchau",
    word: "Tchau",
    category: "cumprimentos",
    description: "Despedida",
    instruction: "Acene a mão aberta para frente e para trás, semelhante ao gesto universal de tchau.",
    difficulty: "iniciante",
    supported: false,
  },

  // ── Saúde e Emergência ──
  {
    id: "palavra-ajuda",
    word: "Ajuda",
    category: "emergencia",
    description: "Pedido de ajuda",
    instruction: "Com a mão em formato de 'A' (punho fechado, polegar ao lado), coloque sobre a palma da outra mão e levante ambas.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-dor",
    word: "Dor",
    category: "saude",
    description: "Expressão de dor",
    instruction: "Aponte os dois indicadores um para o outro e faça movimentos giratórios, indicando o local da dor.",
    difficulty: "intermediario",
    supported: false,
  },
  {
    id: "palavra-medico",
    word: "Médico",
    category: "saude",
    description: "Profissional de saúde",
    instruction: "Faça o sinal de medir a pulsação: coloque dois dedos no pulso da outra mão.",
    difficulty: "intermediario",
    supported: false,
  },
  {
    id: "palavra-hospital",
    word: "Hospital",
    category: "saude",
    description: "Estabelecimento de saúde",
    instruction: "Desenhe uma cruz com o dedo indicador no braço (símbolo da cruz vermelha).",
    difficulty: "intermediario",
    supported: false,
  },
  {
    id: "palavra-remedio",
    word: "Remédio",
    category: "saude",
    description: "Medicamento",
    instruction: "Faça o gesto de tomar uma pílula — leve os dedos à boca como se estivesse engolindo um comprimido.",
    difficulty: "iniciante",
    supported: false,
  },

  // ── Educação ──
  {
    id: "palavra-escola",
    word: "Escola",
    category: "educacao",
    description: "Instituição de ensino",
    instruction: "Bata as palmas das mãos duas vezes, simulando palmas de aprovação em sala de aula.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-professor",
    word: "Professor(a)",
    category: "educacao",
    description: "Educador",
    instruction: "Faça o gesto de escrever no quadro — mova a mão com os dedos juntos para frente como se estivesse escrevendo no ar.",
    difficulty: "intermediario",
    supported: false,
  },
  {
    id: "palavra-estudar",
    word: "Estudar",
    category: "educacao",
    description: "Ação de estudar",
    instruction: "Abra e feche as duas mãos alternadamente em frente ao rosto, simulando abrir e fechar um livro.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-aprender",
    word: "Aprender",
    category: "educacao",
    description: "Ação de aprender",
    instruction: "Leve a mão aberta à testa e depois feche-a enquanto a afasta, como se estivesse 'pegando' conhecimento.",
    difficulty: "intermediario",
    supported: false,
  },

  // ── Cotidiano ──
  {
    id: "palavra-sim",
    word: "Sim",
    category: "cotidiano",
    description: "Afirmação",
    instruction: "Feche a mão em punho e faça um movimento de balanço para frente e para baixo, como se estivesse assentindo com a mão.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-nao",
    word: "Não",
    category: "cotidiano",
    description: "Negação",
    instruction: "Estenda os dedos indicador e médio juntos e balance a mão de um lado para o outro.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-nome",
    word: "Nome / Meu nome é",
    category: "cotidiano",
    description: "Identificação pessoal",
    instruction: "Toque o peito com as pontas dos dedos indicador e médio em movimento de H (mão horizontal, dois dedos estendidos, tocando o peito).",
    difficulty: "intermediario",
    supported: false,
  },
  {
    id: "palavra-agua",
    word: "Água",
    category: "cotidiano",
    description: "Líquido essencial",
    instruction: "Faça a letra W em Libras (três dedos estendidos) e toque o queixo duas vezes.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-comida",
    word: "Comida / Comer",
    category: "cotidiano",
    description: "Alimentação",
    instruction: "Junte os dedos em ponta e leve-os à boca repetidamente, simulando comer.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-acessibilidade",
    word: "Acessibilidade",
    category: "cotidiano",
    description: "Direito ao acesso",
    instruction: "Faça o sinal da letra A com as duas mãos e mova-as alternadamente para cima e para baixo.",
    difficulty: "avancado",
    supported: false,
  },

  // ── Família ──
  {
    id: "palavra-mae",
    word: "Mãe",
    category: "familia",
    description: "Figura materna",
    instruction: "Beije as costas da mão (gesto de carinho materno).",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-pai",
    word: "Pai",
    category: "familia",
    description: "Figura paterna",
    instruction: "Faça o gesto de bigode — passe o polegar e indicador sobre o lábio superior.",
    difficulty: "iniciante",
    supported: false,
  },
  {
    id: "palavra-familia",
    word: "Família",
    category: "familia",
    description: "Grupo familiar",
    instruction: "Faça a letra F com as duas mãos e gire-as em círculo à frente do corpo.",
    difficulty: "intermediario",
    supported: false,
  },
  {
    id: "palavra-amigo",
    word: "Amigo(a)",
    category: "familia",
    description: "Pessoa próxima",
    instruction: "Encaixe os dedos indicadores curvados um no outro (como ganchos entrelaçados) e puxe duas vezes.",
    difficulty: "iniciante",
    supported: false,
  },
];

/**
 * Retorna palavras por categoria
 */
export function getWordsByCategory(category: string): LibrasSign[] {
  return LIBRAS_WORDS.filter((w) => w.category === category);
}

/**
 * Categorias disponíveis com rótulos
 */
export const WORD_CATEGORIES = [
  { id: "cumprimentos", label: "Cumprimentos", emoji: "👋", count: LIBRAS_WORDS.filter(w => w.category === "cumprimentos").length },
  { id: "saude", label: "Saúde", emoji: "🏥", count: LIBRAS_WORDS.filter(w => w.category === "saude").length },
  { id: "emergencia", label: "Emergência", emoji: "🚨", count: LIBRAS_WORDS.filter(w => w.category === "emergencia").length },
  { id: "educacao", label: "Educação", emoji: "📚", count: LIBRAS_WORDS.filter(w => w.category === "educacao").length },
  { id: "cotidiano", label: "Cotidiano", emoji: "🏠", count: LIBRAS_WORDS.filter(w => w.category === "cotidiano").length },
  { id: "familia", label: "Família", emoji: "👨‍👩‍👧‍👦", count: LIBRAS_WORDS.filter(w => w.category === "familia").length },
];
