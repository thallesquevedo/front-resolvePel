import * as SecureStore from 'expo-secure-store';

import client from '~/services/client';
import {
  addView,
  createReqService,
  deleteServiceById,
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
  delete: jest.fn(),
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

    const skip = 0;
    const limit = 10;
    const response = await fetchReqServiceByUser(skip, limit);

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/req-servico/', {
      headers: { Authorization: `Bearer ${mockToken}` },
      params: { skip, limit },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches request service by user and handles error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Fetch request service by user failed');
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockRejectedValue(mockError);

    const skip = 0;
    const limit = 10;
    await expect(fetchReqServiceByUser(skip, limit)).rejects.toThrow(
      'Fetch request service by user failed'
    );

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/req-servico/', {
      headers: { Authorization: `Bearer ${mockToken}` },
      params: { skip, limit },
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
    const mockToken = 'mockToken';
    const mockResponse = { data: [] };
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const skip = 0;
    const search = 'test';
    const response = await fetchAllOrdemServico(skip, search);

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/req-servico/cliente/all', {
      headers: { Authorization: `Bearer ${mockToken}` },
      params: { skip, search },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches all ordem servico and handles error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Fetch all ordem servico failed');
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockRejectedValue(mockError);
  
    const skip = 0;
    const search = 'test';
    await expect(fetchAllOrdemServico(skip, search)).rejects.toThrow(
      'Fetch all ordem servico failed'
    );
  
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/req-servico/cliente/all', {
      headers: { Authorization: `Bearer ${mockToken}` },
      params: { skip, search },
    });
  });

  it('fetches cliente ordem servico', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: {} };
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);
  
    const id = '123';
    const response = await fetchClienteOrdemServico(id);
  
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith(`/req-servico/cliente/${id}`, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches cliente ordem servico and handles error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Fetch cliente ordem servico failed');
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockRejectedValue(mockError);
  
    const id = '123';
    await expect(fetchClienteOrdemServico(id)).rejects.toThrow(
      'Fetch cliente ordem servico failed'
    );
  
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith(`/req-servico/cliente/${id}`, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
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

  it('should successfully delete a service by ID', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: {} };

    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.delete as jest.Mock).mockResolvedValue(mockResponse);

    const id = '123';
    const response = await deleteServiceById(id);

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.delete).toHaveBeenCalledWith(`/req-servico/${id}`, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('should throw an error when deletion fails', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Delete service by user failed');

    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
    (client.delete as jest.Mock).mockRejectedValue(mockError);

    const id = '123';
    await expect(deleteServiceById(id)).rejects.toThrow('Delete service by user failed');

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.delete).toHaveBeenCalledWith(`/req-servico/${id}`, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });
});
