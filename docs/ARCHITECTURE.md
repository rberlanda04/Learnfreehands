# Arquitetura Técnica — WiW Speak

## Visão Geral

O WiW Speak é uma plataforma web moderna construída com **Next.js 15 (App Router)** e **TypeScript**, projetada para funcionar como Progressive Web App (PWA) e servir como interface tanto para reconhecimento de gestos via câmera quanto para futura integração com hardware vestível.

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js 15)                    │
│                                                              │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌───────────┐  │
│  │ Landing  │  │ Tradutor  │  │ Educação │  │ Dicionário│  │
│  │ Page     │  │ IA        │  │ (Cursos) │  │ (Busca)   │  │
│  │ (SSR)    │  │ (Client)  │  │ (SSR)    │  │ (Client)  │  │
│  └──────────┘  └─────┬─────┘  └──────────┘  └───────────┘  │
│                      │                                       │
│  ┌───────────────────┴──────────────────────────────────┐   │
│  │              CORE AI ENGINE (Client-Side)             │   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │   │
│  │  │  MediaPipe   │  │  Classificador│  │  Speech     │ │   │
│  │  │  HandLandmark│  │  de Gestos    │  │  TTS + STT  │ │   │
│  │  │  (WASM)      │  │  (Geométrico) │  │  (Web API)  │ │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │   │
│  │         │                 │                  │        │   │
│  │    21 landmarks    →  classifyGesture()  →  speak()   │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐   │
│  │           WEARABLE LAYER (Preparação)                  │   │
│  │                                                        │   │
│  │  ┌──────────────┐  ┌──────────┐  ┌───────────────┐   │   │
│  │  │ Web Bluetooth │  │  IMU     │  │  Simulador    │   │   │
│  │  │ Connector     │  │  Parser  │  │  de Hardware  │   │   │
│  │  └──────────────┘  └──────────┘  └───────────────┘   │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────────┐     │
│  │  VLibras Widget      │  │  Acessibilidade          │     │
│  │  (Gov Federal)       │  │  (WCAG 2.1 AA)           │     │
│  └──────────────────────┘  └──────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Decisões Técnicas

### Por que Next.js 15?
- **SSR** para SEO otimizado na landing page e páginas educacionais
- **App Router** para rotas tipadas e layouts compartilhados
- **API Routes** para futuro backend (progresso do aluno, contato)
- **Client Components** para funcionalidades de câmera e tempo real

### Por que CSS puro (sem Tailwind)?
- Máximo controle sobre acessibilidade (modo alto contraste, fontes)
- Design system com CSS Custom Properties para temas dinâmicos
- Sem dependência de build-time CSS processing
- Facilidade de manutenção por equipes não familiarizadas com Tailwind

### Por que MediaPipe client-side?
- **Privacidade**: Nenhum dado de vídeo sai do dispositivo do usuário
- **Performance**: Inferência em WASM/GPU no navegador
- **Offline**: Funciona sem conexão após o primeiro carregamento do modelo
- **Simplicidade**: Sem necessidade de servidor GPU

### Classificador de Gestos
O classificador utiliza geometria dos 21 landmarks da mão (posições 3D X, Y, Z) para identificar padrões:
- **Extensão de dedos**: Comparação de distância ponta-pulso vs. articulação-pulso
- **Ângulos entre articulações**: Para detectar curvatura
- **Distância entre pontas**: Para detectar spread/contato entre dedos
- **Posição do polegar**: Relativa ao indicador e palma

### Comunicação Bidirecional
1. **Libras → Texto + Voz**: Câmera + MediaPipe + Classificador → TTS
2. **Voz → Texto**: Web Speech Recognition API → Texto na tela do usuário surdo

### Preparação para Wearable
A camada `wearable/` implementa:
- **Web Bluetooth API**: Padrão W3C para comunicação BLE com dispositivos
- **Protocolo BLE**: UUIDs definidos para serviço IMU, bateria e comandos
- **Parser de dados**: DataView para parsear floats de acelerômetro e giroscópio
- **Simulador**: Gera dados realistas para desenvolvimento sem hardware

## Estrutura de Dados

### Landmarks da Mão (MediaPipe)
```
        8 (INDEX_TIP)
        |
        7 (INDEX_DIP)
        |
        6 (INDEX_PIP)
        |
        5 (INDEX_MCP)
       /
  0 (WRIST) --- 9 (MIDDLE_MCP) --- 10 --- 11 --- 12
       \
        13 (RING_MCP) --- 14 --- 15 --- 16
         \
          17 (PINKY_MCP) --- 18 --- 19 --- 20
  
  1 (THUMB_CMC) --- 2 --- 3 --- 4 (THUMB_TIP)
```

### Dados IMU do Wearable
```
WearableFrame {
  timestamp: number
  wrist: { accelerometer: {x,y,z}, gyroscope: {x,y,z} }
  fingers: {
    thumb:  { accelerometer: {x,y,z}, gyroscope: {x,y,z} }
    index:  { accelerometer: {x,y,z}, gyroscope: {x,y,z} }
    middle: { accelerometer: {x,y,z}, gyroscope: {x,y,z} }
    ring:   { accelerometer: {x,y,z}, gyroscope: {x,y,z} }
    pinky:  { accelerometer: {x,y,z}, gyroscope: {x,y,z} }
  }
}
```

## Performance

| Métrica | Alvo | Atual |
|:---|:---|:---|
| FPS (detecção) | ≥30 | ~30 |
| Tempo de carga (modelo) | <5s | ~3-5s |
| Precisão (letras suportadas) | >70% | ~70-90% |
| Latência TTS | <200ms | <100ms |
| Lighthouse Performance | ≥90 | TBD |
| Lighthouse Accessibility | ≥95 | TBD |
