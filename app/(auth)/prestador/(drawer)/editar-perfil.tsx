import { yupResolver } from '@hookform/resolvers/yup';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import * as yup from 'yup';

import { useAuth } from '~/context/auth-context';
import { getUserInfos, updateUserInfos } from '~/services/user-Client';

interface IFormInputs {
  name?: string;
  email?: string;
  phone?: string;
}

const formSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email('Email inválido'),
  phone: yup.string().min(11, 'Telefone inválido').max(11, 'Telefone inválido'),
});

const EditarPerfilPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'all', resolver: yupResolver(formSchema) });
  const [isLoading, setIsLoading] = useState(true);
  const { onLogout } = useAuth();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const transformedData = { ...data, phone: '+55' + data.phone };
      await updateUserInfos(transformedData);
      Toast.show({
        type: 'success',
        text1: 'Perfil atualizado com sucesso',
        text2: 'Você será redirecionado para a tela de login',
        visibilityTime: 4500,
        autoHide: true,
        position: 'bottom',
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 14 },
      });
      if (onLogout) {
        setTimeout(onLogout, 5000);
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.mensagem.texto,
        visibilityTime: 5000,
        autoHide: true,
        position: 'bottom',
        text1Style: { fontSize: 14 },
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const userInfos = await getUserInfos();
          const { name, email, phone } = userInfos.data.conteudo;
          setValue('name', name);
          setValue('email', email);
          setValue('phone', phone.slice(3));
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
      return () => {
        fetchData();
        clearErrors();
      };
    }, [])
  );

  if (isLoading) {
    return (
      <XStack flex={1} justifyContent="center">
        <ActivityIndicator size={50} color="#54187E" testID="loading-indicator" />
      </XStack>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <YStack
        backgroundColor="white"
        flex={1}
        justifyContent="space-between"
        marginHorizontal={20}
        marginBottom={20}>
        <ScrollView>
          <YStack>
            <YStack>
              <YStack gap={10} marginBottom={30}>
                <Text fontSize={25} fontWeight="bold">
                  Editar perfil
                </Text>
                <Text fontSize={16} color="#464646">
                  Caso queira alterar algum dado, modifique o campo desejado e clique em "Finalizar
                  edição"
                </Text>
              </YStack>
              <YStack gap={20} marginBottom={30}>
                <YStack gap={5}>
                  <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
                    Nome
                  </Text>

                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Ex: João das Neves"
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
                  {errors.name && <Text color="red">{errors.name.message}</Text>}
                </YStack>

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
                    Telefone
                  </Text>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Ex: (DDD) 9 9999.9999"
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
                  {errors.phone && <Text color="red">{errors.phone.message}</Text>}
                </YStack>

                <Button
                  pressStyle={{ backgroundColor: '#440F69' }}
                  style={{ backgroundColor: '#54187E' }}
                  onPress={handleSubmit(onSubmit)}>
                  Finalizar edição
                </Button>
                <Button
                  onPress={() => router.back()}
                  borderColor="#54187E"
                  pressStyle={{ backgroundColor: '#440F69' }}
                  style={{
                    backgroundColor: 'white',
                    color: '#54187E',
                  }}>
                  Cancelar
                </Button>
              </YStack>
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
};

export default EditarPerfilPage;
