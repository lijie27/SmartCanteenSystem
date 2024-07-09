import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Item } from "../../models/item";
import { DEFAULT_ITEM_THUMB } from "../constants";

/*
 Generated class for the ItemProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ItemProvider {
  private itemCollection: AngularFirestoreCollection<Item>;
  private storeId: string;
  public defaultItem: Item = {
    storeId: '',
    categoryId: '',
    description: '',
    name: '',
    price: null,
    stock: null,
    thumbnail: DEFAULT_ITEM_THUMB,
    images: [],
    variations: [],
    sizes: []
  };
  public currentItem: Item;

  constructor(public afs: AngularFirestore) {
    this.currentItem = this.defaultItem;
  }

  init(storeId) {
    this.storeId = storeId;
    this.itemCollection = this.afs.collection<Item>('items', ref => ref.where('storeId', '==', storeId));
  }

  all() {
    return this.itemCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  add(item: Item) {
    item.storeId = this.storeId;
    item = this.convertPrice(item);
    item = this.setThumbnail(item);
    return this.itemCollection.add(item);
  }

  update(id, item: Item) {
    item = this.convertPrice(item);
    item = this.setThumbnail(item);
    return this.afs.doc('items/' + id).update(item);
  }

  // set first image as thumbnail
  setThumbnail(item: Item) {
    if (item && item.images && item.images.length) {
      item.thumbnail = item.images[0].thumbnail;
    }

    return item;
  }

  remove(id) {
    return this.afs.doc('items/' + id).delete();
  }

  // get default data for item
  setDefaultItem(item: Item) {
    this.currentItem = item;

    return this.currentItem;
  }

  removeByCategory(catId) {
    this.findByCategory(catId).take(1).subscribe(items => {
      items.forEach(item => {
        this.remove(item.id);
      })
    });
  }

  findByCategory(catId) {
    return this.afs.collection<Item>('items', ref => ref.where('categoryId', '==', catId))
      .snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  // covert item price to string
  convertPrice(item: Item) {
    var i;
    item.price *= 1;
    
    for (i = 0; i < item.variations.length; i++) {
      item.variations[i].price *= 1;
    }

    for (i = 0; i < item.sizes.length; i++) {
      item.sizes[i].price *= 1;
    }

    return item;
  }
}
