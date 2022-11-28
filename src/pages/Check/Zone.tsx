import { View, StyleSheet, Image, Pressable, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";

import * as Location from 'expo-location';

const Zone = () => {
  const navigation = useNavigation()
  
  const [location, setLocation] = useState(null);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Buscando localización...'
  );

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Error",'Los permisos para acceder a la ubicación fueron denegadas');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      if (coords) {
        const { latitude, longitude } = coords;

        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });

        for (let item of response) {
          let address = `${item.street} ${item.name}, ${item.city}, ${item.country}`;
          address.replace('null', '')

          setDisplayCurrentAddress(address);
        }
      }
    })();
  }, []);

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
            <Text style={{fontSize: 22,textAlign: "center", fontWeight: 'bold'}}>{displayCurrentAddress}</Text>
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