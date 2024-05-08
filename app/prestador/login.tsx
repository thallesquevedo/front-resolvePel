import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Image, ScrollView, Text, View, YStack } from 'tamagui';

import TextField from '~/components/text-field/text-field';
import { useAuth } from '~/context/auth-context';

const Login = () => {
  const { authState } = useAuth();
  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  return (
    <YStack backgroundColor="white" flex={1} justifyContent="space-between">
      <ScrollView>
        <YStack>
          <View
            backgroundColor="#54187E"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginBottom={40}>
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
          <YStack marginHorizontal={20}>
            <YStack gap={10} marginBottom={30}>
              <Text fontSize={25} fontWeight="bold">
                Faça Login
              </Text>
              <Text fontSize={16} color="#464646" width={210}>
                Informe seu e-mail e senha para acessar sua conta
              </Text>
            </YStack>
            <YStack gap={20}>
              <TextField label="E-mail" placeholder="Ex: joao@email.com" />
              <TextField label="Senha" placeholder="Informe sua senha" secureTextEntry />
              <Button
                pressStyle={{ backgroundColor: '#440F69' }}
                style={{ backgroundColor: '#54187E' }}
                onPress={() => router.navigate('./id')}>
                Entrar
              </Button>
            </YStack>
          </YStack>
        </YStack>
        <YStack marginHorizontal={20} marginBottom={30} gap={20}>
          <Text fontSize={14} textAlign="center" color="#464646">
            Não possui conta? Crie agora
          </Text>
          <Button
            pressStyle={{ backgroundColor: '#440F69' }}
            style={{ backgroundColor: '#54187E' }}
            onPress={() => router.navigate('./cadastro')}>
            Criar conta
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default Login;
