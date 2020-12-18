import { Component, Input, OnInit } from '@angular/core';
import { AuthorService } from 'app/entities/author/author.service';
import { CityService } from 'app/entities/city/city.service';
import { INews } from 'app/shared/model/news.model';

@Component({
  selector: 'jhi-news-card',
  templateUrl: 'news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() news?: INews;

  constructor(private authorService: AuthorService, private cityService: CityService) {}

  ngOnInit(): void {}
}
