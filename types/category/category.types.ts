export interface ResponseCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  productInventory: Inventory[];
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
