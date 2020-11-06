import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  save(data) {
    localStorage.setItem('token', data[0].token);
  }

  get() {
    return localStorage.get('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
