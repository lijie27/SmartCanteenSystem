import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from "../../providers/chat/chat";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html'
})
export class ChatDetailPage {
  public chat: any;

  constructor(public nav: NavController, public chatProvider: ChatProvider, public navParams: NavParams) {
    // get sample data only
    this.chat = chatProvider.get(navParams.get('id'));
  }
}
