import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../new-letter.interface';

@Component({
  selector: 'app-news-letter-item',
  templateUrl: './news-letter-item.component.html',
  styleUrls: ['./news-letter-item.component.css']
})
export class NewsLetterItemComponent implements OnInit {
  @Input() newsItem: Article;
  constructor() { }

  ngOnInit(): void {
  }

}
