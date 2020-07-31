import React from 'react';
import * as Testing from 'react-native-testing-library';

import { AnswerButtonProps, PositiveButton, NegativeButton } from './button';

const components: [string, string, React.FC<AnswerButtonProps>][] = [
  ['PositiveButton', 'positive-button', PositiveButton],
  ['NegativeButton', 'negative-button', NegativeButton],
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe.each(components)('%s', (_name, testID, Component) => {
  test('Clicking in the button trigger the onPress prop', async () => {
    const mockOnPress = jest.fn();
    const component = Testing.render(
      <Component onPress={mockOnPress} disabled={false} />,
    );

    const button = await component.findByTestId(testID);
    Testing.act(() => Testing.fireEvent.press(button));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('Disabling onPress triggering', async () => {
    const mockOnPress = jest.fn();
    const component = Testing.render(
      <Component onPress={mockOnPress} disabled={true} />,
    );

    const button = await component.findByTestId(testID);
    Testing.act(() => Testing.fireEvent.press(button));

    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
