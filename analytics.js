import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Inicialização automática do Vercel Web Analytics e Speed Insights
try {
  inject();
  injectSpeedInsights();
} catch (e) {
  // Ignora erros em desenvolvimento local offline
}
