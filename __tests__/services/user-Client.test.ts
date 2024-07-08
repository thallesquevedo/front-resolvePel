import * as SecureStore from 'expo-secure-store';

import client from '~/services/client';
import {
  addView,
  createReqService,
  fetchAllOrdemServico,
  fetchClienteOrdemServico,
  fetchItems,
  fetchReqServiceByUser,
  fetchServices,
  fetchUniqueReqServiceByUser,
  updateReqService,
} from '~/services/user-Client';

jest.mock('~/services/client', () => ({
  post: jest.fn(),
  get: jest.fn(),
  patch: jest.fn(),
}));
jest.mock('expo-secure-store');

describe('apiServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches items', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: [] };
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await fetchItems();

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/items', {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches items and handles error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Fetch items failed');
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(fetchItems()).rejects.toThrow('Fetch items failed');

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/items', {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });

  it('fetches services', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: [] };
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await fetchServices();

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/servicos', {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches services and handles error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Fetch services failed');
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(fetchServices()).rejects.toThrow('Fetch services failed');

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/servicos', {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });

  it('fetches request service by user', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: [] };
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await fetchReqServiceByUser();

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/req-servico', {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches request service by user and handles error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Fetch request service by user failed');
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(fetchReqServiceByUser()).rejects.toThrow('Fetch request service by user failed');

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/req-servico', {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });

  it('fetches unique request service by user', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: {} };
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const id = '123';
    const response = await fetchUniqueReqServiceByUser(id);

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith(`/req-servico/${id}`, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches unique request service by user and handles error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Fetch unique request service by user failed');
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockRejectedValue(mockError);

    const id = '123';
    await expect(fetchUniqueReqServiceByUser(id)).rejects.toThrow(
      'Fetch unique request service by user failed'
    );

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith(`/req-servico/${id}`, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });

  it('creates request service', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: {} };
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.post as jest.Mock).mockResolvedValue(mockResponse);

    const data = { field: 'value' };
    const response = await createReqService(data);

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.post).toHaveBeenCalledWith('/req-servico', data, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('creates request service and handles error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Create request service failed');
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.post as jest.Mock).mockRejectedValue(mockError);

    const data = { field: 'value' };
    await expect(createReqService(data)).rejects.toThrow('Create request service failed');

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.post).toHaveBeenCalledWith('/req-servico', data, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });

  it('updates request service', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: {} };
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.patch as jest.Mock).mockResolvedValue(mockResponse);

    const id = '123';
    const data = { field: 'value' };
    const response = await updateReqService(id, data);

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.patch).toHaveBeenCalledWith(`/req-servico/${id}`, data, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('updates request service and handles error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Update request service failed');
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.patch as jest.Mock).mockRejectedValue(mockError);

    const id = '123';
    const data = { field: 'value' };
    await expect(updateReqService(id, data)).rejects.toThrow('Update request service failed');

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.patch).toHaveBeenCalledWith(`/req-servico/${id}`, data, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });

  it('fetches all ordem servico', async () => {
    const mockResponse = { data: [] };
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await fetchAllOrdemServico();

    expect(client.get).toHaveBeenCalledWith('/req-servico/cliente/all');
    expect(response).toBe(mockResponse);
  });

  it('fetches all ordem servico and handles error', async () => {
    const mockError = new Error('Fetch all ordem servico failed');
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(fetchAllOrdemServico()).rejects.toThrow('Fetch all ordem servico failed');

    expect(client.get).toHaveBeenCalledWith('/req-servico/cliente/all');
  });

  it('fetches cliente ordem servico', async () => {
    const mockResponse = { data: {} };
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const id = '123';
    const response = await fetchClienteOrdemServico(id);

    expect(client.get).toHaveBeenCalledWith(`/req-servico/cliente/${id}`);
    expect(response).toBe(mockResponse);
  });

  it('fetches cliente ordem servico and handles error', async () => {
    const mockError = new Error('Fetch cliente ordem servico failed');
    (client.get as jest.Mock).mockRejectedValue(mockError);

    const id = '123';
    await expect(fetchClienteOrdemServico(id)).rejects.toThrow(
      'Fetch cliente ordem servico failed'
    );

    expect(client.get).toHaveBeenCalledWith(`/req-servico/cliente/${id}`);
  });

  it('adds view', async () => {
    const mockResponse = { data: 'success' };
    (client.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await addView();

    expect(client.post).toHaveBeenCalledWith('/analytics');
    expect(response).toBe(mockResponse);
  });

  it('adds view and handles error', async () => {
    const mockError = new Error('Add view failed');
    (client.post as jest.Mock).mockRejectedValue(mockError);

    await expect(addView()).rejects.toThrow('Add view failed');

    expect(client.post).toHaveBeenCalledWith('/analytics');
  });
});
