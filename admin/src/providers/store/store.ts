import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Store } from "../../models/store";
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {
  private storeId: string;
  private storesCollection: AngularFirestoreCollection<Store>;
  private currentStore: Store;
  stores: Observable<Store[]>;

  constructor(public afs: AngularFirestore) {
    this.storesCollection = afs.collection<Store>('stores');
    this.stores = this.storesCollection.valueChanges();
  }

  init(storeId) {
    this.storeId = storeId;
    this.afs.doc<Store>('stores/' + storeId).valueChanges().subscribe(store => {
      store.id  = storeId;
      this.setCurrent(store);
    });
  }

  add(store: Store) {
    return this.storesCollection.add(store);
  }

  update(store: Store) {
    return this.afs.doc('stores/' + store.id).update(store);
  }

  setCurrent(store: Store) {
    this.currentStore = store;
  }

  getCurrent() {
    return this.currentStore;
  }

  get(id: string) {
    return this.afs.doc<Store>('stores/' + id).valueChanges();
  }
}
