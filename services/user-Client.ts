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

export const fetchReqServiceByUser = async (skip?: number, limit?: number) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.get('/req-servico/', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        skip,
        limit,
      },
    });
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

export const fetchAllOrdemServico = async (skip: number, search?: string) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.get('/req-servico/cliente/all', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        skip,
        search,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const fetchClienteOrdemServico = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.get(`/req-servico/cliente/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

export const addView = async () => {
  try {
    return await client.post('/analytics');
  } catch (error) {
    throw error;
  }
};

export const deleteServiceById = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.delete(`/req-servico/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

export const getUserInfos = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.get('/user/me', { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw error;
  }
};

export const updateUserInfos = async (data: any) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return await client.patch(`/user/me`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};
