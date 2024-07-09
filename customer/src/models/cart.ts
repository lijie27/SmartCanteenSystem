import { CartStore } from "./cart-store";

export class Cart {
  id?: string;
  userId: string;
  total: number;
  stores: Array<CartStore>;
}
