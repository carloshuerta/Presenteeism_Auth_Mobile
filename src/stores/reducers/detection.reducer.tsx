import { Action, Actions, DetectionActions, promptsText } from "../constants/detection.constants"

const detectionsList: DetectionActions[] = [
    "BLINK",
    "SMILE",
    "TURN_HEAD_RIGHT",
    "TURN_HEAD_LEFT",
  ]

const initialState = {
    faceDetected: false,
    promptText: promptsText.noFaceDetected,
    detectionsList,
    currentDetectionIndex: 0,
    progressFill: 0,
    processComplete: false
}

const detectionReducer = (
    state: typeof initialState = initialState,
    action: Action<keyof Actions>
  ): typeof initialState => {
    const numDetections = state.detectionsList.length
    // +1 for face detection
    const newProgressFill = (100 / (numDetections + 1)) * (state.currentDetectionIndex + 1)
  
    switch (action.type) {
      case "FACE_DETECTED":
        if (action.value === "yes") {
          return { ...state, faceDetected: true, progressFill: newProgressFill }
        } else {
          // Reset
          return initialState
        }
      case "NEXT_DETECTION":
        const nextIndex = state.currentDetectionIndex + 1
        if (nextIndex === numDetections) {
          // success
          return { ...state, processComplete: true, progressFill: 100 }
        }
        // next
        return {
          ...state,
          currentDetectionIndex: nextIndex,
          progressFill: newProgressFill
        }
      default:
        return state;
    }
  }

export default detectionReducer;