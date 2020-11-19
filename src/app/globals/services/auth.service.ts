import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private socket:SocketIoService) {
    this.loginStatus.next(this.isLoggedIn());
  }

  save(data) {
    localStorage.setItem('token', data.token);
    this.loginStatus.next(true);
    this.socket.connect(data.token);
  }

  get() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  clear() {
    localStorage.removeItem('token');
    this.loginStatus.next(false);
    this.socket.disconnect();
  }
}
