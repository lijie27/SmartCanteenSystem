import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { CategoryDetailPage } from "../category-detail/category-detail";
import { CategoryProvider } from "../../providers/category/category";
import { ItemProvider } from "../../providers/item/item";
import { Category } from "../../models/category";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  categories: Array<Category>;

  constructor(public nav: NavController, public actionSheetCtrl: ActionSheetController,
              public categoryProvider: CategoryProvider, public itemProvider: ItemProvider) {
    categoryProvider.all().subscribe(cats => {
      this.categories = cats;
    });
  }

  // view category detail
  viewCat(cat) {
    this.nav.push(CategoryDetailPage, {category: cat});
  }

  // go to add category page
  addCat() {
    this.nav.push(CategoryDetailPage);
  }

  // show options
  showOptions(category) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // remove category
            this.categoryProvider.remove(category.id).then(() => {
              this.itemProvider.removeByCategory(category.id);
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
