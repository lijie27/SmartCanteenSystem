import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { ItemProvider } from "../../providers/item/item";
import { Item } from "../../models/item";
import * as firebase from 'firebase'

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  isEditing = false;
  item: Item;
  itemForm: any;
  sizeForm = [];
  variationForm = [];
  submitAttempt = false;

  constructor(public nav: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public itemProvider: ItemProvider) {
    // define form validator
    this.itemForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      sku: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    });


    // set current editing item
    if (navParams.get('item')) {
      this.isEditing = true;
      this.item = navParams.get('item');

      // need to set sizes and option as array
      if (!this.item.sizes) {
        this.item.sizes = [];
      }
      if (!this.item.variations) {
        this.item.variations = [];
      }
    } else {
      this.item = itemProvider.defaultItem;
      this.item.categoryId = navParams.get('category').id;
    }
  }

  // choose file for upload
  chooseFile() {
    document.getElementById('item-thumb').click();
  }

  // upload thumb for item
  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('item-thumb')).files[0]]) {
      let path = `/images/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        this.item.thumbnail = snapshot.downloadURL;
      });
    }
  }

  // submit form
  submit() {
    this.submitAttempt = true;

    if (this.itemForm.valid) {
      // update current item
      if (this.isEditing) {
        this.itemProvider.update(this.item.id, this.item);
      } else {
        this.itemProvider.add(this.item);
      }

      this.nav.pop();
    }
  }

  // add sizes
  addSize() {
    this.item.sizes.push({
      name: '',
      price: 0
    })
    this.sizeForm.push(this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    }));
  }

  // remove size from list
  removeSize(index) {
    this.item.sizes.splice(index, 1);
  }

  // add item variation
  addOption() {
    this.item.variations.push({
      name: '',
      price: 0
    });
    this.variationForm.push(this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    }));
  }

  // remove variation from list
  removeOption(index) {
    this.item.variations.splice(index, 1);
  }
}
