import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { Image, ScrollView, Text, XStack, YStack } from 'tamagui';

import CardOrderService from '~/components/client-card-order-service/client-card-order-service';
import { fetchAllOrdemServico } from '~/services/user-Client';

const ClienteHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const a = navigation.addListener('focus', () => {
      const fetchContent = async () => {
        try {
          setIsLoading(true);
          const response = await fetchAllOrdemServico();
          setServices(response.data);
        } catch {
          Toast.show({
            type: 'error',
            text1: 'Erro ao buscar serviços',
            text2: 'Tente novamente mais tarde',
            autoHide: true,
            visibilityTime: 2000,
          });
          router.push('/');
        } finally {
          setIsLoading(false);
        }
      };
      fetchContent();
    });
    return a;
  }, [navigation]);

  if (isLoading) {
    return (
      <XStack flex={1} justifyContent="center" backgroundColor="white">
        <ActivityIndicator testID="loading-indicator" size={50} color="#54187E" />
      </XStack>
    );
  }

  return (
    <ScrollView paddingVertical={30} paddingHorizontal={20} backgroundColor="white">
      {services?.length !== 0 ? (
        <YStack gap={20} marginBottom={45}>
          <YStack gap={10}>
            {services.map((service) => (
              <CardOrderService
                key={service?.id}
                id={service?.id}
                descricao={service?.descricao}
                items={service?.items}
                servico={service?.servico}
              />
            ))}
          </YStack>
        </YStack>
      ) : (
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
        </YStack>
      )}
    </ScrollView>
  );
};

export default ClienteHome;
