/**
 * Classificador de gestos de Libras baseado em landmarks da mão (MediaPipe).
 *
 * Analisa a geometria da mão (extensão de dedos, ângulos, distâncias)
 * para identificar letras estáticas do alfabeto de Libras.
 */

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

/**
 * Lista de letras suportadas pelo classificador.
 */
export const SUPPORTED_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'L', 'O', 'U', 'V', 'W', 'Y'];

/**
 * Calcula a distância euclidiana 3D entre dois landmarks.
 */
function distance(a, b) {
    return Math.sqrt(
        (a.x - b.x) ** 2 +
        (a.y - b.y) ** 2 +
        (a.z - b.z) ** 2
    );
}

/**
 * Calcula a distância 2D (apenas x, y) entre dois landmarks.
 */
function distance2D(a, b) {
    return Math.sqrt(
        (a.x - b.x) ** 2 +
        (a.y - b.y) ** 2
    );
}

/**
 * Verifica se um dedo está estendido.
 * Para o polegar, usa lógica diferente (lateral).
 * Para os outros dedos, compara a posição da ponta com o PIP.
 */
function isFingerExtended(landmarks, fingerTip, fingerPIP, fingerMCP) {
    const tip = landmarks[fingerTip];
    const pip = landmarks[fingerPIP];
    const mcp = landmarks[fingerMCP];

    // Dedo está estendido se a ponta está mais longe do punho que o PIP
    const tipDist = distance(tip, landmarks[WRIST]);
    const pipDist = distance(pip, landmarks[WRIST]);

    // Também verifica se a ponta está acima (y menor) do PIP
    // Combinação de distância e direção
    const extendedByDistance = tipDist > pipDist * 1.05;
    const extendedByY = tip.y < pip.y - 0.02;

    return extendedByDistance || extendedByY;
}

/**
 * Verifica se o polegar está estendido.
 * O polegar se move lateralmente, então usamos lógica diferente.
 */
function isThumbExtended(landmarks) {
    const thumbTip = landmarks[THUMB_TIP];
    const thumbIP = landmarks[THUMB_IP];
    const thumbMCP = landmarks[THUMB_MCP];
    const indexMCP = landmarks[INDEX_MCP];

    // Polegar estendido: ponta afastada lateralmente da base do indicador
    const thumbTipToIndex = distance2D(thumbTip, indexMCP);
    const thumbMCPToIndex = distance2D(thumbMCP, indexMCP);

    return thumbTipToIndex > thumbMCPToIndex * 1.1;
}

/**
 * Verifica se um dedo está curvado (fechado).
 */
function isFingerCurled(landmarks, fingerTip, fingerPIP, fingerMCP) {
    const tip = landmarks[fingerTip];
    const pip = landmarks[fingerPIP];
    const mcp = landmarks[fingerMCP];
    const wrist = landmarks[WRIST];

    // Dedo curvado: ponta mais perto do punho que o MCP
    const tipDist = distance(tip, wrist);
    const mcpDist = distance(mcp, wrist);

    return tipDist < mcpDist * 1.15;
}

/**
 * Retorna o estado de extensão de cada dedo.
 */
function getFingerStates(landmarks) {
    return {
        thumb: isThumbExtended(landmarks),
        index: isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP, INDEX_MCP),
        middle: isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP),
        ring: isFingerExtended(landmarks, RING_TIP, RING_PIP, RING_MCP),
        pinky: isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP, PINKY_MCP)
    };
}

/**
 * Retorna o estado de curvatura de cada dedo.
 */
function getFingerCurlStates(landmarks) {
    return {
        index: isFingerCurled(landmarks, INDEX_TIP, INDEX_PIP, INDEX_MCP),
        middle: isFingerCurled(landmarks, MIDDLE_TIP, MIDDLE_PIP, MIDDLE_MCP),
        ring: isFingerCurled(landmarks, RING_TIP, RING_PIP, RING_MCP),
        pinky: isFingerCurled(landmarks, PINKY_TIP, PINKY_PIP, PINKY_MCP)
    };
}

/**
 * Calcula o ângulo entre três pontos (em graus).
 */
