import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INews, News } from 'app/shared/model/news.model';
import { NewsService } from './news.service';
import { CityService } from '../city/city.service';
import { AuthorService } from '../author/author.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ICity } from 'app/shared/model/city.model';
import { LocationService } from 'app/shared/components/location/location.service';

@Component({
  selector: 'jhi-news-update',
  templateUrl: './news-update.component.html',
})
export class NewsUpdateComponent implements OnInit {
  isSaving = false;
  createAtDp: any;
  account!: Account;
  city?: ICity;
  news?: INews;

  editForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private accountService: AccountService,
    protected newsService: NewsService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ news }) => {
      this.news = news;
      this.updateForm(news);
    });

    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });

    this.city = this.locationService.city;

    this.registerCityChangeListener();
  }

  updateForm(news: INews): void {
    this.editForm.patchValue({
      title: news.title,
      description: news.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const news = this.createFromForm();
    if (news.id !== undefined) {
      this.subscribeToSaveResponse(this.newsService.update(news));
    } else {
      this.subscribeToSaveResponse(this.newsService.create(news));
    }
  }

  private createFromForm(): INews {
    return {
      ...new News(),
      id: this.news && this.news.id ? this.news.id : undefined,
      authorId: this.account.id,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      cityId: this.city!.id,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INews>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  registerCityChangeListener(): void {
    this.locationService.cityChange.subscribe((city: ICity) => {
      this.city = city;
    });
  }
}
