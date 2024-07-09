import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { StoreProvider } from "../../providers/store/store";
import { Store } from "../../models/store";


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  restaurant: Store;

  constructor(public nav: NavController, public toastCtrl: ToastController,
              public storeProvider: StoreProvider) {
    this.restaurant = storeProvider.getCurrent();
  }

  // save form
  save() {
    this.storeProvider.update(this.restaurant);
    let toast = this.toastCtrl.create({
      message: 'Settings have been saved',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
}
