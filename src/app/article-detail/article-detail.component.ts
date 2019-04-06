import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {

  constructor(private  nav: NavController,
  ) { }

  ngOnInit() {}

  private back() {
    this.nav.navigateForward('/article');
  }
}
