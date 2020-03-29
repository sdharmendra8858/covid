import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RootObject, Article } from './new-letter.interface';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css']
})
export class NewsLetterComponent implements OnInit {
  url: string = "http://newsapi.org/v2/everything?q=covid&sortBy=publishedAt&language=en&apiKey=496adf61462b409793a6c6e1b7d4370a";
  newsData: Article[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<RootObject>(this.url)
      .subscribe(response => {
        this.newsData = response.articles.slice(0,5);
      });
  }

}
