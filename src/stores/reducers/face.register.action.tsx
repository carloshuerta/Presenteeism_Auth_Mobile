import { PHOTOS_TO_TAKE, promptsFaceRegisterText, RegisterFaceAction, RegisterFaceActions } from "../constants/face.register.action"

const initialState = {
    faceDetected: false,
    promptText: promptsFaceRegisterText.noFaceDetected,
    photos: [],
    processComplete: false
}

const faceRegisterReducer = (
    state: typeof initialState = initialState,
    action: RegisterFaceAction<keyof RegisterFaceActions>
  ): typeof initialState => {
    switch (action.type) {
      case "FACE_DETECTED":
        if(action.value === "yes"){
            return { ...state, faceDetected: true, promptText: promptsFaceRegisterText.performActions}       
        } else {
            return { ...state, faceDetected: false, promptText: promptsFaceRegisterText.noFaceDetected}       
        }
      case "NEXT_PHOTO":
        const nextIndex = state.photos.length + 1
        if (nextIndex === PHOTOS_TO_TAKE) {
          console.log(...state.photos, action.value)
          return { ...state, processComplete: true, photos: [...state.photos, action.value] }
        }
        else {
          console.log(...state.photos, action.value)
          return { ...state, processComplete: false, photos: [...state.photos, action.value] }
        }
      default:
        return state;
    }
  }

export default faceRegisterReducer;