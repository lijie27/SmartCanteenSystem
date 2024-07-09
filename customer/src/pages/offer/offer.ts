import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemPage } from "../item/item";
import { ItemProvider } from "../../providers/item/item";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html'
})
export class OfferPage {
  // items
  public items: any;

  constructor(public nav: NavController, public itemProvider: ItemProvider) {
    // get all items
    this.items = itemProvider.all();
  }

  // view item detail
  viewItem(id) {
    this.nav.push(ItemPage, {id: id})
  }

  // add cart
  addCart() {
    // add your code here
  }
}
