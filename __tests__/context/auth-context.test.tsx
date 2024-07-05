import { act, render } from '@testing-library/react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import 'core-js/stable/atob';
import { TamaguiProvider } from 'tamagui';

import { AuthProvider, useAuth } from '~/context/auth-context';
import client from '~/services/client';
import config from '~/tamagui.config';

jest.mock('axios');
jest.mock('expo-secure-store');
jest.mock('jwt-decode');
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));
jest.mock('~/services/client', () => ({
  post: jest.fn(),
}));

const mockDecodedToken = { name: 'Test User', email: 'test@example.com' };
(jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);

const TestComponent = () => {
  const { authState, onRegister, onLogin, onLogout, loading } = useAuth();
  return null;
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads token on mount', async () => {
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

  // it('registers a new user', async () => {
  //   const mockResponse = { data: 'success' };
  //   (client.post as jest.Mock).mockResolvedValue(mockResponse);
  //   let result;

  //   render(
  //     <AuthProvider>
  //       <TamaguiProvider config={config}>
  //         <TestComponent />
  //       </TamaguiProvider>
  //     </AuthProvider>
  //   );

  //   await act(async () => {
  //     const { onRegister } = useAuth();
  //     result = await onRegister!(
  //       'John Doe',
  //       'john@example.com',
  //       'password123',
  //       '12345678909',
  //       '1234567890'
  //     );
  //   });

  //   expect(result).toBe(mockResponse);
  //   expect(client.post).toHaveBeenCalledWith('/user', {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     password: 'password123',
  //     cpf: '12345678909',
  //     phone: '1234567890',
  //   });
  // });

  // it('logs in a user', async () => {
  //   const mockResponse = { data: { conteudo: { token: 'mockToken' } } };
  //   (client.post as jest.Mock).mockResolvedValueOnce(mockResponse);

  //   render(
  //     <AuthProvider>
  //       <TamaguiProvider config={config}>
  //         <TestComponent />
  //       </TamaguiProvider>
  //     </AuthProvider>
  //   );

  //   await act(async () => {
  //     const { onLogin } = useAuth();
  //     await onLogin!('john@example.com', 'password123');
  //   });

  //   expect(jwtDecode).toHaveBeenCalledWith('mockToken');
  //   expect(SecureStore.setItemAsync).toHaveBeenCalledWith('token', 'mockToken');
  //   expect(client.defaults.headers.common['Authorization']).toBe('Bearer mockToken');
  // });

  // it('logs out a user', async () => {
  //   const mockRouterReplace = require('expo-router').router.replace;

  //   render(
  //     <AuthProvider>
  //       <TamaguiProvider config={config}>
  //         <TestComponent />
  //       </TamaguiProvider>
  //     </AuthProvider>
  //   );

  //   await act(async () => {
  //     const { onLogout } = useAuth();
  //     await onLogout!();
  //   });

  //   expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('token');
  //   expect(client.defaults.headers.common['Authorization']).toBe('');
  //   expect(mockRouterReplace).toHaveBeenCalledWith('/');
  // });
});
