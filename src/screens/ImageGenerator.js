import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {errorToastMessage} from '../helpers/ToastMessage';

const ImageFetcher = () => {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchImage = async () => {
    setIsLoading(true);
    const data = {
      prompt: inputText,
    };
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/api/image-generator',
        data,
      );
      setImageUrl(response.data.image_url);
    } catch (error) {
      errorToastMessage('Error fetching image:');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {imageUrl ? (
          <Image source={{uri: imageUrl}} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image to display</Text>
        )}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter prompt to generate image"
        />
        <TouchableOpacity style={styles.button} onPress={fetchImage}>
          <Text style={styles.buttonText}>Generate Image</Text>
        </TouchableOpacity>
      </View>

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
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    backgroundColor: '#007bff',
    height: 40,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default ImageFetcher;
