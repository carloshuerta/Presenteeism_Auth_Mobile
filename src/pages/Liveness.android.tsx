import * as FaceDetector from "expo-face-detector"
import React, { useEffect, useReducer, useRef, useState } from "react"
import { StyleSheet, Text, View, Dimensions, PixelRatio } from "react-native"
import { Camera, CameraType, FaceDetectionResult } from "expo-camera"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { useNavigation } from "@react-navigation/native"
import FaceDetection from "../interfaces/FaceDetection.inteface"
import CameraPreviewMask from "../components/icons/CameraPreviewMask.icon"
import { Action, Actions, detections, promptsText } from "../stores/constants/detection.constants"
import { updateDetection } from "../stores/actions/detection.actions"
import { connect } from 'react-redux';

const { width: windowWidth } = Dimensions.get("window")

const Liveness = ({detectionState, dispatchDetection}) => {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    }

    requestPermissions()
  }, [])

  useEffect(() => {
    if (detectionState.processComplete) {
      setTimeout(() => {
        // Delay para ver la animacion de terminado
        navigation.goBack()
      }, 750)
    }
  }, [detectionState.processComplete])

  const onFacesDetected = (result: FaceDetectionResult) => {
    if (result.faces.length !== 1) {
      dispatchDetection({ type: "FACE_DETECTED", value: "no" })
      return
    }

    const face: FaceDetection = result.faces[0]

    const midFaceOffsetY = face.bounds.size.height / 2
    const midFaceOffsetX = face.bounds.size.width / 2

    const faceMidYPoint = face.bounds.origin.y + midFaceOffsetY
    if (
      faceMidYPoint <= PREVIEW_MARGIN_TOP ||
      faceMidYPoint >= PREVIEW_SIZE + PREVIEW_MARGIN_TOP
    ) {
      dispatchDetection({ type: "FACE_DETECTED", value: "no" })
      return
    }

    const faceMidXPoint = face.bounds.origin.x + midFaceOffsetX
    if (
      faceMidXPoint <= windowWidth / 2 - PREVIEW_SIZE / 2 ||
      faceMidXPoint >= windowWidth / 2 + PREVIEW_SIZE / 2
    ) {
      dispatchDetection({ type: "FACE_DETECTED", value: "no" })
      return
    }

    if (!detectionState.faceDetected) {
      dispatchDetection({ type: "FACE_DETECTED", value: "yes" })
    }

    const detectionAction = detectionState.detectionsList[detectionState.currentDetectionIndex]

    switch (detectionAction) {
      case "BLINK":
        // Probabilidad baja es cuando los ojos estan cerrados
        const leftEyeClosed =
          face.leftEyeOpenProbability <= detections.BLINK.minProbability
        const rightEyeClosed =
          face.rightEyeOpenProbability <= detections.BLINK.minProbability
        if (leftEyeClosed && rightEyeClosed) {
          dispatchDetection({ type: "NEXT_DETECTION", value: null })
        } 
        return   
      case "TURN_HEAD_LEFT":
        if (face.yawAngle >= detections.TURN_HEAD_LEFT.minAngle 
          && face.yawAngle <= detections.TURN_HEAD_LEFT.maxAngle) {
            dispatchDetection({ type: "NEXT_DETECTION", value: null })
        }
        return
      case "TURN_HEAD_RIGHT":
        if (face.yawAngle >= detections.TURN_HEAD_RIGHT.minAngle 
          && face.yawAngle < detections.TURN_HEAD_RIGHT.maxAngle ) {
            dispatchDetection({ type: "NEXT_DETECTION", value: null })
        }
        return
      case "SMILE":
        // Probabilidad alta es cuando sonrie
        if (face.smilingProbability >= detections.SMILE.minProbability) {
          dispatchDetection({ type: "NEXT_DETECTION", value: null })
        }
        return
    }
  }

  if (hasPermission === false) {
    return <Text>Sin acceso a la camara</Text>
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: PREVIEW_MARGIN_TOP,
          backgroundColor: "white",
          zIndex: 10
        }}
      />
      <View
        style={{
          position: "absolute",
          top: PREVIEW_MARGIN_TOP,
          left: 0,
          width: (windowWidth - PREVIEW_SIZE) / 2,
          height: PREVIEW_SIZE,
          backgroundColor: "white",
          zIndex: 10
        }}
      />
      <View
        style={{
          position: "absolute",
          top: PREVIEW_MARGIN_TOP,
          right: 0,
          width: (windowWidth - PREVIEW_SIZE) / 2 + 1,
          height: PREVIEW_SIZE,
          backgroundColor: "white",
          zIndex: 10
        }}
      />

      <Camera
        style={styles.cameraPreview}
        type={CameraType.front}
        onFacesDetected={onFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 0,
          tracking: false
        }}
      >
        <CameraPreviewMask width={"100%"} style={styles.circularProgress} />
        <AnimatedCircularProgress
          style={styles.circularProgress}
          size={PREVIEW_SIZE}
          width={5}
          backgroundWidth={7}
          fill={detectionState.progressFill}
          tintColor="#3485FF"
          backgroundColor="#e8e8e8"
        />
      </Camera>     
      <View style={styles.promptContainer}>
        <Text style={styles.faceStatus}>
          {!detectionState.faceDetected && promptsText.noFaceDetected}
        </Text>
        <Text style={styles.actionPrompt}>
          {detectionState.faceDetected && promptsText.performActions}
        </Text>
        <Text style={styles.action}>
          {detectionState.faceDetected &&
            detections[detectionState.detectionsList[detectionState.currentDetectionIndex]]
              .promptText}
        </Text>
      </View>
    </View>
  )
}

const PREVIEW_MARGIN_TOP = 50
const PREVIEW_SIZE = 300

const styles = StyleSheet.create({
  actionPrompt: {
    fontSize: 20,
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  promptContainer: {
    position: "absolute",
    alignSelf: "center",
    top: PREVIEW_MARGIN_TOP + PREVIEW_SIZE,
    height: "100%",
    width: "100%",
    backgroundColor: "white"
  },
  faceStatus: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 10
  },
  cameraPreview: {
    flex: 1
  },
  circularProgress: {
    position: "absolute",
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    top: PREVIEW_MARGIN_TOP,
    alignSelf: "center"
  },
  action: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold"
  }
})

const mapStateToProps = state => ({
  detectionState: state.detection
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchDetection : (object : Action<keyof Actions>) => dispatch(updateDetection(object))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Liveness);