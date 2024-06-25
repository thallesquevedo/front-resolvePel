import { usePathname } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'tamagui';

import { useAuth } from '~/context/auth-context';

const Page = () => {
  const { onLogout, authState } = useAuth();
  const pathname = usePathname();
  // console.log('pathname', pathname);

  return (
    <View>
      <Text>Editar serviço</Text>
    </View>
  );
};

export default Page;
