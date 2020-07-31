import React from 'react';
import * as Testing from 'react-native-testing-library';

import { Image } from './image';

describe('Image', () => {
  test('Matching snapshot', () => {
    const component = Testing.render(<Image uri={''} />);

    expect(component).toMatchSnapshot();
  });
});
