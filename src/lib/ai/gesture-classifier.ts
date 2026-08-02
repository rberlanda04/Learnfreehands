/**
 * Classificador de gestos de Libras baseado em landmarks da mão (MediaPipe).
 * WiW Speak — Window in World
 *
 * Analisa a geometria da mão (extensão de dedos, ângulos, distâncias)
 * para identificar letras estáticas do alfabeto de Libras.
 * 
 * Expandido para suportar 26 letras (A-Z).
 * Letras dinâmicas (J, Z) são detectadas por posição inicial.
 */

import type { HandLandmark, GestureResult, FingerStates, FingerCurlStates } from "@/types/gesture";

// Índices dos landmarks da mão (MediaPipe Hand Landmarks)
const WRIST = 0;
const THUMB_CMC = 1;
const THUMB_MCP = 2;
const THUMB_IP = 3;
const THUMB_TIP = 4;
const INDEX_MCP = 5;
const INDEX_PIP = 6;
const INDEX_DIP = 7;
const INDEX_TIP = 8;
const MIDDLE_MCP = 9;
const MIDDLE_PIP = 10;
const MIDDLE_DIP = 11;
const MIDDLE_TIP = 12;
const RING_MCP = 13;
const RING_PIP = 14;
const RING_DIP = 15;
const RING_TIP = 16;
const PINKY_MCP = 17;
const PINKY_PIP = 18;
const PINKY_DIP = 19;
const PINKY_TIP = 20;

/** Lista de letras suportadas pelo classificador */
export const SUPPORTED_LETTERS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
  "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
  "U", "V", "W", "X", "Y", "Z",
];

// ── Utility Functions ──

function distance(a: HandLandmark, b: HandLandmark): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

function distance2D(a: HandLandmark, b: HandLandmark): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function isFingerExtended(
  landmarks: HandLandmark[],
  fingerTip: number,
  fingerPIP: number,
  fingerMCP: number
): boolean {
  const tip = landmarks[fingerTip];
  const pip = landmarks[fingerPIP];
  const tipDist = distance(tip, landmarks[WRIST]);
  const pipDist = distance(pip, landmarks[WRIST]);
  const extendedByDistance = tipDist > pipDist * 1.05;
  const extendedByY = tip.y < pip.y - 0.02;
  return extendedByDistance || extendedByY;
}

function isThumbExtended(landmarks: HandLandmark[]): boolean {
  const thumbTip = landmarks[THUMB_TIP];
  const thumbMCP = landmarks[THUMB_MCP];
  const indexMCP = landmarks[INDEX_MCP];
  const thumbTipToIndex = distance2D(thumbTip, indexMCP);
  const thumbMCPToIndex = distance2D(thumbMCP, indexMCP);
  return thumbTipToIndex > thumbMCPToIndex * 1.1;
}

function isFingerCurled(
  landmarks: HandLandmark[],
  fingerTip: number,
  _fingerPIP: number,
  fingerMCP: number
): boolean {
  const tip = landmarks[fingerTip];
  const mcp = landmarks[fingerMCP];
  const wrist = landmarks[WRIST];
  const tipDist = distance(tip, wrist);
  const mcpDist = distance(mcp, wrist);
  return tipDist < mcpDist * 1.15;
}

function getFingerStates(landmarks: HandLandmark[]): FingerStates {
  return {
    thumb: isThumbExtended(landmarks),
    index: isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP, INDEX_MCP),
    middle: isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP),
    ring: isFingerExtended(landmarks, RING_TIP, RING_PIP, RING_MCP),
    pinky: isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP, PINKY_MCP),
  };
}

function getFingerCurlStates(landmarks: HandLandmark[]): FingerCurlStates {
  return {
    index: isFingerCurled(landmarks, INDEX_TIP, INDEX_PIP, INDEX_MCP),
    middle: isFingerCurled(landmarks, MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP),
    ring: isFingerCurled(landmarks, RING_TIP, RING_PIP, RING_MCP),
    pinky: isFingerCurled(landmarks, PINKY_TIP, PINKY_PIP, PINKY_MCP),
  };
}

