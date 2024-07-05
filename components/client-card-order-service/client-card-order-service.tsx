import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Image, Text, XStack, YStack } from 'tamagui';

interface ICardService {
  id: number;
  descricao: string;
  items: any[];
  servico: {
    name: string;
    id: number;
    created_at: Date;
  };
}

const CardOrderService = ({ id, descricao, items, servico }: ICardService) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/cliente/${id}`)}
      testID="navigate-to-prestador-info">
      <YStack
        height={377}
        borderColor="#6D6D6D"
        borderWidth={1}
        borderRadius={14}
        overflow="hidden">
        <Image source={{ uri: require('~/assets/instalacao.png') }} width="100%" height={214} />
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
      </YStack>
    </TouchableOpacity>
  );
};

export default CardOrderService;
