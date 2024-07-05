import { render } from '@testing-library/react-native';
import React from 'react';

import CheckedIcon from '~/components/checkedIcon/checked-icon';

describe('CheckedIcon', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<CheckedIcon />);
    const svgElement = getByTestId('checked-icon-svg');
    expect(svgElement).toBeTruthy();
  });
});
