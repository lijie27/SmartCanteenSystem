import { CartItem } from "./cart-item";
import { CartStore } from "./cart-store";

export class Order {
  id?: string;
  userId: string;
  total?: number;
  address: string;
  status?: string;
  orderNumber?: string;
  createdAt?: number;
  updatedAt?: number;
  store: CartStore;
  items: Array<CartItem>;
  isReviewed?: boolean;
}
