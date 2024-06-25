import { router } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';
import { Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Text, View, XStack, YStack } from 'tamagui';

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
  setIsModalVisible?: Dispatch<SetStateAction<boolean>>;
  isModalVisible?: boolean;
}

const CardOrderService = ({
  id,
  descricao,
  items,
  servico,
  setIsModalVisible,
  isModalVisible,
}: ICardService) => {
  return (
    <YStack height={377} borderColor="#6D6D6D" borderWidth={1} borderRadius={14} overflow="hidden">
      <XStack zIndex={1} position="absolute" top={15} right={15} gap={10}>
        <TouchableOpacity onPress={() => router.push('/prestador/(drawer)/editar-servico')}>
          <View backgroundColor="#1E1E1E" padding={7} borderRadius="$12">
            <EditIcon size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View backgroundColor="#FB2F54" padding={7} borderRadius="$12">
            <DeleteIcon size={16} />
          </View>
        </TouchableOpacity>
      </XStack>
      <Image source={{ uri: require('~/assets/instalacao.png') }} width="100%" height={214} />
      <YStack padding={15} gap={11} flex={1} justifyContent="space-between">
        <YStack gap={11}>
          <Text fontWeight="500" fontSize={16}>
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
          backgroundColor="#54187E">
          <Text color="white">{servico?.name}</Text>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default CardOrderService;
