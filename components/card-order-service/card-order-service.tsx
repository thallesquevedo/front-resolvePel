import { router } from 'expo-router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Button, Image, Text, View, XStack, YStack } from 'tamagui';

import DeleteIcon from '../delete-Icon/delete-icon';
import EditIcon from '../edit-icon/edit-icon';

interface ICardService {
  id: number;
  descricao: string;
  items: any[];
  servico: {
    name: string;
    id: number;
    created_at: Date;
  };
  isOpenDeleteModal: boolean;
  onOpenDeleteModal: () => void;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  onCloseDeleteModal: () => void;
  onDeleteService: () => void;
}

const CardOrderService = ({
  id,
  descricao,
  items,
  servico,
  setIsOpenDeleteModal,
  isOpenDeleteModal,
  onOpenDeleteModal,
  onCloseDeleteModal,
  onDeleteService,
}: ICardService) => {
  const [uriImagePath, setUriImagePath] = useState();

  useEffect(() => {
    const name = selectImage(servico?.name);
    setUriImagePath(name);
  }, []);

  const imageMap: { [key: string]: any } = {
    'Instalação/Desinstalação': require('~/assets/servico-instalacao.png'),
    'Montagem/Desmontagem': require('~/assets/servico-montagem.png'),
    'Reparos/Pinturas': require('~/assets/servico-reparos.png'),
    'Serviços Gerais': require('~/assets/servico-geral.png'),
    'Serviços de encanamento': require('~/assets/instalacao.png'),
    'Serviçoes de elétrica': require('~/assets/servico-eletrico.png'),
  };

  const selectImage = (serviceName: string) => {
    return imageMap[serviceName];
  };

  return (
    <YStack height={377} borderColor="#6D6D6D" borderWidth={1} borderRadius={14} overflow="hidden">
      <XStack zIndex={1} position="absolute" top={15} right={15} gap={10}>
        <TouchableOpacity
          onPress={() => router.push(`/prestador/(drawer)/editar-servico/${id}`)}
          testID="navigate-to-edit-service">
          <View backgroundColor="#1E1E1E" padding={7} borderRadius="$12">
            <EditIcon size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsOpenDeleteModal(true);
          }}
          testID={`delete-button-${id}`}>
          <View backgroundColor="#FB2F54" padding={7} borderRadius="$12">
            <DeleteIcon size={16} />
          </View>
        </TouchableOpacity>
      </XStack>
      <Image source={{ uri: uriImagePath }} width="100%" height={214} />
      <YStack padding={15} gap={11} flex={1} justifyContent="space-between">
        <YStack gap={11}>
          <Text fontWeight="500" fontSize={16} testID="service-name-title">
            {servico?.name}
          </Text>
          <Text fontSize={14} color="#6D6D6D">
            {descricao}
          </Text>
        </YStack>
        <XStack
          justifyContent="center"
          width={230}
          paddingHorizontal={24}
          paddingVertical={4}
          backgroundColor="#54187E"
          borderRadius={4}>
          <Text color="white" testID="service-name-tag">
            {servico?.name}
          </Text>
        </XStack>
      </YStack>
      <View>
        <Modal isVisible={isOpenDeleteModal} onBackdropPress={onCloseDeleteModal}>
          <YStack
            gap={15}
            alignItems="center"
            backgroundColor="white"
            padding={20}
            borderRadius={10}
            borderWidth={3}
            borderColor="#C5C5C5">
            <XStack
              backgroundColor="#54187E"
              width={66}
              height={66}
              justifyContent="center"
              alignItems="center"
              borderRadius={40}>
              <DeleteIcon size={35} />
            </XStack>
            <Text fontSize={17} color="#464646" textAlign="center" fontWeight="600">
              Deseja excluir serviço definitivamente?
            </Text>
            <Text fontSize={14} color="#464646" textAlign="center">
              Deseja excluir definitamente este serviço? A exclusão não pode ser desfeita.
            </Text>
            <Button
              pressStyle={{ backgroundColor: '#440F69' }}
              style={{ backgroundColor: '#54187E' }}
              borderRadius={20}
              width={150}
              onPress={onDeleteService}>
              Excluir serviço
            </Button>
          </YStack>
        </Modal>
      </View>
    </YStack>
  );
};

export default CardOrderService;
