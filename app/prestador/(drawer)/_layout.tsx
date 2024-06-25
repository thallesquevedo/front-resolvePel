import { DrawerToggleButton } from '@react-navigation/drawer';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import CustomDrawerContent from '~/components/custom-drawer-content/custon-drawer-content';
import ResolvePelLogo from '~/components/resolvePelLogo/resolvePel-logo';
import { useAuth } from '~/context/auth-context';

export default function Layout() {
  const { authState, onLogout } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href="./login" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        drawerPosition: 'right',
        headerTitle: () => <ResolvePelLogo width={184} height={34} />,
        headerRight: () => <DrawerToggleButton />,
        headerRightContainerStyle: { marginRight: 20 },
        headerLeft: () => null,
        headerBackgroundContainerStyle: { borderBottomWidth: 1, opacity: 0.2 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="editar-servico"
        options={{
          drawerLabel: 'Editar serviço',
        }}
      />
      <Drawer.Screen
        name="criar-servico"
        options={{
          drawerLabel: 'Criar serviço',
        }}
      />
    </Drawer>
  );
}
