import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';
import { TamaguiProvider } from 'tamagui';

import Login from '~/app/prestador/login';
import { useAuth } from '~/context/auth-context';
import config from '~/tamagui.config';

jest.mock('~/context/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    navigate: jest.fn(),
  },
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('Login', () => {
  const mockLogin = (
    <TamaguiProvider config={config}>
      <Login />
    </TamaguiProvider>
  );

  it('should render the Login screen', () => {
    const onLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ onLogin });
    const { getByText, getByPlaceholderText } = render(mockLogin);

    expect(getByText('Faça Login')).toBeTruthy();
    expect(getByPlaceholderText('Ex: joao@email.com')).toBeTruthy();
    expect(getByPlaceholderText('Informe sua senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
    expect(getByText('Não possui conta? Crie agora')).toBeTruthy();
  });

  it('should show invalid email message when entering email without correct formatting', async () => {
    const onLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ onLogin });
    const { getByText, getByPlaceholderText } = render(mockLogin);

    const emailInput = getByPlaceholderText('Ex: joao@email.com');

    fireEvent.changeText(emailInput, 'joao.com');

    await waitFor(() => {
      expect(getByText('E-mail inválido')).toBeTruthy();
    });
  });

  it('should navigate to cadastro screen when clicking on "Criar conta"', async () => {
    const { getByText } = render(mockLogin);

    const criarContaButton = getByText('Criar conta');

    fireEvent.press(criarContaButton);

    expect(router.navigate).toHaveBeenCalledWith('./cadastro');
  });

  it('should navigate to home screen when login is successful', async () => {
    const onLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ onLogin });
    const { getByText, getByPlaceholderText } = render(mockLogin);

    const emailInput = getByPlaceholderText('Ex: joao@email.com');
    const passwordInput = getByPlaceholderText('Informe sua senha');
    const loginButton = getByText('Entrar');

    fireEvent.changeText(emailInput, 'email@teste.com');
    fireEvent.changeText(passwordInput, 'senha123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith('./');
    });
  });

  it('should show error message when login fails', async () => {
    const mockRejectedValue = {
      response: {
        data: {
          mensagem: {
            texto: 'Email e/ou senha inválido(s)',
          },
        },
      },
    };
    const onLogin = jest.fn().mockRejectedValue(mockRejectedValue);
    (useAuth as jest.Mock).mockReturnValue({ onLogin });
    const { getByText, getByPlaceholderText } = render(mockLogin);

    const emailInput = getByPlaceholderText('Ex: joao@email.com');
    const passwordInput = getByPlaceholderText('Informe sua senha');
    const loginButton = getByText('Entrar');

    fireEvent.changeText(emailInput, 'email@teste.com');
    fireEvent.changeText(passwordInput, 'senha1234');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: mockRejectedValue.response.data.mensagem.texto,
        visibilityTime: 5000,
        autoHide: true,
        position: 'bottom',
        text1Style: { fontSize: 18 },
      });
    });
  });
});
