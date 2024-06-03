import { render } from '@testing-library/react-native';
import { TamaguiProvider } from 'tamagui';

import Home from './index';

import config from '~/tamagui.config';

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
});
