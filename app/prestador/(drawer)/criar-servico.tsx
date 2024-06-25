import { yupResolver } from '@hookform/resolvers/yup';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text, TextArea, YStack } from 'tamagui';
import * as yup from 'yup';

import CheckedIcon from '~/components/checkedIcon/checked-icon';
import { useAuth } from '~/context/auth-context';
import { fetchItems, fetchServices } from '~/services/user-Client';
interface ICreateServiceInputs {
  servicoId: string;
  itemsId: number[];
  descricao: string;
}

const formCreateServiceSchema = yup.object().shape({
  servicoId: yup.string().required('É necessário informar a atividade'),
  itemsId: yup
    .array()
    .min(1, 'Selecione pelo menos um item')
    .required('É necessário selecionar pelo menos um item'),
  descricao: yup.string().required('É necessário informar uma descrição'),
});

const CriarServicoPage = () => {
  const { onLogout, authState } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateServiceInputs>({
    mode: 'onBlur',
    resolver: yupResolver(formCreateServiceSchema),
  });
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [value1, setValue] = useState([]);

  const [openServico, setOpenServico] = useState(false);
  const [servicos, setServicos] = useState<any[]>([]);
  const [valueServico, setValueServico] = useState([]);
  const [descricao, setDescricao] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      const fetchData = async () => {
        try {
          const items = await fetchItems();
          const services = await fetchServices();
          console.log(items);
          setItems(items.data);
          setServicos(services.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      setDescricao('');
      setValue([]);
    });
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <YStack paddingHorizontal={20} paddingVertical={30} backgroundColor="white">
      <YStack marginBottom={17}>
        <Text fontWeight="bold" fontSize={25}>
          Criar serviço
        </Text>
      </YStack>

      <Controller
        control={control}
        name="itemsId"
        render={({ field: { onChange, value, onBlur } }) => (
          <DropDownPicker
            schema={{ label: 'label', value: 'id' }}
            open={open}
            value={value}
            items={items}
            setOpen={(isOpen) => {
              setOpen(isOpen);
              if (!isOpen) onBlur();
            }}
            setValue={(callback) => {
              const newValue = callback(value);
              onChange(newValue);
              return newValue;
            }}
            setItems={setItems}
            multiple
            mode="BADGE"
            showBadgeDot={false}
            placeholder="Selecione uma ou mais atividades"
            TickIconComponent={() => <CheckedIcon />}
            style={{ borderColor: '#C5C5C5' }}
            dropDownContainerStyle={{ borderTopWidth: 0, borderColor: '#C5C5C5' }}
            selectedItemContainerStyle={{ backgroundColor: '#a94fea' }}
          />
        )}
      />
      {errors.itemsId && <Text color="red">{errors.itemsId.message}</Text>}
      <YStack gap={20} marginBottom={10}>
        {/* <YStack gap={10}>
          <Text fontWeight="bold" fontSize={14}>
            Atividade realizada
          </Text>
          <DropDownPicker
            schema={{ label: 'name', value: 'id' }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple
            min={1}
            mode="BADGE"
            showBadgeDot={false}
            placeholder="Selecione um ou mais itens"
            TickIconComponent={() => <CheckedIcon />}
            style={{ borderColor: '#C5C5C5' }}
            dropDownContainerStyle={{ borderTopWidth: 0, borderColor: '#C5C5C5', zIndex: 9999 }}
            selectedItemContainerStyle={{ backgroundColor: '#a94fea' }}
          />
        </YStack> */}
        <YStack gap={10}>
          <YStack>
            <Text fontWeight="bold" fontSize={14}>
              Atividade realizada em quais itens?
            </Text>
            <Text fontSize={14}>Podem ser selecionados mais de um item</Text>
          </YStack>
          <DropDownPicker
            schema={{ label: 'name', value: 'id' }}
            open={openServico}
            value={valueServico}
            items={servicos}
            setOpen={setOpenServico}
            setValue={setValueServico}
            setItems={setServicos}
            multiple={false}
            min={1}
            mode="BADGE"
            showBadgeDot={false}
            placeholder="Selecione um serviço"
            TickIconComponent={() => <CheckedIcon />}
            style={{ borderColor: '#C5C5C5' }}
            dropDownContainerStyle={{ borderTopWidth: 0, borderColor: '#C5C5C5' }}
            selectedItemContainerStyle={{ backgroundColor: '#a94fea' }}
          />
        </YStack>
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
          <TextArea
            value={descricao}
            onChangeText={setDescricao}
            backgroundColor="white"
            borderColor="#C5C5C5"
            color="black"
            paddingHorizontal={16}
            paddingVertical={0}
            height={190}
            alignContent="flex-start"
            placeholder="Ex: Instalação de Ar Condicionado em Apartamentos e casas do tipo Split."
          />
        </YStack>
      </YStack>
      <YStack gap={10}>
        <Button
          pressStyle={{ backgroundColor: '#440F69' }}
          style={{ backgroundColor: '#54187E' }}
          onPress={() =>
            onSubmit({ itemsId: value, servicoId: valueServico, description: descricao })
          }>
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
  );
};

export default CriarServicoPage;
