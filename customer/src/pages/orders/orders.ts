import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderProvider } from "../../providers/order/order";
import { Order } from "../../models/order";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  public orders: Array<Order>;

  constructor(public nav: NavController, public orderProvider: OrderProvider) {
    // get list orders from firebase
    orderProvider.all().subscribe(orders => this.orders = orders);
  }
}
