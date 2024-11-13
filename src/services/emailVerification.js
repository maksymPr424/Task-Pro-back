import axios from 'axios';
import { env } from '../utils/env.js';

export const verifyEmailEmailable = async (email) => {
  const apiKey = env('EMAILABLE_API_KEY'); 
  const url = `https://api.emailable.com/v1/verify?email=${email}&api_key=${apiKey}`;

  const response = await axios.get(url);
  return response.data;
};
