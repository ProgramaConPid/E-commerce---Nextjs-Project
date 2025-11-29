import axios from "axios";

export interface MessagePayload {
  name: string;
  email: string;
  message: string;
}

export const sendMessage = async ({name, email, message}: MessagePayload) => {
  try {
    const response = await axios.post('/api/contact', {
      name,
      email,
      message,
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Error sending message');
    } else {
      throw new Error('Network error');
    }
  }
}