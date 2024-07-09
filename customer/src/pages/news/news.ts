import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostProvider } from "../../providers/post/post";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  // list of posts
  public posts: any;

  constructor(public nav: NavController, public postProvider: PostProvider) {
    // set sample data
    this.posts = postProvider.all();
  }
}
