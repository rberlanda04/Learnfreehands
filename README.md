# WiW Speak — Window in World

> Plataforma de tecnologia assistiva vestível + IA para tradução de Libras e acessibilidade comunicacional.

---

## 🎯 O que é o WiW Speak?

O **WiW Speak** (Window in World) é uma startup HealthTech/EdTech que combina:

- **Dispositivo vestível inteligente** (smartwatch + anéis com sensores IMU)
- **Inteligência Artificial** para reconhecimento de gestos de Libras
- **Plataforma educacional** completa para ensino de Libras
- **Comunicação bidirecional** em tempo real

### Para quem?

- 🦻 Pessoas com deficiência auditiva (10M+ no Brasil)
- 🤫 Pessoas não verbais que utilizam comunicação alternativa
- 👩‍⚕️ Profissionais de saúde que atendem estes pacientes
- 👨‍🏫 Educadores e instituições de ensino
- 🏢 Empresas que buscam inclusão no ambiente de trabalho

---

## 🚀 Como Iniciar

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (incluído com Node.js)
- Webcam (para o tradutor IA)
- Navegador moderno (Chrome, Edge, Firefox)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/wiw-speak.git
cd wiw-speak

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📱 Funcionalidades

### 🤖 Tradutor IA de Libras
- Reconhecimento de gestos em tempo real via câmera
- 26 letras do alfabeto Libras (A-Z)
- Síntese de voz (texto → fala) em pt-BR
- Reconhecimento de voz (fala → texto) para comunicação bidirecional
- Construtor de palavras com histórico

### 📚 Plataforma Educacional
- **Alfabeto A-Z**: Cada letra com instrução detalhada e dicas
- **Vocabulário**: 28+ palavras e frases organizadas por categorias
- **Quiz Gamificado**: Teste seus conhecimentos com pontuação e streaks
- **Prática com Câmera**: Pratique gestos com feedback da IA

### 📖 Dicionário de Libras
- Busca por texto ou categoria
- Filtros por: Alfabeto, Cumprimentos, Saúde, Emergência, Educação, Cotidiano, Família

### ♿ Acessibilidade
- **VLibras** integrado (Governo Federal) — avatar que traduz texto para Libras
- Modo alto contraste (WCAG AAA)
- Controle de tamanho de fonte
- Navegação completa por teclado
- Skip links e ARIA labels
- `prefers-reduced-motion` respeitado

### ⌚ Preparação Wearable
- Camada Web Bluetooth API pronta
- Parser de dados IMU (acelerômetro + giroscópio)
- Simulador de hardware para desenvolvimento

---

## 🏗️ Arquitetura

```
src/
├── app/                    # Rotas Next.js (App Router)
│   ├── page.tsx           # Landing page
│   ├── tradutor/          # Tradutor IA
│   ├── aprender/          # Hub educacional
│   │   ├── alfabeto/      # Curso A-Z
│   │   ├── palavras/      # Vocabulário
│   │   └── pratica/       # Quiz gamificado
│   ├── dicionario/        # Dicionário de sinais
│   ├── sobre/             # Sobre o projeto
│   ├── pesquisa/          # Pesquisa de viabilidade
│   └── contato/           # Contato e parcerias
├── components/
│   ├── layout/            # Header, Footer, AccessibilityBar
│   ├── tradutor/          # Componentes do tradutor IA
│   └── ui/                # Componentes reutilizáveis
├── lib/
│   ├── ai/                # Classificador de gestos + Speech
│   ├── data/              # Dados de Libras (alfabeto, palavras)
│   └── wearable/          # Bluetooth + Simulador
└── types/                 # TypeScript types
```

### Stack Tecnológica

| Camada | Tecnologia |
|:---|:---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Styling | CSS puro (Custom Properties) |
| IA/Visão | MediaPipe Tasks Vision (WASM) |
| Voz | Web Speech API (TTS + STT) |
| Acessibilidade | VLibras Widget + WCAG 2.1 AA |
| Wearable | Web Bluetooth API |

---

## 📋 Scripts

```bash
npm run dev      # Servidor de desenvolvimento (localhost:3000)
npm run build    # Build de produção
npm run start    # Servir build de produção
npm run lint     # Verificar lint (ESLint)
```

---

## 🤝 Como Contribuir

Veja o guia completo em [CONTRIBUTING.md](docs/CONTRIBUTING.md).

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Faça commit: `git commit -m 'feat: nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 👥 Equipe

| Nome | Papel |
|:---|:---|
| Rogério Berlanda | Fundador & Tech Lead |
| Enzo T. | Co-Fundador & Design |
| Henrique V. | Engenharia de Hardware |
| Bruno P. | Pesquisa & Validação |

---

## 📄 Licença

Este projeto está em desenvolvimento pela equipe WiW Speak.

---

## 📞 Contato

- 📸 Instagram: [@freehandstartup](https://www.instagram.com/freehandstartup)
- 💼 LinkedIn: [Rogério Berlanda](https://www.linkedin.com/in/rogerio-berlanda-643b45161)
- 📋 Pesquisa: [Responder](https://forms.cloud.microsoft/r/MPvG0qDDEw)
