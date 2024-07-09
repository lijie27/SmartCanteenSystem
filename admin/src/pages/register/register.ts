import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";
import { UserProvider } from "../../providers/user/user";
import { LoadingProvider } from "../../providers/loading/loading";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  storeName: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(public nav: NavController, public alertCtrl: AlertController, public userProvider: UserProvider,
              public loadingProvider: LoadingProvider) {
  }

  // register and go to home page
  register() {
    if (!this.storeName || !this.email || !this.password) {
      let alert = this.alertCtrl.create({
        message: 'Please provide restaurant\'s name, email and password',
        buttons: ['OK']
      });
      return alert.present();
    }

    if (this.password != this.confirmPassword) {
      let alert = this.alertCtrl.create({
        message: 'Confirm password does not match',
        buttons: ['OK']
      });
      return alert.present();
    }

    this.loadingProvider.present('Please wait...');

    this.userProvider.register(this.email, this.password, this.storeName).subscribe(authData => {
      this.loadingProvider.dismiss();
      this.nav.setRoot(HomePage);
    }, error => {
      this.loadingProvider.dismiss();
      let alert = this.alertCtrl.create({
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
