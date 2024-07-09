import { Injectable } from '@angular/core';
import { Category } from "../../models/category";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {
  private storeId: string;
  private categoryCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category>;

  constructor(public afs: AngularFirestore) {
  }

  // get all categories
  all() {
    return this.categoryCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  // add  category
  add(category: Category) {
    return this.categoryCollection.add(category);
  }

  update(id, category: Category) {
    return this.afs.doc('categories/' + id).update(category);
  }

  remove(id) {
    return this.afs.doc('categories/' + id).delete();
  }

  init(storeId) {
    this.storeId = storeId;
    this.categoryCollection = this.afs.collection<Category>('categories', ref => ref.where('storeId', '==', storeId));
  }
}
