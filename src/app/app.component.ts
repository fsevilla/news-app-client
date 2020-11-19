import { Component } from '@angular/core';
import { AuthService } from './globals/services/auth.service';
import { SocketIoService } from './globals/services/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Francisco';

  constructor(private socket:SocketIoService, private authService:AuthService) {
    if(this.authService.isLoggedIn()) {
      this.socket.connect(this.authService.get());
    }

    // setTimeout(() => {
    //   this.socket.disconnect();
    // }, 5000);
  }
}
