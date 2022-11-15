import { View, Text, StyleSheet, Pressable, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import CompanyLogo from "../../components/icons/CompanyLogo.icon";

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { get } from "../../utils/http";
import { useState } from "react";

const CELL_COUNT = 5;

const Register = () => {
  const navigation = useNavigation();

  const validateProfile = () => {
    get(`/employee/employee-validation?validationCode=${value}`).then(response => {
      console.log(response.data)
        navigation.navigate("ValidateProfile", response.data)
      }).catch(error => Alert.alert("Error!", "Código de validacion no válido, contacte con Recursos Humanos."))
  }

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({value,setValue});

  return (
    <View style={[styles.container, {
        flexDirection: "column"
      }]}>
        <View style={[styles.view, { flex: 1}]}>
          <CompanyLogo/>
          <Text style={{fontSize: 20}}>
            Grupo 03
          </Text>
        </View>
        <View style={[styles.view, { flex: 2}]}>
          <Text style={{fontSize: 30}}>
            Registrate
          </Text>
          <Text style={{textAlign: "center", fontSize: 15, marginTop: 15, width: "75%"}}>
            Segui los pasos para poder registrarse y realizar el check in o check out correctamente
          </Text>
        </View>
        <View style={{ flex: 3, alignItems: "center" }}>         
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"              
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
                /> 
        </View>
        <View style={[styles.view, { flex: 2 }]}>
          <Pressable style={{width: "80%", backgroundColor: "#5570F1", padding: 15, borderRadius: 45}} onPress={validateProfile}>
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
    container: {
        flex: 1,
        backgroundColor: "#E1E1E1"
    },
    view: {
        justifyContent: "center", 
        alignItems: "center"
    },
    codeFieldRoot: {
        marginTop: 20
    },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#b7bcd9',
        textAlign: 'center',
        borderRadius: 10,
        color: '#5570F1',
        marginRight: 15
    },
    focusCell: {
        borderColor: '#5570F1'
    },
})

export default Register