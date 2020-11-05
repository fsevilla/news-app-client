import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  newsId:number;

  constructor(private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.newsId = params.id;
    });
  }

  ngOnInit(): void {
  }

}
