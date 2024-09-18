import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput,  Image, Modal, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';

const ImageFetcher = () => {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchImage = async () => {
    setIsLoading(true);
    const data = {
        prompt:inputText
    }
    try {
      // Replace this with your actual API call
      const response = await axios.post('http://10.0.2.2:3002/image-generator',data)
      setImageUrl(response.data.image_url);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Enter search term"
      />
      <TouchableOpacity style={styles.button} onPress={fetchImage}><Text style={styles.buttontext}>Gnerate Image</Text></TouchableOpacity>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      

      <Modal visible={isLoading} transparent={true}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    marginTop:50,
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    backgroundColor: '#007bff',
    height:40,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    },
    buttontext: {
        color:"white"
    }
});

export default ImageFetcher;