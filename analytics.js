import { inject } from '@vercel/analytics';

// Inicialização automática do Vercel Web Analytics
try {
  inject();
} catch (e) {
  // Ignora erros em desenvolvimento local offline
}
