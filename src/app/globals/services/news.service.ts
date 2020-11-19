import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news = [
    {
      url: '#',
      title: 'Noticia 1',
      image: 'https://dummyimage.com/300.png/09f/fff'
    },
    {
      url: '#',
      title: 'Noticia 2',
      image: 'https://dummyimage.com/300.png/09f/fff'
    },
    {
      url: '#',
      title: 'Noticia 3'
    }
  ];

  constructor(private http:HttpClient, private authService:AuthService) { }

  getNewsCallback(callback) {
    setTimeout(() => {
      callback(this.news);
    }, 2000);
  }

  getNews(search=''):Promise<any> {
    return this.http.get(environment.apiUrl + 'news?q='+search).toPromise();
  }

  getHeadlines(country = ''):Promise<any> {

    const httpHeaders = new HttpHeaders({
      Authorization: this.authService.get()
    });

    return this.http.get(environment.apiUrl + 'headlines?q='+country, {
      headers: httpHeaders
    }).toPromise();
  }

  getSources():Promise<any> {
    return this.http.get(environment.apiUrl + 'domains').toPromise();
  }
}
