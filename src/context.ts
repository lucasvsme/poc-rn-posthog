import React from 'react';
import Axios, { AxiosInstance } from 'axios';

export type AppContextType = {
  httpClient: AxiosInstance;
};

export const AppContext = React.createContext<AppContextType>({
  httpClient: Axios.create({
    baseURL: 'https://thisartworkdoesnotexist.com/',
  }),
});
