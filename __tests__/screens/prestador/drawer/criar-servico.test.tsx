import { NavigationContext } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { TamaguiProvider } from 'tamagui';

import CriarServicoPage from '~/app/prestador/(drawer)/criar-servico';
import config from '~/tamagui.config';

const navContextValue = {
  isFocused: () => false,
  addListener: jest.fn(() => jest.fn()),
};

const mockScreen = (
  <TamaguiProvider config={config}>
    <NavigationContext.Provider value={navContextValue}>
      <CriarServicoPage />
    </NavigationContext.Provider>
  </TamaguiProvider>
);

jest.mock('react-native-toast-message', () => ({
  Toast: {
    show: jest.fn(),
  },
}));

jest.mock('~/services/user-Client', () => ({
  createReqService: jest.fn(),
  fetchItems: jest.fn(),
  fetchServices: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockUseFocusEffect = jest.fn();

jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  useRouter: () => ({
    push: mockNavigate,
  }),
  useFocusEffect: jest.fn().mockImplementation((callback) => {
    // Optionally, you can simulate the effect callback here
    return callback();
  }),
}));

describe('CriarServicoPage', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });
  // it('deve renderizar o formulário corretamente', async () => {
  //   const { getByText, getByPlaceholderText } = render(mockScreen);
  //   expect(getByText('Criar serviço')).toBeTruthy();
  //   expect(getByText('Atividade realizada')).toBeTruthy();
  //   expect(getByPlaceholderText('Selecione uma ou mais atividades')).toBeTruthy();
  //   expect(getByText('Atividade realizada em quais itens?')).toBeTruthy();
  //   expect(getByText('Descreva seu serviço')).toBeTruthy();
  //   expect(getByText('Finalizar cadastro')).toBeTruthy();
  //   expect(getByText('Cancelar')).toBeTruthy();
  // });
  // it('deve mostrar mensagens de erro ao enviar o formulário vazio', async () => {
  //   const { getByText } = render(mockScreen);
  //   const submitButton = getByText('Finalizar cadastro');
  //   fireEvent.press(submitButton);
  //   await waitFor(() => {
  //     expect(getByText('É necessário informar a atividade')).toBeTruthy();
  //     expect(getByText('Selecione pelo menos um item')).toBeTruthy();
  //     expect(getByText('É necessário informar uma descrição')).toBeTruthy();
  //   });
  // });
  // it('deve enviar o formulário corretamente', async () => {
  //   fetchItems.mockResolvedValueOnce({ data: [{ id: 1, name: 'Item 1' }] });
  //   fetchServices.mockResolvedValueOnce({ data: [{ id: 1, name: 'Service 1' }] });
  //   const { getByText, getByPlaceholderText, getByTestId } = render(mockScreen);
  //   // Simular a abertura dos dropdowns e seleção dos itens
  //   const serviceDropdown = getByPlaceholderText('Selecione uma ou mais atividades');
  //   fireEvent.press(serviceDropdown);
  //   await waitFor(() => {
  //     fireEvent.press(getByText('Service 1'));
  //   });
  //   const itemDropdown = getByPlaceholderText('Selecione uma ou mais atividades');
  //   fireEvent.press(itemDropdown);
  //   await waitFor(() => {
  //     fireEvent.press(getByText('Item 1'));
  //   });
  //   const descricaoInput = getByPlaceholderText(
  //     'Ex: Instalação de Ar Condicionado em Apartamentos e casas do tipo Split.'
  //   );
  //   fireEvent.changeText(descricaoInput, 'Descrição do serviço');
  //   const submitButton = getByText('Finalizar cadastro');
  //   fireEvent.press(submitButton);
  //   await waitFor(() => {
  //     expect(createReqService).toHaveBeenCalledWith({
  //       servicoId: 1,
  //       itemIds: [1],
  //       descricao: 'Descrição do serviço',
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
  //     expect(mockNavigate).toHaveBeenCalledWith('/prestador/(drawer)/home');
  //   });
  // });
});
