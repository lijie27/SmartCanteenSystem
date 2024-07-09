import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ModalOrderPage } from "../modal-order/modal-order";
import { OrderProvider } from "../../providers/order/order";
import { Order } from "../../models/order";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orders: Array<Order>;

  constructor(public nav: NavController,  public modalCtrl: ModalController, public orderProvider: OrderProvider) {
    // get data from firebase
    orderProvider.all().subscribe(orders => {
      this.orders = orders;
    });
  }

  // show order modal
  viewOrder(order) {
    let modal = this.modalCtrl.create(ModalOrderPage, {order: order});
    modal.present();
  }
}
