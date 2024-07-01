import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ClienteOrdemServicoPage = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>ClienteOrdemServicoPage</Text>
      <Text>{id}</Text>
    </SafeAreaView>
  );
};

export default ClienteOrdemServicoPage;
