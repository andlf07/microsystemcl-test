import axios, { AxiosResponse } from 'axios';

interface RequestParams {
  url: string;
  method: string;
  data?: any;
  headers?: any;
}

export const useAxios = () => {
  const requests = async (requests: RequestParams): Promise<AxiosResponse> => {
    return await axios({
      url: requests.url,
      data: requests.data,
      method: requests.method,
      headers: {
        ...requests.headers,
        'Content-Type': 'application/json',
      },
    });
  };

  return {
    requests,
  };
};

export default useAxios;
