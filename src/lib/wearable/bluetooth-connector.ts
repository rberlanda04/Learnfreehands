/**
 * Web Bluetooth API Connector para dispositivo vestível WiW Speak
 * Window in World — Camada de Abstração de Hardware
 *
 * Conecta via BLE ao smartwatch/pulseira + anéis com sensores IMU.
 * Pronto para quando o hardware estiver disponível.
 */

import type { WearableDevice, WearableConnectionStatus, WearableFrame, IMUData, Vector3D } from "@/types/wearable";
import { WEARABLE_BLE_CONFIG } from "@/types/wearable";

export class BluetoothConnector {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private device: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private server: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private imuCharacteristic: any = null;
  private status: WearableConnectionStatus = "disconnected";
  private onStatusChange: ((status: WearableConnectionStatus) => void) | null = null;
  private onDataReceived: ((frame: WearableFrame) => void) | null = null;

  isSupported(): boolean {
    return typeof navigator !== "undefined" && "bluetooth" in navigator;
  }

  getStatus(): WearableConnectionStatus {
    return this.status;
  }

  getDeviceInfo(): WearableDevice | null {
    if (!this.device) return null;
    return {
      id: this.device.id,
      name: this.device.name || "WiW Speak Device",
      status: this.status,
    };
  }

  onStatus(callback: (status: WearableConnectionStatus) => void) {
    this.onStatusChange = callback;
  }

  onData(callback: (frame: WearableFrame) => void) {
    this.onDataReceived = callback;
  }

  private setStatus(status: WearableConnectionStatus) {
    this.status = status;
    this.onStatusChange?.(status);
  }

  async connect(): Promise<boolean> {
    if (!this.isSupported()) {
      console.error("Web Bluetooth API not supported");
      this.setStatus("error");
      return false;
    }

    try {
      this.setStatus("scanning");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nav = navigator as any;
      this.device = await nav.bluetooth.requestDevice({
        filters: [
          { namePrefix: "WiW" },
          { services: [WEARABLE_BLE_CONFIG.serviceUUID] },
        ],
        optionalServices: [WEARABLE_BLE_CONFIG.serviceUUID],
      });

      if (!this.device) {
        this.setStatus("disconnected");
        return false;
      }

      this.device.addEventListener("gattserverdisconnected", () => {
        this.setStatus("disconnected");
        console.log("WiW Device disconnected");
      });

      this.setStatus("connecting");

      this.server = await this.device.gatt!.connect();
      const service = await this.server.getPrimaryService(WEARABLE_BLE_CONFIG.serviceUUID);
      this.imuCharacteristic = await service.getCharacteristic(
        WEARABLE_BLE_CONFIG.imuCharacteristicUUID
      );

      // Subscribe to IMU data notifications
      await this.imuCharacteristic.startNotifications();
      this.imuCharacteristic.addEventListener(
        "characteristicvaluechanged",
        this.handleIMUData.bind(this)
      );

      this.setStatus("connected");
      console.log("WiW Device connected:", this.device.name);
      return true;
    } catch (error) {
      console.error("Connection error:", error);
      this.setStatus("error");
      return false;
    }
  }

  async disconnect() {
    if (this.imuCharacteristic) {
      try {
        await this.imuCharacteristic.stopNotifications();
      } catch {
        // ignore
      }
    }
    if (this.server?.connected) {
      this.server.disconnect();
    }
    this.setStatus("disconnected");
  }

  private handleIMUData(event: Event) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const characteristic = event.target as any;
    const value = characteristic.value;
    if (!value) return;

    try {
      const frame = this.parseIMUFrame(value);
      this.onDataReceived?.(frame);
    } catch (error) {
      console.error("Error parsing IMU data:", error);
    }
  }

  /**
   * Parses raw BLE data into a WearableFrame.
   * Expected format: 6 IMU datasets (wrist + 5 fingers) × 6 floats each (acc xyz + gyro xyz)
   * Total: 36 floats = 144 bytes (Float32)
   */
  private parseIMUFrame(data: DataView): WearableFrame {
    const parseIMU = (offset: number): IMUData => {
      const acc: Vector3D = {
        x: data.getFloat32(offset, true),
        y: data.getFloat32(offset + 4, true),
        z: data.getFloat32(offset + 8, true),
      };
      const gyro: Vector3D = {
        x: data.getFloat32(offset + 12, true),
        y: data.getFloat32(offset + 16, true),
        z: data.getFloat32(offset + 20, true),
      };
      return { timestamp: Date.now(), accelerometer: acc, gyroscope: gyro };
    };

    const stride = 24; // 6 floats × 4 bytes
    return {
      timestamp: Date.now(),
      wrist: parseIMU(0),
      fingers: {
        thumb: parseIMU(stride * 1),
        index: parseIMU(stride * 2),
        middle: parseIMU(stride * 3),
        ring: parseIMU(stride * 4),
        pinky: parseIMU(stride * 5),
      },
    };
  }
}
