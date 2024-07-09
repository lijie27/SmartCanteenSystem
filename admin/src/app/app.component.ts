import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AUTH_ERROR_NO_PERMISSION } from "../providers/constants";

// import providers
import { AngularFireAuth } from "angularfire2/auth/auth";
import { NotificationProvider } from "../providers/notification/notification";
import { UserProvider } from "../providers/user/user";

// import pages
import { CategoriesPage } from '../pages/categories/categories';
import { OrderPage } from '../pages/order/order';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { SettingPage } from '../pages/setting/setting';
import { User } from "../models/user";
// end import pages

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;
  public nav: any;
  public notiSubcriber: any;
  public user: User;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    },
    {
      title: 'Categories',
      icon: 'ios-home-outline',
      count: 0,
      component: CategoriesPage
    },
    {
      title: 'Order',
      icon: 'ios-home-outline',
      count: 0,
      component: OrderPage
    },
    {
      title: 'Settings',
      icon: 'ios-home-outline',
      count: 0,
      component: SettingPage
    },
    // import menu
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController,
              public afAuth: AngularFireAuth, public userProvider: UserProvider,
              public notificationProvider: NotificationProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // check auth on init
      afAuth.authState.take(1).subscribe(authData => {
        // if user logged in
        if (authData) {
          userProvider.initProviders(authData);
        } else {
          this.nav.setRoot(LoginPage);
        }
      });

      // listen for auth change
      userProvider.authenticated.subscribe(user => {
        if (user == AUTH_ERROR_NO_PERMISSION) {
          // user has no admin permission
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: AUTH_ERROR_NO_PERMISSION,
            buttons: ['OK']
          });
          alert.present();
          // logout
          this.userProvider.logout();
        } else if (user) {
          this.user = user;
          this.subNoti();
          this.nav.setRoot(CategoriesPage);
        } else if (user === false) {
          this.unSubNoti();
          this.nav.setRoot(LoginPage);
        }
      });
    });
  }

  // subscribe for notifications
  subNoti() {
    let isShowing = false;
    let notiCount = 0;
    let alert;

    // subscribe to notifications
    this.notiSubcriber = this.notificationProvider.all().subscribe(records => {
      // Only listen for new notifcation
      if (records.length > notiCount && !isShowing) {
        isShowing = true;
        // show the notifications

        alert = this.alertCtrl.create({
          title: 'New order',
          subTitle: 'New order(s) has been created.',
          buttons: [
            {
              text: 'View',
              handler: data => {
                this.nav.setRoot(OrderPage);
                // remove this notifications
                this.notificationProvider.removeAll(records);
                isShowing = false;
              }
            },
            {
              text: 'Close',
              handler: data => {
                this.notificationProvider.removeAll(records);
                isShowing = false;
              }
            }
          ]
        });
        alert.present();
      }

      notiCount = records.length;
    });
  }

  unSubNoti() {
    if (this.notiSubcriber) {
      this.notiSubcriber.unsubscribe();
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // logout
  logout() {
    this.userProvider.logout();
  }
}
