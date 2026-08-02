/**
 * Simulador de dados do dispositivo vestível WiW Speak
 * Window in World — Para desenvolvimento e testes
 *
 * Gera dados IMU simulados que imitam os sensores do hardware real,
 * permitindo desenvolvimento do software antes do hardware estar pronto.
 */

import type { WearableFrame, IMUData, Vector3D } from "@/types/wearable";

export class WearableSimulator {
  private running: boolean = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private onFrame: ((frame: WearableFrame) => void) | null = null;
  private frameRate: number = 30; // Hz
  private time: number = 0;

  setOnFrame(callback: (frame: WearableFrame) => void) {
    this.onFrame = callback;
  }

  start(frameRate: number = 30) {
    if (this.running) return;
    this.frameRate = frameRate;
    this.running = true;
    this.time = 0;

    this.intervalId = setInterval(() => {
      this.time += 1 / this.frameRate;
      const frame = this.generateFrame();
      this.onFrame?.(frame);
    }, 1000 / this.frameRate);
  }

  stop() {
    this.running = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  isRunning(): boolean {
    return this.running;
  }

  /**
   * Generates a simulated WearableFrame with realistic-looking IMU data.
   * Simulates natural hand movements with slight variations.
   */
  private generateFrame(): WearableFrame {
    const t = this.time;

    return {
      timestamp: Date.now(),
      wrist: this.generateIMU(t, 0),
      fingers: {
        thumb: this.generateIMU(t, 1),
        index: this.generateIMU(t, 2),
        middle: this.generateIMU(t, 3),
        ring: this.generateIMU(t, 4),
        pinky: this.generateIMU(t, 5),
      },
      batteryLevel: Math.max(10, 100 - Math.floor(t / 60)),
    };
  }

  private generateIMU(t: number, sensorIndex: number): IMUData {
    const phase = sensorIndex * 0.5;
    const noise = () => (Math.random() - 0.5) * 0.1;

    const accelerometer: Vector3D = {
      x: Math.sin(t * 2 + phase) * 0.5 + noise(),
      y: Math.cos(t * 1.5 + phase) * 0.3 + 9.81 + noise(), // gravity
      z: Math.sin(t * 0.8 + phase) * 0.4 + noise(),
    };

    const gyroscope: Vector3D = {
      x: Math.cos(t * 3 + phase) * 15 + noise() * 5,
      y: Math.sin(t * 2.5 + phase) * 10 + noise() * 5,
      z: Math.cos(t * 1.8 + phase) * 8 + noise() * 5,
    };

    return {
      timestamp: Date.now(),
      accelerometer,
      gyroscope,
    };
  }

  /**
   * Generates a static pose frame simulating a specific gesture.
   * Useful for testing classifier without actual movement.
   */
  generateStaticPose(gesture: "fist" | "open" | "pointing" | "peace"): WearableFrame {
    const base: IMUData = {
      timestamp: Date.now(),
      accelerometer: { x: 0, y: 9.81, z: 0 },
      gyroscope: { x: 0, y: 0, z: 0 },
    };

    const closed: IMUData = {
      ...base,
      accelerometer: { x: 0.3, y: 9.81, z: -0.2 },
    };

    const extended: IMUData = {
      ...base,
      accelerometer: { x: -0.1, y: 9.81, z: 0.5 },
    };

    const poses: Record<string, WearableFrame> = {
      fist: {
        timestamp: Date.now(),
        wrist: base,
        fingers: { thumb: closed, index: closed, middle: closed, ring: closed, pinky: closed },
      },
      open: {
        timestamp: Date.now(),
        wrist: base,
        fingers: { thumb: extended, index: extended, middle: extended, ring: extended, pinky: extended },
      },
      pointing: {
        timestamp: Date.now(),
        wrist: base,
        fingers: { thumb: closed, index: extended, middle: closed, ring: closed, pinky: closed },
      },
      peace: {
        timestamp: Date.now(),
        wrist: base,
        fingers: { thumb: closed, index: extended, middle: extended, ring: closed, pinky: closed },
      },
    };

    return poses[gesture] || poses.fist;
  }
}
