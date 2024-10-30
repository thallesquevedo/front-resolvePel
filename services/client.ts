import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.8.168:3000',
});

export default client;
