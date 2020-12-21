import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INews } from 'app/shared/model/news.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { NewsService } from './news.service';
import { NewsDeleteDialogComponent } from './news-delete-dialog.component';
import { ICity } from 'app/shared/model/city.model';
import { LocationService } from 'app/shared/components/location/location.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit, OnDestroy {
  news: INews[];
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;
  cityChangeSubscription?: Subscription;

  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  city?: ICity;

  constructor(
    protected newsService: NewsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected locationService: LocationService,
    protected accountService: AccountService
  ) {
    this.news = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    if (this.city) {
      this.newsService
        .queryByCity(this.city.id!, {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe((res: HttpResponse<INews[]>) => this.paginateNews(res.body, res.headers));
    }
  }

  reset(): void {
    this.page = 0;
    this.news = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.city = this.locationService.city;
    // this.loadAll();
    this.registerChangeInNews();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(() => {
      this.reset();
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.cityChangeSubscription) {
      this.cityChangeSubscription.unsubscribe();
    }
  }

  trackId(index: number, item: INews): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNews(): void {
    this.eventSubscriber = this.eventManager.subscribe('newsListModification', () => this.reset());
    this.cityChangeSubscription = this.locationService.cityChange.subscribe((city: ICity) => {
      this.city = city;
      this.reset();
    });
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateNews(data: INews[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.news.push(data[i]);
      }
    }
  }
}
