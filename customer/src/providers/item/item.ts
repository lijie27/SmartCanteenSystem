import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Item } from "../../models/item";
import { CartItem } from "../../models/cart-item";
import { ItemReview } from "../../models/item-review";
import { UserProvider } from "../user/user";

/*
 Generated class for the ItemProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ItemProvider {
  private itemCollection: AngularFirestoreCollection<Item>;

  constructor(public afs: AngularFirestore, public userProvider: UserProvider) {
    this.itemCollection = this.afs.collection<Item>('items', ref => ref.limit(12));
  }

  // get all items
  all() {
    return this.itemCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  // get item by category id
  findByCategoryId(categoryId, orderBy, orderDirection) {
    return this.afs.collection<Item>('items', ref => ref.where('categoryId', '==', categoryId).orderBy(orderBy, orderDirection))
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          console.log(data);
          return {id, ...data};
        });
      });
  }

  // add review to item
  addReview(item: CartItem, userId: string) {
    return this.userProvider.getCurrent().take(1).subscribe(user => {
      user.id = userId;

      return this.afs.collection<ItemReview>('items/' + item.id + '/reviews').add({
        user: user,
        rating: item.review.rating,
        comment: item.review.comment
      });
    });
  }

  // get all reviews of items
  getReviews(itemId) {
    return this.afs.collection<ItemReview>('items/' + itemId + '/reviews').valueChanges();
  }
}
