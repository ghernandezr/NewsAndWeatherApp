import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiLanguageService } from 'ng-jhipster';

import { IWeather, Weather } from 'app/shared/model/weather.model';
import { WeatherService } from './weather.service';
import * as moment from 'moment';

@Component({
  selector: 'jhi-weather',
  templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit, OnDestroy {
  currentweather: IWeather;
  forecastWeather: IWeather[];
  eventSubscriber?: Subscription;

  constructor(
    protected languajeService: JhiLanguageService,
    protected weatherService: WeatherService,
    protected eventManager: JhiEventManager
  ) {
    this.currentweather = new Weather();
    this.forecastWeather = [];
  }

  loadAll(): void {
    this.weatherService.query('London', 'uk', this.languajeService.currentLang).subscribe((response: any) => {
      this.currentweather.date = moment();
      this.currentweather.temp = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(response.main.temp - 273.15);
      this.currentweather.icon = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
      this.currentweather.description = response.weather[0].description;
    });

    this.weatherService.forecast('London', 'uk', this.languajeService.currentLang).subscribe((response: any) => {
      if (response.list && response.list.length) {
        response.list.forEach((item: any) => {
          const fw = new Weather();
          fw.date = moment(item.dt_txt);
          fw.temp = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item.main.temp - 273.15);
          fw.icon = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
          fw.description = item.weather[0].description;
          this.forecastWeather.push(fw);
        });
      }
    });
  }

  // "http://openweathermap.org/img/w/" + iconcode + ".png"

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWeathers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWeather): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWeathers(): void {
    this.eventSubscriber = this.eventManager.subscribe('selectedCityChange', () => this.loadAll());
  }
}
