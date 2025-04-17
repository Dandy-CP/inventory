import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/config/request';
import {
  ResponseInventory,
  ResponseDetailInventory,
} from '@/types/inventory/inventory.types';
import { ApiError } from '@/types/request.types';

export function GetInventory(
  inputParams?: { [key: string]: any },
  options?: UseQueryOptions<ResponseInventory, ApiError>
) {
  return useQuery<ResponseInventory, ApiError>({
    queryKey: ['inventory'],
    queryFn: async () => {
      return await fetchData({
        url: 'inventory',
        inputParams: {
          page: inputParams?.page,
          limit: 5,
          id: inputParams?.id,
          search: inputParams?.search,
          category: inputParams?.category,
        },
      });
    },
    ...options,
  });
}

export function GetDetailInventory(
  inputParams?: { [key: string]: any },
  options?: UseQueryOptions<ResponseDetailInventory, ApiError>
) {
  return useQuery<ResponseDetailInventory, ApiError>({
    queryKey: ['inventory'],
    queryFn: async () => {
      return await fetchData({
        url: 'inventory',
        inputParams: {
          id: inputParams?.id,
        },
      });
    },
    ...options,
  });
}
