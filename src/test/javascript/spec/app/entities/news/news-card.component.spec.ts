import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CityNewsAndWeatherTestModule } from '../../../test.module';
import { NewsDetailComponent } from 'app/entities/news/news-detail.component';
import { News } from 'app/shared/model/news.model';
import { NewsCardComponent } from 'app/entities/news/news-card/news-card.component';
import * as moment from 'moment';

describe('Component Tests', () => {
  describe('News Card Component', () => {
    let comp: NewsCardComponent;
    let fixture: ComponentFixture<NewsCardComponent>;
    // const route = ({ data: of({ news: new News('123') }) } as any) as ActivatedRoute;
    const news = new News();
    (news.authorId = ''), (news.cityId = ''), (news.createAt = moment());
    news.description = 'Esta es la descripción';
    news.title = 'Este es el título';
    news.id = '123';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CityNewsAndWeatherTestModule],
        declarations: [NewsCardComponent],
        // providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NewsCardComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NewsCardComponent);
      comp = fixture.componentInstance;
      comp.news = news;
    });

    describe('OnInit', () => {
      it('Should load news on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.news).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
