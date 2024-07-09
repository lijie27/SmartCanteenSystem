import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatDetailPage } from "../chat-detail/chat-detail";
import { ChatProvider } from "../../providers/chat/chat";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
  public chats: any;

  constructor(public nav: NavController, public chatProvider: ChatProvider) {
    this.chats = chatProvider.all();
  }

  viewChat(id) {
    this.nav.push(ChatDetailPage, {id: id});
  }
}
