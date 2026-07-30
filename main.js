/**
 * Libras AI - Reconhecimento de Gestos em Tempo Real (v2.0)
 *
 * Módulo principal: Inicializa câmera, MediaPipe HandLandmarker,
 * loop de detecção, estabilização de gestos, controle de voz,
 * atalhos de teclado e interface interativa.
 */

import { classifyGesture, SUPPORTED_LETTERS } from './gesture-classifier.js';
import SpeechManager from './speech.js';

// ============================================================
// Estado Global da Aplicação
// ============================================================
const state = {
    handLandmarker: null,
    HandLandmarkerClass: null,
    DrawingUtilsClass: null,
    camera: {
        active: false,
        stream: null
    },
    detection: {
        running: false,
        lastResult: null,
        stableLetter: null,
        stableCount: 0,
        stableThreshold: 4, // Frames consecutivos para confirmar letra
        lastConfirmedLetter: null,
        lastConfirmedTime: 0,
        confirmCooldown: 1800 // ms entre confirmações da mesma letra
    },
    performance: {
        lastFrameTime: performance.now(),
        frameCount: 0,
        fps: 0
    },
    word: [],
    history: [],
    maxHistory: 50
};

// ============================================================
// Elementos DOM
// ============================================================
const elements = {
    video: document.getElementById('video'),
    canvas: document.getElementById('canvas'),
    cameraContainer: document.getElementById('camera-container'),
    cameraOverlay: document.getElementById('camera-overlay'),
    btnCameraStart: document.getElementById('btn-camera-start'),
    btnCamera: document.getElementById('btn-camera'),
    btnCameraText: document.getElementById('btn-camera-text'),
    btnSound: document.getElementById('btn-sound'),
    btnHelp: document.getElementById('btn-help'),
    helpModal: document.getElementById('help-modal'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    systemStatusChip: document.getElementById('system-status-chip'),
    systemStatusText: document.getElementById('system-status-text'),
    fpsMeter: document.getElementById('fps-meter'),
    handIndicator: document.getElementById('hand-indicator'),
    letterCircle: document.getElementById('letter-circle'),
    detectedLetter: document.getElementById('detected-letter'),
    progressRingFill: document.getElementById('progress-ring-fill'),
    confidencePercentage: document.getElementById('confidence-percentage'),
    confidenceFill: document.getElementById('confidence-fill'),
    confidenceText: document.getElementById('confidence-text'),
    wordDisplay: document.getElementById('word-display'),
    btnAddSpace: document.getElementById('btn-add-space'),
    btnBackspace: document.getElementById('btn-backspace'),
    btnCopyWord: document.getElementById('btn-copy-word'),
    btnSpeakWord: document.getElementById('btn-speak-word'),
    btnClearWord: document.getElementById('btn-clear-word'),
    alphabetSearch: document.getElementById('alphabet-search'),
    alphabetGrid: document.getElementById('alphabet-grid'),
    historyList: document.getElementById('history-list'),
    btnClearHistory: document.getElementById('btn-clear-history'),
    toast: document.getElementById('toast'),
    loadingOverlay: document.getElementById('loading-overlay'),
    loadingText: document.getElementById('loading-text')
};

// ============================================================
// Instância de Módulos
// ============================================================
const speech = new SpeechManager();
let canvasCtx;
let drawingUtils;

// Definição das conexões da mão no MediaPipe
const HAND_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4],       // polegar
    [0, 5], [5, 6], [6, 7], [7, 8],       // indicador
    [0, 9], [9, 10], [10, 11], [11, 12],   // médio
    [0, 13], [13, 14], [14, 15], [15, 16], // anelar
    [0, 17], [17, 18], [18, 19], [19, 20], // mínimo
    [5, 9], [9, 13], [13, 17]              // palma
];

// ============================================================
// Inicialização
// ============================================================

async function init() {
    setupUI();
    setupEventListeners();
    setupTabs();
    renderAlphabetGrid();
}

/**
 * Carrega a biblioteca MediaPipe via CDN dinamicamente.
 */
