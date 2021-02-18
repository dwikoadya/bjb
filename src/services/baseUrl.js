import axios from 'axios';
import env from '../config/env';

const baseUrl = axios.create({
  baseURL: env.baseUrl + '/oauth/token'
});

export default baseUrl;
