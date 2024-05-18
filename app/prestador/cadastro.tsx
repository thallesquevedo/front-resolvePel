import { Link } from 'expo-router';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, Text, YStack } from 'tamagui';

import ResolvePelLogo from '~/components/resolvePelLogo/resolvePel-logo';

interface IFormInputs {
  name: string;
  cpf: string;
  email: string;
  telefone: string;
  password: string;
  repeatPassword: string;
}

const Cadastro = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
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
                        placeholder="CPF"
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
                {/* <TextField label="CPF" placeholder="Ex: 000.000.000-00" /> */}
                {/* <TextField label="E-mail" placeholder="Ex: joao@email.com" /> */}
                {/* <TextField label="Telefone" placeholder="Ex: (DDD) 9 9999.9999" /> */}
                {/* <TextField label="Senha" placeholder="Informe sua senha" secureTextEntry /> */}
                {/* <TextField label="Repetir senha" placeholder="Repita sua senha" secureTextEntry /> */}
                {/* <Button
                  pressStyle={{ backgroundColor: '#440F69' }}
                  style={{ backgroundColor: '#54187E' }}
                  onPress={() => console.log('login')}>
                  Finalizar cadastro
                </Button> */}
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
