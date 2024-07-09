import { CartItem } from "./cart-item";

export class Order {
  id?: string;
  storeId: string;
  userId: string;
  total?: number;
  address: string;
  status?: string;
  orderNumber?: string;
  createdAt?: number;
  updatedAt?: number;
  items: Array<CartItem>;
}
