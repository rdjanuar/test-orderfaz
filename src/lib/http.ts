import { AxiosRequestConfig, AxiosError } from "axios";
import { instance } from "~/services";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const http = async <T>(
  method: Method,
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await instance({ ...config, method });

    return Promise.resolve(data as T);
  } catch (error) {
    return Promise.reject(error as AxiosError<T, AxiosError<T, T>>);
  }
};
