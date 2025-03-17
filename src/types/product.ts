export interface Product {
    id: string;
    name: string;
    price: number;
    category?: string;
    thumbnail: string;
    thumbnail2?: string;
    images?: string[];
    videos?: string[];
    description?: string;
    styles?: string[];
    quantity?: number;
  }