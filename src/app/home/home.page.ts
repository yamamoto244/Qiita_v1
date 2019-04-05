import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

const itemPerPage = 10; // 1ページあたりに含まれる要素数
const itemPage = 1; // ページ番号

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  names: any;
  qiitaItems: Object;
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
    this.perPage +=  itemPerPage;
    this.loadData(this.page, this.perPage).then(() => {
      $event.target.complete();
    }, () => {
      $event.target.complete();
    });
  }

  private loadData(page: number, perPage: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get('https://qiita.com/api/v2/items?page=' + page + '&per_page=' + perPage)
          .subscribe(  res => {
        this.qiitaItems = res;
        resolve();
      });
    });

    /*
        try {
          this.http.get('https://qiita.com/api/v2/items?page=1&per_page=10')
              .subscribe( async  res => {
                this.qiitaItems = await res;
              });
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
        */
  }

  getTagList(tags) {
    this.names = tags.map(function(element) {
      return element.name;
    });
    return this.names.join(', ');
  }
}
