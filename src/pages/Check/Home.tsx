import { View, Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import CheckIcon from "../../components/icons/Check.icon";
import CompanyLogo from "../../components/icons/CompanyLogo.icon";
import DetectedUserIcon from "../../components/icons/DetectedUser.icon";
import LocationIcon from "../../components/icons/Location.icon";

const Home = () => {

  const navigation = useNavigation()
  const startDetection = () => navigation.navigate("Detection")
  const register = () => navigation.navigate("Register")

  return (
      <View style={[styles.container, {
        flexDirection: "column"
      }]}>
        <View style={[styles.view, { flex: 1}]}>
          <CompanyLogo style={{marginTop: 80}}/>
          <Text style={{fontSize: 20}}>
            Grupo 03
          </Text>
        </View>
        <View style={[styles.view, { flex: 2}]}>
          <Text style={{fontSize: 30}}>
            Sigue los pasos
          </Text>
          <Text style={{textAlign: "center", fontSize: 15, marginTop: 15, width: "75%"}}>
            Debemos validar tu informacion para confirmar que seas el empleado autentico y lorem ipsum
          </Text>
        </View>
        <View style={{ flex: 3, alignItems: "center" }}>
          <View style={[styles.info, styles.active]}>
            <View style={styles.icon}>
              <DetectedUserIcon/>
            </View>
            <View>
              <Text style={styles.step}>
                Paso 1
              </Text>
              <Text>
                Validacion humana
              </Text>
            </View>
          </View>
          <View style={[styles.info, { backgroundColor: "#E1E1E1", borderColor: "#BBBBBB", borderWidth: 1 }]}>
              <View style={styles.icon}>
                <LocationIcon/>
              </View>
              <View>
                <Text style={styles.step}>
                  Paso 2
                </Text>
                <Text>
                  Geolocalizate
                </Text>
              </View>
          </View>
          <View style={[styles.info, { backgroundColor: "#E1E1E1", borderColor: "#BBBBBB", borderWidth: 1 }]}>
            <View style={styles.icon}>
              <CheckIcon/>
            </View>
            <View>
              <Text style={styles.step}>
                Paso 3
              </Text>
              <Text>
                  Registra la entrada o salida
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.view, { flex: 2 }]}>
          <Pressable style={{width: "80%", backgroundColor: "#5570F1", padding: 15, borderRadius: 45}} onPress={startDetection}>
            <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Comenzar</Text>
          </Pressable>
          <Pressable onPress={register}>
            <Text style={{marginTop: 10, textDecorationLine: "underline"}}>
              No estoy registrado
            </Text>
          </Pressable>        
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1E1E1"
  },
  view: {
    justifyContent: "center", 
    alignItems: "center"
  },
  info: {
    flexDirection: "row",
    backgroundColor: "white", 
    width: "80%",
    marginTop: 30,
    padding: 15,
    borderRadius: 5
  },
  icon: {
    width: "30%"
  },
  active:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  step: {
    color: "#9D9D9D"
  }
});

export default Home