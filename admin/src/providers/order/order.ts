import { Injectable } from '@angular/core';
import { Order } from "../../models/order";
import { AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";

/*
 Generated class for the OrderProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class OrderProvider {
  private orderCollection: AngularFirestoreCollection<Order>;
  private storeId: string;

  constructor(public afs: AngularFirestore) {

  }

  init(storeId) {
    this.storeId = storeId;
    // default order by latest
    this.orderCollection = this.afs.collection<Order>('orders',
      ref => ref.where('store.id', '==', this.storeId).orderBy('createdAt', 'desc'));
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

  // update order status
  updateStatus(orderId: string, status: string) {
    return this.afs.doc<Order>('orders/' + orderId).update({
      status: status
    });
  }
}
