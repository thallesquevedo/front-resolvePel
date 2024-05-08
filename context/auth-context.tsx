import axios from 'axios';
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

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        setAuthState({ token, authenticated: true });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      return await axios.post('http://localhost:3000/user', { name, email, password, cpf, phone });
    } catch (error) {
      return error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post('http://localhost:3000/login', { email, password });
      setAuthState({
        token: result.data.tpken,
        authenticated: true,
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync('token', result.data.token);
      return result;
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({ token: null, authenticated: false });
  };

  const value: AuthProps = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