async function loadMediaPipe() {
    showLoading('Carregando biblioteca MediaPipe...');

    return new Promise((resolve, reject) => {
        if (window._mediapipeVision) {
            resolve(window._mediapipeVision);
            return;
        }

        import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/vision_bundle.mjs')
            .then(module => {
                window._mediapipeVision = module;
                resolve(module);
            })
            .catch(err => {
                console.error('Erro ao carregar MediaPipe:', err);
                reject(err);
            });
    });
}

/**
 * Carrega o modelo de IA do MediaPipe HandLandmarker.
 */
async function loadModel() {
    showLoading('Carregando inteligência artificial...');

    try {
        const vision = await loadMediaPipe();
        const { FilesetResolver, HandLandmarker, DrawingUtils } = vision;

        state.HandLandmarkerClass = HandLandmarker;
        state.DrawingUtilsClass = DrawingUtils;

        showLoading('Inicializando detector de sinais...');

        const filesetResolver = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm'
        );

        state.handLandmarker = await HandLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task',
                delegate: 'GPU'
            },
            runningMode: 'VIDEO',
            numHands: 1,
            minHandDetectionConfidence: 0.5,
            minHandPresenceConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        hideLoading();
        updateSystemStatus('ready', 'IA Pronta');
        return true;
    } catch (error) {
        console.error('Erro ao carregar modelo:', error);
        showLoading('Erro ao carregar modelo. Verifique sua conexão e tente novamente.');
        updateSystemStatus('error', 'Erro no Modelo');
        return false;
    }
}

// ============================================================
// Gerenciamento da Câmera
// ============================================================

async function startCamera() {
    if (state.camera.active) {
        stopCamera();
        return;
    }

    if (!state.handLandmarker) {
        const loaded = await loadModel();
        if (!loaded) return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user'
            }
        });

        state.camera.stream = stream;
        elements.video.srcObject = stream;

        elements.video.addEventListener('loadeddata', () => {
            state.camera.active = true;
            updateCameraUI(true);

            elements.canvas.width = elements.video.videoWidth;
            elements.canvas.height = elements.video.videoHeight;
            canvasCtx = elements.canvas.getContext('2d');

            if (state.DrawingUtilsClass) {
                drawingUtils = new state.DrawingUtilsClass(canvasCtx);
            }

            updateSystemStatus('active', 'Câmera Ativa');
            startDetection();
            showToast('Câmera iniciada com sucesso!');
        }, { once: true });

    } catch (error) {
        console.error('Erro ao acessar câmera:', error);
        showToast('Erro ao acessar a câmera. Verifique as permissões.');
    }
}

function stopCamera() {
    state.detection.running = false;

    if (state.camera.stream) {
        state.camera.stream.getTracks().forEach(track => track.stop());
        state.camera.stream = null;
    }

    elements.video.srcObject = null;
    state.camera.active = false;
    updateCameraUI(false);

    if (canvasCtx) {
        canvasCtx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    }

    state.detection.stableLetter = null;
    state.detection.stableCount = 0;
    updateLetterDisplay(null, 0);
    updateHandIndicator(false);
    updateSystemStatus('ready', 'Sistema Pronto');
    showToast('Câmera desativada.');
}

// ============================================================
// Detector & Processing Loop
// ============================================================

function startDetection() {
    state.detection.running = true;
    let lastTimestamp = -1;

    function detectFrame() {
        if (!state.detection.running || !state.camera.active) return;

        const now = performance.now();
        calculateFPS(now);

        if (elements.video.readyState >= 2 && now !== lastTimestamp) {
            lastTimestamp = now;

            try {
                const results = state.handLandmarker.detectForVideo(elements.video, now);
                processResults(results);
            } catch (e) {
                // Erros de frame transitórios
            }
        }

        requestAnimationFrame(detectFrame);
    }

    requestAnimationFrame(detectFrame);
}

