import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthorService } from 'app/entities/author/author.service';
import { CityService } from 'app/entities/city/city.service';
import { IAuthor } from 'app/shared/model/author.model';
import { INews } from 'app/shared/model/news.model';

@Component({
  selector: 'jhi-news-card',
  templateUrl: 'news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() news?: INews;

  author?: IAuthor;

  constructor(private authorService: AuthorService, private cityService: CityService) {}

  ngOnInit(): void {
    this.fetchAuthor();
  }

  fetchAuthor(): void {
    if (this.news) {
      this.authorService.find(this.news.authorId!).subscribe((response: HttpResponse<IAuthor>) => {
        this.author = response.body!;
      });
    }
  }
}
