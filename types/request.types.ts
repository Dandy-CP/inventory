export type MutationMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface FetchOptions {
  url: string;
  inputParams?: { [key: string]: string | number };
}

export interface MutationDataOptions {
  url: string;
  method: MutationMethodType;
  body?: { [key: string]: any };
  baseURL?: string;
  inputParams?: { [key: string]: any };
}

export interface MutationFormDataOptions {
  url: string;
  method: MutationMethodType;
  body: { [key: string]: string };
  baseURL?: string;
  inputParams?: { [key: string]: any };
}

export interface ApiError {
  response: {
    data: { message: string };
  };
}
