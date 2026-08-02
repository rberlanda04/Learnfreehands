/**
 * Módulo de síntese e reconhecimento de voz
 * WiW Speak — Window in World
 * 
 * Comunicação bidirecional:
 * - TTS: Texto/Letras → Voz (síntese)
 * - STT: Voz → Texto (reconhecimento)
 */

export class SpeechManager {
  private synth: SpeechSynthesis;
  private enabled: boolean = true;
  private lastSpokenLetter: string | null = null;
  private lastSpeakTime: number = 0;
  private cooldownMs: number = 1500;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = typeof window !== "undefined" ? window.speechSynthesis : (null as unknown as SpeechSynthesis);
    if (this.synth) {
      this.initVoice();
    }
  }

  private initVoice() {
    const setVoice = () => {
      const voices = this.synth.getVoices();
      this.voice =
        voices.find((v) => v.lang === "pt-BR") ||
        voices.find((v) => v.lang.startsWith("pt")) ||
        voices.find((v) => v.lang === "en-US") ||
        voices[0] || null;
    };

    if (this.synth.getVoices().length > 0) {
      setVoice();
    }
    this.synth.onvoiceschanged = setVoice;
  }

  toggle(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled && this.synth) {
      this.synth.cancel();
    }
    return this.enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  speakLetter(letter: string) {
    if (!this.enabled || !this.synth) return;

    const now = Date.now();
    if (letter === this.lastSpokenLetter && now - this.lastSpeakTime < this.cooldownMs) {
      return;
    }

    this.lastSpokenLetter = letter;
    this.lastSpeakTime = now;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    if (this.voice) utterance.voice = this.voice;
    this.synth.speak(utterance);
  }

  speakWord(word: string) {
    if (!this.enabled || !word || !this.synth) return;

    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "pt-BR";
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    if (this.voice) utterance.voice = this.voice;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) this.synth.cancel();
  }
}

/**
 * Speech-to-Text (STT) — reconhecimento de voz
 * Converte fala do ouvinte em texto na tela
 */
export class SpeechRecognizer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any = null;
  private isListening: boolean = false;
  private onResult: ((text: string) => void) | null = null;
  private onPartial: ((text: string) => void) | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        (window as unknown as Record<string, unknown>).SpeechRecognition ||
        (window as unknown as Record<string, unknown>).webkitSpeechRecognition;

      if (SpeechRecognitionAPI) {
        this.recognition = new (SpeechRecognitionAPI as new () => unknown)();
        this.recognition.lang = "pt-BR";
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.recognition.onresult = (event: any) => {
          let finalTranscript = "";
          let interimTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript && this.onResult) {
            this.onResult(finalTranscript);
          }
          if (interimTranscript && this.onPartial) {
            this.onPartial(interimTranscript);
          }
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          if (event.error !== "no-speech") {
            this.isListening = false;
          }
        };

        this.recognition.onend = () => {
          if (this.isListening) {
            // Auto-restart if still supposed to be listening
            try {
              this.recognition?.start();
            } catch {
              this.isListening = false;
            }
          }
        };
      }
    }
  }

  isAvailable(): boolean {
    return this.recognition !== null;
  }

  start(onResult: (text: string) => void, onPartial?: (text: string) => void) {
    if (!this.recognition) return;
    this.onResult = onResult;
    this.onPartial = onPartial || null;
    this.isListening = true;
    try {
      this.recognition.start();
    } catch {
      // Already started
    }
  }

  stop() {
    if (!this.recognition) return;
    this.isListening = false;
    this.recognition.stop();
  }

  getListening(): boolean {
    return this.isListening;
  }
}
