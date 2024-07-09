import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'firebase/auth';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from "angularfire2/firestore";

// Import chart module
import { ChartsModule } from 'ng2-charts';

// import providers
import { UserProvider } from '../providers/user/user';
import { ItemProvider } from '../providers/item/item';
import { CategoryProvider } from '../providers/category/category';
import { NotificationProvider } from '../providers/notification/notification';
import { OrderProvider } from '../providers/order/order';
import { ReportProvider } from '../providers/report/report';
import { SettingProvider } from '../providers/setting/setting';
import { TaxProvider } from '../providers/tax/tax';
import { StoreProvider } from '../providers/store/store';
import { LoadingProvider } from '../providers/loading/loading';
import { ToastProvider } from '../providers/toast/toast';

// import pages
import { ItemsPage } from '../pages/items/items';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { CategoriesPage } from '../pages/categories/categories';
import { OrderPage } from '../pages/order/order';
import { HomePage } from '../pages/home/home';
import { CategoryDetailPage } from '../pages/category-detail/category-detail';
import { KeysPipe } from "../pipes/keys";
import { ModalOrderPage } from '../pages/modal-order/modal-order';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
// end import pages

// AF2 Settings



//Firebase configuration
export const firebaseConfig = {
apiKey: "AIzaSyCWtDKiX1SIFR37bh1nnDKzFVH0KgLnxE8",
authDomain: "testing-ed384.firebaseapp.com",
databaseURL: "https://testing-ed384.firebaseio.com",
projectId: "testing-ed384",
storageBucket: "testing-ed384.appspot.com",
messagingSenderId: "399266305479",
appId: "1:399266305479:web:b18be2cde852921b8535e2",
measurementId: "G-4F4DJ9DX06"

};




@NgModule({
  declarations: [
    MyApp,
    KeysPipe,
    ItemsPage,
    ItemDetailPage,
    CategoriesPage,
    OrderPage,
    HomePage,
    CategoryDetailPage,
    ModalOrderPage,
    LoginPage,
    RegisterPage,
    SettingPage,
    /* import pages */
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemsPage,
    ItemDetailPage,
    CategoriesPage,
    OrderPage,
    HomePage,
    CategoryDetailPage,
    ModalOrderPage,
    LoginPage,
    RegisterPage,
    SettingPage,
    /* import pages */
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserProvider,
    ItemProvider,
    CategoryProvider,
    NotificationProvider,
    OrderProvider,
    ReportProvider,
    SettingProvider,
    TaxProvider,
    StoreProvider,
    LoadingProvider,
    ToastProvider
    /* import services */
  ]
})
export class AppModule {
}