function angleBetween(a: HandLandmark, b: HandLandmark, c: HandLandmark): number {
  const ba = { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
  const bc = { x: c.x - b.x, y: c.y - b.y, z: c.z - b.z };
  const dot = ba.x * bc.x + ba.y * bc.y + ba.z * bc.z;
  const magBA = Math.sqrt(ba.x ** 2 + ba.y ** 2 + ba.z ** 2);
  const magBC = Math.sqrt(bc.x ** 2 + bc.y ** 2 + bc.z ** 2);
  if (magBA === 0 || magBC === 0) return 0;
  const cosAngle = Math.max(-1, Math.min(1, dot / (magBA * magBC)));
  return Math.acos(cosAngle) * (180 / Math.PI);
}

function areFingersSpread(
  landmarks: HandLandmark[],
  tip1: number,
  tip2: number,
  threshold = 0.06
): boolean {
  return distance2D(landmarks[tip1], landmarks[tip2]) > threshold;
}

function thumbAndIndexTouching(landmarks: HandLandmark[], threshold = 0.07): boolean {
  return distance(landmarks[THUMB_TIP], landmarks[INDEX_TIP]) < threshold;
}

// ── Individual Letter Classifiers ──

type Classifier = (
  landmarks: HandLandmark[],
  fingers: FingerStates,
  curled: FingerCurlStates
) => number;

const classifyA: Classifier = (landmarks, fingers) => {
  if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
    const thumbTip = landmarks[THUMB_TIP];
    const indexMCP = landmarks[INDEX_MCP];
    if (thumbTip.y < indexMCP.y + 0.03) return 0.7;
  }
  return 0;
};

const classifyB: Classifier = (landmarks, fingers) => {
  if (!fingers.thumb && fingers.index && fingers.middle && fingers.ring && fingers.pinky) {
    const spread = areFingersSpread(landmarks, INDEX_TIP, MIDDLE_TIP, 0.08);
    return spread ? 0.5 : 0.8;
  }
  return 0;
};

const classifyC: Classifier = (landmarks) => {
  const indexAngle = angleBetween(landmarks[INDEX_MCP], landmarks[INDEX_PIP], landmarks[INDEX_TIP]);
  const middleAngle = angleBetween(landmarks[MIDDLE_MCP], landmarks[MIDDLE_PIP], landmarks[MIDDLE_TIP]);
  if (indexAngle > 100 && indexAngle < 170 && middleAngle > 100 && middleAngle < 170) {
    const opening = distance(landmarks[THUMB_TIP], landmarks[INDEX_TIP]);
    if (opening > 0.05 && opening < 0.2) return 0.65;
  }
  return 0;
};

const classifyD: Classifier = (landmarks, fingers) => {
  if (fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
    const thumbToMiddle = distance(landmarks[THUMB_TIP], landmarks[MIDDLE_TIP]);
    if (thumbToMiddle < 0.08) return 0.85;
    if (!fingers.thumb) return 0.55;
  }
  return 0;
};

const classifyE: Classifier = (landmarks, fingers) => {
  if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky && !fingers.thumb) {
    const thumbTip = landmarks[THUMB_TIP];
    if (thumbTip.y > landmarks[INDEX_MCP].y) return 0.6;
    return 0.3;
  }
  return 0;
};

const classifyF: Classifier = (landmarks, fingers) => {
  if (fingers.middle && fingers.ring && fingers.pinky) {
    if (thumbAndIndexTouching(landmarks, 0.08)) return 0.85;
  }
  return 0;
};

const classifyG: Classifier = (landmarks, fingers) => {
  if (fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
    const indexTip = landmarks[INDEX_TIP];
    const indexMCP = landmarks[INDEX_MCP];
    // G: index pointing forward (horizontally) — small Y difference
    const yDiff = Math.abs(indexTip.y - indexMCP.y);
    if (yDiff < 0.06 && fingers.thumb) return 0.65;
  }
  return 0;
};

const classifyH: Classifier = (landmarks, fingers) => {
  if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
    const indexTip = landmarks[INDEX_TIP];
    const indexMCP = landmarks[INDEX_MCP];
    const yDiff = Math.abs(indexTip.y - indexMCP.y);
    // H: two fingers pointing forward horizontally
    if (yDiff < 0.06) return 0.65;
  }
  return 0;
};

const classifyI: Classifier = (_landmarks, fingers) => {
  if (!fingers.thumb && !fingers.index && !fingers.middle && !fingers.ring && fingers.pinky) return 0.85;
  if (!fingers.index && !fingers.middle && !fingers.ring && fingers.pinky) return 0.6;
  return 0;
};

