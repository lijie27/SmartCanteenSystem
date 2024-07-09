import { Injectable } from '@angular/core';
import { POSTS } from "./mock-posts";

/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostProvider {

  constructor() {
  }

  all() {
    return POSTS;
  }
}
