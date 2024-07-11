import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';
import { TamaguiProvider } from 'tamagui';

import Page from '~/app/prestador/(drawer)/home';
import { useAuth } from '~/context/auth-context';
import { deleteServiceById, fetchReqServiceByUser } from '~/services/user-Client';
import config from '~/tamagui.config';

jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('~/context/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('~/services/user-Client', () => ({
  fetchReqServiceByUser: jest.fn(),
  deleteServiceById: jest.fn(),
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
    name: 'Test User',
  },
};

describe('Page Screen', () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({ authState: mockAuthState });
    jest.clearAllMocks();
  });

  it('should render loading indicator while fetching data', async () => {
    (fetchReqServiceByUser as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { getByTestId } = render(
      <TamaguiProvider config={config}>
        <NavigationContainer>
          <Page />
        </NavigationContainer>
      </TamaguiProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('should render list of services after data is fetched', async () => {
    const servicesData = [
      {
        id: 1,
        descricao: 'Ordem de servico 1',
        items: ['item 1', 'item 2'],
        servico: { name: 'Servico 2', id: 2 },
      },
      {
        id: 2,
        descricao: 'Ordem de servico 2',
        items: ['item 5'],
        servico: { name: 'Servico 3', id: 3 },
      },
    ];

    (fetchReqServiceByUser as jest.Mock).mockResolvedValueOnce({ data: servicesData });

    const { getByText } = render(
      <NavigationContainer>
        <Page />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Ordem de servico 1')).toBeTruthy();
      expect(getByText('Ordem de servico 2')).toBeTruthy();
    });
  });

  it('should render message when no services are available', async () => {
    (fetchReqServiceByUser as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { getByText } = render(
      <NavigationContainer>
        <Page />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Não há serviços cadastrados')).toBeTruthy();
    });
  });

  it('navigate to create service if there are services', async () => {
    const services = {
      id: 1,
      descricao: 'Ordem de servico 1',
      items: ['item 1', 'item 2'],
      servico: { name: 'Servico 2', id: 2 },
    };
    (fetchReqServiceByUser as jest.Mock).mockResolvedValueOnce({ data: [services] });

    const { getByText } = render(
      <NavigationContainer>
        <Page />
      </NavigationContainer>
    );

    await waitFor(() => {
      fireEvent.press(getByText('+ Criar serviço'));
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/prestador/(drawer)/criar-servico');
  });

  it('should navigate to create service screen on button press', async () => {
    (fetchReqServiceByUser as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { getByText } = render(
      <NavigationContainer>
        <Page />
      </NavigationContainer>
    );

    await waitFor(() => {
      fireEvent.press(getByText('+ Criar serviço'));
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/prestador/(drawer)/criar-servico');
  });

  it('should show toast message when there is an error fetching data', async () => {
    (fetchReqServiceByUser as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(
      <NavigationContainer>
        <Page />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Erro ao buscar serviços',
        text2: 'Tente novamente mais tarde',
        autoHide: true,
        visibilityTime: 2000,
      });
    });
  });

  it('should delete service and show success toast', async () => {
    const serviceToDelete = {
      id: 1,
      descricao: 'Ordem de servico 1',
      items: ['item 1', 'item 2'],
      servico: { name: 'Servico 2', id: 2 },
    };

    (fetchReqServiceByUser as jest.Mock).mockResolvedValueOnce({ data: [serviceToDelete] });
    (deleteServiceById as jest.Mock).mockResolvedValueOnce({});

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Page />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Ordem de servico 1')).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByTestId(`delete-button-${serviceToDelete.id}`));
    });

    await act(async () => {
      fireEvent.press(getByText('Excluir serviço'));
    });

    await waitFor(() => {
      expect(deleteServiceById).toHaveBeenCalledWith(serviceToDelete.id.toString());
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Serviço deletado com sucesso',
        autoHide: true,
        visibilityTime: 2000,
      });
    });
  });

  it('should show error toast if delete service fails', async () => {
    const serviceToDelete = {
      id: 1,
      descricao: 'Ordem de servico 1',
      items: ['item 1', 'item 2'],
      servico: { name: 'Servico 2', id: 2 },
    };

    (fetchReqServiceByUser as jest.Mock).mockResolvedValueOnce({ data: [serviceToDelete] });
    (deleteServiceById as jest.Mock).mockRejectedValueOnce(new Error('Failed to delete'));

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Page />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Ordem de servico 1')).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByTestId(`delete-button-${serviceToDelete.id}`));
    });

    await act(async () => {
      fireEvent.press(getByText('Excluir serviço'));
    });

    await waitFor(() => {
      expect(deleteServiceById).toHaveBeenCalledWith(serviceToDelete.id.toString());
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Erro ao deletar serviço',
        text2: 'Tente novamente mais tarde',
        autoHide: true,
        visibilityTime: 2000,
      });
    });
  });
});
