import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Button, Image, ScrollView, Text, TextArea, XStack, YStack } from 'tamagui';
import * as yup from 'yup';

import StarRatingClient from '~/components/star-rating-client/star-rating-client';
import { addComentsToReqService, addView, fetchClienteOrdemServico } from '~/services/user-Client';

interface ICreateComment {
  comentario: string;
  rating: number;
}

const formCreateCommentSchema = yup.object().shape({
  comentario: yup.string().required('É necessário informar um comentário'),
  rating: yup.number().min(1).max(5).required('É necessário informar uma avaliação'),
});

const ClienteOrdemServicoPage = () => {
  const [ordemServico, setOrdemServico] = useState<any>({});
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateComment>({
    defaultValues: {
      rating: 1,
      comentario: '',
    },
    resolver: yupResolver(formCreateCommentSchema),
  });
  const { id } = useLocalSearchParams();
  const [showPrestadorInfo, setShowPrestadorInfo] = useState(false);
  const [uriImagePath, setUriImagePath] = useState();

  const onOpenWpp = () => {
    const phoneNumber = ordemServico?.user?.phone;
    const message = encodeURIComponent('Olá, gostaria de mais informações.'); // Mensagem pré-definida
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  const onAddView = async () => {
    try {
      await addView(`${id}`);
      setShowPrestadorInfo(true);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Algo deu errado!',
        text2: 'Tente novamente mais tarde',
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  };

  const onSubmit: SubmitHandler<ICreateComment> = async (data) => {
    try {
      await addComentsToReqService({ ...data, reqServicoId: id as string });
      Toast.show({
        type: 'success',
        text1: 'Avaliação realizada com sucesso!',
        autoHide: true,
        visibilityTime: 2000,
      });
      setValue('rating', 1);
      setValue('comentario', '');
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Algo deu errado!',
        text2: 'Tente novamente mais tarde',
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetchClienteOrdemServico(id as string);
          setOrdemServico(response.data);
          const name = selectImage(response.data.servico.name);
          setUriImagePath(name);
        } catch {
          Toast.show({
            type: 'error',
            text1: 'Algo deu errado!',
            text2: 'Tente novamente mais tarde',
            autoHide: true,
            visibilityTime: 2000,
          });
        }
      };
      fetchData();
      return () => fetchData();
    }, [])
  );

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
        {!showPrestadorInfo ? (
          <YStack gap={20}>
            <YStack gap={8}>
              <Text fontSize={18} fontWeight="600">
                Ficou interessado?
              </Text>
              <Text>
                Deseja entrar em contato com o prestador? Selecione para visualizar dados para
                contato.
              </Text>
            </YStack>
            <Button
              onPress={onAddView}
              pressStyle={{ backgroundColor: '#440F69' }}
              style={{ backgroundColor: '#54187E' }}>
              Acessar dados
            </Button>
          </YStack>
        ) : (
          <YStack gap={30}>
            <YStack gap={15}>
              <Text fontSize={18} fontWeight="600">
                Dados do Prestador
              </Text>
              <YStack gap={15}>
                <XStack gap={10} alignItems="center">
                  <Image
                    source={{ uri: require('~/assets/user-icon.png') }}
                    width={24}
                    height={24}
                  />
                  <YStack gap={2}>
                    <Text fontSize={14} color="#848484">
                      Nome do Prestador
                    </Text>
                    <Text fontSize={16} fontWeight="600">
                      {ordemServico?.user?.name}
                    </Text>
                  </YStack>
                </XStack>
                <XStack gap={10} alignItems="center">
                  <Image
                    source={{ uri: require('~/assets/email-icon.png') }}
                    width={24}
                    height={24}
                  />
                  <YStack gap={2}>
                    <Text fontSize={14} color="#848484">
                      E-mail
                    </Text>
                    <Text fontSize={16} fontWeight="600">
                      {ordemServico?.user?.email}
                    </Text>
                  </YStack>
                </XStack>
                <XStack gap={10} alignItems="center">
                  <Image
                    source={{ uri: require('~/assets/phone-icon.png') }}
                    width={24}
                    height={24}
                  />
                  <YStack gap={2}>
                    <Text fontSize={14} color="#848484">
                      Telefone
                    </Text>
                    <Text fontSize={16} fontWeight="600">
                      {ordemServico?.user?.phone}
                    </Text>
                  </YStack>
                </XStack>
              </YStack>
            </YStack>
            <TouchableOpacity onPress={onOpenWpp}>
              <XStack
                paddingHorizontal={20}
                paddingVertical={15}
                alignItems="center"
                borderWidth={1}
                borderColor="rgba(24, 192, 24, 0.5)"
                backgroundColor="rgba(24, 192, 24, 0.2)"
                gap={15}>
                <Image
                  source={{ uri: require('~/assets/whatsapp-icon.png') }}
                  width={32}
                  height={32}
                />
                <YStack gap={5} width="90%">
                  <Text color="rgb(24, 192, 25)">Entre em contato via WhatsApp</Text>
                  <Text wordWrap="break-word">
                    Clique e seja redirecionado para o WhatsApp do Prestador
                  </Text>
                </YStack>
              </XStack>
            </TouchableOpacity>
          </YStack>
        )}
        <YStack>
          <Text fontWeight="bold" fontSize={16} marginBottom={5}>
            Já contratou este serviço? Avalie aqui
          </Text>
          <YStack marginBottom={10}>
            <Controller
              control={control}
              name="rating"
              render={({ field: { onChange, value } }) => (
                <StarRatingClient rating={value} setRating={onChange} />
              )}
            />
            {errors.rating && <Text color="red">{errors.rating.message}</Text>}
          </YStack>

          <YStack marginBottom={10}>
            <Controller
              control={control}
              name="comentario"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextArea
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  backgroundColor="#F5F5F5"
                  borderColor="#C5C5C5"
                  color="black"
                  paddingHorizontal={16}
                  paddingVertical={0}
                  height={88}
                  alignContent="flex-start"
                  placeholder="Deixe aqui seu comentário"
                />
              )}
            />
            {errors.comentario && <Text color="red">{errors.comentario.message}</Text>}
          </YStack>
          <Button onPress={handleSubmit(onSubmit)} style={{ backgroundColor: '#54187E' }}>
            Avaliar
          </Button>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default ClienteOrdemServicoPage;
