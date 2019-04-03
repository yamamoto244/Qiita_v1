import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  names: any;
  qiitaItems: Object;
  constructor (public http: HttpClient) {

    this.http.get('https://qiita.com/api/v2/items?page=1&per_page=20')
    // .pipe(
    //     map(res => res)
    // )
        .subscribe(res => this.qiitaItems = res );
  }

  getArticle() {
    this.http.get('https://qiita.com/api/v2/items?page=1&per_page=5')
    // .pipe(
    //     map(res => res)
    // )
        .subscribe(res => {
          this.qiitaItems = res;
          console.log('res:', res);
        });
  }

  getTagList(tags) {
    this.names = tags.map(function(element) {
      return element.name;
    });
    return this.names.join(', ');
  }
}
