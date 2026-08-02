# Guia de Contribuição — WiW Speak

Obrigado pelo interesse em contribuir com o WiW Speak! 🎉

## 🚀 Setup Rápido

```bash
git clone https://github.com/seu-usuario/wiw-speak.git
cd wiw-speak
npm install
npm run dev
```

## 📝 Convenções

### Branches
- `main` — produção estável
- `dev` — desenvolvimento ativo
- `feature/nome` — novas funcionalidades
- `fix/nome` — correções de bugs
- `docs/nome` — documentação

### Commits (Conventional Commits)
```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação (sem mudança de lógica)
refactor: refatoração
test: testes
chore: manutenção
```

### Código
- TypeScript sempre (nunca `any` sem justificativa)
- CSS Custom Properties para temas (nunca hardcode de cores)
- Componentes acessíveis (ARIA labels, teclado, foco)
- Comentários em português para facilitar a equipe

## 📐 Estrutura de Pastas

- **Novas páginas**: `src/app/nome-da-pagina/page.tsx`
- **Componentes**: `src/components/categoria/NomeDoComponente.tsx`
- **Lógica/Hooks**: `src/lib/hooks/useNomeDoHook.ts`
- **Dados**: `src/lib/data/nome-dos-dados.ts`
- **Tipos**: `src/types/nome.ts`

## ♿ Acessibilidade (Obrigatório)

Toda contribuição DEVE manter ou melhorar a acessibilidade:

1. Elementos interativos devem ter `aria-label` ou texto visível
2. Navegação por teclado deve funcionar em novos componentes
3. Contraste mínimo de 4.5:1 para texto normal
4. Imagens devem ter `alt` descritivo
5. Formulários devem ter labels associados
6. Respeitar `prefers-reduced-motion`

## 🔍 Checklist do Pull Request

- [ ] Código compila sem erros (`npm run build`)
- [ ] ESLint sem warnings (`npm run lint`)
- [ ] Acessibilidade verificada
- [ ] Componentes responsivos (testado mobile + desktop)
- [ ] Documentação atualizada se necessário
