import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, Image, ScrollView, Text, XStack, YStack } from 'tamagui';

import CardOrderService from '~/components/card-order-service/card-order-service';
import Pagination from '~/components/pagination/pagination';
import { useAuth } from '~/context/auth-context';
import { deleteServiceById, fetchReqServiceByUser } from '~/services/user-Client';

const Page = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const deleteService = async (id: number) => {
    try {
      await deleteServiceById(id.toString());
      Toast.show({
        type: 'success',
        text1: 'Serviço deletado com sucesso',
        autoHide: true,
        visibilityTime: 2000,
        position: 'bottom',
        text1Style: { fontSize: 18 },
      });
      setIsOpenDeleteModal(false);
      fetchServices(1);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao deletar serviço',
        text2: 'Tente novamente mais tarde',
        autoHide: true,
        visibilityTime: 2000,
        position: 'bottom',
        text1Style: { fontSize: 18 },
      });
      setIsOpenDeleteModal(false);
      fetchServices(1);
    }
  };

  const fetchServices = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await fetchReqServiceByUser(currentPage);
      setServices(response.data.data);
      setTotalPages(Math.ceil(response.data.count / 5));
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchServices(newPage);
  };

  useEffect(() => {
    const a = navigation.addListener('focus', () => {
      setPage(1);
      fetchServices(1);
    });
    return a;
  }, [navigation, services, page]);

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
      {services.length !== 0 ? (
        <YStack gap={20} marginBottom={45}>
          <Button
            pressStyle={{ backgroundColor: '#440F69' }}
            backgroundColor="#54187E"
            onPress={() => {
              router.push('/(auth)/prestador/(drawer)/criar-servico');
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
                isOpenDeleteModal={isOpenDeleteModal === service?.id}
                setIsOpenDeleteModal={() => setIsOpenDeleteModal(service?.id)}
                onOpenDeleteModal={() => setIsOpenDeleteModal(service?.id)}
                onCloseDeleteModal={() => setIsOpenDeleteModal(false)}
                onDeleteService={() => deleteService(service?.id)}
              />
            ))}
          </YStack>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
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
              router.push('/(auth)/prestador/(drawer)/criar-servico');
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
