import { Stack, router } from 'expo-router';
import { useEffect } from 'react';

import { useAuth } from '~/context/auth-context';

export default function Layout() {
  const { authState } = useAuth();

  useEffect(() => {
    if (authState?.authenticated) {
      router.replace('./prestador/id');
    }
  }, []);

  return authState?.authenticated ? (
    <Stack>
      <Stack.Screen name="id" options={{ headerShown: false }} />
    </Stack>
  ) : (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="cadastro" options={{ headerShown: false }} />
    </Stack>
  );
}
