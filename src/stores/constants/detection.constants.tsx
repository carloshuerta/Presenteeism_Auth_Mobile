export const detections = {
  BLINK: { promptText: "Pestañá", minProbability: 0.4 },
  TURN_HEAD_LEFT: { promptText: "Gira la cabeza a la izquierda", minAngle: 315 , maxAngle: 345 },
  TURN_HEAD_RIGHT: { promptText: "Gira la cabeza a la derecha", minAngle: 20, maxAngle: 50 },
  SMILE: { promptText: "Sonrie", minProbability: 0.7 }
}

export type DetectionActions = keyof typeof detections

export const promptsText = {
    noFaceDetected: "Cara no detectada",
    performActions: "Realiza las siguientes acciones:"
}

export interface Action<T extends keyof Actions> {
    type: T
    value: Actions[T]
}

export interface Actions {
    FACE_DETECTED: "yes" | "no"
    NEXT_DETECTION: null
}