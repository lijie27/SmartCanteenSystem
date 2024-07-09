import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemPage } from "../item/item";
import { Item } from "../../models/item";
import { Category } from "../../models/category";
import { Store } from "../../models/store";
import { ItemProvider } from "../../providers/item/item";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  items: Array<Item>;
  category: Category;
  store: Store;

  constructor(public nav: NavController, public navParams: NavParams, public itemProvider: ItemProvider) {
    this.category = navParams.get('category');
    this.store = navParams.get('store');
    itemProvider.findByCategoryId(this.category.id, 'name', 'asc').subscribe(items => this.items = items);
  }

  // view item detail
  viewItem(item) {
    this.nav.push(ItemPage, {
      item: item,
      store: this.store
    })
  }
}
