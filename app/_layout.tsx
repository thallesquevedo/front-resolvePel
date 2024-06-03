import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';

import { AuthProvider } from '~/context/auth-context';

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

  return (
    <AuthProvider>
      <TamaguiProvider config={config}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="prestador" options={{ headerShown: false }} />
          <Stack.Screen name="cliente" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </TamaguiProvider>
    </AuthProvider>
  );
}
