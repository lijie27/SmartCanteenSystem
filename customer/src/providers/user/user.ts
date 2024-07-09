import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { User } from "../../models/user";
import { DEFAULT_AVATAR } from "../constants";
import { CartProvider } from '../cart/cart';
import { OrderProvider } from "../order/order";
import { NotificationProvider } from "../notification/notification";

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take';

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

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public cartProvider: CartProvider,
              public orderProvider: OrderProvider, public notificationProvider: NotificationProvider) {
    this.userCollection = this.afs.collection<User>('admins');
    this.users = this.userCollection.valueChanges();
  }

  // login by email and pw
  login(email, password) {
    return Observable.create(observer => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(authData => {
        observer.next();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  // register user
  register(email, password) {
    return Observable.create(observer => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(authData => {
        this.add(authData.uid, {
          email: authData.email,
          name: authData.email,
          photoUrl: DEFAULT_AVATAR
        });

        observer.next();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  add(uid: string, user: User) {
    console.log('customers/' + uid, user);
    return this.afs.doc<User>('customers/' + uid).set(user);
  }

  update(user: User) {
    return this.afs.doc<User>('customers/' + this.authUser.uid).update(user);
  }

  getCurrent() {
    console.log('customers/' + this.authUser.uid);
    return this.afs.doc<User>('customers/' + this.authUser.uid).valueChanges();
  }

  // init other service providers with userId
  initProviders(authData: firebase.User) {
    // set current user
    this.authUser = authData;

    this.cartProvider.init(authData.uid);
    this.orderProvider.init(authData.uid);
    this.notificationProvider.init(authData.uid);
  }

  // login with facebook
  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(result => {
      console.log(result.user);
      this.createUserIfNotExist(result.user.uid, {
        email: result.user.email,
        name: result.user.displayName,
        photoUrl: result.user.photoURL
      });
    }).catch((error: any) => {
      console.log(error);
    });
  }

  // login with google
  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {

      this.createUserIfNotExist(result.user.uid, {
        email: result.user.email,
        name: result.user.displayName,
        photoUrl: result.user.photoURL
      });
    }).catch((error: any) => {
      console.log(error);
    });
  }

  // create new user if not exist
  createUserIfNotExist(uid, user: User) {
    return this.afs.doc<User>('customers/' + uid).valueChanges().take(1).subscribe(snapshot => {
      console.log(snapshot);
      // check if user does not exist
      if (!snapshot) {
        this.add(uid, user);
      }
    });
  }
}
