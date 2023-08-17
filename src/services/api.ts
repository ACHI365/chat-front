import axios, { AxiosInstance } from 'axios';

const apiBaseUrl = process.env.REACT_APP_BACK_URL;
const API_BASE_URL = `${apiBaseUrl}/api`;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const sendMessage = async (message: string, selectedTags: string[]): Promise<void> => {
  try {
    await api.post("/Message/send", {
      message: message,
      tags: selectedTags,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

const fetchMessages = async (
  selectedTags: string[]
): Promise<{ content: string; selectedTags: string[] }[]> => {

  try {
    const response = await api.get(`/Message/get`, {
      params: { selectedTags: encodeURIComponent(selectedTags.join(',')) },
  });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};


export { api, sendMessage, fetchMessages };
