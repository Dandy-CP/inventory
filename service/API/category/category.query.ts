import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchData } from '@/config/request';
import { ResponseCategory } from '@/types/category/category.types';
import { ApiError } from '@/types/request.types';

export function GetListCategory(
  options?: UseQueryOptions<ResponseCategory[], ApiError>
) {
  return useQuery<ResponseCategory[], ApiError>({
    queryKey: ['category'],
    queryFn: async () => {
      return await fetchData({
        url: 'category',
      });
    },
    ...options,
  });
}
