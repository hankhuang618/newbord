import axios from 'axios';

export const API_BASE_URL = 'http://192.168.209.18:5088';

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

export default http;
