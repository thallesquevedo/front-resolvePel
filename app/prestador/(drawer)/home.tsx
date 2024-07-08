import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, Image, ScrollView, Text, XStack, YStack } from 'tamagui';

import CardOrderService from '~/components/card-order-service/card-order-service';
import { useAuth } from '~/context/auth-context';
import { fetchReqServiceByUser } from '~/services/user-Client';

const Page = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const a = navigation.addListener('focus', () => {
      const fetchServices = async () => {
        try {
          setIsLoading(true);
          const response = await fetchReqServiceByUser();
          setServices(response.data);
        } catch {
          Toast.show({
            type: 'error',
            text1: 'Erro ao buscar serviços',
            text2: 'Tente novamente mais tarde',
            autoHide: true,
            visibilityTime: 2000,
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchServices();
    });
    return a;
  }, [navigation]);

  if (isLoading) {
    return (
      <XStack flex={1} justifyContent="center" backgroundColor="white">
        <ActivityIndicator size={50} color="#54187E" testID="loading-indicator" />
      </XStack>
    );
  }

  return (
    <ScrollView paddingVertical={30} paddingHorizontal={20} backgroundColor="#FFF">
      <YStack marginBottom={20} gap={10}>
        <Text color="#1E1E1E" fontSize={25} fontWeight="bold">
          Olá, {authState?.user?.name}
        </Text>
        <Text color="#848484" fontSize={16}>
          Veja abaixo todos os seus serviços
        </Text>
      </YStack>
      {services?.length !== 0 ? (
        <YStack gap={20} marginBottom={45}>
          <Button
            pressStyle={{ backgroundColor: '#440F69' }}
            backgroundColor="#54187E"
            onPress={() => {
              router.push('/prestador/(drawer)/criar-servico');
            }}
            fontSize={16}>
            + Criar serviço
          </Button>
          <YStack gap={10}>
            {services.map((service) => (
              <CardOrderService
                key={service?.id}
                id={service?.id}
                descricao={service?.descricao}
                items={service?.items}
                servico={service?.servico}
                isModalVisible={isModalVisible}
                setIsModalVisible={setModalVisible}
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
          <Button
            width={230}
            pressStyle={{ backgroundColor: '#440F69' }}
            backgroundColor="#54187E"
            onPress={() => {
              router.push('/prestador/(drawer)/criar-servico');
            }}
            fontSize={16}>
            + Criar serviço
          </Button>
        </YStack>
      )}
    </ScrollView>
  );
};

export default Page;
