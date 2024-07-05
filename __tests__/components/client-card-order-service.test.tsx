import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import React from 'react';
import { TamaguiProvider } from 'tamagui';

import CardOrderService from '~/components/client-card-order-service/client-card-order-service';
import config from '~/tamagui.config';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('~/assets/instalacao.png', () => 'mocked-image');

describe('CardOrderService', () => {
  const mockData = {
    id: 1,
    descricao: 'Descrição do serviço',
    items: ['Item 1', 'Item 2', 'Item 3'],
    servico: {
      name: 'Serviço de Exemplo',
      id: 1,
      created_at: new Date(),
    },
  };

  const mockComponent = (
    <TamaguiProvider config={config}>
      <CardOrderService {...mockData} />
    </TamaguiProvider>
  );

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(mockComponent);
    expect(getByTestId('service-name-title')).toBeTruthy();
    expect(getByTestId('service-name-tag')).toBeTruthy();
    expect(getByText('Descrição do serviço')).toBeTruthy();
  });

  it('navigates to the correct screen on press', () => {
    const { getByTestId } = render(mockComponent);
    fireEvent.press(getByTestId('navigate-to-prestador-info'));
    expect(router.push).toHaveBeenCalledWith('/cliente/1');
  });
});
