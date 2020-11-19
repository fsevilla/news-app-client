import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { SocketIoService } from '../../services/socket-io.service';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {

  @Input('source') items:any[] = [];

  @Output() onChildClick:EventEmitter<any> = new EventEmitter();

  constructor(private socket:SocketIoService, private toastr:ToastrService) { }

  ngOnInit(): void {

    this.socket.on('likedNews', (data) => {
      console.log('Alguien le dio me gusta', data);
      const userName = data.user || 'Someone';
      this.toastr.success(`${userName} liked a news: <a href="${data.url}" target="_blank">${data.title}</a>`, 'Liked!', {
        enableHtml: true
      });
    });

  }

  handleClick(item) {
    this.onChildClick.emit({
      event: 'selected',
      item: item
    });
  }

  like(item) {
    console.log('Disparar el evento a traves del socket');
    this.socket.emit('likedNews', {
      url: item.url,
      title: item.title
    });
  }

}
