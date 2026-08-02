/**
 * Tipos para integração com dispositivo vestível
 * WiW Speak — Window in World
 * 
 * Preparação para o dispositivo composto por:
 * - Smartwatch/pulseira central
 * - Anéis flexíveis com sensores IMU
 */

export interface IMUData {
  timestamp: number;
  accelerometer: Vector3D;
  gyroscope: Vector3D;
  magnetometer?: Vector3D;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface FingerIMU {
  thumb: IMUData;
  index: IMUData;
  middle: IMUData;
  ring: IMUData;
  pinky: IMUData;
}

export interface WearableFrame {
  timestamp: number;
  wrist: IMUData;
  fingers: FingerIMU;
  batteryLevel?: number;
}

export type WearableConnectionStatus =
  | 'disconnected'
  | 'scanning'
  | 'connecting'
  | 'connected'
  | 'error';

export interface WearableDevice {
  id: string;
  name: string;
  status: WearableConnectionStatus;
  firmwareVersion?: string;
  batteryLevel?: number;
  lastSeen?: number;
}

export interface BLEServiceConfig {
  serviceUUID: string;
  imuCharacteristicUUID: string;
  batteryCharacteristicUUID: string;
  commandCharacteristicUUID: string;
}

export const WEARABLE_BLE_CONFIG: BLEServiceConfig = {
  serviceUUID: '0000fff0-0000-1000-8000-00805f9b34fb',
  imuCharacteristicUUID: '0000fff1-0000-1000-8000-00805f9b34fb',
  batteryCharacteristicUUID: '0000fff2-0000-1000-8000-00805f9b34fb',
  commandCharacteristicUUID: '0000fff3-0000-1000-8000-00805f9b34fb',
};
