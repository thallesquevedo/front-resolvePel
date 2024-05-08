import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="cadastro" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: true }} />
    </Stack>
  );
}