const classifyJ: Classifier = (_landmarks, fingers) => {
  // J starts like I (pinky extended) — dynamic letter, detect starting position
  if (!fingers.thumb && !fingers.index && !fingers.middle && !fingers.ring && fingers.pinky) return 0.4;
  return 0;
};

const classifyK: Classifier = (landmarks, fingers) => {
  if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
    const spread = areFingersSpread(landmarks, INDEX_TIP, MIDDLE_TIP, 0.05);
    const thumbBetween = landmarks[THUMB_TIP].x > Math.min(landmarks[INDEX_TIP].x, landmarks[MIDDLE_TIP].x) &&
      landmarks[THUMB_TIP].x < Math.max(landmarks[INDEX_TIP].x, landmarks[MIDDLE_TIP].x);
    if (spread && thumbBetween) return 0.7;
  }
  return 0;
};

const classifyL: Classifier = (landmarks, fingers) => {
  if (fingers.thumb && fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
    const angle = angleBetween(landmarks[THUMB_TIP], landmarks[WRIST], landmarks[INDEX_TIP]);
    if (angle > 40 && angle < 120) return 0.85;
    return 0.6;
  }
  return 0;
};

const classifyM: Classifier = (landmarks, fingers) => {
  if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky && !fingers.thumb) {
    // M: three fingers over thumb — thumb hidden
    const thumbTip = landmarks[THUMB_TIP];
    const ringTip = landmarks[RING_TIP];
    if (thumbTip.y > landmarks[RING_MCP].y && distance(thumbTip, ringTip) < 0.08) return 0.55;
  }
  return 0;
};

const classifyN: Classifier = (landmarks, fingers) => {
  if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky && !fingers.thumb) {
    const thumbTip = landmarks[THUMB_TIP];
    const middleTip = landmarks[MIDDLE_TIP];
    if (thumbTip.y > landmarks[MIDDLE_MCP].y && distance(thumbTip, middleTip) < 0.08) return 0.5;
  }
  return 0;
};

const classifyO: Classifier = (landmarks, fingers) => {
  const thumbToIndex = distance(landmarks[THUMB_TIP], landmarks[INDEX_TIP]);
  const thumbToMiddle = distance(landmarks[THUMB_TIP], landmarks[MIDDLE_TIP]);
  if (thumbToIndex < 0.08 || thumbToMiddle < 0.08) {
    if (!fingers.ring && !fingers.pinky) return 0.7;
    if (!fingers.middle && !fingers.ring && !fingers.pinky) return 0.75;
  }
  const allClose = thumbToIndex < 0.1 &&
    distance(landmarks[INDEX_TIP], landmarks[MIDDLE_TIP]) < 0.06 &&
    distance(landmarks[MIDDLE_TIP], landmarks[RING_TIP]) < 0.06;
  if (allClose) return 0.6;
  return 0;
};

const classifyP: Classifier = (landmarks, fingers) => {
  // P: like K but pointing down
  if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
    const indexTip = landmarks[INDEX_TIP];
    const indexMCP = landmarks[INDEX_MCP];
    if (indexTip.y > indexMCP.y + 0.05) return 0.55; // pointing down
  }
  return 0;
};

const classifyQ: Classifier = (landmarks, fingers) => {
  // Q: like G but pointing down
  if (fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky && fingers.thumb) {
    const indexTip = landmarks[INDEX_TIP];
    const indexMCP = landmarks[INDEX_MCP];
    if (indexTip.y > indexMCP.y + 0.05) return 0.55;
  }
  return 0;
};

const classifyR: Classifier = (landmarks, fingers) => {
  if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
    // R: index and middle crossed — tips very close
    const tipDist = distance(landmarks[INDEX_TIP], landmarks[MIDDLE_TIP]);
    if (tipDist < 0.03) return 0.7;
  }
  return 0;
};

const classifyS: Classifier = (landmarks, fingers) => {
  if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
    const thumbTip = landmarks[THUMB_TIP];
    const indexPIP = landmarks[INDEX_PIP];
    // S: thumb over front of fingers (not to the side like A)
    if (thumbTip.y > landmarks[INDEX_MCP].y - 0.02 &&
        distance(thumbTip, indexPIP) < 0.06) return 0.6;
  }
  return 0;
};

