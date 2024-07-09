import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryPage } from "../category/category";
import { CategoriesPage } from "../categories/categories";
import { StoreProvider } from "../../providers/store/store";
import { CategoryProvider } from "../../providers/category/category";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // slides for slider
  public slides = [
    "assets/img/categories/fruit.jpg",
    "assets/img/categories/pizza.jpg",
    "assets/img/categories/sushi.jpg"
  ];

  // list of restaurant
  stores: any;

  constructor(public nav: NavController, public storeProvider: StoreProvider, public categoryProvider: CategoryProvider) {
    storeProvider.all().subscribe(snapshot => {
      this.stores = snapshot;

      // convert children categories to array
      this.stores.forEach((value, key) => {
        // TODO limit by 6 cats
        categoryProvider.all(value.id).subscribe(cats => this.stores[key].cats = cats);
      });
    });
  }

  // view a category
  viewCategory(store, category) {
    this.nav.push(CategoryPage, {
      store: store,
      category: category
    });
  }

  // view list categories of store
  viewRestaurant(store) {
    this.nav.push(CategoriesPage, {store: store});
  }
}