function calculateFPS(now) {
    state.performance.frameCount++;
    if (now - state.performance.lastFrameTime >= 1000) {
        state.performance.fps = Math.round((state.performance.frameCount * 1000) / (now - state.performance.lastFrameTime));
        state.performance.frameCount = 0;
        state.performance.lastFrameTime = now;
        elements.fpsMeter.textContent = `FPS: ${String(state.performance.fps).padStart(2, '0')}`;
    }
}

function processResults(results) {
    canvasCtx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);

    if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];

        // Desenhar a mão com neon azul
        drawLandmarksCustom(landmarks);

        // Classificar gesto
        const result = classifyGesture(landmarks);

        updateHandIndicator(true);

        if (result) {
            handleDetection(result.letter, result.confidence);
        } else {
            if (state.detection.stableCount > 0) {
                state.detection.stableCount--;
            }
            if (state.detection.stableCount === 0) {
                updateLetterDisplay(null, 0);
            }
        }
    } else {
        updateHandIndicator(false);
        state.detection.stableCount = 0;
        state.detection.stableLetter = null;
        updateLetterDisplay(null, 0);
    }
}

/**
 * Desenha esqueleto da mão com estilização personalizada neon azul.
 */
function drawLandmarksCustom(landmarks) {
    const w = elements.canvas.width;
    const h = elements.canvas.height;

    // Linhas neon de conexão
    canvasCtx.strokeStyle = '#0066FF';
    canvasCtx.lineWidth = 3;
    canvasCtx.lineCap = 'round';
    canvasCtx.shadowColor = 'rgba(0, 102, 255, 0.8)';
    canvasCtx.shadowBlur = 10;

    for (const [start, end] of HAND_CONNECTIONS) {
        const a = landmarks[start];
        const b = landmarks[end];
        canvasCtx.beginPath();
        canvasCtx.moveTo(a.x * w, a.y * h);
        canvasCtx.lineTo(b.x * w, b.y * h);
        canvasCtx.stroke();
    }

    // Reset shadow para os nós
    canvasCtx.shadowBlur = 0;

    // Desenhar cada ponto de articulação
    const fingertips = [4, 8, 12, 16, 20];

    for (let i = 0; i < landmarks.length; i++) {
        const lm = landmarks[i];
        const x = lm.x * w;
        const y = lm.y * h;
        const isTip = fingertips.includes(i);

        canvasCtx.beginPath();
        canvasCtx.arc(x, y, isTip ? 6 : 4, 0, Math.PI * 2);

        if (isTip) {
            canvasCtx.fillStyle = '#06B6D4'; // Pontas dos dedos cyan
            canvasCtx.strokeStyle = '#FFFFFF';
            canvasCtx.lineWidth = 2;
        } else {
            canvasCtx.fillStyle = '#8B5CF6'; // Nós roxos
            canvasCtx.strokeStyle = '#0066FF';
            canvasCtx.lineWidth = 1;
        }

        canvasCtx.fill();
        canvasCtx.stroke();
    }
}

/**
 * Aplica estabilização do gesto.
 */
function handleDetection(letter, confidence) {
    if (letter === state.detection.stableLetter) {
        state.detection.stableCount++;
    } else {
        state.detection.stableLetter = letter;
        state.detection.stableCount = 1;
    }

    updateLetterDisplay(letter, confidence);

    if (state.detection.stableCount >= state.detection.stableThreshold) {
        confirmLetter(letter, confidence);
    }
}

/**
 * Confirma uma letra e adiciona ao construtor de palavras.
 */
function confirmLetter(letter, confidence) {
    const now = Date.now();

    if (letter === state.detection.lastConfirmedLetter &&
        (now - state.detection.lastConfirmedTime) < state.detection.confirmCooldown) {
        return;
    }

    state.detection.lastConfirmedLetter = letter;
    state.detection.lastConfirmedTime = now;

    // Falar letra em áudio
    speech.speakLetter(letter);

    // Adicionar à palavra
    state.word.push(letter);
    updateWordDisplay();

    // Adicionar ao histórico
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    state.history.unshift({ letter, confidence, time: timestamp });
    if (state.history.length > state.maxHistory) state.history.pop();
    updateHistoryDisplay();

    // Destaque visual no card da letra
    triggerLetterPopAnimation();
    highlightAlphabetLetter(letter);

    state.detection.stableCount = 0;
}

