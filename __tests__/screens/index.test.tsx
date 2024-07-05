import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import { TamaguiProvider } from 'tamagui';

import Home from '../../app/index';

import config from '~/tamagui.config';

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

describe('Home', () => {
  const mockHome = (
    <TamaguiProvider config={config}>
      <Home />
    </TamaguiProvider>
  );

  it('should render the Home screen', () => {
    const { getByText } = render(mockHome);
    expect(getByText('Como deseja acessar?')).toBeTruthy();
  });

  it('should render the Home screen with access type buttons', () => {
    const { getByText } = render(mockHome);
    expect(getByText('Entrar como Cliente')).toBeTruthy();
    expect(getByText('Entrar como Prestador')).toBeTruthy();
  });

  it('should access the login page by clicking the Access as Provider button', () => {
    const { getByText } = render(mockHome);
    const buttonProviderAccess = getByText('Entrar como Prestador');
    fireEvent.press(buttonProviderAccess);
    expect(router.navigate).toHaveBeenCalledWith('./prestador/login');
  });

  it('should access the service catalog page by clicking on the Access as Customer button', () => {
    const { getByText } = render(mockHome);
    const buttonProviderAccess = getByText('Entrar como Cliente');
    fireEvent.press(buttonProviderAccess);
    expect(router.navigate).toHaveBeenCalledWith('./cliente/home');
  });
});
