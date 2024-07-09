import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UserProvider } from "../../providers/user/user";
import { User } from "../../models/user";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: User;

  constructor(public nav: NavController, public toastCtrl: ToastController, public loadingCtrl: LoadingController,
              public userProvider: UserProvider) {
    userProvider.getCurrent().subscribe(user => {
      this.user = user;
    })
  }

  // save user info
  submit() {
    this.userProvider.update(this.user);

    let toast = this.toastCtrl.create({
      message: 'User updated',
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  // choose file for upload
  chooseFile() {
    document.getElementById('avatar').click();
  }

  // upload thumb for item
  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('avatar')).files[0]]) {
      let path = '/users/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        loading.dismiss();
        this.user.photoUrl = snapshot.downloadURL;
      });
    }
  }
}
