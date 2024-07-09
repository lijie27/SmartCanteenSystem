import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { OrderNotification } from "../../models/order-notification";

/*
 Generated class for the NotificationProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class NotificationProvider {
  private notiCollection: AngularFirestoreCollection<OrderNotification>;
  private userId: string;

  constructor(public afs: AngularFirestore) {
    console.log('Hello NotificationProvider Provider');
  }

  // find notifications by userId
  init(userId) {
    this.userId = userId;
    console.log('notifications/' + this.userId + '/orders');
    this.notiCollection = this.afs.collection<OrderNotification>('notifications/' + this.userId + '/orders');
  }

  all() {
    return this.notiCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as OrderNotification;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  remove(id) {
    this.afs.doc('notifications/' + this.userId + '/orders/' + id).delete();
  }

  removeAll(notifications) {
    notifications.forEach(notification => {
      this.remove(notification.id);
    });
  }
}
