import { Variation } from "./variation";
import { Store } from "./store";
import { Size } from "./size";

export class CartItem {
  id?: string;
  store: Store;
  name: string;
  price: number;
  subTotal?: number;
  quantity: number;
  thumbnail: string;
  variation: Variation;
  size: Size;

  constructor() {
  }
}
