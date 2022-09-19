export default interface FaceDetection {
    rollAngle: number
    yawAngle: number
    smilingProbability: number
    leftEyeOpenProbability: number
    rightEyeOpenProbability: number
    bounds: {
      origin: {
        x: number
        y: number
      }
      size: {
        width: number
        height: number
      }
    }
  }