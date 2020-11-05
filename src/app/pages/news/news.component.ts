import { Component, OnInit, OnChanges } from '@angular/core';

import { NewsService } from './../../globals/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnChanges {

  name:string = "News Component";

  news:any[] = [];

  search:string = '';

  constructor(private newsService:NewsService) {}

  ngOnInit(): void {
    
  }

  ngOnChanges() {}

  doSearch() {
    this.newsService.getNews(this.search).then(data => {
      this.news = data;
    }).catch(err => {
      console.error(err);
    });
  }

}
