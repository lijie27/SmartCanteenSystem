import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Item } from '../../models/item';
import { Cart } from '../../models/cart';
import { Variation } from '../../models/variation';
import { Store } from '../../models/store';
import { CartItem } from "../../models/cart-item";
import { Size } from "../../models/size";

/*
 Generated class for the CartProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class CartProvider {
  private cart: Cart;
  private userId: string;

  constructor(public afs: AngularFirestore) {
    this.clearCart();
  }

  // clear cart item
  clearCart() {
    this.cart = {
      stores: [],
      total: 0,
      userId: null
    };
  }

  // add item to cart
  addItem(item: Item, quantity: number, store: Store, size: Size, variations: Array<Variation>) {
    let itemFound = false;
    let cartItem;

    variations = (variations && variations.length) ? variations : null;

    // group item by store
    for (let i in this.cart.stores) {
      for (let j in this.cart.stores[i].items) {
        cartItem = this.cart.stores[i].items[j];

        // if item has found, just minus the qty
        if ((cartItem.id == item.id)) {
          if (this.isSame(cartItem.variations, variations) && (cartItem.size == size)) {
            cartItem.quantity += quantity;
            itemFound = true;
            break;
          }
        }
      }
    }

    // if item can not be found, add item object to cart
    if (!itemFound) {
      let price = item.price;

      if (size) {
        price += size.price;
      }

      if (variations && variations.length) {
        variations.forEach(vr => {
          price += vr.price;
        });
      }

      let st = {
        id: store.id,
        name: store.name,
        items: [
          {
            id: item.id,
            name: item.name,
            price: price,
            quantity: quantity,
            thumbnail: item.thumbnail,
            variations: variations,
            size: size,
            subTotal: 0.0
          }
        ],
        subTotal: 0
      };
      this.cart.stores.push(st);
    }

    this.calculateCart();
    this.save();
  }

  // increase the quantity for item
  addQty(itemId: string, quantity: number, variations: Array<Variation>, size: Size) {
    let cartItem;
    variations = (variations && variations.length) ? variations : null;

    for (let i in this.cart.stores) {
      for (let j in this.cart.stores[i].items) {
        cartItem = this.cart.stores[i].items[j];

        if (cartItem.id == itemId) {
          if (this.isSame(cartItem.variations, variations) && (cartItem.size == size)) {
            cartItem.quantity += quantity;
            break;
          }
        }
      }
    }

    this.calculateCart();
    this.save();
  }

  // remove item from cart
  removeItem(item: CartItem, quantity: number) {
    let cartItem;

    for (let i in this.cart.stores) {
      for (let j in this.cart.stores[i].items) {
        cartItem = this.cart.stores[i].items[j];

        if (cartItem.id == item.id) {
          if (this.isSame(cartItem.variations, item.variations) && (cartItem.size == item.size)) {
            let qty = cartItem.quantity - quantity;
            if (qty > 0) {
              cartItem.quantity -= quantity;
            } else {
              this.cart.stores[i].items.splice(parseInt(j), 1);
            }

            break;
          }
        }
      }
    }

    this.calculateCart();
    this.save();
  }

  // calculate cart total
  calculateCart() {
    let total = 0;
    let storeTotal;

    this.cart.stores.map(store => {
      storeTotal = 0;
      store.items.map(item => {
        item.subTotal = item.price * item.quantity;
        total += item.subTotal;
        storeTotal += item.subTotal
      });
      store.subTotal = storeTotal;
    });

    this.cart.total = total;
  }

  save() {
    this.afs.doc('carts/' + this.userId).set(this.cart);
  }

  // setup init data for cart
  init(userId) {
    this.userId = userId;
    this.cart.userId = userId;
    this.afs.doc<Cart>('carts/' + userId).valueChanges().take(1).subscribe(cart => {
      if (cart && cart.stores) {
        this.cart = cart;
      } else {
        this.clearCart();
      }
    });
  }

  get() {
    return this.cart;
  }

  isSame(x, y) {
    console.log(JSON.stringify(x), JSON.stringify(y));
    return x == y || JSON.stringify(x) == JSON.stringify(y);
  }
}