function angleBetween(a, b, c) {
    const ba = { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
    const bc = { x: c.x - b.x, y: c.y - b.y, z: c.z - b.z };

    const dot = ba.x * bc.x + ba.y * bc.y + ba.z * bc.z;
    const magBA = Math.sqrt(ba.x ** 2 + ba.y ** 2 + ba.z ** 2);
    const magBC = Math.sqrt(bc.x ** 2 + bc.y ** 2 + bc.z ** 2);

    if (magBA === 0 || magBC === 0) return 0;

    const cosAngle = Math.max(-1, Math.min(1, dot / (magBA * magBC)));
    return Math.acos(cosAngle) * (180 / Math.PI);
}

/**
 * Verifica se dois dedos estão próximos (pontas).
 */
function areFingertipsClose(landmarks, tip1, tip2, threshold = 0.06) {
    return distance(landmarks[tip1], landmarks[tip2]) < threshold;
}

/**
 * Verifica se a ponta do polegar e a ponta do indicador formam um círculo (próximas).
 */
function thumbAndIndexTouching(landmarks, threshold = 0.07) {
    return distance(landmarks[THUMB_TIP], landmarks[INDEX_TIP]) < threshold;
}

/**
 * Verifica distância entre pontas de dois dedos adjacentes
 * para determinar se estão juntos ou separados.
 */
function areFingersSpread(landmarks, tip1, tip2, threshold = 0.06) {
    return distance2D(landmarks[tip1], landmarks[tip2]) > threshold;
}


// ============================================================
// Classificadores para cada letra
// ============================================================

function classifyA(landmarks, fingers, curled) {
    // A: Punho fechado, polegar ao lado (não sobre os dedos)
    // Todos os dedos curvados, polegar estendido ou ao lado
    if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
        const thumbTip = landmarks[THUMB_TIP];
        const indexMCP = landmarks[INDEX_MCP];
        // Polegar está ao lado, não sobre os dedos
        if (thumbTip.y < indexMCP.y + 0.03) {
            return 0.7;
        }
    }
    return 0;
}

function classifyB(landmarks, fingers, curled) {
    // B: Mão aberta, quatro dedos juntos estendidos para cima, polegar dobrado
    if (!fingers.thumb && fingers.index && fingers.middle && fingers.ring && fingers.pinky) {
        // Dedos devem estar relativamente juntos
        const spread = areFingersSpread(landmarks, INDEX_TIP, MIDDLE_TIP, 0.08);
        if (!spread) {
            return 0.8;
        }
        return 0.5;
    }
    return 0;
}

function classifyC(landmarks, fingers, curled) {
    // C: Mão curvada formando C - nenhum dedo totalmente estendido ou fechado
    // Todos os dedos parcialmente curvados
    const thumbTip = landmarks[THUMB_TIP];
    const indexTip = landmarks[INDEX_TIP];
    const pinkyTip = landmarks[PINKY_TIP];
    const wrist = landmarks[WRIST];

    // Verificar curvatura parcial - dedos não totalmente estendidos nem fechados
    const indexAngle = angleBetween(landmarks[INDEX_MCP], landmarks[INDEX_PIP], landmarks[INDEX_TIP]);
    const middleAngle = angleBetween(landmarks[MIDDLE_MCP], landmarks[MIDDLE_PIP], landmarks[MIDDLE_TIP]);

    // C shape: ângulos intermediários (nem reto nem muito curvado)
    if (indexAngle > 100 && indexAngle < 170 && middleAngle > 100 && middleAngle < 170) {
        // Polegar e indicador formam abertura
        const opening = distance(thumbTip, indexTip);
        if (opening > 0.05 && opening < 0.2) {
            return 0.65;
        }
    }
    return 0;
}

function classifyD(landmarks, fingers, curled) {
    // D: Indicador estendido para cima, demais curvados, polegar toca o médio
    if (fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
        // Polegar pode estar tocando médio ou curvado
        const thumbToMiddle = distance(landmarks[THUMB_TIP], landmarks[MIDDLE_TIP]);
        if (thumbToMiddle < 0.08) {
            return 0.85;
        }
        // Ou apenas indicador para cima com polegar recolhido
        if (!fingers.thumb) {
            return 0.55;
        }
    }
    return 0;
}

function classifyE(landmarks, fingers, curled) {
    // E: Todos os dedos curvados sobre a palma, pontas voltadas para baixo
    if (!fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky && !fingers.thumb) {
        // Verificar que os dedos estão curvados (não é punho fechado como A)
        const indexTip = landmarks[INDEX_TIP];
        const thumbTip = landmarks[THUMB_TIP];
        // No E, as pontas dos dedos ficam visíveis voltadas para baixo
        // Diferença do A: no E o polegar fica embaixo/na frente dos dedos
        if (thumbTip.y > landmarks[INDEX_MCP].y) {
            return 0.6;
        }
        return 0.3;
    }
    return 0;
}

function classifyF(landmarks, fingers, curled) {
    // F: Polegar e indicador formam círculo (tocando), demais estendidos
    if (fingers.middle && fingers.ring && fingers.pinky) {
        if (thumbAndIndexTouching(landmarks, 0.08)) {
            return 0.85;
        }
    }
    return 0;
}

function classifyI(landmarks, fingers, curled) {
    // I: Apenas mindinho estendido, demais curvados
    if (!fingers.thumb && !fingers.index && !fingers.middle && !fingers.ring && fingers.pinky) {
        return 0.85;
    }
    // Tolerância: mindinho estendido e talvez polegar levemente estendido
    if (!fingers.index && !fingers.middle && !fingers.ring && fingers.pinky) {
        return 0.6;
    }
    return 0;
}

