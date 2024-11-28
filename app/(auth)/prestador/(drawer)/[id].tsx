import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { Image, ScrollView, Text, XStack, YStack } from 'tamagui';

import StarRatingPrestador from '~/components/star-rating-prestador/star-rating-prestador';
import { fetchUniqueReqServiceByUser } from '~/services/user-Client';

const PageId = () => {
  const id = useLocalSearchParams().id;
  const [ordemServico, setOrdemServico] = useState<any>({});
  const [uriImagePath, setUriImagePath] = useState();
  const [comentarios, setComentarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rating =
    comentarios.length === 0
      ? 0
      : comentarios.reduce((acc, curr) => acc + curr.rating, 0) / comentarios.length;

  const imageMap: { [key: string]: any } = {
    'Instalação/Desinstalação': require('~/assets/servico-instalacao.png'),
    'Montagem/Desmontagem': require('~/assets/servico-montagem.png'),
    'Reparos/Pinturas': require('~/assets/servico-reparos.png'),
    'Serviços Gerais': require('~/assets/servico-geral.png'),
    'Serviços de encanamento': require('~/assets/instalacao.png'),
    'Serviçoes de elétrica': require('~/assets/servico-eletrico.png'),
  };

  const selectImage = (serviceName: string) => {
    return imageMap[serviceName] || require('~/assets/servico-geral.png');
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetchUniqueReqServiceByUser(id as string);
          setOrdemServico(response.data);
          const name = selectImage(response.data.servico.name);
          setUriImagePath(name);
          setComentarios(response.data.comentarios);
        } catch {
          Toast.show({
            type: 'error',
            text1: 'Algo deu errado!',
            text2: 'Tente novamente mais tarde',
            autoHide: true,
            visibilityTime: 2000,
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
      return () => fetchData();
    }, [id])
  );

  if (isLoading) {
    return (
      <XStack flex={1} justifyContent="center" backgroundColor="white">
        <ActivityIndicator testID="loading-indicator" size={50} color="#54187E" />
      </XStack>
    );
  }

  return (
    <ScrollView>
      <Image source={{ uri: uriImagePath }} width="100%" height={214} />
      <YStack padding={20} gap={20}>
        <YStack gap={8}>
          <Text fontWeight="600" fontSize={18}>
            {ordemServico?.servico?.name}
          </Text>
          <Text fontSize={14} color="#6D6D6D">
            {ordemServico?.descricao}
          </Text>
          <XStack
            justifyContent="center"
            width={230}
            paddingHorizontal={24}
            paddingVertical={4}
            backgroundColor="#54187E"
            borderRadius={4}>
            <Text color="white">{ordemServico?.servico?.name}</Text>
          </XStack>
        </YStack>
        <YStack>
          <Text fontSize={16} fontWeight="bold" marginBottom={10}>
            Avaliações recebidas nesse serviço
          </Text>
          <StarRatingPrestador rating={rating} />
        </YStack>
        {comentarios.length !== 0 ? (
          <YStack>
            <Text fontWeight="bold" fontSize={16}>
              Feedback dos seus clientes
            </Text>
            {comentarios.map((comentario: any) => (
              <YStack key={comentario.id} gap={10}>
                <Text fontSize={14} color="#464646">
                  {comentario.user.name} disse
                </Text>
                <YStack
                  height={88}
                  paddingHorizontal={20}
                  paddingVertical={10}
                  borderRadius={8}
                  borderColor="#797979"
                  borderWidth={1}>
                  <Text fontSize={14} color="#464646">
                    {comentario.comentario}
                  </Text>
                </YStack>
              </YStack>
            ))}
          </YStack>
        ) : (
          <Text fontSize={14} color="#6D6D6D">
            Ainda não há avaliações para esse serviço
          </Text>
        )}
      </YStack>
    </ScrollView>
  );
};

export default PageId;
