import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Cart } from "../../models/cart";
import { CartProvider } from "../../providers/cart/cart";
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  // cart data
  cart: Cart;

  constructor(public nav: NavController, public storage: Storage, public alertController: AlertController,public cartProvider: CartProvider) {
    this.cart = this.cartProvider.get();
  }

  // plus quantity
  addQty(item) {
    this.cartProvider.addQty(item.id, 1, item.variations, item.size);
  }

  // minus quantity
  minusQty(item) {
    if (item.quantity < 2) {
      return ;
    }

    this.cartProvider.removeItem(item,1);
  }

  // remove item from cart
  remove(restId, index) {
    this.cartProvider.removeItem(restId, index);
  }

  // click buy button
  buy() {
  let alert = this.alertController.create({
      title: 'Info',
      subTitle: 'Your order has been sent.',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            // clear cart
            // this.cartService.clearCart();
            // back to home page
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });
alert.present();
  }
}

