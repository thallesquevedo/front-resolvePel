import React from 'react';
import { Button, Image, ScrollView, Text, YStack } from 'tamagui';

import { useAuth } from '~/context/auth-context';

const Page = () => {
  const { authState } = useAuth();

  return (
    <ScrollView paddingVertical={30} paddingHorizontal={20} backgroundColor="white">
      <YStack marginBottom={20} gap={10}>
        <Text color="#1E1E1E" fontSize={25} fontWeight="bold">
          Olá, {authState?.user?.name}
        </Text>
        <Text color="#848484" fontSize={16}>
          Veja abaixo todos os seus serviços
        </Text>
      </YStack>
      <YStack alignItems="center" gap={20}>
        <Image
          source={{ uri: require('~/assets/sem-servicos-cadastrados.png') }}
          width={160}
          height={160}
        />
        <YStack gap={10} alignItems="center">
          <Text color="#1E1E1E" fontSize={20} fontWeight="bold" width={160} textAlign="center">
            Não há serviços cadastrados
          </Text>
          <Text color="#464646" fontSize={16} width={212}>
            Clique no botão abaixo para criar seu primeiro serviço
          </Text>
        </YStack>
        <Button
          width={230}
          pressStyle={{ backgroundColor: '#440F69' }}
          backgroundColor="#54187E"
          fontSize={16}>
          + Criar serviço
        </Button>
      </YStack>
    </ScrollView>
  );
};

export default Page;
