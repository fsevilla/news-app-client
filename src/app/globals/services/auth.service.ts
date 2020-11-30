import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SocketIoService } from './socket-io.service';
import { SocialAuthService } from "angularx-social-login";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private socket:SocketIoService, private socialAuthService:SocialAuthService) {
    this.loginStatus.next(this.isLoggedIn());
  }

  save(data, google?) {
    localStorage.setItem('token', data.token);
    this.loginStatus.next(true);
    this.socket.connect(data.token);
    if(google) {
      localStorage.setItem('social', '1');
    }
  }

  get() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isSocialUser() {
    return !!localStorage.getItem('social');
  }

  clear() {
    return new Promise((resolve, reject) => {
      const isSocial = this.isSocialUser();
      localStorage.clear();
      this.socket.disconnect();
      if(isSocial) {
        this.socialAuthService.signOut(true).then((response) => {
          this.loginStatus.next(false);
          resolve();
        });  
      } else {
        this.loginStatus.next(false);
        resolve();
      }
    });
  }
}
