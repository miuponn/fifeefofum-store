export interface InventoryItem {
  productId: string;
  variant: string;
  inStock: boolean;
  quantity: number;
}

export type Inventory = Record<string, Record<string, InventoryItem>>;