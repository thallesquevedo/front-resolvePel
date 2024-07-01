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

export const fetchUniqueReqServiceByUser = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.get(`/req-servico/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

export const createReqService = async (data: any) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.post(`/req-servico`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

export const updateReqService = async (id: string, data: any) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.patch(`/req-servico/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

export const fetchAllOrdemServico = async () => {
  try {
    return await client.get('/req-servico/cliente/all');
  } catch (error) {
    throw error;
  }
};

export const fetchClienteOrdemServico = async (id: string) => {
  try {
    return await client.get(`/req-servico/cliente/${id}`);
  } catch (error) {
    throw error;
  }
};
