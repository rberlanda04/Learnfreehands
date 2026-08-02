/**
 * Tipos para o sistema de reconhecimento de gestos Libras
 * WiW Speak — Window in World
 */

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface GestureResult {
  letter: string;
  confidence: number;
}

export interface FingerStates {
  thumb: boolean;
  index: boolean;
  middle: boolean;
  ring: boolean;
  pinky: boolean;
}

export interface FingerCurlStates {
  index: boolean;
  middle: boolean;
  ring: boolean;
  pinky: boolean;
}

export interface DetectionState {
  running: boolean;
  lastResult: GestureResult | null;
  stableLetter: string | null;
  stableCount: number;
  stableThreshold: number;
  lastConfirmedLetter: string | null;
  lastConfirmedTime: number;
  confirmCooldown: number;
}

export interface CameraState {
  active: boolean;
  stream: MediaStream | null;
}

export interface PerformanceState {
  lastFrameTime: number;
  frameCount: number;
  fps: number;
}

export interface AppState {
  handLandmarker: unknown;
  camera: CameraState;
  detection: DetectionState;
  performance: PerformanceState;
  word: string[];
  history: HistoryEntry[];
  maxHistory: number;
}

export interface HistoryEntry {
  letter: string;
  confidence: number;
  time: string;
}

export type SystemStatus = 'idle' | 'ready' | 'active' | 'error' | 'loading';
