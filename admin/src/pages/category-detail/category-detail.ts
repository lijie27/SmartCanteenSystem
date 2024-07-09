import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { ItemDetailPage } from "../item-detail/item-detail";
import * as firebase from 'firebase';
import { ItemProvider } from "../../providers/item/item";
import { CategoryProvider } from "../../providers/category/category";
import { Category } from "../../models/category";
import { StoreProvider } from "../../providers/store/store";
import { DEFAULT_ITEM_THUMB } from "../../providers/constants";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {
  items: any;
  category: Category;
  isEditing = false;
  defaultCategory: Category = {
    storeId: '',
    name: '',
    thumbnail: DEFAULT_ITEM_THUMB,
    itemCount: 0
  };

  constructor(public nav: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
              public itemProvider: ItemProvider, public categoryProvider: CategoryProvider,
              public alertCtrl: AlertController, public storeProvider: StoreProvider) {

    // set current editing category
    if (navParams.get('category')) {
      this.isEditing = true;
      this.category = navParams.get('category');
      itemProvider.findByCategory(this.category.id).subscribe(items => {
        this.items = items;
      });
    } else {
      this.category = this.defaultCategory;
      this.category.storeId = this.storeProvider.getCurrent().id;
    }
  }

  // handle form submit
  submit() {
    if (!this.category.name) {
      let alert = this.alertCtrl.create({
        message: 'Please enter category name',
        buttons: ['OK']
      });
      return alert.present();
    }

    if (this.isEditing) {
      this.categoryProvider.update(this.category.id, this.category);
    } else {
      this.categoryProvider.add(this.category);
    }
    this.nav.pop();
  }

  // choose file for upload
  chooseFile() {
    document.getElementById('file').click();
  }

  // upload thumb for category
  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();


    // This currently only grabs category 0, TODO refactor it to grab them all
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
      let path = `/images/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        this.category.thumbnail = snapshot.downloadURL;
      });
    }
  }

  // add new item to this category
  addItem() {
    this.nav.push(ItemDetailPage, {category: this.category});
  }

  // view item detail
  viewItem(item) {
    this.nav.push(ItemDetailPage, {item: item});
  }

  // show options
  showOptions(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // remove item
            this.itemProvider.remove(item.id);
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
