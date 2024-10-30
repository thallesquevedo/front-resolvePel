import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, Image, ScrollView, Text, View, YStack } from 'tamagui';
import * as yup from 'yup';

import { useAuth } from '~/context/auth-context';

interface IFormInputs {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Informe o email'),
  password: yup.string().required('Informe a senha'),
});

const Login = () => {
  const { onLogin } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'all', resolver: yupResolver(loginSchema) });

  const handleSignIn = async (data: IFormInputs) => {
    try {
      await onLogin!(data.email, data.password);
      router.replace('/(auth)');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.mensagem.texto,
        visibilityTime: 5000,
        autoHide: true,
        position: 'bottom',
        text1Style: { fontSize: 18 },
      });
    }
  };

  return (
    <YStack backgroundColor="white" flex={1} justifyContent="space-between">
      <ScrollView>
        <YStack justifyContent="space-between" minHeight="100%">
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
                <YStack gap={5}>
                  <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
                    E-mail
                  </Text>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Ex: joao@email.com"
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                        style={{
                          borderColor: '#ccc',
                          borderWidth: 1,
                          borderRadius: 5,
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          backgroundColor: 'white',
                        }}
                      />
                    )}
                  />
                  {errors.email && <Text color="red">{errors.email.message}</Text>}
                </YStack>
                <YStack gap={5}>
                  <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
                    Senha
                  </Text>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Informe sua senha"
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                        secureTextEntry
                        style={{
                          borderColor: '#ccc',
                          borderWidth: 1,
                          borderRadius: 5,
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          backgroundColor: 'white',
                        }}
                      />
                    )}
                  />
                  {errors.password && <Text color="red">{errors.password.message}</Text>}
                </YStack>
                <Button
                  pressStyle={{ backgroundColor: '#440F69' }}
                  style={{ backgroundColor: '#54187E' }}
                  onPress={handleSubmit(handleSignIn)}>
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
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default Login;
