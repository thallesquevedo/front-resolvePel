import { render } from '@testing-library/react-native';
import React from 'react';

import EditIcon from '~/components/edit-icon/edit-icon';

describe('Edit', () => {
  it('renders correctly with given size', () => {
    const size = 16;
    const { getByTestId } = render(<EditIcon size={size} />);
    const svgElement = getByTestId('edit-icon-svg');
    expect(svgElement).toBeTruthy();
    expect(svgElement.props.width).toBe(size);
    expect(svgElement.props.height).toBe(size);
  });
});
