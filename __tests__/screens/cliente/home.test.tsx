import { render, waitFor } from '@testing-library/react-native';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';
import { TamaguiProvider } from 'tamagui';
import ClienteHome from '~/app/(auth)/cliente/home';
import { fetchAllOrdemServico, fetchServices } from '~/services/user-Client';
import config from '~/tamagui.config';

const mockScreen = (
  <TamaguiProvider config={config}>
    <ClienteHome />
  </TamaguiProvider>
);

jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
  router: { push: jest.fn() },
}));

jest.mock('~/services/user-Client', () => ({
  fetchAllOrdemServico: jest.fn(),
  fetchServices: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

const mockNavigation = {
  addListener: jest.fn().mockImplementation((event, callback) => {
    if (event === 'focus') {
      callback();
    }
    return jest.fn();
  }),
};

(useNavigation as jest.Mock).mockReturnValue(mockNavigation);

const servicesMock = [
  {
    id: 1,
    descricao: 'Service 1',
    items: ['Item 1', 'Item 2'],
    servico: 'Servico 1',
  },
  {
    id: 2,
    descricao: 'Service 2',
    items: ['Item 3', 'Item 4'],
    servico: 'Servico 2',
  },
];

describe('ClienteHome', () => {
  beforeEach(() => {
    (fetchAllOrdemServico as jest.Mock).mockResolvedValue({ data: servicesMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator while fetching data', async () => {
    const { getByTestId } = render(mockScreen);

    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('renders list of services after fetching data', async () => {
    const mockServices = [
      { id: 1, descricao: 'Service 1', items: [], servico: 'Tipo 1' },
      { id: 2, descricao: 'Service 2', items: [], servico: 'Tipo 2' },
    ];
    const mockFetchResponse = { data: { data: mockServices, count: 10 } };
    const mockFetchServices = { data: [{ name: 'Serviço A' }, { name: 'Serviço B' }] };
  
    (fetchAllOrdemServico as jest.Mock).mockResolvedValueOnce(mockFetchResponse);
    (fetchServices as jest.Mock).mockResolvedValueOnce(mockFetchServices);
  
    const { getByText, queryByTestId } = render(<ClienteHome />);
  
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
      expect(getByText('Service 1')).toBeTruthy();
      expect(getByText('Service 2')).toBeTruthy();
    });
  });

  it('renders no services message when there are no services', async () => {
    (fetchAllOrdemServico as jest.Mock).mockResolvedValueOnce({ data: [] });
    const { getByText, queryByTestId } = render(mockScreen);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
      expect(getByText('Não há serviços cadastrados')).toBeTruthy();
    });
  });

  it('handles fetch errors and shows toast message', async () => {
    (fetchAllOrdemServico as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const toastSpy = jest.spyOn(Toast, 'show').mockImplementation(() => {});

    render(<ClienteHome />);

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Erro ao buscar serviços',
        text2: 'Tente novamente mais tarde',
        autoHide: true,
        visibilityTime: 2000,
      });
    });

    toastSpy.mockRestore();
    });
});
