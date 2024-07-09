import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from "angularfire2/auth/auth";

// import provider
import { UserProvider } from "../providers/user/user";
import { NotificationProvider } from "../providers/notification/notification";

// import pages
import { HomePage } from '../pages/home/home';
// import {CategoriesPage} from '../pages/categories/categories';
// import {FavoritePage} from '../pages/favorite/favorite';
import { CartPage } from '../pages/cart/cart';
// import {OfferPage} from '../pages/offer/offer';
import { UserPage } from '../pages/user/user';
import { SettingPage } from '../pages/setting/setting';
import { NewsPage } from '../pages/news/news';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { ChatsPage } from '../pages/chats/chats';
import { OrdersPage } from '../pages/orders/orders';
// end import pages

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {
  rootPage: any;
  user: any;
  nav: any;
  notiSubcriber: any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    },
    /*
     {
     title: 'Categories',
     icon: 'apps',
     count: 0,
     component: CategoriesPage
     },

     {
     title: 'Favorite',
     icon: 'star-outline',
     count: 0,
     component: FavoritePage
     },
     */
    {
      title: 'My Cart',
      icon: 'ios-cart-outline',
      count: 0,
      component: CartPage
    },
    {
      title: 'Orders',
      icon: 'ios-time-outline',
      count: 0,
      component: OrdersPage
    },
    /*
     {
     title: 'Offer',
     icon: 'ios-pricetag-outline',
     count: 0,
     component: OfferPage
     },
     */
    {
      title: 'Setting',
      icon: 'ios-settings-outline',
      count: 0,
      component: SettingPage
    },

    {
      title: 'News',
      icon: 'ios-paper-outline',
      count: 0,
      component: NewsPage
    },

    {
      title: 'About us',
      icon: 'ios-information-circle-outline',
      count: 0,
      component: AboutPage
    },

    {
      title: 'Supports',
      icon: 'ios-help-circle-outline',
      count: 0,
      component: ChatsPage
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

      // check for auth status
      afAuth.authState.subscribe(authData => {
        // if user logged in
        if (authData) {
          // set provider init data
          this.userProvider.initProviders(authData);
          this.userProvider.getCurrent().take(1).subscribe(user => {
            if (user) {
              // set current user
              this.user = user;
              this.nav.setRoot(HomePage);
              this.subNoti();
            } else {
              this.logout();
            }
          });
        } else { // no auth
          this.user = null;
          this.nav.setRoot(LoginPage);
          this.unSubNoti();
        }
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  viewAccount() {
    this.nav.setRoot(UserPage);
  }

  // logout
  logout() {
    this.userProvider.logout().then(() => {
      this.unSubNoti();
    });
  }

  // subscribe for notifications
  subNoti() {
    let isShowing = false;
    let notiCount = 0;
    let alert;

    // subscribe to notifications
    this.notiSubcriber = this.notificationProvider.all().subscribe(records => {
      console.log('notifications', records);
      // Only listen for new notifcation
      if (records.length > notiCount && !isShowing) {
        isShowing = true;
        // show the notifications

        alert = this.alertCtrl.create({
          title: 'Order updated',
          subTitle: 'Your ' + records.length + ' order(s) has been updated.',
          buttons: [
            {
              text: 'View',
              handler: data => {
                this.nav.setRoot(OrdersPage);
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
}
