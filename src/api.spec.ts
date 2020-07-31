import * as Testing from '@testing-library/react-hooks';
import Axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ImageApiClient, ImageApiClientImpl, useImageApi } from './api';

describe('ImageApiClientImpl', () => {
  const image = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  const httpClient: AxiosInstance = Axios.create();
  const mockAdapter = new MockAdapter(httpClient);
  const apiClient: ImageApiClient = new ImageApiClientImpl(httpClient);

  beforeEach(() => {
    mockAdapter.resetHistory();
  });

  test('getRandomImage returns base64', async () => {
    mockAdapter.onGet('/').reply(200, Buffer.from(image, 'utf8'));

    const base64 = await apiClient.getRandomImage();

    expect(base64.startsWith('data:image/jpeg;base64,')).toBeTruthy();
    expect(mockAdapter.history['get']).toHaveLength(1);
  });

  test('Throwing error on HTTP call failure', async () => {
    expect.hasAssertions();

    mockAdapter.onGet('/').reply(500);

    try {
      await apiClient.getRandomImage();
    } catch (error) {
      expect(error.message).toStrictEqual(
        'Request failed with status code 500',
      );
      expect(mockAdapter.history['get']).toHaveLength(1);
    }
  });
});

describe('useImageApi', () => {
  const mockImageApiClient: ImageApiClient = {
    getRandomImage: jest.fn(),
  };

  test('Setting image after HTTP call finished', async () => {
    const base64 = 'some image encoded in base64';
    const mockImageApiClientGetRandomImage = jest
      .fn()
      .mockResolvedValue(base64);

    const hook = Testing.renderHook(() =>
      useImageApi({
        ...mockImageApiClient,
        getRandomImage: mockImageApiClientGetRandomImage,
      }),
    );

    expect(hook.result.current.image).toBeUndefined();

    await Testing.act(async () => {
      return hook.result.current.changeImage();
    });

    expect(hook.result.current.image).toStrictEqual(base64);
    expect(mockImageApiClientGetRandomImage).toHaveBeenCalled();
  });

  test('Setting error after HTTP call failed', async () => {
    const error = new Error('Could not get random image');
    const mockImageApiClientGetRandomImageError = jest
      .fn()
      .mockRejectedValue(error);

    const hook = Testing.renderHook(() =>
      useImageApi({
        ...mockImageApiClient,
        getRandomImage: mockImageApiClientGetRandomImageError,
      }),
    );

    expect(hook.result.current.error).toBeUndefined();

    await Testing.act(async () => {
      return hook.result.current.changeImage();
    });

    expect(hook.result.current.error).toStrictEqual(error);
    expect(mockImageApiClientGetRandomImageError).toHaveBeenCalled();
  });

  test('Setting isLoading while HTTP call has not finished', async () => {
    const mockImageApiClientGetRandomImage = jest.fn().mockResolvedValue('');

    const hook = Testing.renderHook(() =>
      useImageApi({
        ...mockImageApiClient,
        getRandomImage: mockImageApiClientGetRandomImage,
      }),
    );

    expect(hook.result.current.isLoading).toBeFalsy();

    await Testing.act(async () => {
      hook.result.current.changeImage();
      return hook.waitForValueToChange(() => hook.result.current.isLoading);
    });

    expect(hook.result.current.isLoading).toBeFalsy();
    expect(mockImageApiClientGetRandomImage).toHaveBeenCalled();
  });
});
