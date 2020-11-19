import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient:HttpClient) { }

  signup(data:any):Promise<any> {
    const url = `${environment.apiUrl}signup`;
    return this.httpClient.post(url, data).toPromise();
  }

  login(credentials:any):Promise<any> {
    const url = `${environment.apiUrl}auth`;
    return this.httpClient.post(url, credentials).toPromise();
  }

  googleLogin(idToken:string):Promise<any> {
    const url = `${environment.apiUrl}auth/google`;
    return this.httpClient.post(url, { idToken: idToken }).toPromise();
  }
}
