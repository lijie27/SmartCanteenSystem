import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from "angularfire2/firestore"

// import providers
import { CategoryProvider } from '../providers/category/category';
import { ItemProvider } from '../providers/item/item';
import { OrderProvider } from '../providers/order/order';
import { StoreProvider } from '../providers/store/store';
import { CartProvider } from '../providers/cart/cart';
import { UserProvider } from '../providers/user/user';
import { LoadingProvider } from '../providers/loading/loading';
import { NotificationProvider } from "../providers/notification/notification";
import { PostProvider } from '../providers/post/post';
import { ChatProvider } from '../providers/chat/chat';

// import pages
import { AboutPage } from '../pages/about/about';
import { AddressPage } from '../pages/address/address';
import { CartPage } from '../pages/cart/cart';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryPage } from '../pages/category/category';
import { ChatDetailPage } from '../pages/chat-detail/chat-detail';
import { ChatsPage } from '../pages/chats/chats';
import { FavoritePage } from '../pages/favorite/favorite';
import { HomePage } from '../pages/home/home';
import { ItemPage } from '../pages/item/item';
import { LoginPage } from '../pages/login/login';
import { NewsPage } from '../pages/news/news';
import { OfferPage } from '../pages/offer/offer';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { UserPage } from '../pages/user/user';
import { OrdersPage } from '../pages/orders/orders';
// end import pages

// AF2 Settings
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
    AboutPage,
    AddressPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChatDetailPage,
    ChatsPage,
    FavoritePage,
    HomePage,
    ItemPage,
    LoginPage,
    NewsPage,
    OfferPage,
    RegisterPage,
    SettingPage,
    UserPage,
    OrdersPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AddressPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChatDetailPage,
    ChatsPage,
    FavoritePage,
    HomePage,
    ItemPage,
    LoginPage,
    NewsPage,
    OfferPage,
    RegisterPage,
    SettingPage,
    UserPage,
    OrdersPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoryProvider,
    ItemProvider,
    OrderProvider,
    StoreProvider,
    CartProvider,
    UserProvider,
    LoadingProvider,
    CartProvider,
    NotificationProvider,
    PostProvider,
    ChatProvider
    /* import services */
  ]
})
export class AppModule {
}
