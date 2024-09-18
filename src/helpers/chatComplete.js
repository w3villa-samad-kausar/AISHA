import axios from 'axios';
import Config from 'react-native-config';
const apiKey = Config.CORCEL_API_KEY;

const chatComplete = async message => {
  const url = 'https://api.corcel.io/v1/text/cortext/chat';
  const options = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: apiKey,
    },
  };

  const data = {
    model: 'cortext-ultra',
    stream: false,
    top_p: 1,
    temperature: 0.0001,
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  };

  try {
    const response = await axios.post(url, data, options);
    const content = response.data[0].choices[0].delta.content;
    return content
  } catch (error) {
    console.error('Error fetching chat response:', error);
  }
};

export default chatComplete;
