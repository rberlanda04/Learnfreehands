/**
 * Mídia dos sinais (vídeo/GIF) — Dicionário de Libras (INES, Governo Federal)
 * As animações de libras possuem URL estável em:
 *   https://dicionario.ines.gov.br/public/media/palavras/videos/<nome>.mp4
 *   https://dicionario.ines.gov.br/public/media/palavras/videos/<nome>.jpg (poster)
 * VLibras mantém apenas AssetBundles (Unity) — por isso usamos o Dicionário INES
 * para prévias de vídeo/imagem e o avatar VLibras para demonstração ao vivo.
 */

const VIDEO_BASE = "https://dicionario.ines.gov.br/public/media/palavras/videos/";

export interface SignMedia {
  video: string;
  image: string;
}

/** Palavras não triviais → arquivo no dicionário INES */
const WORD_FILES: Record<string, string> = {
  "palavra-obrigado": "obrigado1Sm_Prog001",
  "palavra-por-favor": "por_favorSm_Prog001",
  "palavra-bom-dia": "bom1Sm_Prog001",
  "palavra-boa-tarde": "dia1Sm_Prog001",
  "palavra-boa-noite": "noite1Sm_Prog001",
  "palavra-oi": "oiSm_Prog001",
  "palavra-tchau": "tchauSm_Prog001",
  "palavra-ajuda": "ajudar1Sm_Prog001",
  "palavra-dor": "dorSm_Prog001",
  "palavra-medico": "medicoSm_Prog001",
  "palavra-hospital": "hospitalSm_Prog001",
  "palavra-remedio": "remedioSm_Prog001",
  "palavra-socorro": "socorrerSm_Prog001",
  "palavra-escola": "escolaSm_Prog001",
  "palavra-professor": "professorSm_Prog001",
  "palavra-estudar": "estudarSm_Prog001",
  "palavra-aprender": "aprenderSm_Prog001",
  "palavra-casa": "casaSm_Prog001",
  "palavra-agua": "aguaSm_Prog001",
  "palavra-comida": "comerSm_Prog001",
  "palavra-banheiro": "banheiroSm_Prog001",
  "palavra-familia": "familiaSm_Prog001",
  "palavra-mae": "mamae1Sm_Prog001",
  "palavra-pai": "pai1Sm_Prog001",
  "palavra-amigo": "amigoSm_Prog001",
};

function url(base: string): SignMedia {
  return { video: `${VIDEO_BASE}${base}.mp4`, image: `${VIDEO_BASE}${base}.jpg` };
}

export function getLetterMedia(letter?: string): SignMedia | null {
  if (!letter) return null;
  const c = letter.toLowerCase();
  if (!/^[a-z]$/.test(c)) return null;
  return url(`${c}Sm_Prog001`);
}

export function getSignMedia(signId: string, letter?: string): SignMedia | null {
  const word = WORD_FILES[signId];
  if (word) return url(word);
  return getLetterMedia(letter);
}