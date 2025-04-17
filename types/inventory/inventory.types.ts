export interface ResponseInventory {
  data: Inventory[];
  pagination: Pagination;
}

export interface ResponseDetailInventory {
  data: Inventory;
}

export interface Inventory {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
}

export interface Pagination {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: boolean | null;
  nextPage: boolean | null;
  pageCount: number;
  totalCount: number;
}

export interface InventoryBody {
  productName: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
  categoryId: string;
}

export interface InventoryMutationResponse {
  message: string;
}
