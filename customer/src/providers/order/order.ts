import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Order } from "../../models/order";
import { CartStore } from '../../models/cart-store';

/*
 Generated class for the OrderProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class OrderProvider {
  private userId: string;
  private orderCollection: AngularFirestoreCollection<Order>;

  constructor(public afs: AngularFirestore) {

  }

  // find orders by userId, sort by created time
  init(userId) {
    this.userId = userId;
    this.orderCollection = this.afs.collection<Order>('orders',
      ref => ref.where('userId', '==', this.userId).orderBy('createdAt', 'desc'));
  }

  // create new order
  add(stores: Array<CartStore>, address: string) {
    for (let i in stores) {
      if (stores[i] && stores[i].items && stores[i].items.length) {
        this.afs.collection<Order>('orders').add({
          userId: this.userId,
          address: address,
          items: stores[i].items,
          store: {
            id: stores[i].id,
            name: stores[i].name
          }
        });
      }
    }
  }

  // mark order as reviewed
  review(orderId) {
    return this.afs.doc('orders/' + orderId).update({'isReviewed': true});
  }

  all() {
    return this.orderCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

}
