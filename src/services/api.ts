import axios from 'axios';
import { DEFAULT_BASE_URL } from '../constants/config';

export const api = axios.create({
  baseURL: DEFAULT_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});