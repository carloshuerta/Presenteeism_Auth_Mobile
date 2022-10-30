export const PHOTOS_TO_TAKE = 3

export const promptsFaceRegisterText = {
    noFaceDetected: "Cara no detectada",
    performActions: "Saca las fotos para terminar el proceso"
}
  
export interface RegisterFaceAction<T extends keyof RegisterFaceActions> {
    type: T
    value: RegisterFaceActions[T]
}

export interface RegisterFaceActions {
    FACE_DETECTED: "yes" | "no",
    NEXT_PHOTO: null
}