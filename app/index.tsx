import { router } from 'expo-router';
import { Button, Image, Text, View, YStack } from 'tamagui';

export default function Home() {
  return (
    <YStack backgroundColor="white" flex={1}>
      <View
        backgroundColor="#54187E"
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={60}>
        <Image
          source={{ uri: require('~/assets/resolvePelBackgroundImg.jpg') }}
          width="100%"
          height={250}
          opacity={0.1}
        />
        <Image
          source={{ uri: require('~/assets/resolvePelLogoEntry.png') }}
          width={257}
          height={48}
          position="absolute"
        />
      </View>
      <YStack gap={40} marginHorizontal={20}>
        <YStack gap={10} alignItems="center" marginHorizontal={20}>
          <Text fontSize={25} fontWeight="bold">
            Como deseja acessar?
          </Text>
          <Text textAlign="center" width={270} fontSize={16} color="#464646">
            Selecione a forma que você deseja entrar no aplicativo
          </Text>
        </YStack>
        <YStack gap={20}>
          <Button
            pressStyle={{ backgroundColor: '#440F69' }}
            style={{ backgroundColor: '#54187E' }}
            onPress={() => router.navigate('./cliente/cadastro')}>
            Entrar como Cliente
          </Button>
          <Button
            pressStyle={{ backgroundColor: '#1da81d', borderColor: '#1da81d' }}
            style={{ backgroundColor: '#18C019' }}
            onPress={() => router.navigate('./prestador/login')}>
            Entrar como Prestador
          </Button>
        </YStack>
      </YStack>
    </YStack>
  );
}
