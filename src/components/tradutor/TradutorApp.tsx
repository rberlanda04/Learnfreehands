"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { classifyGesture, HAND_CONNECTIONS, SUPPORTED_LETTERS } from "@/lib/ai/gesture-classifier";
import { SpeechManager, SpeechRecognizer } from "@/lib/ai/speech-manager";
import type { HandLandmark, SystemStatus, HistoryEntry } from "@/types/gesture";

export default function TradutorApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handLandmarkerRef = useRef<unknown>(null);
  const animFrameRef = useRef<number>(0);
  const speechRef = useRef<SpeechManager | null>(null);
  const sttRef = useRef<SpeechRecognizer | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>("idle");
  const [statusText, setStatusText] = useState("Sistema Pronto");
  const [detectedLetter, setDetectedLetter] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [stableCount, setStableCount] = useState(0);
  const [fps, setFps] = useState(0);
  const [handDetected, setHandDetected] = useState(false);
  const [word, setWord] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<"alphabet" | "history">("alphabet");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [toast, setToast] = useState("");
  const [sttText, setSttText] = useState("");
  const [sttListening, setSttListening] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const stableThreshold = 4;
  const stableLetterRef = useRef<string | null>(null);
  const stableCountRef = useRef(0);
  const lastConfirmedRef = useRef<{ letter: string; time: number }>({ letter: "", time: 0 });
  const fpsCountRef = useRef({ count: 0, lastTime: performance.now() });

  useEffect(() => {
    speechRef.current = new SpeechManager();
    sttRef.current = new SpeechRecognizer();
    return () => {
      speechRef.current?.stop();
      sttRef.current?.stop();
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }, []);

  const loadModel = useCallback(async () => {
    setLoading(true);
    setLoadingText("Carregando biblioteca MediaPipe...");

    try {
      const { FilesetResolver, HandLandmarker } = await import(
        "@mediapipe/tasks-vision"
      );

      setLoadingText("Inicializando detector de sinais...");

      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm"
      );

      handLandmarkerRef.current = await HandLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      setLoading(false);
      setSystemStatus("ready");
      setStatusText("IA Pronta");
      return true;
    } catch (error) {
      console.error("Erro ao carregar modelo:", error);
      setLoadingText("Erro ao carregar modelo. Verifique sua conexão.");
      setSystemStatus("error");
      setStatusText("Erro no Modelo");
      return false;
    }
  }, []);

  const startDetection = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const handLandmarker = handLandmarkerRef.current as { detectForVideo: (v: HTMLVideoElement, t: number) => { landmarks: HandLandmark[][] } } | null;
    if (!video || !canvas || !handLandmarker) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTimestamp = -1;

    const detectFrame = () => {
      const now = performance.now();

      // FPS calculation
      fpsCountRef.current.count++;
      if (now - fpsCountRef.current.lastTime >= 1000) {
        setFps(Math.round((fpsCountRef.current.count * 1000) / (now - fpsCountRef.current.lastTime)));
        fpsCountRef.current.count = 0;
        fpsCountRef.current.lastTime = now;
      }

      if (video.readyState >= 2 && now !== lastTimestamp) {
        lastTimestamp = now;
        try {
          const results = handLandmarker.detectForVideo(video, now);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (results.landmarks && results.landmarks.length > 0) {
            const landmarks = results.landmarks[0] as HandLandmark[];
            drawHand(ctx, landmarks, canvas.width, canvas.height);

            const result = classifyGesture(landmarks);
            setHandDetected(true);

            if (result) {
              handleDetection(result.letter, result.confidence);
            } else {
              stableCountRef.current = Math.max(0, stableCountRef.current - 1);
              setStableCount(stableCountRef.current);
              if (stableCountRef.current === 0) {
                setDetectedLetter(null);
                setConfidence(0);
              }
            }
          } else {
            setHandDetected(false);
            stableCountRef.current = 0;
            stableLetterRef.current = null;
            setStableCount(0);
            setDetectedLetter(null);
            setConfidence(0);
          }
        } catch {
          // Transient frame errors
        }
      }

      animFrameRef.current = requestAnimationFrame(detectFrame);
    };

    animFrameRef.current = requestAnimationFrame(detectFrame);
  }, []);

  const handleDetection = useCallback((letter: string, conf: number) => {
    if (letter === stableLetterRef.current) {
      stableCountRef.current++;
    } else {
      stableLetterRef.current = letter;
      stableCountRef.current = 1;
    }

    setDetectedLetter(letter);
    setConfidence(conf);
    setStableCount(stableCountRef.current);

    if (stableCountRef.current >= stableThreshold) {
      confirmLetter(letter, conf);
    }
  }, []);

  const confirmLetter = useCallback((letter: string, conf: number) => {
    const now = Date.now();
    if (
      letter === lastConfirmedRef.current.letter &&
      now - lastConfirmedRef.current.time < 1800
    ) {
      return;
    }

    lastConfirmedRef.current = { letter, time: now };
    speechRef.current?.speakLetter(letter);

    setWord((prev) => [...prev, letter]);
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setHistory((prev) => [{ letter, confidence: conf, time: timestamp }, ...prev].slice(0, 50));
    stableCountRef.current = 0;
  }, []);

  const drawHand = (ctx: CanvasRenderingContext2D, landmarks: HandLandmark[], w: number, h: number) => {
    // Connections
    ctx.strokeStyle = "#0066FF";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(0, 102, 255, 0.8)";
    ctx.shadowBlur = 10;

    for (const [start, end] of HAND_CONNECTIONS) {
      const a = landmarks[start];
      const b = landmarks[end];
      ctx.beginPath();
      ctx.moveTo(a.x * w, a.y * h);
      ctx.lineTo(b.x * w, b.y * h);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;
    const fingertips = [4, 8, 12, 16, 20];

    for (let i = 0; i < landmarks.length; i++) {
      const lm = landmarks[i];
      const x = lm.x * w;
      const y = lm.y * h;
      const isTip = fingertips.includes(i);

      ctx.beginPath();
      ctx.arc(x, y, isTip ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = isTip ? "#06B6D4" : "#8B5CF6";
      ctx.strokeStyle = isTip ? "#FFFFFF" : "#0066FF";
      ctx.lineWidth = isTip ? 2 : 1;
      ctx.fill();
      ctx.stroke();
    }
  };

  const startCamera = async () => {
    if (cameraActive) {
      stopCamera();
      return;
    }

    if (!handLandmarkerRef.current) {
      const loaded = await loadModel();
      if (!loaded) return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
      });

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      video.srcObject = stream;
      video.addEventListener("loadeddata", () => {
        setCameraActive(true);
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        setSystemStatus("active");
        setStatusText("Câmera Ativa");
        startDetection();
        showToast("Câmera iniciada com sucesso!");
      }, { once: true });
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      showToast("Erro ao acessar a câmera. Verifique as permissões.");
    }
  };

  const stopCamera = () => {
    cancelAnimationFrame(animFrameRef.current);
    const video = videoRef.current;
    if (video?.srcObject) {
      (video.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      video.srcObject = null;
    }
    setCameraActive(false);
    setSystemStatus("ready");
    setStatusText("Sistema Pronto");
    setHandDetected(false);
    setDetectedLetter(null);
    setConfidence(0);
    showToast("Câmera desativada.");
  };

  const toggleSTT = () => {
    if (!sttRef.current?.isAvailable()) {
      showToast("Reconhecimento de voz não suportado neste navegador.");
      return;
    }
    if (sttListening) {
      sttRef.current?.stop();
      setSttListening(false);
      showToast("Reconhecimento de voz desativado.");
    } else {
      sttRef.current?.start(
        (text) => setSttText((prev) => prev + " " + text),
        (partial) => setSttText((prev) => prev.replace(/\[.*?\]$/, "") + ` [${partial}]`)
      );
      setSttListening(true);
      showToast("Reconhecimento de voz ativado! Fale agora.");
    }
  };

  const toggleSound = () => {
    const enabled = speechRef.current?.toggle() ?? false;
    setSoundEnabled(enabled);
    showToast(enabled ? "Síntese de voz ativada" : "Síntese de voz silenciada");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "c" || e.key === "C") startCamera();
      else if (e.code === "Space") { e.preventDefault(); setWord((p) => [...p, " "]); }
      else if (e.code === "Backspace") { e.preventDefault(); setWord((p) => p.slice(0, -1)); }
      else if (e.key === "s" || e.key === "S") {
        const text = word.join("");
        if (text.trim()) speechRef.current?.speakWord(text);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [word]);

  const confPercent = Math.round(confidence * 100);
  const progress = Math.min(stableCount / stableThreshold, 1);

  return (
    <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "var(--space-6)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-6)", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 800 }}>
            Libras <span className="gradient-text">AI</span>
          </h1>
          <span className="badge" style={{ fontSize: "var(--font-size-xs)" }}>v2.0</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>
            Tradução de Sinais em Tempo Real
          </span>
        </div>

        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
          <div className={`badge ${systemStatus === "active" ? "badge-success" : ""}`}>
            <span className="badge-dot" style={systemStatus === "active" ? { background: "var(--color-success)", boxShadow: "0 0 10px var(--color-success)" } : {}} />
            {statusText}
          </div>
          <button className="btn btn-icon" onClick={toggleSound} title={soundEnabled ? "Silenciar" : "Ativar som"} aria-label={soundEnabled ? "Silenciar voz" : "Ativar voz"}>
            🔊
          </button>
          <button className="btn btn-icon" onClick={() => setShowHelp(true)} title="Ajuda" aria-label="Abrir ajuda">
            ❓
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "var(--space-6)", alignItems: "start" }}>
        {/* Camera Section */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--text-secondary)", fontSize: "var(--font-size-sm)", fontWeight: 600 }}>
              📹 Visão Computacional
            </span>
            <span className="font-mono" style={{ fontSize: "var(--font-size-xs)", color: "var(--text-accent)" }}>
              FPS: {String(fps).padStart(2, "0")}
            </span>
          </div>

          <div style={{
            position: "relative",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            border: "1px solid var(--border-glass)",
            background: "var(--bg-card)",
            aspectRatio: "16/9",
          }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: cameraActive ? "block" : "none" }} />
            <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: cameraActive ? "block" : "none" }} />

            {!cameraActive && (
              <div style={{
                position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "var(--space-4)",
                background: "rgba(7,9,19,0.9)", textAlign: "center", padding: "var(--space-8)"
              }}>
                <h3 style={{ fontSize: "var(--font-size-xl)", fontWeight: 700 }}>Reconhecimento Inteligente de Gestos</h3>
                <p style={{ color: "var(--text-secondary)", maxWidth: 400 }}>
                  Posicione sua mão em frente à câmera para traduzir gestos da Libras em texto e áudio.
                </p>
                <button className="btn btn-primary btn-lg" onClick={startCamera}>
                  📷 Iniciar Câmera
                </button>
                <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)" }}>
                  Atalho: pressione <kbd style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4, fontSize: "var(--font-size-xs)" }}>C</kbd>
                </span>
              </div>
            )}

            {cameraActive && (
              <div style={{ position: "absolute", top: "var(--space-3)", left: "var(--space-3)" }}>
                <span style={{
                  background: handDetected ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
                  color: handDetected ? "var(--color-success)" : "var(--color-danger)",
                  padding: "4px 12px", borderRadius: "var(--radius-full)",
                  fontSize: "var(--font-size-xs)", fontWeight: 600,
                  border: `1px solid ${handDetected ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
                }}>
                  {handDetected ? "✋ Mão detectada" : "🖐️ Aguardando mão..."}
                </span>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--space-3)", flexWrap: "wrap", gap: "var(--space-2)" }}>
            <button className={`btn ${cameraActive ? "btn-secondary" : "btn-primary"}`} onClick={startCamera}>
              📷 {cameraActive ? "Parar Câmera" : "Iniciar Câmera"}
            </button>
            <div style={{ display: "flex", gap: "var(--space-4)", fontSize: "var(--font-size-xs)", color: "var(--text-muted)" }}>
              <span><kbd style={{ background: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: 3 }}>Espaço</kbd> Espaço</span>
              <span><kbd style={{ background: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: 3 }}>⌫</kbd> Apagar</span>
              <span><kbd style={{ background: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: 3 }}>S</kbd> Falar</span>
            </div>
          </div>

          {/* STT Section */}
          <div style={{ marginTop: "var(--space-6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 700, color: "var(--text-secondary)" }}>
                🎤 Voz → Texto (Ouvinte fala, surdo lê)
              </span>
              <button
                className={`btn btn-sm ${sttListening ? "btn-primary" : "btn-secondary"}`}
                onClick={toggleSTT}
              >
                {sttListening ? "⏹️ Parar" : "🎤 Iniciar"}
              </button>
            </div>
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)", padding: "var(--space-4)",
              minHeight: 80, fontSize: "var(--font-size-base)", color: "var(--text-primary)",
              lineHeight: 1.6,
            }}>
              {sttText || <span style={{ color: "var(--text-muted)" }}>Texto reconhecido da fala aparecerá aqui...</span>}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {/* Detected Letter */}
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "var(--space-4)" }}>
              ✨ Sinal Detectado
            </div>
            <div style={{
              width: 120, height: 120, margin: "0 auto var(--space-4)",
              borderRadius: "var(--radius-full)",
              background: `conic-gradient(var(--brand-primary) ${progress * 360}deg, rgba(255,255,255,0.1) 0deg)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{
                width: 100, height: 100, borderRadius: "var(--radius-full)",
                background: "var(--bg-main)", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "var(--font-size-4xl)", fontWeight: 800,
                color: detectedLetter ? "var(--brand-primary-light)" : "var(--text-muted)",
              }}>
                {detectedLetter || "?"}
              </div>
            </div>
            <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)" }}>
              Precisão: <strong style={{ color: "var(--text-accent)" }}>{confPercent}%</strong>
            </div>
            <div style={{
              height: 4, borderRadius: "var(--radius-full)",
              background: "rgba(255,255,255,0.1)", marginTop: "var(--space-2)",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%", width: `${confPercent}%`,
                background: "var(--brand-primary)", borderRadius: "var(--radius-full)",
                transition: "width 0.2s",
              }} />
            </div>
            <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", marginTop: "var(--space-2)" }}>
              Estabilizando: {stableCount}/{stableThreshold}
            </div>
          </div>

          {/* Word Builder */}
          <div className="card">
            <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "var(--space-3)" }}>
              📝 Palavra Formada
            </div>
            <div style={{
              minHeight: 50, background: "var(--bg-input)",
              borderRadius: "var(--radius-md)", padding: "var(--space-3)",
              display: "flex", flexWrap: "wrap", gap: "var(--space-1)",
              alignItems: "center", marginBottom: "var(--space-3)",
              border: "1px solid var(--border-subtle)",
            }}>
              {word.length === 0 ? (
                <span style={{ color: "var(--text-muted)", fontSize: "var(--font-size-sm)" }}>
                  Sinais confirmados formarão palavras aqui...
                </span>
              ) : (
                word.map((l, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    minWidth: 28, height: 28, borderRadius: "var(--radius-sm)",
                    background: l === " " ? "rgba(255,255,255,0.05)" : "rgba(0,102,255,0.2)",
                    color: "var(--text-primary)", fontWeight: 700,
                    fontSize: "var(--font-size-sm)",
                    border: "1px solid rgba(0,102,255,0.3)",
                    padding: "0 6px",
                  }}>
                    {l === " " ? "␣" : l}
                  </span>
                ))
              )}
            </div>
            <div style={{ display: "flex", gap: "var(--space-1)", flexWrap: "wrap" }}>
              <button className="btn btn-sm btn-secondary" onClick={() => setWord((p) => [...p, " "])}>Espaço</button>
              <button className="btn btn-sm btn-secondary" onClick={() => setWord((p) => p.slice(0, -1))}>Apagar</button>
              <button className="btn btn-sm btn-secondary" onClick={() => { navigator.clipboard.writeText(word.join("")); showToast("Copiado!"); }}>Copiar</button>
              <button className="btn btn-sm btn-primary" onClick={() => { const t = word.join(""); if (t.trim()) speechRef.current?.speakWord(t); }}>🔊 Falar</button>
              <button className="btn btn-sm btn-secondary" style={{ color: "var(--color-danger)" }} onClick={() => { setWord([]); showToast("Palavra limpa."); }}>🗑️</button>
            </div>
          </div>

          {/* Tabs: Alphabet / History */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid var(--border-subtle)" }}>
              <button
                onClick={() => setActiveTab("alphabet")}
                style={{
                  flex: 1, padding: "var(--space-3)", border: "none", cursor: "pointer",
                  background: activeTab === "alphabet" ? "rgba(0,102,255,0.15)" : "transparent",
                  color: activeTab === "alphabet" ? "var(--brand-primary-light)" : "var(--text-muted)",
                  fontWeight: 700, fontSize: "var(--font-size-sm)", fontFamily: "var(--font-sans)",
                  borderBottom: activeTab === "alphabet" ? "2px solid var(--brand-primary)" : "2px solid transparent",
                }}
              >
                🔤 Alfabeto
              </button>
              <button
                onClick={() => setActiveTab("history")}
                style={{
                  flex: 1, padding: "var(--space-3)", border: "none", cursor: "pointer",
                  background: activeTab === "history" ? "rgba(0,102,255,0.15)" : "transparent",
                  color: activeTab === "history" ? "var(--brand-primary-light)" : "var(--text-muted)",
                  fontWeight: 700, fontSize: "var(--font-size-sm)", fontFamily: "var(--font-sans)",
                  borderBottom: activeTab === "history" ? "2px solid var(--brand-primary)" : "2px solid transparent",
                }}
              >
                🕐 Histórico
              </button>
            </div>

            <div style={{ padding: "var(--space-4)", maxHeight: 300, overflowY: "auto" }}>
              {activeTab === "alphabet" ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))", gap: "var(--space-1)" }}>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
                    const supported = SUPPORTED_LETTERS.includes(letter);
                    return (
                      <div key={letter} title={supported ? `${letter} — Suportada` : `${letter} — Em desenvolvimento`} style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 36, height: 36, borderRadius: "var(--radius-sm)",
                        background: supported ? "rgba(0,102,255,0.15)" : "rgba(255,255,255,0.03)",
                        color: supported ? "var(--brand-primary-light)" : "var(--text-muted)",
                        fontWeight: 700, fontSize: "var(--font-size-sm)",
                        border: `1px solid ${supported ? "rgba(0,102,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                        opacity: supported ? 1 : 0.4,
                        cursor: "default",
                      }}>
                        {letter}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  {history.length === 0 ? (
                    <span style={{ color: "var(--text-muted)", fontSize: "var(--font-size-sm)" }}>
                      Nenhuma letra detectada ainda
                    </span>
                  ) : (
                    history.map((h, i) => (
                      <div key={i} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "var(--space-2) var(--space-3)",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "var(--radius-sm)",
                      }}>
                        <span style={{ fontWeight: 800, color: "var(--brand-primary-light)", fontSize: "var(--font-size-lg)" }}>{h.letter}</span>
                        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)" }}>
                          {h.time} ({Math.round(h.confidence * 100)}%)
                        </span>
                      </div>
                    ))
                  )}
                  {history.length > 0 && (
                    <button className="btn btn-sm btn-secondary" style={{ marginTop: "var(--space-2)" }} onClick={() => { setHistory([]); showToast("Histórico limpado."); }}>
                      Limpar Histórico
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>

      {/* Loading Overlay */}
      {loading && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(7,9,19,0.95)",
          zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: "var(--space-4)",
        }}>
          <div style={{
            width: 60, height: 60, border: "3px solid rgba(0,102,255,0.2)",
            borderTopColor: "var(--brand-primary)",
            borderRadius: "var(--radius-full)",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-base)" }}>{loadingText}</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Help Modal */}
      <div className={`modal-backdrop ${showHelp ? "open" : ""}`} onClick={() => setShowHelp(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Como usar o Tradutor IA</h3>
            <button className="modal-close" onClick={() => setShowHelp(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                <span style={{ background: "var(--brand-primary)", color: "#fff", width: 28, height: 28, borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "var(--font-size-sm)", flexShrink: 0 }}>1</span>
                <div><strong>Ative sua Câmera</strong><br /><span style={{ color: "var(--text-secondary)" }}>Permita o acesso à webcam quando solicitado pelo navegador.</span></div>
              </div>
              <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                <span style={{ background: "var(--brand-primary)", color: "#fff", width: 28, height: 28, borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "var(--font-size-sm)", flexShrink: 0 }}>2</span>
                <div><strong>Posicione sua Mão</strong><br /><span style={{ color: "var(--text-secondary)" }}>Mantenha a mão visível na câmera com boa iluminação.</span></div>
              </div>
              <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                <span style={{ background: "var(--brand-primary)", color: "#fff", width: 28, height: 28, borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "var(--font-size-sm)", flexShrink: 0 }}>3</span>
                <div><strong>Faça o Gesto</strong><br /><span style={{ color: "var(--text-secondary)" }}>Realize um gesto do alfabeto Libras. Segure para confirmar.</span></div>
              </div>
            </div>
            <div style={{ marginTop: "var(--space-6)", padding: "var(--space-4)", background: "rgba(0,102,255,0.1)", borderRadius: "var(--radius-lg)", border: "1px solid rgba(0,102,255,0.2)" }}>
              <strong style={{ color: "var(--text-accent)" }}>Atalhos de Teclado</strong>
              <div style={{ marginTop: "var(--space-2)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)", fontSize: "var(--font-size-sm)", color: "var(--text-secondary)" }}>
                <span><kbd style={{ background: "rgba(255,255,255,0.1)", padding: "1px 6px", borderRadius: 4 }}>C</kbd> Câmera</span>
                <span><kbd style={{ background: "rgba(255,255,255,0.1)", padding: "1px 6px", borderRadius: 4 }}>Espaço</kbd> Espaço</span>
                <span><kbd style={{ background: "rgba(255,255,255,0.1)", padding: "1px 6px", borderRadius: 4 }}>⌫</kbd> Apagar</span>
                <span><kbd style={{ background: "rgba(255,255,255,0.1)", padding: "1px 6px", borderRadius: 4 }}>S</kbd> Falar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
