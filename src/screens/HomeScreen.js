import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import ButtonComponent from '../components/ButtonComponent';

const HomeScreen = () => {
  return (
    <ImageBackground
      ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ButtonComponent
          label="Image Generation"
          screenName="Image Generator"
        />
        <ButtonComponent label="Chat Bot" screenName="Chat Bot" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'contain'
    justifyContent: 'center',
  },
});
export default HomeScreen;