const classifyT: Classifier = (landmarks, fingers) => {
  if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
    const thumbTip = landmarks[THUMB_TIP];
    const indexPIP = landmarks[INDEX_PIP];
    const middlePIP = landmarks[MIDDLE_PIP];
    // T: thumb between index and middle
    const betweenFingers = thumbTip.x > Math.min(indexPIP.x, middlePIP.x) &&
      thumbTip.x < Math.max(indexPIP.x, middlePIP.x);
    if (betweenFingers && distance(thumbTip, indexPIP) < 0.06) return 0.55;
  }
  return 0;
};

const classifyU: Classifier = (landmarks, fingers) => {
  if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
    const spread = areFingersSpread(landmarks, INDEX_TIP, MIDDLE_TIP, 0.05);
    if (!spread) return 0.85;
    const dist = distance2D(landmarks[INDEX_TIP], landmarks[MIDDLE_TIP]);
    if (dist < 0.07) return 0.6;
  }
  return 0;
};

const classifyV: Classifier = (landmarks, fingers) => {
  if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
    const spread = areFingersSpread(landmarks, INDEX_TIP, MIDDLE_TIP, 0.05);
    if (spread) return 0.85;
  }
  return 0;
};

const classifyW: Classifier = (_landmarks, fingers) => {
  if (fingers.index && fingers.middle && fingers.ring && !fingers.pinky) {
    if (!fingers.thumb) return 0.85;
    return 0.6;
  }
  return 0;
};

const classifyX: Classifier = (landmarks, fingers) => {
  if (!fingers.middle && !fingers.ring && !fingers.pinky) {
    const indexTip = landmarks[INDEX_TIP];
    const indexDIP = landmarks[INDEX_DIP];
    const indexPIP = landmarks[INDEX_PIP];
    // X: index finger hooked (DIP bent but PIP extended)
    const pipExtended = distance(indexPIP, landmarks[WRIST]) > distance(landmarks[INDEX_MCP], landmarks[WRIST]);
    const tipCurled = indexTip.y > indexDIP.y;
    if (pipExtended && tipCurled) return 0.65;
  }
  return 0;
};

const classifyY: Classifier = (_landmarks, fingers) => {
  if (fingers.thumb && !fingers.index && !fingers.middle && !fingers.ring && fingers.pinky) return 0.9;
  if (fingers.thumb && fingers.pinky && !fingers.middle && !fingers.ring) return 0.5;
  return 0;
};

const classifyZ: Classifier = (landmarks, fingers) => {
  // Z starts like index pointing — dynamic letter
  if (fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky && !fingers.thumb) {
    const indexTip = landmarks[INDEX_TIP];
    const indexMCP = landmarks[INDEX_MCP];
    if (indexTip.y < indexMCP.y) return 0.35;
  }
  return 0;
};

// ── Main Classifier ──

const classifiers: Record<string, Classifier> = {
  A: classifyA, B: classifyB, C: classifyC, D: classifyD,
  E: classifyE, F: classifyF, G: classifyG, H: classifyH,
  I: classifyI, J: classifyJ, K: classifyK, L: classifyL,
  M: classifyM, N: classifyN, O: classifyO, P: classifyP,
  Q: classifyQ, R: classifyR, S: classifyS, T: classifyT,
  U: classifyU, V: classifyV, W: classifyW, X: classifyX,
  Y: classifyY, Z: classifyZ,
};

/**
 * Classifica o gesto da mão a partir dos landmarks.
 * Retorna { letter, confidence } ou null se nenhuma letra for detectada.
 */
export function classifyGesture(landmarks: HandLandmark[]): GestureResult | null {
  if (!landmarks || landmarks.length < 21) return null;

  const fingers = getFingerStates(landmarks);
  const curled = getFingerCurlStates(landmarks);

  let bestLetter: string | null = null;
  let bestConfidence = 0;
  const threshold = 0.45;

  for (const [letter, classifier] of Object.entries(classifiers)) {
    const confidence = classifier(landmarks, fingers, curled);
    if (confidence > bestConfidence) {
      bestConfidence = confidence;
      bestLetter = letter;
    }
  }

  if (bestConfidence >= threshold && bestLetter) {
    return { letter: bestLetter, confidence: bestConfidence };
  }

  return null;
}

/** Hand skeleton connections for drawing */
export const HAND_CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12],
  [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20],
  [5, 9], [9, 13], [13, 17],
];
