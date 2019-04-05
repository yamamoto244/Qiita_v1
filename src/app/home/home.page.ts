import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

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
  perPage = itemPerPage;
  page = itemPage;

  constructor (
      public http: HttpClient,
  ) {

    /*
    this.http.get('https://qiita.com/api/v2/items?page=1&per_page=10')
        .subscribe(res => this.qiitaItems = res );
        */
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
    // console.log('Begin async operation');
    // this.http.get('https://qiita.com/api/v2/items?page=1&per_page=10')
    //     .subscribe(res => {
    //       this.qiitaItems = res;
    //     });
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   event.target.complete();
    // });
  }


  loadOldData($event) {
    this.page += itemPage;
    // this.perPage +=  itemPerPage;
    this.loadData(this.page, this.perPage).then(() => {
      $event.target.complete();
    }, () => {
      $event.target.complete();
    });
  }

  private loadData(page: number, perPage: number): Promise<QiitaItem[]> {
    return new Promise<QiitaItem[]>((resolve, reject) => {
      this.http.get<QiitaItem[]>('https://qiita.com/api/v2/items?page=' + page + '&per_page=' + perPage)
          .subscribe(  res => {
            // if (page > itemPage) {
            //   this.loadQiitaItems = res;
            //   this.qiitaItems.push( this.loadQiitaItems );
            // } else {
            //   this.qiitaItems = res;
            // }
            this.qiitaItems = this.qiitaItems.concat(res);
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
}
