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
    (SecureStore.getItemAsync as jest.Mock<any, any>).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await fetchItems();

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/items', {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches services', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: [] };
    (SecureStore.getItemAsync as jest.Mock<any, any>).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await fetchServices();

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/servicos', {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches request service by user', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: [] };
    (SecureStore.getItemAsync as jest.Mock<any, any>).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await fetchReqServiceByUser();

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith('/req-servico', {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
  });

  it('fetches unique request service by user', async () => {
    const mockToken = 'mockToken';
    const mockResponse = { data: {} };
    (SecureStore.getItemAsync as jest.Mock<any, any>).mockResolvedValue(mockToken);
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const id = '123';
    const response = await fetchUniqueReqServiceByUser(id);

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
    expect(client.get).toHaveBeenCalledWith(`/req-servico/${id}`, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(response).toBe(mockResponse);
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

  it('fetches all ordem servico', async () => {
    const mockResponse = { data: [] };
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await fetchAllOrdemServico();

    expect(client.get).toHaveBeenCalledWith('/req-servico/cliente/all');
    expect(response).toBe(mockResponse);
  });

  it('fetches cliente ordem servico', async () => {
    const mockResponse = { data: {} };
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const id = '123';
    const response = await fetchClienteOrdemServico(id);

    expect(client.get).toHaveBeenCalledWith(`/req-servico/cliente/${id}`);
    expect(response).toBe(mockResponse);
  });

  it('adds view', async () => {
    const mockResponse = { data: 'success' };
    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await addView();

    expect(client.post).toHaveBeenCalledWith('/analytics');
    expect(response).toBe(mockResponse);
  });
});
