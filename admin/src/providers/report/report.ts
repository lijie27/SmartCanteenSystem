import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";

/*
  Generated class for the ReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportProvider {
  private storeId: string;
  private reportDoc: AngularFirestoreDocument<any>;
  private today = new Date();

  constructor(public afs: AngularFirestore) {

  }

  init(storeId) {
    this.storeId = storeId;
    this.reportDoc = this.afs.doc('reports/' + this.storeId);
  }

  all() {
    return this.reportDoc.valueChanges();
  }

  // calculate report for last {number} days
  getLastDays(reportObject, number) {
    let year, month, day;
    let currentDate = new Date();
    let i = 0;
    let reports = {};

    while (i < number) {
      year = currentDate.getFullYear();
      month = currentDate.getMonth() + 1;
      day = currentDate.getDate();

      if (reportObject
        && reportObject.sale
        && reportObject.sale[year]
        && reportObject.sale[year][month]
        && reportObject.sale[year][month][day]
      ) {
        reports[year + '/' + month + '/' + day] = reportObject.sale[year][month][day].total;
      } else {
        reports[year + '/' + month + '/' + day] = 0;
      }
      currentDate.setDate(currentDate.getDate() - 1);
      i++;
    }

    return reports;
  }

  // get report for this year
  getTotalThisYear(reportObject) {
    return (reportObject &&reportObject.sale && reportObject.sale[this.today.getFullYear()]) ? reportObject.sale[this.today.getFullYear()] : {total: 0};
  }

  // get report for this month
  getTotalThisMonth(reportObject) {
    let thisYear = this.getTotalThisYear(reportObject);

    return thisYear[this.today.getMonth() + 1] ? thisYear[this.today.getMonth() + 1] : {total: 0};
  }

  // get report for today
  getTotalToday(reportObject) {
    let thisMonth = this.getTotalThisMonth(reportObject);
    return thisMonth[this.today.getDate()] ? thisMonth[this.today.getDate()] : {total: 0};
  }
}
