import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError } from '@/types/request.types';
import { mutationData } from '@/config/request';
import {
  InventoryBody,
  InventoryMutationResponse,
} from '@/types/inventory/inventory.types';

export function CreateInventory(
  options?: UseMutationOptions<
    InventoryMutationResponse,
    ApiError,
    InventoryBody
  >
) {
  return useMutation<InventoryMutationResponse, ApiError, InventoryBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: 'inventory',
        method: 'POST',
        body: {
          ...body,
        },
      });
    },
    ...options,
  });
}

export function DeleteInventory(
  options?: UseMutationOptions<
    InventoryMutationResponse,
    ApiError,
    { inventoryID: string }
  >
) {
  return useMutation<
    InventoryMutationResponse,
    ApiError,
    { inventoryID: string }
  >({
    mutationFn: async (body) => {
      return await mutationData({
        url: 'inventory',
        method: 'DELETE',
        inputParams: {
          id: body.inventoryID,
        },
      });
    },
    ...options,
  });
}

export function UpdateInventory(
  inputParams?: { [key: string]: any },
  options?: UseMutationOptions<
    InventoryMutationResponse,
    ApiError,
    InventoryBody
  >
) {
  return useMutation<InventoryMutationResponse, ApiError, InventoryBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: `inventory?id=${inputParams?.id}`,
        method: 'PUT',
        body: {
          ...body,
        },
      });
    },
    ...options,
  });
}
