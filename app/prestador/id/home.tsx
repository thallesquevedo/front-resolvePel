import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'tamagui';

import { useAuth } from '~/context/auth-context';

const Page = () => {
  const { onLogout } = useAuth();
  return (
    <View>
      <Text>Page authenticated</Text>
      <Button onPress={() => onLogout!()}>Logout</Button>
    </View>
  );
};

export default Page;
