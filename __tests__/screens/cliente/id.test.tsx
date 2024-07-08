import { render, waitFor, act, fireEvent } from '@testing-library/react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import { TamaguiProvider } from 'tamagui';

import ClienteOrdemServicoPage from '~/app/cliente/[id]';
import { fetchClienteOrdemServico, addView } from '~/services/user-Client';
import config from '~/tamagui.config';

const mockScreen = (
  <TamaguiProvider config={config}>
    <ClienteOrdemServicoPage />
  </TamaguiProvider>
);

jest.mock('expo-router', () => ({
  useFocusEffect: jest.fn(),
  useLocalSearchParams: jest.fn(),
}));

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn().mockImplementation(() => Promise.resolve()),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('~/services/user-Client', () => ({
  fetchClienteOrdemServico: jest.fn(),
  addView: jest.fn(),
}));

const mockUseLocalSearchParams = useLocalSearchParams as jest.Mock;
const mockUseFocusEffect = useFocusEffect as jest.Mock;
const mockFetchClienteOrdemServico = fetchClienteOrdemServico as jest.Mock;
const mockAddView = addView as jest.Mock;
const mockLinkingOpenURL = Linking.openURL as jest.Mock;
const mockToastShow = Toast.show as jest.Mock;

describe('ClienteOrdemServicoPage', () => {
  const ordemServicoMock = {
    id: '1',
    servico: { name: 'Serviço de Teste' },
    descricao: 'Descrição do serviço de teste',
    items: [{ id: 1, name: 'Item 1' }],
    user: { name: 'Prestador Teste', email: 'teste@teste.com', phone: '123456789' },
  };

  beforeEach(() => {
    mockUseLocalSearchParams.mockReturnValue({ id: '1' });
    mockUseFocusEffect.mockImplementation((cb) => cb());
    mockFetchClienteOrdemServico.mockResolvedValue({ data: ordemServicoMock });
    mockAddView.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders service with hidden prestador information', async () => {
    const { getByText } = render(mockScreen);

    await waitFor(() => {
      expect(getByText('Acessar dados')).toBeDefined();
    });
  });

  it('shows provider info when button is pressed', async () => {
    const { getByText, queryByText } = render(mockScreen);

    await waitFor(() => {
      expect(getByText('Ficou interessado?')).toBeTruthy();
    });

    act(() => {
      fireEvent.press(getByText('Acessar dados'));
    });

    await waitFor(() => {
      expect(mockAddView).toHaveBeenCalled();

      expect(queryByText('Ficou interessado?')).toBeNull();
      expect(getByText('Nome do Prestador')).toBeTruthy();
      expect(getByText('E-mail')).toBeTruthy();
      expect(getByText('Telefone')).toBeTruthy();
      expect(getByText('Prestador Teste')).toBeTruthy();
      expect(getByText('teste@teste.com')).toBeTruthy();
      expect(getByText('123456789')).toBeTruthy();
    });
  });

  it('opens WhatsApp when the button is pressed', async () => {
    const { getByText } = render(mockScreen);

    await waitFor(() => {
      expect(getByText('Acessar dados')).toBeTruthy();
    });

    act(() => {
      fireEvent.press(getByText('Acessar dados'));
    });

    await waitFor(() => {
      expect(mockAddView).toHaveBeenCalled();
      expect(getByText('Entre em contato via WhatsApp')).toBeTruthy();
    });

    act(() => {
      fireEvent.press(getByText('Entre em contato via WhatsApp'));
    });

    await waitFor(() => {
      expect(mockLinkingOpenURL).toHaveBeenCalledWith(
        'https://api.whatsapp.com/send?phone=123456789&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.'
      );
    });
  });

  it('shows error toast when addView fails', async () => {
    mockAddView.mockRejectedValueOnce(new Error('Network error'));

    const { getByText } = render(mockScreen);

    await waitFor(() => {
      expect(getByText('Acessar dados')).toBeTruthy();
    });

    act(() => {
      fireEvent.press(getByText('Acessar dados'));
    });

    await waitFor(() => {
      expect(mockAddView).toHaveBeenCalled();
      expect(mockToastShow).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Algo deu errado!',
        text2: 'Tente novamente mais tarde',
        autoHide: true,
        visibilityTime: 2000,
      });
    });
  });

  it('shows error toast when fetchClienteOrdemServico fails', async () => {
    mockFetchClienteOrdemServico.mockRejectedValueOnce(new Error('Network error'));

    const { getByText } = render(mockScreen);

    await waitFor(() => {
      expect(getByText('Acessar dados')).toBeTruthy();
    });

    await waitFor(() => {
      expect(mockToastShow).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Algo deu errado!',
        text2: 'Tente novamente mais tarde',
        autoHide: true,
        visibilityTime: 2000,
      });
    });
  });
});
