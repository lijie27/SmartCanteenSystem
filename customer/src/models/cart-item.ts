import { Variation } from "./variation";
import { ItemReview } from "./item-review";
import { Size } from "./size";

export class CartItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  variations: Array<Variation>;
  size: Size;
  subTotal: number;
  review?: ItemReview;

  constructor() {
  }
}
