import {View} from 'react-native';
import React from 'react';
import ButtonComponent from '../components/ButtonComponent';

const HomeScreen = () => {
  
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ButtonComponent label="Image Generation" screenName='Image Generator' />
      <ButtonComponent label="Chat Bot" screenName="Chat Bot" />
    </View>
  );
};

export default HomeScreen;
