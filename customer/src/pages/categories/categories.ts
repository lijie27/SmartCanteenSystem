import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from "../category/category";
import { CategoryProvider } from "../../providers/category/category";
import { Category } from "../../models/category";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  store: any;
  categories: Array<Category> = [];

  constructor(public nav: NavController, public navParams: NavParams, public categoryProvider: CategoryProvider) {
    this.store = this.navParams.get('store');
    categoryProvider.all(this.store.id).subscribe(cats => this.categories = cats);
  }

  // view a category
  viewCategory(category) {
    this.nav.push(CategoryPage, {
      store: this.store,
      category: category
    });
  }
}
