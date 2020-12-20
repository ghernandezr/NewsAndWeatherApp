import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CityNewsAndWeatherTestModule } from '../../../test.module';
import { WeatherComponent } from 'app/entities/weather/weather.component';
import { WeatherService } from 'app/entities/weather/weather.service';
import { Weather } from 'app/shared/model/weather.model';

describe('Component Tests', () => {
  describe('Weather Management Component', () => {
    let comp: WeatherComponent;
    let fixture: ComponentFixture<WeatherComponent>;
    let service: WeatherService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CityNewsAndWeatherTestModule],
        declarations: [WeatherComponent],
      })
        .overrideTemplate(WeatherComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WeatherComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WeatherService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Weather('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.currentWeather && comp.currentWeather[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
