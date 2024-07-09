import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from "../../models/user";
import { UserProvider } from "../../providers/user/user";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  user: User;

  constructor(public nav: NavController, public userProvider: UserProvider) {
    userProvider.getCurrent().subscribe(user => {
      this.user = user;
    })
  }
}