// ============================================================
// Atualizações de Interface (UI)
// ============================================================

function setupUI() {
    updateCameraUI(false);
}

function updateCameraUI(active) {
    if (active) {
        elements.cameraOverlay.style.opacity = '0';
        elements.cameraOverlay.style.pointerEvents = 'none';
        elements.btnCamera.classList.add('active');
        elements.btnCameraText.textContent = 'Parar Câmera';
    } else {
        elements.cameraOverlay.style.opacity = '1';
        elements.cameraOverlay.style.pointerEvents = 'auto';
        elements.btnCamera.classList.remove('active');
        elements.btnCameraText.textContent = 'Iniciar Câmera';
    }
}

function updateSystemStatus(type, text) {
    elements.systemStatusChip.className = `status-chip ${type}`;
    elements.systemStatusText.textContent = text;
}

function updateLetterDisplay(letter, confidence) {
    if (letter) {
        elements.detectedLetter.textContent = letter;
        const perc = Math.round(confidence * 100);
        elements.confidencePercentage.textContent = `${perc}%`;
        elements.confidenceFill.style.width = `${perc}%`;
        elements.confidenceText.textContent = `Estabilizando: ${state.detection.stableCount}/${state.detection.stableThreshold}`;

        // Atualizar anel de progresso circular
        const circleMaxOffset = 389;
        const progress = Math.min(state.detection.stableCount / state.detection.stableThreshold, 1);
        const offset = circleMaxOffset - (circleMaxOffset * progress);
        elements.progressRingFill.style.strokeDashoffset = offset;
    } else {
        elements.detectedLetter.textContent = '?';
        elements.confidencePercentage.textContent = '0%';
        elements.confidenceFill.style.width = '0%';
        elements.confidenceText.textContent = 'Aguardando gesto...';
        elements.progressRingFill.style.strokeDashoffset = 389;
    }
}

function triggerLetterPopAnimation() {
    elements.detectedLetter.classList.remove('active-pop');
    void elements.detectedLetter.offsetWidth; // Trigger reflow
    elements.detectedLetter.classList.add('active-pop');
}

function updateHandIndicator(detected) {
    const handStatus = elements.handIndicator.querySelector('.hand-status');
    if (detected) {
        handStatus.textContent = 'Mão detectada ✋';
        handStatus.className = 'hand-status hand-detected';
    } else {
        handStatus.textContent = 'Aguardando mão na tela... 🖐️';
        handStatus.className = 'hand-status no-hand';
    }
}

function updateWordDisplay() {
    if (state.word.length === 0) {
        elements.wordDisplay.innerHTML = '<span class="word-placeholder">Sinais confirmados formarão palavras aqui...</span>';
    } else {
        elements.wordDisplay.innerHTML = state.word
            .map(l => {
                if (l === ' ') {
                    return '<span class="letter-chip space-chip" title="Espaço">␣</span>';
                }
                return `<span class="letter-chip">${l}</span>`;
            })
            .join('');
    }
}

function updateHistoryDisplay() {
    if (state.history.length === 0) {
        elements.historyList.innerHTML = '<span class="history-placeholder">Nenhuma letra detectada ainda</span>';
    } else {
        elements.historyList.innerHTML = state.history
            .map(h => `
                <div class="history-item">
                    <span class="history-letter">${h.letter}</span>
                    <span class="history-time">${h.time} (${Math.round(h.confidence * 100)}%)</span>
                </div>
            `)
            .join('');
    }
}

function renderAlphabetGrid(query = '') {
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const filtered = allLetters.filter(l => l.toLowerCase().includes(query.toLowerCase()));

    elements.alphabetGrid.innerHTML = filtered
        .map(letter => {
            const supported = SUPPORTED_LETTERS.includes(letter);
            return `
                <div class="letter-card ${supported ? 'supported' : 'unsupported'}"
                     id="alpha-${letter}"
                     style="${supported ? '' : 'opacity: 0.3;'}"
                     title="${supported ? `Letra ${letter} Suportada` : `Letra ${letter} em desenvolvimento`}">
                    ${letter}
                </div>
            `;
        })
        .join('');
}

