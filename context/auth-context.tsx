import axios from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
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
  }>({ token: null, authenticated: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true });
      } else {
        setAuthState({ token: null, authenticated: false });
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
      return await axios.post('http://172.25.128.1:3000/user', {
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
      const result = await axios.post('http://172.25.128.1:3000/login', { email, password });
      setAuthState({
        token: result.data.conteudo.token,
        authenticated: true,
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync('token', result.data.conteudo.token);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({ token: null, authenticated: false });
    router.replace('./login');
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
