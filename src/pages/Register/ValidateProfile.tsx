import { View, StyleSheet, Text, Pressable, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import ProfileIcon from "../../components/icons/Profile.icon"

const ValidateProfile = ({route}) => {

  const navigation = useNavigation()

  const {id, email, lastName, name} = route.params;

  const takePicture = () => navigation.navigate("FaceRegister", id)

  return (
      <View style={[{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#E1E1E1"
      }]}>
        <View style={{flex:1, backgroundColor: "#5570F1", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#FFF", fontSize: 18, marginBottom: 70}}>Valida tus datos</Text>
        </View>
        <View style={{flex:5}}>
            <View style={{
                flex: 1,
                flexDirection: "column"
            }}>
                <View style={{flex: 1, flexDirection: "row", justifyContent:"center", alignContent:"center"}}>
                    <ProfileIcon style={{marginTop: -60}}/>
                </View>
                <View style={{flex: 1, flexDirection: "row", marginTop: 50}}>
                    <View style={[styles.inputContainer, {width: "50%", height: "50%"}]}>
                        <TextInput 
                            style={[styles.input]}
                            placeholder={"Nombre"}
                            keyboardType={"default"}
                            value={name}
                        />
                    </View>
                    <View style={[styles.inputContainer, {width: "50%", height: "50%"}]}>
                        <TextInput 
                            style={styles.input}
                            placeholder={"Apellido"}
                            keyboardType={"default"}
                            value={lastName}
                        />
                    </View>
                </View>
                <View style={{flex: 5}}>
                    <View style={[styles.inputContainer, {width: "100%"}]}>
                        <TextInput 
                            style={styles.input}
                            placeholder={"Email"}
                            keyboardType={"default"}
                            value={email}
                        />
                    </View>
                </View>
            </View>
        </View>
        <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
          <Pressable style={{width: "80%", backgroundColor: "#5570F1", padding: 15, borderRadius: 45}} onPress={takePicture}>
            <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Siguiente</Text>
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
    inputContainer: {
        backgroundColor: 'rgba(196, 196, 196, .2)',

        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 8,

        paddingHorizontal: '5%',
        marginVertical: '1%'
    },
    input : {
        padding: '1%',
        fontSize: 15,
    }
});

export default ValidateProfile