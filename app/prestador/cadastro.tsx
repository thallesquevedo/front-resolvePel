import { Link, router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, ScrollView, Text, YStack } from 'tamagui';

import ResolvePelLogo from '~/components/resolvePelLogo/resolvePel-logo';
import TextField from '~/components/text-field/text-field';

const Cadastro = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <YStack backgroundColor="white" flex={1} justifyContent="space-between" marginHorizontal={20}>
        <ScrollView>
          <YStack marginTop={40} marginBottom={20}>
            <ResolvePelLogo height={37} width={197} />
          </YStack>
          <YStack>
            <YStack>
              <YStack gap={10} marginBottom={30}>
                <Text fontSize={25} fontWeight="bold">
                  Criar conta
                </Text>
                <Text fontSize={16} color="#464646" width={210}>
                  Informe os dados solicitados para criar a sua conta
                </Text>
              </YStack>
              <YStack gap={20} marginBottom={30}>
                <TextField label="Nome completo" placeholder="Ex: João das Neves" />
                <TextField label="CPF" placeholder="Ex: 000.000.000-00" />
                <TextField label="E-mail" placeholder="Ex: joao@email.com" />
                <TextField label="Telefone" placeholder="Ex: (DDD) 9 9999.9999" />
                <TextField label="Senha" placeholder="Informe sua senha" secureTextEntry />
                <TextField label="Repetir senha" placeholder="Repita sua senha" secureTextEntry />
                <Button
                  pressStyle={{ backgroundColor: '#440F69' }}
                  style={{ backgroundColor: '#54187E' }}
                  onPress={() => console.log('login')}>
                  Finalizar cadastro
                </Button>
              </YStack>
            </YStack>
          </YStack>
          <YStack gap={20}>
            <Text fontSize={16} textAlign="center" color="#464646">
              Não possui conta?{' '}
              <Link
                style={{ color: '#54187E', textDecorationLine: 'underline', fontWeight: '600' }}
                href="/prestador/login">
                Clique aqui
              </Link>
            </Text>
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
};

export default Cadastro;
