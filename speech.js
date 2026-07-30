/**
 * Módulo de síntese de voz (Text-to-Speech) para falar as letras e palavras
 * reconhecidas em português brasileiro.
 */

class SpeechManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.enabled = true;
        this.lastSpokenLetter = null;
        this.lastSpeakTime = 0;
        this.cooldownMs = 1500; // Tempo mínimo entre falas da mesma letra
        this.voice = null;
        this._initVoice();
    }

    /**
     * Inicializa a voz em português brasileiro.
     */
    _initVoice() {
        const setVoice = () => {
            const voices = this.synth.getVoices();
            // Tentar encontrar voz pt-BR
            this.voice = voices.find(v => v.lang === 'pt-BR') ||
                         voices.find(v => v.lang.startsWith('pt')) ||
                         voices.find(v => v.lang === 'en-US') ||
                         voices[0];
        };

        // Vozes podem não estar carregadas imediatamente
        if (this.synth.getVoices().length > 0) {
            setVoice();
        }
        this.synth.onvoiceschanged = setVoice;
    }

    /**
     * Ativa ou desativa o som.
     */
    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.synth.cancel();
        }
        return this.enabled;
    }

    /**
     * Verifica se o som está ativado.
     */
    isEnabled() {
        return this.enabled;
    }

    /**
     * Fala uma letra detectada, respeitando o cooldown.
     */
    speakLetter(letter) {
        if (!this.enabled) return;

        const now = Date.now();

        // Respeitar cooldown para a mesma letra
        if (letter === this.lastSpokenLetter && (now - this.lastSpeakTime) < this.cooldownMs) {
            return;
        }

        // Se mudou a letra, pode falar imediatamente
        this.lastSpokenLetter = letter;
        this.lastSpeakTime = now;

        // Cancelar fala anterior se existir
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(letter);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        if (this.voice) {
            utterance.voice = this.voice;
        }

        this.synth.speak(utterance);
    }

    /**
     * Fala uma palavra inteira.
     */
    speakWord(word) {
        if (!this.enabled || !word) return;

        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        if (this.voice) {
            utterance.voice = this.voice;
        }

        this.synth.speak(utterance);
    }

    /**
     * Para qualquer fala em andamento.
     */
    stop() {
        this.synth.cancel();
    }
}

export default SpeechManager;
