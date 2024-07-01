import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Image, ScrollView, Text, View, XStack, YStack } from 'tamagui';

import { fetchClienteOrdemServico } from '~/services/user-Client';

const ClienteOrdemServicoPage = () => {
  const { id } = useLocalSearchParams();
  const [ordemServico, setOrdemServico] = useState<any>({});
  const [isTrue, setIsTrue] = useState(true);

  const onOpenWpp = () => {
    const phoneNumber = '53981236697'; // Substitua pelo número de telefone
    const message = encodeURIComponent('Olá, gostaria de mais informações.'); // Mensagem pré-definida
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetchClienteOrdemServico(id as string);
          setOrdemServico(response.data);
          console.log(ordemServico);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      return () => fetchData();
    }, [])
  );

  return (
    <ScrollView>
      <Image source={{ uri: require('~/assets/instalacao.png') }} width="100%" height={214} />
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
        {isTrue ? (
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
              onPress={() => setIsTrue(false)}
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
      </YStack>
    </ScrollView>
  );
};

export default ClienteOrdemServicoPage;
