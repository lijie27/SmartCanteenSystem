import { Variation } from "./variation";
import { Image } from "./image";
import { Size } from "./size";

export class Item {
  id?: string;
  storeId: string;
  categoryId: string;
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

  constructor() {
  }
}