function classifyL(landmarks, fingers, curled) {
    // L: Polegar e indicador estendidos formando L, demais curvados
    if (fingers.thumb && fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
        // Verificar que polegar e indicador estão em ângulo ~90 graus
        const angle = angleBetween(landmarks[THUMB_TIP], landmarks[WRIST], landmarks[INDEX_TIP]);
        if (angle > 40 && angle < 120) {
            return 0.85;
        }
        return 0.6;
    }
    return 0;
}

function classifyO(landmarks, fingers, curled) {
    // O: Todos os dedos e polegar formam um O (pontas se tocam)
    const thumbToIndex = distance(landmarks[THUMB_TIP], landmarks[INDEX_TIP]);
    const thumbToMiddle = distance(landmarks[THUMB_TIP], landmarks[MIDDLE_TIP]);

    // Pontas se aproximam formando o O
    if (thumbToIndex < 0.08 || thumbToMiddle < 0.08) {
        // Verificar que não é F (no F os outros dedos estão estendidos)
        if (!fingers.ring && !fingers.pinky) {
            return 0.7;
        }
        if (!fingers.middle && !fingers.ring && !fingers.pinky) {
            return 0.75;
        }
    }

    // O com todos os dedos se aproximando
    const allClose = thumbToIndex < 0.1 &&
        distance(landmarks[INDEX_TIP], landmarks[MIDDLE_TIP]) < 0.06 &&
        distance(landmarks[MIDDLE_TIP], landmarks[RING_TIP]) < 0.06;
    if (allClose) {
        return 0.6;
    }

    return 0;
}

function classifyU(landmarks, fingers, curled) {
    // U: Indicador e médio estendidos juntos, demais curvados
    if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
        // Dedos devem estar juntos (não separados como V)
        const spread = areFingersSpread(landmarks, INDEX_TIP, MIDDLE_TIP, 0.05);
        if (!spread) {
            return 0.85;
        }
        // Se estão um pouco separados mas não muito, ainda pode ser U
        const dist = distance2D(landmarks[INDEX_TIP], landmarks[MIDDLE_TIP]);
        if (dist < 0.07) {
            return 0.6;
        }
    }
    return 0;
}

function classifyV(landmarks, fingers, curled) {
    // V: Indicador e médio estendidos separados (V de vitória), demais curvados
    if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
        // Dedos devem estar separados
        const spread = areFingersSpread(landmarks, INDEX_TIP, MIDDLE_TIP, 0.05);
        if (spread) {
            return 0.85;
        }
    }
    return 0;
}

function classifyW(landmarks, fingers, curled) {
    // W: Indicador, médio e anelar estendidos, polegar e mindinho curvados
    if (fingers.index && fingers.middle && fingers.ring && !fingers.pinky) {
        if (!fingers.thumb) {
            return 0.85;
        }
        return 0.6;
    }
    return 0;
}

function classifyY(landmarks, fingers, curled) {
    // Y: Polegar e mindinho estendidos, demais curvados (hang loose)
    if (fingers.thumb && !fingers.index && !fingers.middle && !fingers.ring && fingers.pinky) {
        return 0.9;
    }
    // Tolerância
    if (fingers.thumb && fingers.pinky && !fingers.middle && !fingers.ring) {
        return 0.5;
    }
    return 0;
}


// ============================================================
// Classificador Principal
// ============================================================

const classifiers = {
    'A': classifyA,
    'B': classifyB,
    'C': classifyC,
    'D': classifyD,
    'E': classifyE,
    'F': classifyF,
    'I': classifyI,
    'L': classifyL,
    'O': classifyO,
    'U': classifyU,
    'V': classifyV,
    'W': classifyW,
    'Y': classifyY
};

/**
 * Classifica o gesto da mão a partir dos landmarks.
 * Retorna { letter: string, confidence: number } ou null se nenhuma letra for detectada.
 */
export function classifyGesture(landmarks) {
    if (!landmarks || landmarks.length < 21) return null;

    const fingers = getFingerStates(landmarks);
    const curled = getFingerCurlStates(landmarks);

    let bestLetter = null;
    let bestConfidence = 0;
    const threshold = 0.45; // Confiança mínima para aceitar

    for (const [letter, classifier] of Object.entries(classifiers)) {
        const confidence = classifier(landmarks, fingers, curled);
        if (confidence > bestConfidence) {
            bestConfidence = confidence;
            bestLetter = letter;
        }
    }

    if (bestConfidence >= threshold) {
        return {
            letter: bestLetter,
            confidence: bestConfidence
        };
    }

    return null;
}
