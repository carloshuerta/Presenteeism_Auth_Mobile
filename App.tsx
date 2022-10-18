import { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Liveness from "./src/pages/Liveness.android"
import Home from "./src/pages/Home"
import configureStore from "./src/stores/configureStore"
import { View, Text } from 'react-native'
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import Register from './src/pages/Register'
import ValidateProfile from './src/pages/ValidateProfile'
 
const Stack = createStackNavigator()

const AppWrap = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown : false
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#E1E1E1",
              shadowColor: "transparent"
            },
            cardStyle: {
              backgroundColor: "#E1E1E1",             
            }
          }}
        />
        <Stack.Screen
          name="ValidateProfile"
          component={ValidateProfile}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#5570F1",
              shadowColor: "transparent"
            },
            headerTintColor: "#FFF",
            cardStyle: {
              backgroundColor: "#5570F1" 
            }
          }}
        />
        <Stack.Screen 
          name="Detection" 
          component={Liveness} 
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#E1E1E1",
              shadowColor: "transparent"
            },
            cardStyle: {
              backgroundColor: "#E1E1E1",             
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const App = () => {
  const store = configureStore()

  useEffect(() => {
    const getFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf')
      });
      setFontsLoaded(true);
    }

    getFonts();
    setFontsLoaded(true);
  }, []);
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  if(!fontsLoaded){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <Text>Cargando...</Text>
      </View>
    )
  }

  return (
    <Provider store = { store }>
      <AppWrap/>
    </Provider>
  )
}
export default App