import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"

const StatusHandler = ({route}) => {
  const navigation = useNavigation()

  const statusGood = route.params;

  const backHome = () => {
    navigation.navigate("Home")
  }

  return (
    <View style={styles.container}> 
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../../assets/images/Ok-bro.png')} 
            style={{width: '80%', height: '80%'}}/>
        </View>
        <View style={{flex: 1}}>
            <Text style={{fontSize: 30,textAlign: "center", fontWeight: 'bold'}}>¡Perfecto!</Text>
            <Text style={{fontSize: 20,textAlign: "center", marginTop: 10}}>Realizaste el proceso correctamente.</Text>
        </View>
        <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
          <Pressable style={{width: "80%", backgroundColor: "#5570F1", padding: 15, borderRadius: 45}} onPress={backHome}>
            <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Finalizar</Text>
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

export default StatusHandler