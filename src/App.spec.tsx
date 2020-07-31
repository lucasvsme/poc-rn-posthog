// https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar');

jest.mock('posthog-react-native', () => ({
  capture: jest.fn(),
  setup: jest.fn(),
  screen: jest.fn(),
}));

import React from 'react';
import * as Testing from 'react-native-testing-library';
import PostHog from 'posthog-react-native';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { App } from './App';
import { AppContext } from './context';

describe('App', () => {
  const httpClient = Axios.create();
  const mockAdapter = new MockAdapter(httpClient);

  beforeEach(() => {
    jest.clearAllMocks();
    mockAdapter.resetHistory();
  });

  test('Capturing events after answering Yes and No', async () => {
    mockAdapter.onGet('/').reply(200, 'some image here');

    const component = Testing.render(
      <AppContext.Provider value={{ httpClient }}>
        <App />
      </AppContext.Provider>,
    );

    await Testing.act(async () => {
      // Waiting first load
    });

    await Testing.act(async () => {
      Testing.fireEvent.press(component.getByText('Yes'));
    });

    await Testing.waitFor(() =>
      expect(component.getByTestId('app-image')).toBeTruthy(),
    );

    expect(PostHog.capture).toHaveBeenLastCalledWith('Button clicked', {
      answer: 'yes',
    });

    await Testing.act(async () => {
      Testing.fireEvent.press(component.getByText('No'));
    });

    expect(PostHog.capture).toHaveBeenLastCalledWith('Button clicked', {
      answer: 'no',
    });

    expect(PostHog.capture).toHaveBeenCalledTimes(2);
  }, 20000);
});
