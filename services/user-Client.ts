import * as SecureStore from 'expo-secure-store';

import client from './client';

export const fetchItems = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.get('/items', { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw error;
  }
};

export const fetchServices = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.get('/servicos', { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw error;
  }
};

export const fetchReqServiceByUser = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.get('/req-servico', { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw error;
  }
};
