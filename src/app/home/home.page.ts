import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

const itemPerPage = 10; // 1ページあたりに含まれる要素数
const itemPage = 1; // ページ番号

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
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  names: string[];
  qiitaItems: QiitaItem[] = [];
  perPage: number = itemPerPage;
  page: number = itemPage;
  url = 'https://qiita.com/api/v2/items';

  constructor (
      public http: HttpClient,
      private nav: NavController,
  ) {
    this.loadData(this.page, this.perPage);
  }

  doRefresh($event: any) {
    this.page = itemPage;
    this.perPage = itemPerPage;
    this.loadData(this.page, this.perPage).then(() => {
      $event.target.complete();
    }, () => {
      $event.target.complete();
    });
  }


  loadOldData($event) {
    this.page += itemPage;
    this.loadData(this.page, this.perPage).then(() => {
      $event.target.complete();
    }, () => {
      $event.target.complete();
    });
  }

  private loadData(page: number, perPage: number): Promise<QiitaItem[]> {
    return new Promise<QiitaItem[]>((resolve, reject) => {
      // this.http.get<QiitaItem[]>(this.url + page + '&per_page=' + perPage)
      this.http.get<QiitaItem[]>(this.url, {params: {page: `${page}`, per_page: `${perPage}` }})
          .subscribe(  res => {
            this.qiitaItems = this.qiitaItems.concat(res);
            // console.log(res);
            resolve();
          });
    });
  }

  getTagList(tags) {
    this.names = tags.map(function(element) {
      return element.name;
    });
    return this.names.join(', ');
  }

  onArticleClicked(qiitaItem: QiitaItem) {
    // console.log(qiitaItem);
    this.nav.navigateForward(`/article/${qiitaItem.id}`);
  }

}
