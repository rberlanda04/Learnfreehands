# Especificação do Dispositivo Vestível — WiW Speak

## Visão Geral

O dispositivo WiW Speak é composto por:
1. **Pulseira/Smartwatch Central** — Processador, BLE, display, bateria
2. **Anéis Flexíveis (5x)** — Sensores IMU, um para cada dedo

## Sensores IMU

Cada anel contém:
- **Acelerômetro 3-eixos** (±16g) — Detecta aceleração linear
- **Giroscópio 3-eixos** (±2000°/s) — Detecta velocidade angular
- **Magnetômetro 3-eixos** (opcional) — Orientação absoluta

### Taxa de Amostragem
- Recomendado: **100 Hz** (mínimo 50 Hz para captura de gestos rápidos)
- Transmissão BLE: **30 Hz** (agrupamento de amostras)

## Protocolo BLE

### UUIDs do Serviço
| Característica | UUID | Direção |
|:---|:---|:---|
| Serviço Principal | `0000FFF0-0000-1000-8000-00805f9b34fb` | — |
| Dados IMU | `0000FFF1-0000-1000-8000-00805f9b34fb` | Notify |
| Bateria | `0000FFF2-0000-1000-8000-00805f9b34fb` | Read |
| Comandos | `0000FFF3-0000-1000-8000-00805f9b34fb` | Write |

### Formato dos Dados IMU (Notify)
```
Cada frame: 6 sensores × 6 floats × 4 bytes = 144 bytes

Offset 0-23:   Pulso   (acc_x, acc_y, acc_z, gyro_x, gyro_y, gyro_z) — Float32LE
Offset 24-47:  Polegar (acc_x, acc_y, acc_z, gyro_x, gyro_y, gyro_z)
Offset 48-71:  Indicador
Offset 72-95:  Médio
Offset 96-119: Anelar
Offset 120-143: Mindinho
```

### Comandos (Write)
| Byte | Comando |
|:---|:---|
| `0x01` | Iniciar streaming |
| `0x02` | Parar streaming |
| `0x03` | Calibrar sensores |
| `0x04` | Status do dispositivo |
| `0xFF` | Reset |

## Requisitos de Hardware

### MCU (Microcontrolador)
- BLE 5.0+ (throughput > 200 kbps)
- Processamento de sinais suficiente para pré-processar dados IMU
- Exemplo: nRF52840 (Nordic Semiconductor) ou ESP32-C3

### Sensores IMU
- Exemplo: BMI270 (Bosch) ou ICM-42688-P (InvenSense)
- Interface: SPI ou I2C

### Bateria
- Alvo: >8h de uso contínuo
- Carregamento: USB-C ou indução

### Conectividade dos Anéis
- Opção A: Cada anel com BLE próprio → pulseira agrega
- Opção B: Anéis com fio flexível → conexão direta à pulseira (mais simples)

## Fluxo de Dados

```
Anéis (IMU) → Pulseira (BLE) → App Web (Web Bluetooth API)
                                    ↓
                              Classificador de Gestos
                                    ↓
                              Texto + Voz
```

## Simulador

Para desenvolvimento sem hardware, use o simulador integrado:

```typescript
import { WearableSimulator } from '@/lib/wearable/simulator';

const sim = new WearableSimulator();
sim.setOnFrame((frame) => {
  console.log('IMU data:', frame);
});
sim.start(30); // 30 Hz
```
