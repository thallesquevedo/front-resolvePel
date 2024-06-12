import { render } from '@testing-library/react-native';
import React from 'react';
import { TamaguiProvider } from 'tamagui';

import Login from './login';

import { useAuth } from '~/context/auth-context';
import config from '~/tamagui.config';

jest.mock('~/context/auth-context');

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
});
