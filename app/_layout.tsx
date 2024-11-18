import { useFonts } from 'expo-font';
import { router, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';

import { AuthProvider, useAuth } from '~/context/auth-context';

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  const StackLayout = () => {
    const { authState } = useAuth();

    useEffect(() => {
      if (authState?.authenticated) {
        router.replace('./(auth)/');
      }
    }, []);

    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} />
      </Stack>
    );
  };

  return (
    <AuthProvider>
      <TamaguiProvider config={config}>
        <StackLayout />
        <Toast />
      </TamaguiProvider>
    </AuthProvider>
  );
}
