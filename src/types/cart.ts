import { Product } from "./product";

export interface CartItem extends Product {
    quantity: number;
    variant?: string;
}

export interface Styles {
    nameStyle: string;
    priceStyle: string;
    subtotalStyle: string;
    quantityStyle: string;
}

