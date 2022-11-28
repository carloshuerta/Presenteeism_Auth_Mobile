import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"

const Zone = () => {
    const navigation = useNavigation()
    
    const validateZone = () => {
        // validar zona
        navigation.navigate("StatusHandler", {statusGood: true}) // mandar true o false
    }

  return (
    <View style={styles.container}> 
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../../assets/images/mock_direction.png')} 
            style={{width: '90%', height: '90%', borderRadius: 15, borderColor: '#7D7D7D', borderWidth: 1}}/>
        </View>
        <View style={{flex: 1}}>
            <Text style={{fontSize: 20,textAlign: "center"}}>Actualmente te encuentras en:</Text>
            <Text style={{fontSize: 25,textAlign: "center", fontWeight: 'bold'}}>Lima 775 - CABA</Text>
        </View>
        <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
          <Pressable style={{width: "80%", backgroundColor: "#5570F1", padding: 15, borderRadius: 45}} onPress={validateZone}>
            <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Validar</Text>
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
        flexDirection: 'column'
    }
})

export default Zone