function highlightAlphabetLetter(letter) {
    const el = document.getElementById(`alpha-${letter}`);
    if (el) {
        el.classList.add('active-detected');
        setTimeout(() => el.classList.remove('active-detected'), 1500);
    }
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

function showToast(msg) {
    elements.toast.textContent = msg;
    elements.toast.classList.add('show');
    setTimeout(() => elements.toast.classList.remove('show'), 2500);
}

function showLoading(text) {
    elements.loadingText.textContent = text;
    elements.loadingOverlay.classList.add('visible');
    elements.loadingOverlay.style.opacity = '1';
}

function hideLoading() {
    elements.loadingOverlay.style.opacity = '0';
    setTimeout(() => {
        elements.loadingOverlay.classList.remove('visible');
    }, 300);
}

// ============================================================
// Event Listeners & Atalhos
// ============================================================

function setupEventListeners() {
    // Botões de Câmera
    elements.btnCameraStart.addEventListener('click', startCamera);
    elements.btnCamera.addEventListener('click', startCamera);

    // Controle de Voz
    elements.btnSound.addEventListener('click', () => {
        const enabled = speech.toggle();
        elements.btnSound.classList.toggle('active', enabled);
        showToast(enabled ? 'Síntese de voz ativada' : 'Síntese de voz silenciada');
    });

    // Modal de Ajuda
    elements.btnHelp.addEventListener('click', () => {
        elements.helpModal.classList.add('open');
    });

    elements.btnCloseModal.addEventListener('click', () => {
        elements.helpModal.classList.remove('open');
    });

    elements.helpModal.addEventListener('click', (e) => {
        if (e.target === elements.helpModal) {
            elements.helpModal.classList.remove('open');
        }
    });

    // Ações da Palavra
    elements.btnAddSpace.addEventListener('click', () => {
        state.word.push(' ');
        updateWordDisplay();
    });

    elements.btnBackspace.addEventListener('click', () => {
        if (state.word.length > 0) {
            state.word.pop();
            updateWordDisplay();
        }
    });

    elements.btnCopyWord.addEventListener('click', () => {
        const text = state.word.join('');
        if (text.trim()) {
            navigator.clipboard.writeText(text);
            showToast('Palavra copiada para a área de transferência!');
        } else {
            showToast('Nenhuma palavra para copiar.');
        }
    });

    elements.btnSpeakWord.addEventListener('click', () => {
        const wordText = state.word.join('');
        if (wordText.trim()) {
            speech.speakWord(wordText);
        } else {
            showToast('Digite ou faça gestos para formar uma palavra.');
        }
    });

    elements.btnClearWord.addEventListener('click', () => {
        state.word = [];
        updateWordDisplay();
        showToast('Palavra limpa.');
    });

    elements.btnClearHistory.addEventListener('click', () => {
        state.history = [];
        updateHistoryDisplay();
        showToast('Histórico limpado.');
    });

    // Busca no Alfabeto
    elements.alphabetSearch.addEventListener('input', (e) => {
        renderAlphabetGrid(e.target.value);
    });

    // Atalhos globais de teclado
    window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return; // Não disparar ao digitar na busca

        if (e.key === 'c' || e.key === 'C') {
            startCamera();
        } else if (e.code === 'Space') {
            e.preventDefault();
            state.word.push(' ');
            updateWordDisplay();
        } else if (e.code === 'Backspace') {
            e.preventDefault();
            if (state.word.length > 0) {
                state.word.pop();
                updateWordDisplay();
            }
        } else if (e.key === 's' || e.key === 'S') {
            const wordText = state.word.join('');
            if (wordText.trim()) {
                speech.speakWord(wordText);
            }
        }
    });
}

// ============================================================
// Iniciar Aplicação
// ============================================================

init();
