import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegisterPage } from "../register/register";
import { HomePage } from "../home/home";
import { UserProvider } from "../../providers/user/user";
import { LoadingProvider } from "../../providers/loading/loading";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: any;
  password: any;

  constructor(public nav: NavController, public userProvider: UserProvider, public alertCtrl: AlertController,
              public loadingProvider: LoadingProvider) {
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    if (!this.email || !this.password) {
      let alert = this.alertCtrl.create({
        message: 'Please provide email and password',
        buttons: ['OK']
      });
      return alert.present();
    }

    this.loadingProvider.present('Please wait...');
    this.nav.setRoot(HomePage);
    // this.userProvider.login(this.email, this.password).subscribe(authData => {
    //   this.loadingProvider.dismiss();
    //   this.nav.setRoot(HomePage);
    // }, error => {
    //   this.loadingProvider.dismiss();
    //   let alert = this.alertCtrl.create({
    //     message: error.message,
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // });
  }

  // login with facebook
  loginWithFacebook() {
    this.userProvider.loginWithFacebook();
  }

  // login with google
  loginWithGoogle() {
    this.userProvider.loginWithGoogle();
  }
}
