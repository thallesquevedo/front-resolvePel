import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import { Image, ScrollView, Text, XStack, YStack } from 'tamagui';

import CheckedIcon from '~/components/checkedIcon/checked-icon';
import CardOrderService from '~/components/client-card-order-service/client-card-order-service';
import Pagination from '~/components/pagination/pagination';
import SearchIcon from '~/components/search-icon/search-icon';
import { fetchAllOrdemServico, fetchServices } from '~/services/user-Client';

const ClienteHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigation();
  const [servicosListaApi, setServicosListaApi] = useState<any[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<any>('Todos');

  useEffect(() => {
    const a = navigation.addListener('focus', () => {
      setPage(1);
      fetchContent(1, servicoSelecionado);
    });
    return a;
  }, [navigation, services, page, servicoSelecionado]);

  const fetchContent = async (currentPage: number, selectedService?: string) => {
    try {
      setIsLoading(true);
      const response = await fetchAllOrdemServico(currentPage, selectedService);
      const getServicos = await fetchServices();
      setServicosListaApi([{ name: 'Todos' }, ...getServicos.data]);
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
      // router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchContent(newPage);
  };

  if (isLoading) {
    return (
      <XStack flex={1} justifyContent="center" backgroundColor="white">
        <ActivityIndicator testID="loading-indicator" size={50} color="#54187E" />
      </XStack>
    );
  }

  return (
    <ScrollView paddingVertical={30} paddingHorizontal={20} backgroundColor="white">
      <YStack marginBottom={15}>
        <Dropdown
          data={servicosListaApi}
          placeholder="Pesquise por serviço"
          style={{
            borderWidth: 1,
            borderColor: '#C5C5C5',
            borderRadius: 5,
            height: 44,
            paddingHorizontal: 12,
          }}
          containerStyle={{
            maxHeight: 300,
            borderWidth: 1,
            borderColor: '#C5C5C5',
            borderRadius: 5,
          }}
          labelField="name"
          valueField="name"
          value={servicoSelecionado}
          onChange={(value) => {
            setServicoSelecionado(value.name);
            fetchContent(1, value.name);
          }}
          renderLeftIcon={() => <SearchIcon size={20} />}
          renderItem={(item) => {
            return (
              <XStack justifyContent="space-between" paddingHorizontal={10} paddingVertical={10}>
                <Text fontSize={16}>{item.name}</Text>
                {item.name === servicoSelecionado && <CheckedIcon />}
              </XStack>
            );
          }}
        />
      </YStack>
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
            <Text color="#464646" fontSize={16} width={212} textAlign="center">
              Entre na área de prestadores e cadastre um serviço para poder visualizar aqui
            </Text>
          </YStack>
        </YStack>
      )}
    </ScrollView>
  );
};

export default ClienteHome;
