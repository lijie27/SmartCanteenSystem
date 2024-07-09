import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { Store } from "../../models/store";

/*
 Generated class for the StoreProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class StoreProvider {

  constructor(public afs: AngularFirestore) {

  }

  all() {
    return this.afs.collection<Store>('stores/').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Store;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  get(id: string) {
    return this.afs.doc('stores/' + id).valueChanges();
  }
}
