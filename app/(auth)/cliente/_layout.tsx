import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ResolvePelLogo from '~/components/resolvePelLogo/resolvePel-logo';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => <ResolvePelLogo width={184} height={34} />,
        }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="[id]" />
      </Stack>
    </GestureHandlerRootView>
  );
}
