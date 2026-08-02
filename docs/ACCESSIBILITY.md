# Acessibilidade — WiW Speak

## Compromisso

Acessibilidade é o pilar central do WiW Speak. Não é um recurso opcional — é a razão de existir do projeto.

## Conformidade WCAG 2.1

### Nível AA (Implementado)
- ✅ Contraste de cor mínimo 4.5:1 para texto normal
- ✅ Contraste 3:1 para texto grande (18px+ ou 14px+ bold)
- ✅ Navegação completa por teclado
- ✅ Focus indicators visíveis (`:focus-visible`)
- ✅ Skip links para conteúdo principal
- ✅ Estrutura semântica de headings (h1 → h6)
- ✅ ARIA labels em elementos interativos
- ✅ Imagens com texto alternativo
- ✅ Formulários com labels associados
- ✅ `prefers-reduced-motion` respeitado

### Nível AAA (Parcial)
- ✅ Modo alto contraste (personalizado via botão)
- ✅ Controle de tamanho de fonte (A+ / A-)
- 🚧 Descrição de áudio para conteúdo de vídeo

## Recursos de Acessibilidade

### VLibras (Governo Federal)
Widget integrado em todas as páginas que traduz texto para Libras via avatar animado.
```html
<script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
```

### Modo Alto Contraste
Ativável via barra de acessibilidade no topo. Utiliza fundo preto puro, texto branco e cores amarelo/ciano para máxima legibilidade.

### Controle de Fonte
Botões A+ e A- ajustam o tamanho base da fonte. Preferências salvas em `localStorage`.

### Navegação por Teclado
- `Tab` — Navegar entre elementos
- `Enter` / `Space` — Ativar botões
- `Escape` — Fechar modais
- `C` — Ativar câmera (no tradutor)
- `S` — Falar palavra (no tradutor)

## Testes de Acessibilidade

Para verificar acessibilidade:
1. **Lighthouse** (Chrome DevTools → Audits → Accessibility)
2. **WAVE** (wave.webaim.org)
3. **Navegação por teclado** (use Tab sem mouse)
4. **Leitor de tela** (NVDA, JAWS, VoiceOver)
5. **Contraste** (WebAIM Contrast Checker)
