import { Redirect, Stack } from 'expo-router';

import { useAuth } from '~/context/auth-context';

export default function Layout() {
  const { authState } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href="./login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="id" options={{ headerShown: false }} />
    </Stack>
  )
}
