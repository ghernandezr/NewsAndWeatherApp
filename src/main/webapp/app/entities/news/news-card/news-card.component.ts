import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from 'app/entities/author/author.service';
import { CityService } from 'app/entities/city/city.service';
import { IAuthor } from 'app/shared/model/author.model';
import { INews } from 'app/shared/model/news.model';
import { NewsDeleteDialogComponent } from '../news-delete-dialog.component';

@Component({
  selector: 'jhi-news-card',
  templateUrl: 'news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() news?: INews;

  author?: IAuthor;

  constructor(private authorService: AuthorService, protected modalService: NgbModal) {}

  ngOnInit(): void {}

  delete(news: INews): void {
    const modalRef = this.modalService.open(NewsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.news = news;
  }
}
