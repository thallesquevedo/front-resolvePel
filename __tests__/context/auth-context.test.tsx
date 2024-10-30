import { act, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import 'core-js/stable/atob';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { TamaguiProvider } from 'tamagui';

import { AuthContext, AuthProvider, useAuth } from '~/context/auth-context';
import client from '~/services/client';
import config from '~/tamagui.config';

const axiosMock = new AxiosMockAdapter(client);
jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  replace: jest.fn(),
}));
jest.mock('expo-secure-store');
jest.mock('jwt-decode');

const TestComponent = ({ action }: any) => {
  const { onRegister, onLogin } = React.useContext(AuthContext);

  React.useEffect(() => {
    action(onRegister, onLogin);
  }, [action, onRegister, onLogin]);

  return <div />;
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    axiosMock.reset();
  });

  it('should register a user successfully', async () => {
    axiosMock.onPost('/user').reply(200, { user: 'testUser', token: 'testToken' });

    const action = async (onRegister: any) => {
      await act(async () => {
        const response = await onRegister(
          'testName',
          'testEmail',
          'testPassword',
          'testCPF',
          'testPhone'
        );
        expect(response.data).toEqual({ user: 'testUser', token: 'testToken' });
      });
    };

    render(
      <AuthProvider>
        <TamaguiProvider config={config}>
          <TestComponent action={action} />
        </TamaguiProvider>
      </AuthProvider>
    );
  });

  it('should handle registration error', async () => {
    axiosMock.onPost('/user').networkError();

    const action = async (onRegister: any) => {
      await expect(
        onRegister('testName', 'testEmail', 'testPassword', 'testCPF', 'testPhone')
      ).rejects.toThrow();
    };

    render(
      <AuthProvider>
        <TamaguiProvider config={config}>
          <TestComponent action={action} />
        </TamaguiProvider>
      </AuthProvider>
    );
  });

  it('should remove token from storage and axios header, and update auth state', async () => {
    jest.spyOn(router, 'replace').mockResolvedValue();
    jest.spyOn(SecureStore, 'deleteItemAsync').mockResolvedValue();
    SecureStore.setItemAsync('token', 'test-token');
    axios.defaults.headers.common['Authorization'] = 'Bearer test-token';

    const wrapper = ({ children }: any) => (
      <AuthProvider>
        <TamaguiProvider config={config}>{children}</TamaguiProvider>
      </AuthProvider>
    );

    const result = render(
      <AuthContext.Consumer>
        {({ onLogout }) => <button onClick={onLogout}>Logout</button>}
      </AuthContext.Consumer>,
      { wrapper }
    );

    await act(async () => {
      result.getByText('Logout').click();
    });

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith('/');
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('token');
    });
  });

  it('loads token on mount', async () => {
    const TestComponent = () => {
      const { authState, onRegister, onLogin, onLogout, loading } = useAuth();
      return null;
    };

    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('mockToken');

    render(
      <AuthProvider>
        <TamaguiProvider config={config}>
          <TestComponent />
        </TamaguiProvider>
      </AuthProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(axios.defaults.headers.common['Authorization']).toBe('Bearer mockToken');
    });
  });
});
