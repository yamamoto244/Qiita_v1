import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {HttpClient} from '@angular/common/http';

interface QiitaItem {
  body: string;
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group: string;
  id: string;
  likes_count: number;
  page_views_count: number;
  private: boolean;
  reactions_count: number;
  rendered_body: string;
  tags: string[];
  title: string;
  updated_at: string;
  url: string;
  user: string[];
}

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {

  id: string;
  qiitaItems: QiitaItem[] = [];
  url = 'https://qiita.com/api/v2/items';

  constructor(
      private  nav: NavController,
      private route: ActivatedRoute,
      private location: Location,
      public http: HttpClient,
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params =>
            this.id = params['slug']);
    this.http.get<QiitaItem[]>(this.url, {params: {query: 'id:' + this.id}})
        .subscribe( res =>
            this.qiitaItems = res);
    console.log(this.qiitaItems);
  }

  private goBack(event) {
    event.preventDefault();
    this.location.back();
  }
}
