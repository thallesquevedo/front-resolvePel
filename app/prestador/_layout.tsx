import { Stack, router } from 'expo-router';
import { useEffect } from 'react';

import { useAuth } from '~/context/auth-context';

export default function Layout() {
  const { authState } = useAuth();

  useEffect(() => {
    if (authState?.authenticated) {
      router.replace('./prestador/');
    }
  }, []);

  return authState?.authenticated ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" />
    </Stack>
  ) : (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
    </Stack>
  );
}
