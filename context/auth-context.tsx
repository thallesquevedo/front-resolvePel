import axios from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

import 'core-js/stable/atob';
import client from '~/services/client';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null; user: any };
  onRegister?: (
    name: string,
    email: string,
    password: string,
    cpf: string,
    phone: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => void;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    user: any;
  }>({ token: null, authenticated: null, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true, user: jwtDecode(token) });
      } else {
        setAuthState({ token: null, authenticated: false, user: null });
      }
    };
    loadToken();
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string,
    cpf: string,
    phone: string
  ) => {
    try {
      return await client.post('/user', {
        name,
        email,
        password,
        cpf,
        phone,
      });
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await client.post('/login', { email, password });
      setAuthState({
        token: result.data.conteudo.token,
        authenticated: true,
        user: jwtDecode(result.data.conteudo.token),
      });

      client.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync('token', result.data.conteudo.token);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');

    client.defaults.headers.common['Authorization'] = '';

    setAuthState({ token: null, authenticated: false, user: null });
    router.replace(`/`);
  };

  const value: AuthProps = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    loading,
    setLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
