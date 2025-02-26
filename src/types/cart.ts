import { Product } from "./product";

export interface CartItem extends Product {
    quantity: number;
    selectedStyle?: string;
}

export interface Styles {
    nameStyle: string;
    priceStyle: string;
    subtotalStyle: string;
    quantityStyle: string;
}

