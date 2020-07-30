import React from 'react';
import Axios, { AxiosInstance } from 'axios';
import { Buffer } from 'buffer';

const DefaultHttpClient: AxiosInstance = Axios.create({
  baseURL: 'https://thisartworkdoesnotexist.com/',
});

export interface ImageApiClient {
  getRandomImage(): Promise<string>;
}

export class ImageApiClientImpl implements ImageApiClient {
  public constructor(
    private readonly httpClient: AxiosInstance = DefaultHttpClient,
  ) {}

  public async getRandomImage(): Promise<string> {
    return this.httpClient
      .get('/', {
        headers: {
          'Content-Type': 'image/jpeg',
        },
        responseType: 'arraybuffer',
      })
      .then((response) => response.data)
      .then((arrayBuffer) => {
        const encoded = Buffer.from(arrayBuffer).toString('base64');
        const uri = `data:image/jpeg;base64,${encoded}`;

        return uri;
      });
  }
}

export function useImageApi(imageApiClient: ImageApiClient) {
  const [image, setImage] = React.useState<string>();
  const [error, setError] = React.useState<Error>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [changed, setChanged] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (changed === false) {
      return;
    }

    imageApiClient
      .getRandomImage()
      .then((base64) => setImage(base64))
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
        setChanged(false);
      });
  }, [changed]);

  const changeImage = () => {
    setLoading(true);
    setError(undefined);
    setChanged(true);
  };

  return { image, error, isLoading, changeImage };
}
