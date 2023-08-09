import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { BackendApi } from './backend.types';

const instance = axios.create({ baseURL: 'http://localhost:3000' });

instance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<BackendApi.ErrorResponse>) => {
    if (error.response?.data?.status === 'error') {
      const errorMessage = error.response.data.message || error.message;
      // TODO Temporary solution
      if (errorMessage !== 'unauthorized_access') toast.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  },
);

const simpleGet = () => {
  return instance.get<void, BackendApi.GetResponse>('/comments');
};

export const backendAPI = { simpleGet };
