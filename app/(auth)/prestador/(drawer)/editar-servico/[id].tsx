import { yupResolver } from '@hookform/resolvers/yup';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import { Button, ScrollView, Text, TextArea, XStack, YStack } from 'tamagui';
import * as yup from 'yup';

import CheckedIcon from '~/components/checkedIcon/checked-icon';
import {
  fetchItems,
  fetchServices,
  fetchUniqueReqServiceByUser,
  updateReqService,
} from '~/services/user-Client';
interface IUpdateServiceInputs {
  servicoId: string;
  itemIds: number[];
  descricao: string;
}

const formCreateServiceSchema = yup.object().shape({
  servicoId: yup.string().required('É necessário informar a atividade'),
  itemIds: yup
    .array()
    .min(1, 'Selecione pelo menos um item')
    .required('É necessário selecionar pelo menos um item'),
  descricao: yup.string().required('É necessário informar uma descrição'),
});

const AtualizarServicoPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<IUpdateServiceInputs>({
    mode: 'onBlur',
    resolver: yupResolver(formCreateServiceSchema),
  });
  const [itemsLista, setItemsLista] = useState<any[]>([]); // lista de itens do back
  const [itemsSelecionados, setItemsSelecionados] = useState<string[]>([]); // valor do dropdown do item

  const [servicosLista, setServicosLista] = useState<any[]>([]); // lista de serviços do back
  const [valueServicoSelecionado, setValueServicoSelecionado] = useState(''); // valor do dropdown do servico

  const [loading, setLoading] = useState(true); // estado de carregamento
  const { id } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const items = await fetchItems();
          const services = await fetchServices();
          const ordemServico = await fetchUniqueReqServiceByUser(id as string);
          const {
            items: itemsFromOrdemServico,
            servico: servicosFromOrdemServico,
            descricao: descricaoFromOrdemServico,
          } = ordemServico.data;

          setItemsLista(items.data);
          setServicosLista(services.data);
          setValueServicoSelecionado(servicosFromOrdemServico.id);
          setItemsSelecionados(itemsFromOrdemServico.map((item: any) => item.id));
          setValue('descricao', descricaoFromOrdemServico);
          setValue(
            'itemIds',
            itemsFromOrdemServico.map((item: any) => item.id)
          );
          setValue('servicoId', servicosFromOrdemServico.id);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
      return () => {
        fetchData();
        clearErrors();
      };
    }, [id])
  );

  const getSelectedItemsNames = () => {
    const selectedItems = itemsSelecionados
      .map((itemId) => {
        const item = itemsLista.find((item) => item.id === itemId);
        return item ? item.name : '';
      })
      .filter((name) => name !== '');

    if (selectedItems.length > 3) {
      return `${selectedItems.length} items selecionados`;
    }

    return selectedItems.join(', ');
  };

  const onSubmit: SubmitHandler<IUpdateServiceInputs> = async (data) => {
    const transformData = {
      servicoId: Number(data.servicoId),
      itemIds: data.itemIds,
      descricao: data.descricao,
    };
    console.log(transformData);
    try {
      const response = await updateReqService(id as string, transformData);
      setTimeout(() => {
        router.push('/prestador/(drawer)/home');
      }, 5000);
      Toast.show({
        type: 'success',
        text1: 'Serviço alterado com sucesso',
        text2: 'Seu serviço foi alterado com sucesso',
        visibilityTime: 5000,
        autoHide: true,
        position: 'bottom',
        text1Style: { fontSize: 18 },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <XStack flex={1} justifyContent="center">
        <ActivityIndicator size={50} color="#54187E" />
      </XStack>
    );
  }

  return (
    <ScrollView paddingHorizontal={20} paddingVertical={30} backgroundColor="white">
      <YStack marginBottom={17}>
        <Text fontWeight="bold" fontSize={25}>
          Editar serviço
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
            <Dropdown
              data={servicosLista}
              placeholder="Selecione uma atividade"
              style={{
                borderWidth: 1,
                borderColor: '#C5C5C5',
                borderRadius: 5,
                height: 44,
                paddingHorizontal: 12,
              }}
              containerStyle={{
                maxHeight: 300,
                borderWidth: 1,
                borderColor: '#C5C5C5',
                borderRadius: 5,
              }}
              labelField="name"
              valueField="id"
              value={valueServicoSelecionado}
              onChange={(value) => {
                setValueServicoSelecionado(value.id);
                onChange(value.id);
              }}
              renderItem={(item) => {
                return (
                  <XStack
                    justifyContent="space-between"
                    paddingHorizontal={10}
                    paddingVertical={10}>
                    <Text fontSize={16}>{item.name}</Text>
                    {item.id === valueServicoSelecionado && <CheckedIcon />}
                  </XStack>
                );
              }}
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
            <MultiSelect
              data={itemsLista}
              placeholder={getSelectedItemsNames() || 'Selecione um ou mais items'}
              style={{
                borderWidth: 1,
                borderColor: '#C5C5C5',
                borderRadius: 5,
                height: 44,
                paddingHorizontal: 12,
              }}
              containerStyle={{
                height: 300,
                borderWidth: 1,
                borderColor: '#C5C5C5',
                borderRadius: 5,
              }}
              labelField="name"
              valueField="id"
              value={itemsSelecionados}
              onChange={(value) => {
                setItemsSelecionados(value);
                onChange(value);
              }}
              visibleSelectedItem
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
    </ScrollView>
  );
};

export default AtualizarServicoPage;
