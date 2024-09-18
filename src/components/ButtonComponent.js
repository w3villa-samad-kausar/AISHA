import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ButtonComponent = ({screenName,label}) => {
  const navigation=useNavigation();
  const handleNavigation=()=>{
    navigation.navigate(screenName)
  }
  return (
    <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 10,
        width: 200,
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        margin:20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
