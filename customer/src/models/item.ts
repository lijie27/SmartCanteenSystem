import { Variation } from "./variation";
import { Category } from "./category";
import { Image } from "./image";
import { ItemReview } from "./item-review";
import { Size } from "./size";

export class Item {
  id?: string;
  storeId: string;
  category: Category;
  description: string;
  name: string;
  price?: number;
  stock?: number;
  soldCount?: number;
  rating?: number;
  thumbnail: string;
  images: Array<Image>;
  variations: Array<Variation>;
  sizes: Array<Size>;
  review?: Array<ItemReview>;

  constructor() {
  }
}
