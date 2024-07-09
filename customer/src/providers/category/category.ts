import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { Category } from "../../models/category";

/*
 Generated class for the CategoryProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class CategoryProvider {

  constructor(public afs: AngularFirestore) {
  }

  // get list of categories
  all(storeId) {
    return this.afs.collection<Category>('categories', ref => ref.where('storeId', '==', storeId)).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  // find categories by parent category
  findParentId(parentId) {
    return this.afs.collection<Category>('categories', ref => ref.where('parentId', '==', parentId))
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      });
  }
}
