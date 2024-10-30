import { DrawerToggleButton } from '@react-navigation/drawer';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import CustomDrawerContent from '~/components/custom-drawer-content/custon-drawer-content';
import ResolvePelLogo from '~/components/resolvePelLogo/resolvePel-logo';
import { useAuth } from '~/context/auth-context';

export default function Layout() {
  const { authState } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href="./login" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        drawerPosition: 'right',
        headerTitle: () => <ResolvePelLogo width={184} height={34} />,
        headerRight: () => <DrawerToggleButton />,
        headerRightContainerStyle: { marginRight: 20 },
        headerLeft: () => null,
        headerBackgroundContainerStyle: { borderBottomWidth: 1, opacity: 0.2 },
        drawerActiveBackgroundColor: 'rgba(84, 24, 126, 0.2)',
        drawerLabelStyle: { color: '#54187E' },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="[id]"
        options={{
          drawerLabel: 'Editar serviço',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}
