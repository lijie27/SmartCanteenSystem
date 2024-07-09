import { Injectable } from '@angular/core';
import { Loading, LoadingController } from "ionic-angular";

/*
 Generated class for the LoadingProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class LoadingProvider {
  private loading: Loading;

  constructor(public loadingCtrl: LoadingController) {

  }

  // show the loading
  present(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  // hide the loading
  dismiss() {
    this.loading.dismiss();
  }
}
