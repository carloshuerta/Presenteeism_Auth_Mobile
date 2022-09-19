import { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Liveness from "./src/pages/Liveness.android"
import Home from "./src/pages/Home"
import configureStore from "./src/stores/configureStore"
import { View, Text } from 'react-native'
import { Provider } from 'react-redux';
 
const Stack = createStackNavigator()

const AppWrap = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Demo" }}
        />
        <Stack.Screen name="Detection" component={Liveness} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const App = () => {
  const store = configureStore()

  useEffect(() => {
    // const getFonts = async () => {
    //   await Font.loadAsync({
    //     'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    //     'AsapCondensed-Bold':  require('./assets/fonts/AsapCondensed-Bold.ttf')
    //   });
    //   setFontsLoaded(true);
    // }

    //getFonts();
    setFontsLoaded(true);
  }, []);
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  if(!fontsLoaded){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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