import { render } from '@testing-library/react-native';
import React from 'react';

import ResolvePelLogo from '~/components/resolvePelLogo/resolvePel-logo';

describe('ResolvePelLogo', () => {
  it('renders correctly with given width and height', () => {
    const width = 197;
    const height = 37;
    const { getByTestId } = render(<ResolvePelLogo width={width} height={height} />);
    const svgElement = getByTestId('resolve-pel-logo-svg');
    expect(svgElement).toBeTruthy();
    expect(svgElement.props.width).toBe(width);
    expect(svgElement.props.height).toBe(height);
  });
});
