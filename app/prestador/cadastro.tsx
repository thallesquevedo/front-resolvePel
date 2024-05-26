import { yupResolver } from '@hookform/resolvers/yup';
import { Link, router } from 'expo-router';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, Text, YStack } from 'tamagui';
import * as yup from 'yup';

import ResolvePelLogo from '~/components/resolvePelLogo/resolvePel-logo';
import { useAuth } from '~/context/auth-context';

interface IFormInputs {
  name: string;
  cpf: string;
  email: string;
  telefone: string;
  password: string;
  repeatPassword: string;
}

const formSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().min(11, 'CPF Inválido').max(11, 'CPF Inválido').required('CPF é obrigatório'),
  email: yup.string().email().required('Email é obrigatório'),
  telefone: yup.string().min(11, 'Telefone inválido').required('Telefone é obrigatório'),
  password: yup
    .string()
    .min(8, 'Sua senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatório'),
  repeatPassword: yup
    .string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('password', undefined)], 'Senhas não conferem'),
});

const Cadastro = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'all', resolver: yupResolver(formSchema) });
  const { onRegister } = useAuth();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      console.log(data);
      await onRegister!(data.name, data.email, data.password, data.cpf, data.telefone);
      router.push('./login');
    } catch (error: any) {
      if (error.response.status === 400) {
        const { texto } = error.response.data.mensagem;
        console.log(texto);
        const errorField = error.texto?.includes('Email') ? 'email' : 'cpf';
        console.log(errorField);
        setError(errorField, texto);
        return;
      }
      throw new Error(error);
    }
  };

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
                <YStack gap={5}>
                  <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
                    Nome completo
                  </Text>

                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: 'Campo obrigatório' }}
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
                    CPF
                  </Text>
                  <Controller
                    control={control}
                    name="cpf"
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Ex: 000.000.000-00"
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
                  {errors.cpf && <Text color="red">{errors.cpf.message}</Text>}
                </YStack>

                <YStack gap={5}>
                  <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
                    E-mail
                  </Text>
                  <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'Campo obrigatório' }}
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
                </YStack>
                <YStack gap={5}>
                  <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
                    Telefone
                  </Text>
                  <Controller
                    control={control}
                    name="telefone"
                    rules={{ required: 'Campo obrigatório' }}
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
                  {errors.telefone && <Text color="red">{errors.telefone.message}</Text>}
                </YStack>
                <YStack gap={5}>
                  <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
                    Senha
                  </Text>
                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Informe sua senha"
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
                  {errors.password && <Text color="red">{errors.password.message}</Text>}
                </YStack>
                <YStack gap={5}>
                  <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
                    Repetir Senha
                  </Text>
                  <Controller
                    control={control}
                    name="repeatPassword"
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        placeholder="Repita sua senha"
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
                  {errors.repeatPassword && (
                    <Text color="red">{errors.repeatPassword.message}</Text>
                  )}
                </YStack>
                <Button
                  pressStyle={{ backgroundColor: '#440F69' }}
                  style={{ backgroundColor: '#54187E' }}
                  onPress={handleSubmit(onSubmit)}>
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
