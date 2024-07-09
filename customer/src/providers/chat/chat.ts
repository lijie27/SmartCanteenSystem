import { Injectable } from '@angular/core';
import { CHATS } from "./mock-chats";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
  chats: Array<any>;

  constructor() {
    this.chats = CHATS;
  }

  all() {
    return this.chats;
  }

  get(id) {
    for (var i = 0; i < CHATS.length; i++) {
      if (this.chats[i].id === parseInt(id)) {
        return this.chats[i];
      }
    }
    return null;
  }
}
