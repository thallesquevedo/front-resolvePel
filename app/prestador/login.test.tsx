import React from 'react';
import { TamaguiProvider } from 'tamagui';
import Login from './login';
import config from '~/tamagui.config';
import { useAuth } from '~/context/auth-context';
import { render } from '@testing-library/react';

jest.mock('~/context/auth-context', () => ({
  useAuth: jest.fn(),
}));

describe('Login', () => {
  const mockLogin = (
    <TamaguiProvider config={config}>
      <Login />
    </TamaguiProvider>
  );

  beforeEach(() => {
    jest.resetAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      onLogin: jest.fn(),
    });
  });

  it('should render the Login screen', () => {
    const { getByText, getByPlaceholderText } = render(mockLogin);

    expect(getByText('Faça Login')).toBeTruthy();
    expect(getByPlaceholderText('Ex: joao@email.com')).toBeTruthy();
    expect(getByPlaceholderText('Informe sua senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
    expect(getByText('Não possui conta? Crie agora')).toBeTruthy();
  });
});
