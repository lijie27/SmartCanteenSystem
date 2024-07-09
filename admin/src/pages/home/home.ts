import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportProvider } from "../../providers/report/report";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  // daily report
  barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    title: {
      display: true,
      text: 'Daily sale'
    }
  };
  barChartLabels: string[] = ['Daily sale'];
  barChartType: string = 'line';
  barChartLegend: boolean = false;
  barChartData: any[] = [
    {data: []}
  ];

  // report by items
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: string = 'pie';
  pieChartOptions: any = {
    title: {
      display: true,
      text: 'Popular items'
    }
  }

  // other reports
  today: number;
  thisMonth: number;
  thisYear: number;
  pending: number = 0;
  serving: number = 0;
  complete: number = 0;
  cancelled: number = 0;
  avg: number;
  total: number;

  // constructor(public nav: NavController, public reportProvider: ReportProvider) {
    // this.reportProvider.all().subscribe(snapshot => {
    //   let byDate = reportProvider.getLastDays(snapshot, 7);

    //   this.barChartLabels = Object.keys(byDate).reverse();
    //   this.barChartData[0] = {data: Object.keys(byDate).map(val => byDate[val]).reverse()};

    //   this.today = reportProvider.getTotalToday(snapshot).total;
    //   this.thisMonth = reportProvider.getTotalThisMonth(snapshot).total;
    //   this.thisYear = reportProvider.getTotalThisYear(snapshot).total;

    //   // check if report is not empty
    //   if (snapshot && snapshot.order) {
    //     this.pending = snapshot.order.pending ? snapshot.order.pending : 0;
    //     this.serving = snapshot.order.serving ? snapshot.order.serving : 0;
    //     this.complete = snapshot.order.complete ? snapshot.order.complete : 0;
    //     this.cancelled = snapshot.order.cancelled ? snapshot.order.cancelled : 0;
    //   }

    //   this.total = (snapshot && snapshot.sale && snapshot.sale.total) ? snapshot.sale.total : 0;
    //   this.avg = Math.round(this.total / this.complete);
    // })

    // TODO report by most sale item
  // }
}
