import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';

import { useAuth } from '~/context/auth-context';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { onLogout } = useAuth();

  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" onPress={onLogout!} pressColor="rgba(84, 24, 126, 0.2)" />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
