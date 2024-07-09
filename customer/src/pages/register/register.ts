import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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
  templateUrl: 'register.html'
})
export class RegisterPage {
  email: any;
  password: any;
  confirmPassword: any;

  constructor(public nav: NavController, public userProvider: UserProvider, public alertCtrl: AlertController,
              public loadingProvider: LoadingProvider) {
  }

  // register and go to home page
  register() {
    if (!this.email || !this.password) {
      let alert = this.alertCtrl.create({
        message: 'Please provide email and password',
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

    this.userProvider.register(this.email, this.password).subscribe(authData => {
      this.loadingProvider.dismiss();
      // this.navCtrl.setRoot(HomePage);
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
