import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  protected endpoint:string;

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getAll(endpoint?):Promise<any> {
    endpoint = endpoint || this.endpoint;
    const url = environment.apiUrl + this.endpoint;
    return this.httpClient.get(url).toPromise();
  }

  getById(id:string):Promise<any> {
    const url = `${environment.apiUrl}${this.endpoint}/${id}`;
    return this.httpClient.get(url).toPromise();
  }
}
