import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { StoreProvider } from "../store/store";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { User } from "../../models/user";
import { AUTH_ERROR_NO_PERMISSION, DEFAULT_AVATAR } from "../constants";
import { ItemProvider } from "../item/item";
import { OrderProvider } from "../order/order";
import { NotificationProvider } from "../notification/notification";
import { ReportProvider } from "../report/report";
import { CategoryProvider } from "../category/category";

import 'rxjs/add/operator/take';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

/*
 Generated class for the UserProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class UserProvider {
  private userCollection: AngularFirestoreCollection<User>;
  private authUser: firebase.User;
  users: Observable<User[]>;
  authenticated = new BehaviorSubject(null);

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public storeProvider: StoreProvider,
              public itemProvider: ItemProvider, public orderProvider: OrderProvider,
              public notiProvider: NotificationProvider, public reportProvider: ReportProvider,
              public categoryProvider: CategoryProvider) {
    this.userCollection = this.afs.collection<User>('admins');
    this.users = this.userCollection.valueChanges();
  }

  // login by email and pw
  login(email, password) {
    return Observable.create(observer => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(authData => {
        this.initProviders(authData);
        observer.next();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => this.authenticated.next(false));
  }

  // register user
  register(email, password, storeName) {
    return Observable.create(observer => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(authData => {
        // setup default data for store
        this.storeProvider.add({
          name: storeName,
          address: ''
        }).then(store => {
          // add user to users collection
          this.add(authData.uid, {
            email: authData.email,
            name: authData.email,
            photoUrl: DEFAULT_AVATAR,
            storeId: store.id
          });

          this.initProviders(authData);
          observer.next();
        });
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  add(uid: string, user: User) {
    console.log('admins/' + uid);
    return this.afs.doc<User>('admins/' + uid).set(user);
  }

  update(user: User) {
    return this.afs.doc<User>('admins/' + this.authUser.uid).update(user);
  }

  getCurrent() {
    return this.afs.doc<User>('admins/' + this.authUser.uid).valueChanges();
  }

  // init other service providers with user
  initProviders(authData: firebase.User) {
    // set current user
    this.authUser = authData;

    this.getCurrent().take(1).subscribe(user => {
      if (user) {
        this.itemProvider.init(user.storeId);
        this.orderProvider.init(user.storeId);
        this.notiProvider.init(user.storeId);
        this.reportProvider.init(user.storeId);
        this.storeProvider.init(user.storeId);
        this.categoryProvider.init(user.storeId);
        this.authenticated.next(user);
      } else {
        this.authenticated.next(AUTH_ERROR_NO_PERMISSION);
      }
    });
  }
}
