import { Stack } from 'expo-router';

import { useAuth } from '~/context/auth-context';

export default function Layout() {
  const { authState } = useAuth();
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
