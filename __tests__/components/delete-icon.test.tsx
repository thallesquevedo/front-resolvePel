import { render } from '@testing-library/react-native';
import React from 'react';

import DeleteIcon from '~/components/delete-Icon/delete-icon';

describe('DeleteIcon', () => {
  it('renders correctly with given size', () => {
    const size = 16;
    const { getByTestId } = render(<DeleteIcon size={size} />);
    const svgElement = getByTestId('delete-icon-svg');
    expect(svgElement).toBeTruthy();
    expect(svgElement.props.width).toBe(size);
    expect(svgElement.props.height).toBe(size);
  });
});
