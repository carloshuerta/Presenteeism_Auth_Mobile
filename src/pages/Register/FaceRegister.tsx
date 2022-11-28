import { View, Text, StyleSheet, Button, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Camera, CameraCapturedPicture, CameraType, FaceDetectionResult } from 'expo-camera'
import { connect } from 'react-redux'
import { PHOTOS_TO_TAKE, promptsFaceRegisterText, RegisterFaceAction, RegisterFaceActions } from '../../stores/constants/face.register.action'
import { updateFaceRegister } from '../../stores/actions/face.register.action'
import { useNavigation } from '@react-navigation/native'
import { fromData } from '../../utils/http'

const FaceRegister = ({route, registerFaceState, dispatchFaceRegister}) => {

  const navigation = useNavigation()
  const id = route.params;

  const [hasPermission, setHasPermission] = useState(false)
  const [camera, setCamera] = useState(null);

  const takePicture = async () => {
    if (camera && registerFaceState.faceDetected && registerFaceState.photos.length != PHOTOS_TO_TAKE) {
      const data : CameraCapturedPicture = await camera.takePictureAsync(null);
      dispatchFaceRegister({type: "NEXT_PHOTO", value: data})
    }
  };
  

  const onFacesDetected = (result: FaceDetectionResult) => {
    if (result.faces.length !== 1) {
      dispatchFaceRegister({ type: "FACE_DETECTED", value: "no" })
      return
    }
    dispatchFaceRegister({ type: "FACE_DETECTED", value: "yes" })
  }

  useEffect(() => {
    dispatchFaceRegister({ type: "RELOAD" })

    const requestPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === "granted")
    }

    requestPermissions()
  }, [])

  useEffect(() => {
    if(registerFaceState.photos.length == PHOTOS_TO_TAKE){
      let formData = new FormData();
      formData.append('userId', id)
      
      for (let index = 0; index != 3; index++) {
        const image = registerFaceState.photos[index];      
        let file = {
          uri : image.uri,
          type: 'image/jpg', 
          name: image.uri
        } as unknown as Blob

        formData.append('files', file)
      }

      fromData(`/employee/registration/upload`, formData).then(response => {
        dispatchFaceRegister({ type: "RELOAD" })
        navigation.navigate("Home")
      }).catch(error => Alert.alert("Error", "Error al registrar su cara. Contacte con Recursos Humanos."))
    }
  }, [registerFaceState.photos])

  if (hasPermission === false) {
    return <Text>Sin acceso a la camara</Text>
  }

  return (
    <View style={[styles.container, {
      flexDirection: "column"
    }]}>        
      <View style={[styles.cameraContainer, { flex: 3, alignItems: "center" }]}>         
        <Camera
          ref={(ref) => setCamera(ref)}
          onFacesDetected={onFacesDetected}
          style={styles.fixedRatio}
          type={CameraType.front}
          ratio={'1:1'}
        />
      </View>
      <View style={{flex: 1, marginTop: '5%'}}>
        <Text style={styles.faceStatus}>
          {!registerFaceState.faceDetected && promptsFaceRegisterText.noFaceDetected}
        </Text>
        <Text style={styles.actionPrompt}>
          {registerFaceState.faceDetected && promptsFaceRegisterText.performActions}
        </Text>
        <Text style={styles.actionPrompt}>
        {registerFaceState.faceDetected && `${registerFaceState.photos.length}/${PHOTOS_TO_TAKE}`}
        </Text>
      </View>
      <View style={[styles.view, { flex: 2 }]}>
        <Pressable style={{width: "80%", backgroundColor: "#5570F1", padding: 15, borderRadius: 45}} onPress={takePicture}>
          <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Tomar foto</Text>
        </Pressable>
        <Pressable>
          <Text style={{marginTop: 10, textDecorationLine: "underline"}}>
            Tengo un problema
          </Text>
        </Pressable>        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '5%'
    },
    cameraContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '90%',
      left: '2.5%'
    },
    fixedRatio: {
      flex: 1,
      aspectRatio: .9
    },
    view: {
        justifyContent: "center", 
        alignItems: "center"
    },
    faceStatus: {
      fontSize: 24,
      textAlign: "center"
    },
    actionPrompt: {
      fontSize: 20,
      textAlign: "center"
    },
  });

const mapStateToProps = state => ({
  registerFaceState: state.registerFace
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchFaceRegister : (object : RegisterFaceAction<keyof RegisterFaceActions>) => dispatch(updateFaceRegister(object))
  }
};
  
export default connect(mapStateToProps,mapDispatchToProps)(FaceRegister);

