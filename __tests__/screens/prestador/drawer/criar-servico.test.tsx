import { NavigationContainer } from '@react-navigation/native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { TamaguiProvider } from 'tamagui';

import CriarServicoPage from '~/app/prestador/(drawer)/criar-servico'; // Ajuste o caminho conforme necessário
import { useAuth } from '~/context/auth-context';
import { fetchItems, fetchServices } from '~/services/user-Client';
import config from '~/tamagui.config';

jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('~/context/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('~/services/user-Client', () => ({
  fetchItems: jest.fn(),
  fetchServices: jest.fn(),
  createReqService: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

const mockNavigation = {
  addListener: jest.fn((event, callback) => callback()),
};

const mockRouter = {
  push: jest.fn(),
};

const mockAuthState = {
  user: {
    nome: 'Test User',
  },
};

describe('CriarServico', () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({ authState: mockAuthState });
    jest.clearAllMocks();
  });

  it('should render loading indicator while fetching data', async () => {
    (fetchItems as jest.Mock).mockResolvedValueOnce({ data: [] });
    (fetchServices as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { getByTestId } = render(
      <TamaguiProvider config={config}>
        <NavigationContainer>
          <CriarServicoPage />
        </NavigationContainer>
      </TamaguiProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('should render correctly', async () => {
    (fetchItems as jest.Mock).mockResolvedValueOnce({ data: [] });
    (fetchServices as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { getByText } = render(
      <TamaguiProvider config={config}>
        <NavigationContainer>
          <CriarServicoPage />
        </NavigationContainer>
      </TamaguiProvider>
    );

    await waitFor(() => {
      expect(getByText('Finalizar cadastro')).toBeTruthy();
      expect(getByText('Cancelar')).toBeTruthy();
    });
  });

  it('should display error messages for required fields', async () => {
    (fetchItems as jest.Mock).mockResolvedValueOnce({ data: [] });
    (fetchServices as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { getByText } = render(
      <NavigationContainer>
        <CriarServicoPage />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Finalizar cadastro')).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByText('Finalizar cadastro'));
    });

    await waitFor(() => {
      expect(getByText('É necessário informar a atividade')).toBeTruthy();
      expect(getByText('Selecione pelo menos um item')).toBeTruthy();
      expect(getByText('É necessário informar uma descrição')).toBeTruthy();
    });
  });
});
