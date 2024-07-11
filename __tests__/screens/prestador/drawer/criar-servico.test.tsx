import { yupResolver } from '@hookform/resolvers/yup';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { useFocusEffect, router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import { Button, ScrollView, TamaguiProvider, Text, TextArea, XStack, YStack } from 'tamagui';
import * as yup from 'yup';

import CheckedIcon from '~/components/checkedIcon/checked-icon';
import { AuthProvider } from '~/context/auth-context';
import { createReqService, fetchItems, fetchServices } from '~/services/user-Client';
import config from '~/tamagui.config';

jest.mock('expo-router', () => ({
  useFocusEffect: jest.fn((cb) => cb()),
  router: { back: jest.fn(), push: jest.fn() },
}));
jest.mock('react-native-toast-message', () => ({ show: jest.fn() }));
jest.mock('~/services/user-Client', () => ({
  createReqService: jest.fn(),
  fetchItems: jest.fn(),
  fetchServices: jest.fn(),
}));

interface ICreateServiceInputs {
  servicoId: string;
  itemIds: number[];
  descricao: string;
}

const TestComponent = () => {
  const [openItemDropdown, setOpenItemDropdown] = useState(false);
  const [itemsLista, setItemsLista] = useState<any[]>([]);
  const [itemsSelecionados, setItemsSelecionados] = useState([]);

  const [openServicoDropdown, setOpenServicoDropdown] = useState(false);
  const [servicosLista, setServicosLista] = useState<any[]>([]);
  const [valueServicoSelecionado, setValueServicoSelecionado] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ICreateServiceInputs>({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        servicoId: yup.string().required('É necessário informar a atividade'),
        itemIds: yup
          .array()
          .min(1, 'Selecione pelo menos um item')
          .required('É necessário selecionar pelo menos um item'),
        descricao: yup.string().required('É necessário informar uma descrição'),
      })
    ),
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setItemsSelecionados([]);
          setValueServicoSelecionado(null);
          setValue('descricao', '');
          const items = await fetchItems();
          const services = await fetchServices();
          setItemsLista(items.data);
          setServicosLista(services.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
      return () => fetchData();
    }, [setValue])
  );

  const onSubmit: SubmitHandler<ICreateServiceInputs> = async (data) => {
    const transformData = {
      servicoId: Number(data.servicoId),
      itemIds: data.itemIds,
      descricao: data.descricao,
    };
    try {
      await createReqService(transformData);
      setTimeout(() => {
        router.push('/prestador/(drawer)/home');
      }, 3000);
      Toast.show({
        type: 'success',
        text1: 'Serviço criado com sucesso',
        text2: 'Seu serviço foi criado com sucesso',
        visibilityTime: 3000,
        autoHide: true,
        position: 'bottom',
        text1Style: { fontSize: 18 },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onServicoOpen = useCallback(() => {
    setOpenItemDropdown(false);
  }, []);

  const onItemOpen = useCallback(() => {
    setOpenServicoDropdown(false);
  }, []);

  if (isLoading) {
    return (
      <XStack flex={1} justifyContent="center">
        <ActivityIndicator size={50} color="#54187E" />
      </XStack>
    );
  }

  return (
    <ScrollView paddingHorizontal={20} paddingVertical={30} backgroundColor="white">
      <YStack justifyContent="space-between">
        <YStack>
          <YStack marginBottom={17}>
            <Text fontWeight="bold" fontSize={25}>
              Criar serviço
            </Text>
          </YStack>
          <YStack gap={10}>
            <YStack>
              <Text fontWeight="bold" fontSize={14}>
                Atividade realizada
              </Text>
            </YStack>
            <Controller
              control={control}
              name="servicoId"
              render={({ field: { onChange, value, onBlur } }) => (
                <DropDownPicker
                  schema={{ label: 'name', value: 'id' }}
                  open={openServicoDropdown}
                  value={valueServicoSelecionado}
                  items={servicosLista}
                  setOpen={(isOpen) => {
                    setOpenServicoDropdown(isOpen);
                    if (!isOpen) onBlur();
                  }}
                  setValue={setValueServicoSelecionado}
                  setItems={setServicosLista}
                  mode="BADGE"
                  listMode="SCROLLVIEW"
                  multiple={false}
                  showBadgeDot={false}
                  placeholder="Selecione uma ou mais atividades"
                  TickIconComponent={() => <CheckedIcon />}
                  style={{ borderColor: '#C5C5C5' }}
                  dropDownContainerStyle={{ borderTopWidth: 0, borderColor: '#C5C5C5' }}
                  selectedItemContainerStyle={{
                    backgroundColor: 'rgba(84, 24, 126, 0.1)',
                    marginVertical: 3,
                    height: 25,
                  }}
                  zIndex={9999}
                  onChangeValue={(value) => onChange(value)}
                  onOpen={onServicoOpen}
                />
              )}
            />
            {errors.servicoId && <Text color="red">{errors.servicoId.message}</Text>}
          </YStack>
          <YStack gap={10}>
            <YStack>
              <Text fontWeight="bold" fontSize={14}>
                Atividade realizada em quais itens?
              </Text>
              <Text fontSize={14}>Podem ser selecionados mais de um item</Text>
            </YStack>
            <Controller
              control={control}
              name="itemIds"
              render={({ field: { onChange, value, onBlur } }) => (
                <DropDownPicker
                  schema={{ label: 'name', value: 'id' }}
                  open={openItemDropdown}
                  value={itemsSelecionados}
                  items={itemsLista}
                  setOpen={(isOpen) => {
                    setOpenItemDropdown(isOpen);
                    if (!isOpen) onBlur();
                  }}
                  setValue={setItemsSelecionados}
                  setItems={setItemsLista}
                  multiple
                  listMode="SCROLLVIEW"
                  mode="BADGE"
                  showBadgeDot={false}
                  badgeColors={['rgba(84, 24, 126, 0.1)']}
                  placeholder="Selecione uma ou mais atividades"
                  TickIconComponent={() => <CheckedIcon />}
                  style={{ borderColor: '#C5C5C5' }}
                  dropDownContainerStyle={{ borderTopWidth: 0, borderColor: '#C5C5C5' }}
                  selectedItemContainerStyle={{
                    backgroundColor: 'rgba(84, 24, 126, 0.1)',
                    marginVertical: 3,
                    height: 25,
                  }}
                  zIndex={5555}
                  onChangeValue={(value) => onChange(value)}
                  onOpen={onItemOpen}
                />
              )}
            />
            {errors.itemIds && <Text color="red">{errors.itemIds.message}</Text>}
          </YStack>
          <YStack gap={20} marginBottom={10}>
            <YStack gap={10}>
              <YStack gap={10}>
                <Text fontWeight="bold" fontSize={18}>
                  Descreva seu serviço
                </Text>
                <Text fontSize={14}>
                  Escreva uma breve descrição sobre o serviço. A descrição ajudará o cliente com a
                  escolha pelo serviço.
                </Text>
              </YStack>
              <Controller
                control={control}
                name="descricao"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextArea
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    backgroundColor="white"
                    borderColor="#C5C5C5"
                    color="black"
                    paddingHorizontal={16}
                    paddingVertical={0}
                    height={190}
                    alignContent="flex-start"
                    placeholder="Ex: Instalação de Ar Condicionado em Apartamentos e casas do tipo Split."
                  />
                )}
              />
              {errors.descricao && <Text color="red">{errors.descricao.message}</Text>}
            </YStack>
          </YStack>
        </YStack>
        <YStack gap={10}>
          <Button
            pressStyle={{ backgroundColor: '#440F69' }}
            style={{ backgroundColor: '#54187E' }}
            onPress={handleSubmit(onSubmit)}>
            Finalizar cadastro
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
    </ScrollView>
  );
};

describe('CriarServicoPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator while fetching data', async () => {
    fetchItems.mockResolvedValueOnce({ data: [] });
    fetchServices.mockResolvedValueOnce({ data: [] });

    const { getByTestId } = render(
      <AuthProvider>
        <TamaguiProvider config={config}>
          <TestComponent />
        </TamaguiProvider>
      </AuthProvider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  // it('loads and displays data from API', async () => {
  //   const itemsData = [{ id: 1, name: 'Item 1' }];
  //   const servicesData = [{ id: 1, name: 'Service 1' }];

  //   fetchItems.mockResolvedValueOnce({ data: itemsData });
  //   fetchServices.mockResolvedValueOnce({ data: servicesData });

  //   const { getByText } = render(
  //     <AuthProvider>
  //       <TamaguiProvider config={config}>
  //         <TestComponent />
  //       </TamaguiProvider>
  //     </AuthProvider>
  //   );

  //   await waitFor(() => {
  //     expect(getByText('Item 1')).toBeTruthy();
  //     expect(getByText('Service 1')).toBeTruthy();
  //   });
  // });

  // it('submits the form successfully', async () => {
  //   const itemsData = [{ id: 1, name: 'Item 1' }];
  //   const servicesData = [{ id: 1, name: 'Service 1' }];
  //   const formData = { servicoId: '1', itemIds: [1], descricao: 'Test Description' };

  //   fetchItems.mockResolvedValueOnce({ data: itemsData });
  //   fetchServices.mockResolvedValueOnce({ data: servicesData });
  //   createReqService.mockResolvedValueOnce({});

  //   const { getByText, getByPlaceholderText } = render(
  //     <AuthProvider>
  //       <TamaguiProvider config={config}>
  //         <TestComponent />
  //       </TamaguiProvider>
  //     </AuthProvider>
  //   );

  //   await waitFor(() => {
  //     expect(getByText('Item 1')).toBeTruthy();
  //     expect(getByText('Service 1')).toBeTruthy();
  //   });

  //   await act(async () => {
  //     fireEvent.changeText(getByPlaceholderText(/descrição/i), formData.descricao);
  //     fireEvent.press(getByText('Finalizar cadastro'));
  //   });

  //   await waitFor(() => {
  //     expect(createReqService).toHaveBeenCalledWith({
  //       servicoId: Number(formData.servicoId),
  //       itemIds: formData.itemIds,
  //       descricao: formData.descricao,
  //     });
  //     expect(Toast.show).toHaveBeenCalledWith({
  //       type: 'success',
  //       text1: 'Serviço criado com sucesso',
  //       text2: 'Seu serviço foi criado com sucesso',
  //       visibilityTime: 3000,
  //       autoHide: true,
  //       position: 'bottom',
  //       text1Style: { fontSize: 18 },
  //     });
  //     expect(router.push).toHaveBeenCalledWith('/prestador/(drawer)/home');
  //   });
  // });

  // it('handles form submission errors', async () => {
  //   const itemsData = [{ id: 1, name: 'Item 1' }];
  //   const servicesData = [{ id: 1, name: 'Service 1' }];
  //   const formData = { servicoId: '1', itemIds: [1], descricao: 'Test Description' };

  //   fetchItems.mockResolvedValueOnce({ data: itemsData });
  //   fetchServices.mockResolvedValueOnce({ data: servicesData });
  //   createReqService.mockRejectedValueOnce(new Error('Error creating service'));

  //   const { getByText, getByPlaceholderText } = render(
  //     <AuthProvider>
  //       <TamaguiProvider config={config}>
  //         <TestComponent />
  //       </TamaguiProvider>
  //     </AuthProvider>
  //   );

  //   await waitFor(() => {
  //     expect(getByText('Item 1')).toBeTruthy();
  //     expect(getByText('Service 1')).toBeTruthy();
  //   });

  //   await act(async () => {
  //     fireEvent.changeText(getByPlaceholderText(/descrição/i), formData.descricao);
  //     fireEvent.press(getByText('Finalizar cadastro'));
  //   });

  //   await waitFor(() => {
  //     expect(createReqService).toHaveBeenCalledWith({
  //       servicoId: Number(formData.servicoId),
  //       itemIds: formData.itemIds,
  //       descricao: formData.descricao,
  //     });
  //     expect(Toast.show).not.toHaveBeenCalled();
  //     expect(router.push).not.toHaveBeenCalled();
  //   });
  // });

  // it('navigates back on cancel button press', async () => {
  //   fetchItems.mockResolvedValueOnce({ data: [] });
  //   fetchServices.mockResolvedValueOnce({ data: [] });

  //   const { getByText } = render(
  //     <AuthProvider>
  //       <TamaguiProvider config={config}>
  //         <TestComponent />
  //       </TamaguiProvider>
  //     </AuthProvider>
  //   );

  //   await waitFor(() => {
  //     fireEvent.press(getByText('Cancelar'));
  //   });

  //   expect(router.back).toHaveBeenCalled();
  // });
});
