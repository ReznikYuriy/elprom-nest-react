import axios from 'axios';
import { AppConfig } from '../config';

export const instance = axios.create({
  baseURL: `${AppConfig.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

