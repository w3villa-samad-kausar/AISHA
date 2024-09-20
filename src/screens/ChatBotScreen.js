import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const scrollViewRef = useRef();

  // API call function
  const fetchChatbotResponse = async (userMessage) => {
    setIsStreaming(true);
    let response = ''; // Clear response before new stream
    setMessages((prev) => [...prev, { sender: 'user', message: userMessage }]);
    setUserInput('');
    const data={
      message:userMessage
    }

    // Simulating API streaming response
    const apiResponse = await axios.post('http://10.0.2.2:3000/api/chat-complete',data)
    const content=apiResponse.data
    for (let i = 0; i < content.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 5)); // Delay to simulate streaming
      response += content[i];
      setCurrentResponse(response);
    }

    setMessages((prev) => [...prev, { sender: 'bot', message: response }]);
    setCurrentResponse('');
    setIsStreaming(false);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      fetchChatbotResponse(userInput);
    }
  };

  // Loading dots animation (e.g., "...")
  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        setLoadingDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
      }, 500);
      return () => clearInterval(interval); // Clear the interval when not streaming
    }
  }, [isStreaming]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        style={styles.chatContainer}
      >
        {messages.map((msg, index) => (
          <View key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        ))}
        {isStreaming && (
          <View style={styles.botMessage}>
            <Text style={styles.messageText}>
              {currentResponse || `Thinking ${loadingDots}`}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  chatContainer: {
    padding: 10,
    flexGrow: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatbotScreen;
